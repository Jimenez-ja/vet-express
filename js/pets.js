$('#registerPetForm').submit(function(e) {
    e.preventDefault();

    const type = $('#type').val();
    const race = $('#race').val();
    const size = $('#size').val();
    const sex = $('#sex').val();
    const age = $('#age').val();
    const name = $('#petName').val();

    if (type.length == 0 || race.length == 0 || size.length == 0 || sex.length == 0 || age.length == 0 || name.length == 0) {
        return Swal.fire({
            icon: 'error',
            title: 'Error al guardar',
            text: 'Debes de llenar todos los campos de agregar mascota',
        })
    }

    fetchRegisterPet(type, race, size, sex, age, name);

});


const fetchRegisterPet = async(type, race, size, sex, age, name) => {

    let fetchData = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        },
        body: JSON.stringify({
            type,
            race,
            size,
            sex,
            age,
            name
        })
    }

    swal.fire({
        title: 'Cargando...'
    });
    swal.showLoading();

    await fetch('http://localhost:8080/api/pet', fetchData)
        .then((res) => res.json())
        .then((data) => {

            if (data.errors) {

                let err = "";
                data.errors.map(error => err = err + " " + error.msg)
                swal.close();
                console.log(err);
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: JSON.stringify(err),
                })
            }

            if (data.pet) {
                swal.close();
                Swal.fire({
                    icon: 'success',
                    title: 'Correcto',
                    text: "Tu mascota se ha registrado correctamente",
                })

                $('#type').val("");
                $('#race').val("");
                $('#size').val("");
                $('#sex').val("");
                $('#age').val("");
                $('#petName').val("");



                return setTimeout(() => {
                    location.reload();
                }, 2000);;
            }
            swal.close();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: JSON.stringify(data.msg),
            })

        })
}


const loadPets = async() => {

    let fetchData = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "x-token": localStorage.getItem('expressvet-token')
        }
    }

    swal.fire({
        title: 'Cargando...'
    });
    swal.showLoading();

    await fetch('http://localhost:8080/api/pet/owner', fetchData)
        .then((res) => res.json())
        .then((data) => {


            if (data.pet.length != 0) {

                $('#petsNotFound').attr('style', 'display:none');

                data.pet.forEach(pet => {

                    let img;

                    if (pet.type === "gato") {
                        img = './img/defaultCat.jpg';
                    } else {
                        img = './img/defaultDog.jpg';
                    }
                    $('#fillPets').append(`
                <div class="card col-4">
                    <img class="img-thumbnail" src="${img}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${pet.name}</h5>
                        <p class="card-text">Raza: ${pet.race} <br> Edad: ${pet.age} <br> Sexo: ${pet.sex}</p>
                        <a href="./petEdit/${pet._id}" class="btn text-white" style="background-color: #3f4079;">Editar</a>
                    </div>
                </div>
                `);
                });
            }
            swal.close();
        })

}

loadPets();