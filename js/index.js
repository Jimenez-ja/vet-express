const logOut = () => {

    localStorage.removeItem('expressvet-token');
    window.location = './';

}


const loadServices = async() => {
    let fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }


    await fetch('https://empresaurios.herokuapp.com/api/service', fetchData)
        .then((res) => res.json())
        .then((data) => {

            if (data.service.length != 0) {

                data.service.forEach(element => {
                    $('#fillServices').append(`
                    <li><a href="./detail-page.html?id=${element._id}">${element.name}</a></li>
                    `);
                });
            }
        })

}


loadServices();