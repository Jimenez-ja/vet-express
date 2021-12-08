$('#loginForm').submit(function(e) {
    e.preventDefault();

    const email = $('#email').val();
    const password = $('#password').val();

    if (email.length == 0 || password.length == 0) {
        Swal.fire({
            title: 'Error!',
            text: 'Necesitas llenar todos los campos',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }

    fetchLogin(email, password);

});


const fetchLogin = async(email, password) => {
    let fetchData = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    }

    // swal.fire({
    //     title: 'Cargando...'
    // });
    // swal.showLoading();

    await fetch('http://localhost:8080/api/auth/login', fetchData)
        .then((res) => res.json())
        .then((data) => {

            if (data.errors) {

                let err = "";
                data.errors.map(error => err = err + " " + error.msg)
                swal.close();
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err,
                })
            }

            if (data.token) {
                swal.close();

                localStorage.setItem('expressvet-token', data.token);

                window.location = "./";

            }

            if (data.err) {
                swal.close();
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "Correo/contraseña incorrecto",
                })
            }

            swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data,
            })

        })

}