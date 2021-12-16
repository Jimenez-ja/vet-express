const fetchServices = async(id) => {
    let fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/service/' + id, fetchData)
        .then((res) => res.json())
        .then((data) => {

            if (!data.service) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.err,
                })

                return setTimeout(() => {
                    window.location = './services.html'
                }, 2000);
            }

            if (data.service) {

                $('#name').val(data.service.name);
                $('#priceP').val(data.service.price.pequeños);
                $('#priceM').val(data.service.price.medianos);
                $('#priceG').val(data.service.price.grandes);
                $('#namePerson').val(data.service.namePerson);
                $('#time').val(data.service.time);
                $('#description').val(data.service.description);
            }
        })

};


const valores = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(valores);

//Accedemos a los valores
var id = urlParams.get('id');
fetchServices(id);


$('#updateServiceForm').submit(function(e) {
    e.preventDefault();

    const name = $('#name').val();
    const priceP = $('#priceP').val();
    const priceM = $('#priceM').val();
    const priceG = $('#priceG').val();
    const namePerson = $('#namePerson').val();
    const time = $('#time').val();
    const description = $('#description').val();

    fetchUpdateService(name, priceP, priceM, priceG, namePerson, time, description);
});

const fetchUpdateService = async(name, priceP, priceM, priceG, namePerson, time, description) => {

    let fetchData = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        },
        body: JSON.stringify({
            name,
            priceP,
            priceM,
            priceG,
            namePerson,
            time,
            description
        })
    }

    await fetch('https://empresaurios.herokuapp.com/api/service/' + id, fetchData)
        .then((res) => res.json())
        .then((data) => {

            if (data.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto',
                    text: 'Se actualizo correctamente',
                })

                return setTimeout(() => {
                    window.location = './services.html'
                }, 2000);
            }

            if (data.err) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.err,
                })

                return setTimeout(() => {
                    window.location = './services.html'
                }, 2000);
            }

        })
}