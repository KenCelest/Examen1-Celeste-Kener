const modal3 = new bootstrap.Modal('#modalDetallesAdministrador');


let tblDetalleAdministrador= $('#tblDetalleAdministrador').DataTable({
    ajax:{
        url:'http://localhost:3000/DetallesAdministrador',
        dataSrc:''
    },
    columns:[
        { data:'IDDetallesAdministrador'},
        { data:'IDAdministradores'},
        { data:'NombreAdministrador'},
        { data:'ApellidoAdministrador'},
        { data:'NumeroTelefono'},
        { data:'Direccion'},
        { data:'Edad'}

    ]
});


function agregarUsuario(){
    modal.show();
}

async function registrarUsuario(){
    let IdAdministradores = document.getElementById('iDAdministradores').value;
    let NombreAdministrador = document.getElementById('NombreAdministrador').value;
    let ApellidoAdministrador = document.getElementById('ApellidoAdministrador').value;
    let NumeroTelefono = document.getElementById('NumeroTelefono').value;
    let Direccion = document.getElementById('Direccion').value;
    let edad = document.getElementById('Edad').value;

    let data = {
        IdAdministradores: IdAdministradores,
        NombreAdministrador : NombreAdministrador,
        ApellidoAdministrador : ApellidoAdministrador,
        NumeroTelefono :NumeroTelefono,
        Direccion  : Direccion ,
        edad: edad
    }

    let result = await fetch('http://localhost:3000/DetallesAdministrador', {
        method:'POST',
        headers: {
            "Content-Type": "application/json"            
        },
        body: JSON.stringify(data)
    })    

    if (result.status==201){
        tblDetalleAdministrador.ajax.reload();
        modal3.hide();
        
        alert('Usuario Creado');
    }
    else{
        alert('Error al procesar la solicitud');
    }
}