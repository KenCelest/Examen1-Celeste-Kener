import  express, { json, response }  from "express";
import { createPool } from 'mysql2/promise';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

//Configuracion de la base de datos
const DB_HOST = "localhost";
const DB_PORT = "3305";
const DB_USER = "root";
const DB_PASSWORD = "kener*";
const DB_DATABASE = "Movie_theater_reservation";

const pool = createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

//----------- REGISTROS DE USUARIOS-----------------

//------------Consulta Usuario-----------------------
app.get('/RegistroUsuarios',async(req,res)=>{ //Metodo GET para obtener o llamar datos.
    try{
        const [rows] = await pool.query("SELECT * FROM RegistroUsuarios");
        res.json(rows);
    
    } catch(error){
        console.error("Error",error);
        
        return res.status(500).json({Message:"Error al procesar la solicitud"});
    }
    
});


//------------Agregar Usuarios-----------------------
app.post("/RegistroUsuarios",async(req,res)=>{
    try {
        const {NombreUsuario,ApellidoUsuario,correo,telefono} = req.body;
        const [rows] = await pool.query("insert into RegistroUsuarios(NombreUsuario,ApellidoUsuario,correo,telefono)values(?,?,?,?)",
        [NombreUsuario,ApellidoUsuario,correo,telefono]
        );
        res.status(201).json({MESSAGE:"El usuario fue registrado"});
    } catch (error) {
        console.error("Error",error);
            return res.status(500).json({Message:"Error al procesar"})
    }
});

app.get('/RegistroUsuarios/:IDUsuarios',async (req,res)=>{ //Metodo para un solo usuario - consulta
    try {
    const {IDUsuarios} =req.params;
    const [rows] = await pool.query("Select IDUsuarios,NombreUsuario,ApellidoUsuario,correo,telefono from RegistroUsuarios Where IDUsuarios = ?",[IDUsuarios])
    if(rows.length > 0)
    {
        res.json(rows);
    }
    else{
        res.status(404).json({MESSAGE:"No hay informacion"})
    }
    } catch (error) {
        console.error("Error",error);
        return res.status(500).json({Message:"Error al procesar la solicitud"});
    }
})


app.put('/RegistroUsuarios/:IDUsuarios',async (req,res)=>{
    try {
        const {IDUsuarios} = req.params;
        const {NuevoNombre,NuevoApellido,correo,telefono} = req.body;
        const [result] = await pool.query("UPDATE RegistroUsuarios set NombreUsuario = IFNULL(?,NombreUsuario), ApellidoUsuario = IFNULL(?,ApellidoUsuario), correo = IFNULL(?,correo), telefono = IFNULL(?,telefono)  WHERE IDUsuarios = ?",
        [NuevoNombre,NuevoApellido,correo,telefono,IDUsuarios])

        if (result.affectedRows === 0)
        {
            res.status(404).json({MESSAGE:"Usuario no encontrado"});
        }
        else
        res.json({Message:"Datos guardados"});
   
    } catch (error) {
        console.error("ERROR",error);
        return res.status(500).json({MESSAGE:"Error al procesar la solicitud"})
    }
})


app.delete('/RegistroUsuarios/:IDUsuarios',async (req,res)=>{
    try {
        const {IDUsuarios} = req.params;
        const [rows] = await pool.query("DELETE FROM RegistroUsuarios WHERE IDUsuarios = ?",
        [IDUsuarios]); 

        if(rows.affectedRows <=0)
        {
            return res.status(404).json({MESSAGE:"Usuario  no encontrado"})
        }else
        res.status(204).json({MESSAGE:"Usuario Eliminado"});

    } catch (error) {
        console.error("ERROR",error);
        return res.status(500).json({MESSAGE:"Error al procesar la solicitud"})
    
    }
});



//-------------------------------------------------------------------------------


//----------------------RegistroAdministrador-----------------------------------


//------------Consulta Administrador-----------------------
app.get('/Administradores',async(req,res)=>{ //Metodo GET para obtener o llamar datos.
    try{
        const [rows] = await pool.query("SELECT * FROM Administradores");
        res.json(rows);
    
    } catch(error){
        console.error("Error",error);
        
        return res.status(500).json({Message:"Error al procesar la solicitud"});
    }
    
});

//------------Agregar Administradores-----------------------
app.post("/Administradores",async(req,res)=>{
    try {
        const {NombreAdministrador,ApellidoAdministrador,password,correo,ID} = req.body;
        const [rows] = await pool.query("Insert into Administradores(NombreAdministrador,ApellidoAdministrador,password,correo,ID) values(?,?,?,?,?)",
        [NombreAdministrador,ApellidoAdministrador,password,correo,ID]
        );
        res.status(201).json({MESSAGE:"El Administrador fue registrado"});
        
    } catch (error) {
        console.error("Error",error);
            return res.status(500).json({Message:"Error al procesar"})
    }
});

app.get('/Administradores/:IDAdministradores',async (req,res)=>{ 
    try {
    const {IDAdministradores} =req.params;
    const [rows] = await pool.query("Select IDAdministradores,NombreAdministrador,ApellidoAdministrador,password,correo,ID from Administradores Where IDAdministradores = ?",[IDAdministradores])
    if(rows.length > 0)
    {
        res.json(rows);
    }
    else{
        res.status(404).json({MESSAGE:"No hay informacion"})
    }
    } catch (error) {
        console.error("Error",error);
        return res.status(500).json({Message:"Error al procesar la solicitud"});
    }
})


app.put('/Administradores/:IDAdministradores',async (req,res)=>{
    try {
        const {IDAdministradores} = req.params;
        const {NuevoNombre,NuevoApellido,password,correo,ID } = req.body;
        const [result] = await pool.query("UPDATE Administradores set NombreAdministrador = IFNULL(?,NombreAdministrador), ApellidoAdministrador = IFNULL(?,ApellidoAdministrador),password= IFNULL(?,password), correo = IFNULL(?,correo), ID = IFNULL(?,ID)  WHERE IDAdministradores = ?",
        [NuevoNombre,NuevoApellido,password,correo,ID,IDAdministradores])

        if (result.affectedRows === 0)
        {
            res.status(404).json({MESSAGE:"Administrador no encontrado"});
        }
        else
        res.json({Message:"Datos guardados"});
   
    } catch (error) {
        console.error("ERROR",error);
        return res.status(500).json({MESSAGE:"Error al procesar la solicitud"})
    }
})


app.delete("/Administradores/:IDAdministradores",async(req,res)=>{
    try {
        const {IDAdministradores} = req.params;
        const [rows] = await pool.query("DELETE FROM Administradores WHERE IDAdministradores = ?",
        [IDAdministradores]); 

        if(rows.affectedRows <=0)
        {
            return res.status(404).json({MESSAGE:"Administrador  no encontrado"})
        }else
        res.status(204).json({MESSAGE:"Administrador Eliminado"});

    } catch (error) {
        console.error("ERROR",error);
        return res.status(500).json({MESSAGE:"Error al procesar la solicitud"})
    
    }
})



//-------------------------------------------------------------------------------


//----------------------DetallesdeAdministrador-----------------------------------


//------------Consulta DetallesAdministrador-----------------------
app.get('/DetallesAdministrador',async(req,res)=>{ //Metodo GET para obtener o llamar datos.
    try{
        const [rows] = await pool.query("SELECT * FROM DetallesAdministrador");
        res.json(rows);
    
    } catch(error){
        console.error("Error",error);
        
        return res.status(500).json({Message:"Error al procesar la solicitud"});
    }
    
});

//------------Agregar DetallesAdministrador-----------------------
app.post("/DetallesAdministrador",async(req,res)=>{
    try {
        const {IDAdministradores,NombreAdministrador,ApellidoAdministrador,NumeroTelefono,Direccion,Edad} = req.body;
        const [rows] = await pool.query("Insert into DetallesAdministrador(IDAdministradores,NombreAdministrador,ApellidoAdministrador,NumeroTelefono,Direccion,Edad) values(?,?,?,?,?,?)",
        [IDAdministradores,NombreAdministrador,ApellidoAdministrador,NumeroTelefono,Direccion,Edad]
        );
        res.status(201).json({MESSAGE:"Los datos del administrador fue registrado"});
    } catch (error) {
        console.error("Error",error);
            return res.status(500).json({Message:"Error al procesar"})
    }
});


app.get('/DetallesAdministrador/:IDDetallesAdministrador',async(req,res)=>{ 
    try{
        const {IDDetallesAdministrador} = req.params;
        const [rows] = await pool.query("SELECT IDDetallesAdministrador,IDAdministradores,NombreAdministrador,ApellidoAdministrador,NumeroTelefono,Direccion,Edad from DetallesAdministrador where IDDetallesAdministrador = ?",[IDDetallesAdministrador])
        if(rows.length > 0)
        {
            res.json(rows);
        }
        else{
            res.status(404).json({MESSAGE:"No hay informacion"})
        }
    
    } catch(error){
        console.error("Error",error);
        
        return res.status(500).json({Message:"Error al procesar la solicitud"});
    }
    
});

app.put('/DetallesAdministrador/:IDDetallesAdministrador',async(req,res)=>{
    try {
        const {IDDetallesAdministrador} = req.params;
        const {NuevoNombre,NuevoApellido,NumeroTelefono,Direccion,Edad} = req.body;
        const [rows] = await pool.query("UPDATE DetallesAdministrador set NombreAdministrador = IFNULL(?,NombreAdministrador), ApellidoAdministrador = IFNULL(?,ApellidoAdministrador), NumeroTelefono = IFNULL(?,NumeroTelefono), Direccion = IFNULL(?,Direccion), Edad = IFNULL(?,Edad)  WHERE IDDetallesAdministrador = ?",
        [NuevoNombre,NuevoApellido,NumeroTelefono,Direccion,Edad,IDDetallesAdministrador]);

        if(rows.affectedRows === 0)
        {
            res.status(404).json({MESSAGE:"Administrador no encontrado"});
        }
        else
            res.json({MESSAGE:"Datos Guardados"});
     

    } catch (error) {
        console.error("Error",error);
        return res.status(500).json({MESSAGE:"Error la procesar la solicitud"});
    }
})


app.delete('/DetallesAdministrador/:IDDetallesAdministrador',async(req,res)=>{
    try {
        const {IDDetallesAdministrador} =req.params;
        const [rows] = await pool.query("DELETE FROM DetallesAdministrador WHERE IDDetallesAdministrador = ?",
        [IDDetallesAdministrador]);

        if(rows.affectedRows <= 0)
        {
            res.status(404).json({MESSAGE:"Administrador no encontrado"});
        }else
            res.status(204).json({MESSAGE:"Administrador Eliminado"});        

    } catch (error) {
        console.error("Error",error);
        return res.status(500).json({MESSAGE:"Error al procesar la solicitud"});
    }
})





//-------------------------------------------------------------------------------


//----------------------Peliculas-----------------------------------


//------------Consulta Pelicula-----------------------
app.get('/Pelicula',async(req,res)=>{ //Metodo GET para obtener o llamar datos.
    try{
        const [rows] = await pool.query("SELECT * FROM Pelicula");
        res.json(rows);
    
    } catch(error){
        console.error("Error",error);
        
        return res.status(500).json({Message:"Error al procesar la solicitud"});
    }
    
});

//------------Agregar Pelicula-----------------------
app.post("/Pelicula",async(req,res)=>{
    try {
        const {NombrePelicula,GeneroPelicula,fechaEstreno,DuracionPelicula} = req.body;
        const [rows] = await pool.query("Insert into Pelicula(NombrePelicula,GeneroPelicula,fechaEstreno,DuracionPelicula) values(?,?,?,?)",
        [NombrePelicula,GeneroPelicula,fechaEstreno,DuracionPelicula]
        );
        res.status(201).json({MESSAGE:"La pelicula fue registrado"});
    } catch (error) {
        console.error("Error",error);
            return res.status(500).json({Message:"Error al procesar"})
    }
});

app.get('/Pelicula/:IDPelicula',async(req,res)=>{
    try {
        const {IDPelicula} = req.params;
        const [rows] = await pool.query("Select IDPelicula ,NombrePelicula,GeneroPelicula,fechaEstreno,DuracionPelicula from Pelicula where IDPelicula = ?",[IDPelicula]);
        if(rows.length > 0){
            res.json(rows);
        }else
        res.status(404).json({MESSAGE:"no hay informacion"});

    } catch (error) {
        console.error("Error",error);
        return res.status(500).json({Message:"Error al procesar la Solicitud"});
    }
});

app.put('/Pelicula/:IDPelicula',async(req,res)=>{
     try {
        const {IDPelicula} = req.params;
        const {NuevoNombre,NuevoGenero,fechaEstreno,DuracionPelicula} = req.body;
        const [rows] = await pool.query("UPDATE Pelicula set NombrePelicula = IFNULL(?,NombrePelicula), GeneroPelicula = IFNULL(?,GeneroPelicula), FechaEstreno = IFNULL(?,FechaEstreno), DuracionPelicula = IFNULL(?,DuracionPelicula) WHERE IDPelicula = ?",
        [NuevoNombre,NuevoGenero,fechaEstreno,DuracionPelicula,IDPelicula]);
        if(rows.affectedRows === 0 ){
            res.status(404).json({MESSAGE:"Pelicula no encontrada"});
        }
        else{
            res.json({MESSAGE:"Datos guardados"});
        }
    } catch (error) {
        console.error("Error",error);
        return res.status(500).json({MESSAGE:"Error al procesar la solicitud"})
     }
})



app.delete('/Pelicula/:IDPelicula',async(req,res)=>{
    try {
        const {IDPelicula} =req.params;
        const [rows] = await pool.query("DELETE FROM Pelicula WHERE IDPelicula = ?",[IDPelicula]);
        
        if(rows.affectedRows <= 0)
        {
            res.status(404).json({MESSAGE:"Pelicula no encontrada"});
        }else{
            res.status(204).json({MESSAGE:"Pelicula eliminada"})
        }

    } catch (error) {
        console.error("Error",error);
        return res.status(500).json({MESSAGE:"Error al procesar la solicitud"});
    }
})








//-------------------------------------------------------------------------------


//----------------------Sala de cine-----------------------------------



//------------Consulta Sala Cine-----------------------
app.get('/saladeCine',async(req,res)=>{ //Metodo GET para obtener o llamar datos.
    try{
        const [rows] = await pool.query("SELECT * FROM saladeCine");
        res.json(rows);
    
    } catch(error){
        console.error("Error",error);
        
        return res.status(500).json({Message:"Error al procesar la solicitud"});
    }
    
});

//------------Agregar Sala Cine-----------------------
app.post("/saladeCine",async(req,res)=>{
    try {
        const {NombreSala,Capacidad,Ubicacion} = req.body;
        const [rows] = await pool.query("Insert into saladeCine(NombreSala,Capacidad,Ubicacion) values(?,?,?)",
        [NombreSala,Capacidad,Ubicacion]
        );
        res.status(201).json({MESSAGE:"La Sala fue registrada"});
    } catch (error) {
        console.error("Error",error);
            return res.status(500).json({Message:"Error al procesar"})
    }
});






//------------Consulta Tanda-----------------------
app.get('/Tanda',async(req,res)=>{ //Metodo GET para obtener o llamar datos.
    try{
        const [rows] = await pool.query("SELECT * FROM Tanda");
        res.json(rows);
    
    } catch(error){
        console.error("Error",error);
        
        return res.status(500).json({Message:"Error al procesar la solicitud"});
    }
    
});

//------------Agregar tanda-----------------------
app.post("/Tanda",async(req,res)=>{
    try {
        const {FechaInicio,FechaFin,HoraInicio,HoraFin,IDPelicula,IdSala} = req.body;
        const [rows] = await pool.query("Insert into Tanda(FechaInicio,FechaFin,HoraInicio,HoraFin,IDPelicula,IdSala) values(?,?,?,?,?,?)",
        [FechaInicio,FechaFin,HoraInicio,HoraFin,IDPelicula,IdSala]
        );
        res.status(201).json({MESSAGE:"La Tanda fue registrada"});
    } catch (error) {
        console.error("Error",error);
            return res.status(500).json({Message:"Error al procesar"})
    }
});






//------------Consulta Asientos-----------------------
app.get('/Asientos',async(req,res)=>{ //Metodo GET para obtener o llamar datos.
    try{
        const [rows] = await pool.query("SELECT * FROM Asientos");
        res.json(rows);
    
    } catch(error){
        console.error("Error",error);
        
        return res.status(500).json({Message:"Error al procesar la solicitud"});
    }
    
});

//------------Agregar Asientos-----------------------
app.post("/Asientos",async(req,res)=>{
    try {
        const {IDUsuarios,NombreUsuario,NombreSala,Filas,NumeroAsientos,idSala} = req.body;
        const [rows] = await pool.query("Insert into Asientos(IDUsuarios,NombreUsuario,NombreSala,Filas,NumeroAsientos,idSala) values(?,?,?,?,?,?)",
        [IDUsuarios,NombreUsuario,NombreSala,Filas,NumeroAsientos,idSala]
        );
        res.status(201).json({MESSAGE:"Se ha hecho un registro de asientos"});
    } catch (error) {
        console.error("Error",error);
            return res.status(500).json({Message:"Error al procesar"})
    }
});






//------------Consulta DetalleDeReservacion-----------------------
app.get('/DetalleDeReservacion',async(req,res)=>{ //Metodo GET para obtener o llamar datos.
    try{
        const [rows] = await pool.query("SELECT * FROM DetalleDeReservacion");
        res.json(rows);
    
    } catch(error){
        console.error("Error",error);
        
        return res.status(500).json({Message:"Error al procesar la solicitud"});
    }
    
});

//------------Agregar DetalleDeReservacion-----------------------
app.post("/DetalleDeReservacion",async(req,res)=>{
    try {
        const {IDUsuarios,IdSala,NombreUsuario,ApellidoUsuario,Pelicula,NombreSala,CantidadBoletos,FechaReservacion} = req.body;
        const [rows] = await pool.query("Insert into DetalleDeReservacion(IDUsuarios,IdSala,NombreUsuario,ApellidoUsuario,Pelicula,NombreSala,CantidadBoletos,FechaReservacion) values(?,?,?,?,?,?,?,?)",
        [IDUsuarios,IdSala,NombreUsuario,ApellidoUsuario,Pelicula,NombreSala,CantidadBoletos,FechaReservacion]
        );
        res.status(201).json({MESSAGE:"Se han registrado los detalles"});
    } catch (error) {
        console.error("Error",error);
            return res.status(500).json({Message:"Error al procesar"})
    }
});




//------------Consulta Boletos-----------------------
app.get('/Boletos',async(req,res)=>{ //Metodo GET para obtener o llamar datos.
    try{
        const [rows] = await pool.query("SELECT * FROM Boletos");
        res.json(rows);
    
    } catch(error){
        console.error("Error",error);
        
        return res.status(500).json({Message:"Error al procesar la solicitud"});
    }
    
});

//------------Agregar Boletos-----------------------
app.post("/Boletos",async(req,res)=>{
    try {
        const {IDDetallesReservacion,NombreUsuario,pelicula,Filas,NumeroAsientos,NombreSala,horaInicio} = req.body;
        const [rows] = await pool.query("Insert into Boletos(IDDetallesReservacion,NombreUsuario,pelicula,Filas,NumeroAsientos,NombreSala,horaInicio) values(?,?,?,?,?,?,?)",
        [IDDetallesReservacion,NombreUsuario,pelicula,Filas,NumeroAsientos,NombreSala,horaInicio]
        );
        res.status(201).json({MESSAGE:"Se han registrado los detalles"});
    } catch (error) {
        console.error("Error",error);
            return res.status(500).json({Message:"Error al procesar"})
    }
});


app.listen(PORT,()=>{
    console.log("Aplicacion Corriendo en el puerto :", PORT);
});