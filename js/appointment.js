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

    await fetch(`http://localhost:8080/api/payment`, fetchData)
        .then((res) => res.json())
        .then(({ payment }) => {


            if (payment) {

                $('#appointmentsNotFound').attr('style', 'display:none');
                payment.forEach(pay => {
                    $('#fillOrders').append(`
                    <tr>
                        <th scope="row">${pay._id}</th>
                        <td>${pay.date}</td>
                        <td>${pay.time}</td>
                        <td>$${pay.amount.value}MXN</td>
                        <td>${pay.status}</td>
                        <td>${pay.status_appointment}</td>
                    </tr>`);
                });
            }

            swal.close();
        })
}


fetchAppointments();