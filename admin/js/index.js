const fetchCitas = async()=>{

    let fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    swal.fire({
        title: 'Cargando...'
    });
    swal.showLoading();

    await fetch('http://localhost:8080/api/payment/appointmentsMonthly', fetchData)
        .then((res) => res.json())
        .then(({total}) => {

            $("#fillAppointments").append(`Tienes ${total} citas para este mes`);

            // if (data.errors) {

            //     let err = "";
            //     data.errors.map(error => err = err + " " + error.msg)
            //     swal.close();
            //     return Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         text: err,
            //     })
            // }

            // if (data.token) {
            //     swal.close();

            //     localStorage.setItem('expressvet-token', data.token);

            //     return window.location = "./";

            // }

            // if (data.err) {
            //     swal.close();
            //     return Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         text: "Correo/contraseña incorrecto",
            //     })
            // }

            swal.close();
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error',
            //     text: data,
            // })

        })


}

fetchCitas();