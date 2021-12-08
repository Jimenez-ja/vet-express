//validamos que exista el token en el local storage para
//mostrar los botones correspondientes


if (!localStorage.getItem('expressvet-token')) {
    window.location = "./login.html";
}

const fetchValidate = async() => {
    let fetchData = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('http://localhost:8080/api/auth/validateJWT', fetchData)
        .then((res) => res.json())
        .then(({authUser}) => {


            if( authUser.rol != "ADMIN_USER") {
                localStorage.removeItem('expressvet-token');
                window.location = "./login.html";
            }

        })

}

fetchValidate();






const logOut = () => {

    localStorage.removeItem('expressvet-token');
    window.location = './';

}