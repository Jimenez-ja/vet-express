//validamos que exista el token en el local storage para
//mostrar los botones correspondientes

const fetchValidate = async() => {
    let fetchData = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/auth/validateJWT', fetchData)
        .then((res) => res.json())
        .then((data) => {


            if (!data.authUser) {
                localStorage.removeItem('expressvet-token');
                window.location = "./";
            }


        })

}

fetchValidate();






const logOut = () => {

    localStorage.removeItem('expressvet-token');
    window.location = './';

}