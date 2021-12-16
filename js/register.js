$('#registerForm').submit((e) => {
    e.preventDefault();

    const name = $('#name').val();
    const email = $('#email').val();
    const password1 = $('#password1').val();
    const password2 = $('#password2').val();

    if (name.length == 0 || email.length == 0 || password1.length == 0 || password2.length == 0) {
        return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debes de llenar todos los campos para continuar',
        })
    }

    if (password1 != password2) {
        return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden',
        })
    }

    if (!$('#check_2').prop('checked')) {
        return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Debes de aceptar los terminos y condiciones',
        })
    }

    fetchRegister(name, email, password1);

});



const fetchRegister = async(name, email, password) => {

    let fetchData = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    }

    swal.fire({
        title: 'Cargando...'
    });
    swal.showLoading();

    await fetch('https://empresaurios.herokuapp.com/api/user', fetchData)
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

            if (data.err.code == 11000) {
                swal.close();
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El correo ya esta registrado',
                })
            }

            if (data.err == "ok") {
                swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto',
                    text: "Se ha completado el registro, checa tu email para confimar tu correo",
                })

                return setTimeout(() => {
                    window.location = "./login.html";
                }, 3000);

            }
            swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data,
            })

        })
}