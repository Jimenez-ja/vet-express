const fetchPayments = async() => {
    let fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/payment/all', fetchData)
        .then((res) => res.json())
        .then((data) => {
            $('#fillPayments').html('');
            $('#notPaymentFound').removeAttr('style', 'display:none');
            if (data.total > 0) {
                $('#notPaymentFound').attr('style', 'display:none');
                data.payment.forEach(element => {
                    $('#fillPayments').append(`<tr>
                                <th scope="row">${element._id}</th>
                                <th scope="row">${element.user.name}</th>
                                <th scope="row">${element.status}</th>
                                <th scope="row">${element.date}</th>
                                <th scope="row">${element.time}</th>
                                <th scope="row">${element.service.name}</th>
                                <th scope="row">$${element.amount} MXN</th>
                                <th scope="row">${element.status_appointment}</th>
                                <td class="row">
                                <button type="button" onClick=(editState('${element._id}')) class="btn btn-success"><i class="fa fa-edit"></i></button>
                                </td>
                            </tr> `);
                });
            }

        })

};

fetchPayments();



const editState = async(id) => {

    const { value: status } = await Swal.fire({
        title: 'Selecciona el nuevo estado',
        input: 'select',
        inputOptions: {
            'FINALIZADA': 'FINALIZADA',
            'PENDIENTE': 'PENDIENTE'
        },
        inputPlaceholder: 'Selecciona el estado',
        showCancelButton: true
    })

    if (status) {
        fetchEditState(id, status);
    }

}

const fetchEditState = async(id, status) => {
    let fetchData = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        },
        body: JSON.stringify({
            status
        })
    }

    await fetch('https://empresaurios.herokuapp.com/api/payment/setStatus/' + id, fetchData)
        .then((res) => res.json())
        .then((data) => {

            if (data.ok) {
                fetchPayments();
                return Swal.fire(
                    'Correcto!',
                    'El servicio se ha actualizado correctamente.',
                    'success'
                )
            }

            if (data.err) {
                return Swal.fire(
                    'Error!',
                    data.err,
                    'error'
                )
            }
        })
}