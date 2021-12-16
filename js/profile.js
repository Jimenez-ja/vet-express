const fetchUser = async() => {
    let fetchData = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    await fetch('https://empresaurios.herokuapp.com/api/auth/validateJWT', fetchData)
        .then((res) => res.json())
        .then(({ authUser }) => {

            if (authUser) {
                $('#name').val(authUser.name);
                $('#tel').val(authUser.tel);
                $('#email').val(authUser.email);
            }

        })
}

fetchUser();



$('#profileForm').submit(function(e) {
    e.preventDefault();

    const name = $('#name').val();
    const tel = $('#tel').val();

    if (name.length == 0 || tel.length == 0) {
        return Swal.fire({
            title: 'Error!',
            text: 'Llena todos los campos para continuar',
            icon: 'error',
            confirmButtonText: 'ok'
        })
    }


    fetchUpdateUser(name, tel);
});


const fetchUpdateUser = async(name, tel) => {
    let fetchData = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        },
        body: JSON.stringify({
            name,
            tel
        })
    }

    await fetch('https://empresaurios.herokuapp.com/api/user', fetchData)
        .then((res) => res.json())
        .then((data) => {

            if (data.user) {
                return Swal.fire({
                    title: 'Correcto!',
                    text: 'Se ha actualizado correctamente',
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
            } else {
                return Swal.fire({
                    title: 'Error!',
                    text: JSON.stringify(data),
                    icon: 'error',
                    confirmButtonText: 'ok'
                })
            }

        })
}