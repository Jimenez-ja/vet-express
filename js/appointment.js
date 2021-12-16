const fetchAppointments = async() => {

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

    await fetch(`https://empresaurios.herokuapp.com/api/payment`, fetchData)
        .then((res) => res.json())
        .then(({ payment }) => {


            if (payment) {

                $('#appointmentsNotFound').attr('style', 'display:none');
                payment.forEach(pay => {

                    if (pay.status_appointment == "FINALIZADA") {
                        return $('#fillOrders').append(`
                        <tr>
                            <th scope="row">${pay._id}</th>
                            <td>${pay.date}</td>
                            <td>${pay.time}</td>
                            <td>$${pay.amount}MXN</td>
                            <td>${pay.status}</td>
                            <td>${pay.status_appointment}</td>
                            <td> <button onClick=setReview('${pay._id}') type="button" class="btn btn-outline-info">Calificar</button></td>
                        </tr>`);
                    }

                    $('#fillOrders').append(`
                    <tr>
                        <th scope="row">${pay._id}</th>
                        <td>${pay.date}</td>
                        <td>${pay.time}</td>
                        <td>$${pay.amount}MXN</td>
                        <td>${pay.status}</td>
                        <td>${pay.status_appointment}</td>
                        <td>Aun no ha finalizado al cita</td>
                    </tr>`);
                });
            }

            swal.close();
        })
}


fetchAppointments();



const setReview = (id) => {

    window.location = `submit-review.html?id=${id}`;

}