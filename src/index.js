const modal = new bootstrap.Modal('#modalNuevoUsuario');


let tblUsuarios = $('#tblUsuarios').DataTable({
    ajax:{
        url:'http://localhost:3000/RegistroUsuarios',
        dataSrc:''
    },
    columns:[
        { data:'IDUsuarios'},
        { data:'NombreUsuario'},
        { data:'ApellidoUsuario'},
        { data:'correo'},
        { data:'telefono'}
    ]
});


function agregarUsuario(){
    modal.show();
}

async function registrarUsuario(){
    let NombreUsuario = document.getElementById('NombreUsuario').value;
    let ApellidoUsuario=document.getElementById('ApellidoUsuario').value;
    let correo = document.getElementById('correo').value;
    let telefono=document.getElementById('telefono').value;

    let data = {
        NombreUsuario : NombreUsuario,
        ApellidoUsuario : ApellidoUsuario,
        correo :correo,
        telefono : telefono
    }

    let result = await fetch('http://localhost:3000/RegistroUsuarios', {
        method:'POST',
        headers: {
            "Content-Type": "application/json"            
        },
        body: JSON.stringify(data)
    })    

    if (result.status==201){
        tblUsuarios.ajax.reload();
        modal.hide();
        
        alert('Usuario Creado');
    }
    else{
        alert('Error al procesar la solicitud');
    }
}