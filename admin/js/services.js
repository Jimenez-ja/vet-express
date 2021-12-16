const fetchServices = async() => {
    let fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/service', fetchData)
        .then((res) => res.json())
        .then((data) => {
            $('#fillServices').html('');
            $('#notServiceFound').removeAttr('style', 'display:none');
            if (data.total > 0) {
                $('#notServiceFound').attr('style', 'display:none');
                data.service.forEach(element => {
                    $('#fillServices').append(`<tr>
                        <th scope="row">${element._id}</th>
                        <td>${element.name}</td>
                        <td>
                        Pequeño:$${element.price.pequeños}
                        Mediano:$${element.price.medianos}
                        Grande: $${element.price.grandes}
                        </td>
                        <td>${element.description}</td>
                        <td>${element.namePerson}</td>
                        <td class="row">
                        <button type="button" onClick=(deleteService('${element._id}')) class="btn btn-danger m-1"><i class="fa fa-trash"></i></button>
                        <button type="button" onClick=(editService('${element._id}')) class="btn btn-success m-1"><i class="fa fa-edit"></i></button>
                        </td>
                    </tr> `);

                });
            }

        })

};

fetchServices();

const deleteService = async(id) => {

    Swal.fire({
        title: 'Eliminar servicio',
        text: "Estas seguro de eliminar el servicio?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {

            let fetchData = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "x-token": localStorage.getItem('expressvet-token')
                },
                body: JSON.stringify({
                    id
                })
            }

            fetch('https://empresaurios.herokuapp.com/api/service', fetchData)
                .then((res) => res.json())
                .then((data) => {
                    Swal.fire(
                        'Eliminado!',
                        'El servicio ha sido elminiado.',
                        'success'
                    )
                    fetchServices()
                })
        }
    })
}

const editService = async(id) => {

    window.location = './editService.html?id=' + id
}

$('#addService').click(function(e) {
    e.preventDefault();
    window.location = './addService.html'
});