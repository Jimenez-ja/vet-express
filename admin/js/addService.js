$('#addServiceForm').submit(function(e) {
    e.preventDefault();


    const name = $('#name').val();
    const priceP = $('#priceP').val();
    const priceM = $('#priceM').val();
    const priceG = $('#priceG').val();
    const namePerson = $('#namePerson').val();
    const time = $('#time').val();
    const description = $('#description').val();

    fetchAddService(name, priceP, priceM, priceG, namePerson, time, description);

});


const fetchAddService = async(name, priceP, priceM, priceG, namePerson, time, description) => {


    price = {
        pequeños: priceP,
        medianos: priceM,
        grandes: priceG
    };
    let fetchData = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        },
        body: JSON.stringify({
            name,
            price,
            namePerson,
            time,
            description
        })
    }

    await fetch('https://empresaurios.herokuapp.com/api/service', fetchData)
        .then((res) => res.json())
        .then((data) => {

            if (data.service) {
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto',
                    text: 'Se agrego correctamente el servicio',
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