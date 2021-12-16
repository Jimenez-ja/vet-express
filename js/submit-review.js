const fillService = async(id) => {

    let fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/payment/' + id, fetchData)
        .then((res) => res.json())
        .then((data) => {

            if (data.errors) {
                return Swal.fire({
                    title: 'Error!',
                    text: JSON.stringify(data.errors),
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }

            if (data.err) {
                Swal.fire({
                    title: 'Error!',
                    text: data.err,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                setTimeout(() => {
                    return window.location = './appointment.html'
                }, 2000);
            }

            $('#head').append(`Escribe una calificacion del servicio ${data.payment.service.name} el dia ${data.payment.date}`);
        })


    fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/review/' + id, fetchData)
        .then((res) => res.json())
        .then((data) => {

            if (data.ok) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Ya calificaste esta cita',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                setTimeout(() => {
                    return window.location = './appointment.html'
                }, 2000);
            }
        })

}


const valores = window.location.search;
//Creamos la instancia
const urlParams = new URLSearchParams(valores);

//Accedemos a los valores
var id = urlParams.get('id');


$('#reviewForm').submit(function(e) {
    e.preventDefault();

    let rate = 0;
    if ($('#5_star').prop('checked')) {
        rate = 5;
    }
    if ($('#4_star').prop('checked')) {
        rate = 4;
    }
    if ($('#3_star').prop('checked')) {
        rate = 3;
    }
    if ($('#2_star').prop('checked')) {
        rate = 2;
    }
    if ($('#1_star').prop('checked')) {
        rate = 1;
    }
    if (rate == 0) {
        return Swal.fire({
            title: 'Error!',
            text: 'Necesitas llenar la calificacion',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    if (rate > 5 || rate < 0) {
        return Swal.fire({
            title: 'Error!',
            text: 'Calificacion invalida',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    const title = $('#title').val();
    const description = $('#description').val();

    if (title.length == 0 || description.length == 0) {
        return Swal.fire({
            title: 'Error!',
            text: 'Debes de llenar el titulo de la calificacion y la descripcion',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    fetchSetReview(id, rate, title, description);
});

const fetchSetReview = async(id, score, title, description) => {
    let fetchData = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        },
        body: JSON.stringify({
            payment: id,
            score,
            title,
            description
        })
    }

    await fetch('https://empresaurios.herokuapp.com/api/review', fetchData)
        .then((res) => res.json())
        .then((data) => {

            console.log(data);

            if (data.ok) {
                Swal.fire({
                    title: 'Correcto!',
                    text: 'Se envio correctamente la calificacion',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
                return setTimeout(() => {
                    window.location = './appointment.html'
                }, 2000);
            }

            if (data.errors) {
                return Swal.fire({
                    title: 'Error!',
                    text: JSON.stringify(data.errors),
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }

            if (data.err) {

                if (data.err.code === 11000) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Ya has calificado este servicio!',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                    setTimeout(() => {
                        return window.location = './appointment.html'
                    }, 2000);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: data.err,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                    setTimeout(() => {
                        return window.location = './appointment.html'
                    }, 2000);
                }

            }
        })
}


fillService(id);