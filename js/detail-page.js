const loadDetailService = async(id) => {

    let fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }

    swal.fire({
        title: 'Cargando...'
    });
    swal.showLoading();

    await fetch(`https://empresaurios.herokuapp.com/api/service/${id}`, fetchData)
        .then((res) => res.json())
        .then((data) => {


            for (const price in data.service.price) {
                if (Object.hasOwnProperty.call(data.service.price, price)) {
                    const element = data.service.price[price];
                    $('#fillPrices').append(`
                    <div class="checkbox">
                        <input type="checkbox" class="css-checkbox" id="${price}" name="${price}">
                        <label for="${price}" class="css-label">Baño para perros ${price}<strong>$${element}</strong></label>
                    </div>
                    `);
                }
            }

            swal.close();
        })

    fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch(`https://empresaurios.herokuapp.com/api/review/service/${id}`, fetchData)
        .then((res) => res.json())
        .then((data) => {

            if (!data.review) {
                $('#avg').append(`0.0`);
                $('#total').append(`Este servicio aun no tiene calificaciones`);
                const generalStar = getStarts(0);

                return $('#generalRating').append(generalStar);
            }

            $('#avg').append(`${data.avg[0].average.toFixed(1)}`);
            $('#total').append(`Basado en ${data.total} calificaciones`);

            const generalStar = getStarts(parseInt(data.avg[0].average.toFixed()));

            $('#generalRating').append(generalStar);

            data.review.forEach(element => {

                const stars = getStarts(element.score);
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const date = new Date(element.date).toLocaleDateString('es-MX', options);

                $('#reviewContainer').append(`
                <div class="review-box clearfix">
                <figure class="rev-thumb"><img src="http://via.placeholder.com/150x150.jpg" alt="">
                </figure>
                <div class="rev-content">
                    <div class="rating">
                    ${stars}
                    </div>
                    <div class="rev-info">
                        ${element.user.name} – ${date} :
                    </div>
                    <div class="rev-text">
                        <h5>${element.title}</h5>
                        <p>
                            ${element.description}
                        </p>
                    </div>
                </div>
            </div>`);
            });

        })





}

const valores = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(valores);

//Accedemos a los valores
var id = urlParams.get('id');

loadDetailService(id);


$('#res').click(function(e) {
    e.preventDefault();

    let noSelected = 0;
    let selected;

    if ($('#pequeños').prop('checked')) {
        noSelected += 1;
        selected = 'pequeños';
    }
    if ($('#medianos').prop('checked')) {
        noSelected += 1;
        selected = 'medianos';
    }
    if ($('#grandes').prop('checked')) {
        noSelected += 1;
        selected = 'grandes'
    }

    if (noSelected > 1) {
        return Swal.fire({
            title: 'Error!',
            text: 'Necesitas seleccionar solo un campo',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
    if (noSelected < 1) {
        return Swal.fire({
            title: 'Error!',
            text: 'Necesitas seleccionar un campo',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    const date = $('#booking_date').val();
    const time = $('#booking_time').val();

    localStorage.setItem('express-vet-id-appointment', id);
    localStorage.setItem('express-vet-price', selected);
    localStorage.setItem('express-vet-date', date);
    localStorage.setItem('express-vet-time', time);

    window.location = './booking-page.html';

});



const getStarts = (stars) => {

    switch (stars) {
        case 1:
            return '<i class="icon_star voted"></i><i class="icon_star"></i><i class="icon_star"></i><i class="icon_star"></i><i class="icon_star"></i>';
            break;
        case 2:
            return '<i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i><i class="icon_star"></i><i class="icon_star"></i>';
            break
        case 3:
            return '<i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i><i class="icon_star"></i>';
            break;
        case 4:
            return '<i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i>';
            break;
        case 5:
            return '<i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i>';
            break;
        default:
            return '<i class="icon_star"></i><i class="icon_star"></i><i class="icon_star"></i><i class="icon_star"></i><i class="icon_star"></i>';
            break;
    }

}