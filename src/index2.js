const modal2 = new bootstrap.Modal('#modalNuevoAdministrador');


let tblAdministrador = $('#tblAdministrador').DataTable({
    ajax:{
        url:'http://localhost:3000/Administradores',
        dataSrc:''
    },
    columns:[
        { data:'IDAdministradores'},
        { data:'NombreAdministrador'},
        { data:'ApellidoAdministrador'},
        { data:'password'},
        { data:'Correo'},
        { data:'ID'}
    ]
});


function agregarAdministrador(){
    modal2.show();
}

async function RegistroAdministrador(){
    let NombreAdministrador = document.getElementById('NombreAdministrador').value;
    let ApellidoAdministrador = document.getElementById('ApellidoAdministrador').value;
    let password = document.getElementById('password').value;
    let correo = document.getElementById('Correo').value;
    let ID = document.getElementById('ID').value;

    let data = {
        NombreAdministrador : NombreAdministrador,
        ApellidoAdministrador : ApellidoAdministrador,
        password : password,
        correo: correo,
        ID:ID
    }

    let result = await fetch('http://localhost:3000/Administradores', {
        method:'POST',
        headers: {
            "Content-Type": "application/json"            
        },
        body: JSON.stringify(data)
    })    

    if (result.status==201){
        tblAdministrador.ajax.reload();
        modal2.hide();
        
        alert('Usuario Creado');
    }
    else{
        alert('Error al procesar la solicitud');
    }
}