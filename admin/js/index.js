const fetchCitas = async() => {


    swal.fire({
        title: 'Cargando...'
    });
    swal.showLoading();

    let fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/payment/appointmentsMonthly', fetchData)
        .then((res) => res.json())
        .then(({ total }) => {


            $("#fillAppointments").append(`Tienes ${total} citas para este mes`);


        })
    fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/review/reviewsMonthly', fetchData)
        .then((res) => res.json())
        .then(({ total }) => {


            $("#fillReviews").append(`Tienes ${total} calificaciones para este mes`);
        })


    fetchData = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/payment', fetchData)
        .then((res) => res.json())
        .then(({ earnings }) => {

            $("#fillEarnings").append(`$${earnings[0].total}.00 MXN `);
        })



    fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/user/all', fetchData)
        .then((res) => res.json())
        .then(({ total }) => {


            $("#fillUsers").append(`${total}`);
        })

    fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/payment/all', fetchData)
        .then((res) => res.json())
        .then(({ total }) => {


            $("#fillAllAppoinments").append(`${total}`);
        })

    fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/review', fetchData)
        .then((res) => res.json())
        .then(({ total }) => {


            $("#fillAllReviews").append(`${total}`);
        })

    swal.close();
}

fetchCitas();