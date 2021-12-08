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

    await fetch(`http://localhost:8080/api/service/${id}`, fetchData)
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