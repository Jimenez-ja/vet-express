const fetchReviews = async() => {
    let fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/review', fetchData)
        .then((res) => res.json())
        .then((data) => {
            $('#fillPayments').html('');
            $('#notPaymentFound').removeAttr('style', 'display:none');
            if (data.total > 0) {
                $('#notPaymentFound').attr('style', 'display:none');
                data.review.forEach(element => {
                    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    const date = new Date(element.date).toLocaleDateString('es-MX', options);
                    console.log(element);
                    $('#fillReviews').append(`<tr>
                                <th scope="row">${element._id}</th>
                                <th scope="row">${date}</th>
                                <th scope="row">${element.title}</th>
                                <th scope="row">${element.description}</th>
                                <th scope="row">${element.score}</th>
                                <th scope="row">${element.service.name}</th>
                                <th scope="row">${element.user.name}</th>
                            </tr> `);
                });
            }

        })

};

fetchReviews();