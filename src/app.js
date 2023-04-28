import  express  from "express";
import { createPool } from 'mysql2/promise';


const app = express();

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