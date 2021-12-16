const loadServices = async() => {
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

    await fetch('https://empresaurios.herokuapp.com/api/service', fetchData)
        .then((res) => res.json())
        .then((data) => {

            $('#totalQ').append(`Mostrando ${data.total} resultados`);

            if (data.service.length != 0) {

                data.service.forEach(service => {

                    $('#fillServices').append(`
                    <div class="strip_list wow fadeIn">
                    <a href="#0" class="wish_bt"></a>
                    <figure>
                        <a href="detail-page.html"><img src="http://via.placeholder.com/565x565.jpg" alt=""></a>
                    </figure>
                    <small>${service.namePerson}</small>
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <span class="rating"><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star voted"></i><i class="icon_star"></i><i class="icon_star"></i> <small>(145)</small></span>
                    <a href="badges.html" data-toggle="tooltip" data-placement="top" data-original-title="Badge Level" class="badge_list_1"><img src="img/badges/badge_1.svg" width="15" height="15" alt=""></a>
                    <ul>
                        <li><a href="https://goo.gl/maps/PLSPLzHCsGy8WPzY8" target="_blank">Como llegar</a></li>
                        <li><a href="detail-page.html?id=${service._id}">Reservar</a></li>
                    </ul>
                </div>
                `);
                });
            }
            swal.close();
        })

}


loadServices();



const logOut = () => {

    localStorage.removeItem('expressvet-token');
    window.location = './';

}