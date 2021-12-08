if (!localStorage.getItem('express-vet-id-appointment')) {
    window.location = './list.html';
}

if (localStorage.getItem('expressvet-token')) {
    $('#alreadyLogin').attr('style', 'display:none');
    $('#guestForm').attr('style', 'display:none');
    $('#legend').html('Tus datos son tomados de tu perfil!');

}

const id = localStorage.getItem('express-vet-id-appointment');
const type = localStorage.getItem('express-vet-price');
const date = localStorage.getItem('express-vet-date');
const time = localStorage.getItem('express-vet-time');
$('#dateAppointment').append(date);
$('#timeAppointment').append(time);


const fetchPrice = async(id, type) => {


    let fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }

    await fetch(`http://localhost:8080/api/service/${id}`, fetchData)
        .then((res) => res.json())
        .then(({ service }) => {

            $('#fillName').append(`${service.name} ${type}`);

            $('#fillName').append(`<strong class="float-right">${service.price[type]}</strong>`);
            $('#total').append(`Total <strong class="float-right">$${service.price[type]}</strong>`);

            paypal.Buttons({

                // Sets up the transaction when a payment button is clicked
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: `${service.price[type]}` // Can reference variables or functions. Example: `value: document.getElementById('...').value`
                            }
                        }]
                    });
                },

                // Finalize the transaction after payer approval
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(orderData) {
                        fetchPayment(orderData.id, date, time, id);
                    });
                }
            }).render('#paypal-button-container');


        })


}
fetchPrice(id, type);



const fetchPayment = async(orderID, date, time, idService) => {
    let fetchData = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        },
        body: JSON.stringify({
            orderID,
            date,
            time,
            id: idService
        })
    }

    await fetch('http://localhost:8080/api/payment', fetchData)
        .then((res) => res.json())
        .then((data) => {

            console.log(data);

            if (data.payment) {
                window.location = './confirm.html'
            }

            if (data.error) {

                let err = "";
                data.errors.map(error => err = err + " " + error.msg)
                swal.close();
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err,
                })
            }

        })
}


const logOut = () => {

    localStorage.removeItem('expressvet-token');
    window.location = './';

}