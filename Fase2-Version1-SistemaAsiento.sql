CREATE DATABASE Movie_theater_reservation;

USE Movie_theater_reservation;

CREATE TABLE RegistroUsuarios(
IDUsuarios int primary key auto_increment,
NombreUsuario Varchar(30) unique not null ,
ApellidoUsuario varchar(30) unique not null,
correo VARCHAR(50) not null,
telefono VARCHAR(20) not null,
FechaRegistroUsuario datetime default current_timestamp()
);

CREATE TABLE Administradores(
IDAdministradores int primary key auto_increment,
NombreAdministrador varchar(30) unique not null,
ApellidoAdministrador varchar(30) unique not null,
password varchar(255) not null,
Correo VARCHAR(50) NOT NULL,
ID varchar(20) not null
);
CREATE TABLE DetallesAdministrador(
IDDetallesAdministrador int primary key auto_increment,
IDAdministradores int not null,
NombreAdministrador varchar(30) not null,
ApellidoAdministrador varchar(30) not null,
NumeroTelefono int not null,
Direccion varchar(35) not null,
Edad int not null,
FOREIGN KEY (IDAdministradores) references Administradores(IDAdministradores)
);
/*
CREATE TABLE SalaNormal(
IDSalaNormal int primary key auto_increment,
NombreUsuario Varchar(30) unique not null ,
ApellidoUsuario varchar(30) unique not null,
UbicacionAlfabeticaSala char(27),
UbicacionNumericaSala char(6)
);
CREATE TABLE SalaVIP(
IDSalaVIP int primary key auto_increment,
NombreUsuario Varchar(30) unique not null ,
ApellidoUsuario varchar(30) unique not null,
UbicacionAlfabeticaSala char(3),
UbicacionNumericaSala char(3)
);

CREATE TABLE TipoSala(
IDTipoSala int primary key auto_increment,
IDSalaNormal int not null,
IDSalaVIP int not null,
TipoSala varchar(15) not null,
UbicacionAlfabeticaSala char(27),
UbicacionNumericaSala char(6),
FOREIGN KEY (IDSalaNormal) references SalaNormal(IDSalaNormal),
FOREIGN KEY (IDSalaVIP) references SalaVIP(IDSalaVIP)
);
*/
CREATE TABLE Pelicula(
IDPelicula int primary key auto_increment,
NombrePelicula varchar(30) not null,
GeneroPelicula varchar(30) not null,
fechaEstreno DATE NOT NULL,
DuracionPelicula varchar(10) not null
);

CREATE TABLE saladeCine (
  IdSala int primary key auto_increment,
  NombreSala varchar(50) not null,/* nombre o numero de la sala*/
  Capacidad int not null, /*Cantidad de personas que pueden estar en la sala*/
  Ubicacion varchar(100) not null /*ubicacion de la sala*/
);
CREATE TABLE Tanda (
  IdTanda int primary key auto_increment,
  FechaInicio date not null,  /*Fecha en la que comienza la tanda*/
  FechaFin date not null, /*la fecha en la que termina la tanda.*/
  HoraInicio time not null, /*la hora de inicio de la tanda.*/
  HoraFin time not null, /*la hora de finalización de la tanda.*/
  IDPelicula int not null, /*Identificardor de la pelicula*/
  IdSala int not null, /*Identificardor de la sala donde dara la pelicula*/
  FOREIGN KEY (IDPelicula) REFERENCES Pelicula(IDPelicula),
  FOREIGN KEY (IdSala) REFERENCES saladeCine(IdSala)
);

CREATE TABLE Asientos(
IDAsientos int primary key auto_increment,
IDUsuarios int not null,
NombreUsuario Varchar(30) unique not null ,
NombreSala varchar(50) not null,
Filas char(1) not null,  /*letra que indica la fila a la que pertenece el asiento (A, B, C, etc.)*/
NumeroAsientos int not null, /*número que indica la posición del asiento dentro de la fila*/
idSala int not null,
FOREIGN KEY (idSala) REFERENCES saladeCine(idSala),
FOREIGN KEY (IDUsuarios) REFERENCES RegistroUsuarios(IDUsuarios)
);

CREATE TABLE DetalleDeReservacion(
IDDetallesReservacion int primary key auto_increment,
IDUsuarios int not null,
IdSala INT NOT NULL,
NombreUsuario Varchar(30) unique not null ,
ApellidoUsuario varchar(30) unique not null,
Pelicula varchar(25) not null,
NombreSala varchar(15) not null,
CantidadBoletos int not null,
FechaReservacion datetime default current_timestamp(),
FOREIGN KEY (IDUsuarios) references RegistroUsuarios(IDUsuarios),
FOREIGN KEY (IdSala) references saladeCine(IdSala)
);


CREATE TABLE Boletos(
idboletos int primary key auto_increment,
IDDetallesReservacion int,
NombreUsuario Varchar(30) unique not null ,
pelicula varchar(30) unique not null,
Filas char(1) not null,  
NumeroAsientos int not null,
NombreSala varchar(50) not null,
horaInicio varchar(30) not null,
FOREIGN KEY (IDDetallesReservacion) REFERENCES DetalleDeReservacion(IDDetallesReservacion)
);

CREATE TABLE GananciaPorSala(
IDGananciaSala int primary key auto_increment,
IdSala int not null,
NombreSala varchar(15) not null,
Ganancias double not null,
FechaRegistroGanancias datetime default current_timestamp(),
FOREIGN KEY (IdSala) references saladeCine(IdSala)
);

CREATE TABLE DetallesGananciaTotal(
IDdetalleGananciaTotal int primary key auto_increment,
IDGananciaSala int not null,
GananciasTotal double not null ,
FechaRegistroGananciaTotal datetime default current_timestamp(),
FOREIGN KEY (IDGananciaSala) references GananciaPorSala(IDGananciaSala)
)

SELECT * FROM RegistroUsuarios;
SELECT * FROM Administradores;
SELECT * FROM DetallesAdministrador;
SELECT * FROM SalaNormal;
SELECT * FROM SalaVIP;
SELECT * FROM TipoSala;
SELECT * FROM DetalleDeReservacion;
SELECT * FROM GananciaPorSala;
SELECT * FROM DetallesGananciaTotal;
Select * From Pelicula;
select * From saladeCine;
select * From Tanda;
select * From Asientos;
Select * from Boletos;



Insert into Administradores(NombreAdministrador,ApellidoAdministrador,password,correo,ID) values("Celeste","Rojas","root124","Celeste@gmail.com","12345");
insert into RegistroUsuarios(NombreUsuario,ApellidoUsuario,correo,telefono)values("Mario","Jose","Mario@gmaill.com","892356921");
Insert into DetallesAdministrador(IDAdministradores,NombreAdministrador,ApellidoAdministrador,NumeroTelefono,Direccion,Edad) values(1,"Celeste","Rojas",82838509,"America 1 Sector C Anden 2",20);
Insert into Pelicula(NombrePelicula,GeneroPelicula,fechaEstreno,DuracionPelicula)values("SuperMarioBros","Animacion",'2023-04-5',"1:20:06");
Insert into saladeCine(NombreSala,Capacidad,Ubicacion)values("Salon1",15,"Pasillo derecho 1");
Insert into Tanda(FechaInicio,FechaFin,HoraInicio,HoraFin,IDPelicula,IdSala)values('2023-04-5','2023-04-15','11:15:00','1:30:00',1,1);
Insert into Asientos(IDUsuarios,NombreUsuario,NombreSala,Filas,NumeroAsientos,idSala)values(1,"Mario","Salon2","A",1,2);
Insert into DetalleDeReservacion(IDUsuarios,IdSala,NombreUsuario,ApellidoUsuario,Pelicula,NombreSala,CantidadBoletos,FechaReservacion) values(1,2,"Mario","Jose","Jhon Wick","Salon2",1,'2023-04-18');
Insert into Boletos(IDDetallesReservacion,NombreUsuario,pelicula,Filas,NumeroAsientos,NombreSala,horaInicio)values(1,'Mario','Jhon Wick','A',1,'Salon2','11:15:00');






Select p.IDPelicula,t.FechaInicio,t.HoraInicio,p.NombrePelicula ,t.IdSala
From Pelicula p
inner JOIN tanda t on p.IDPelicula = t.IdTanda;

SELECT u.NombreUsuario,u.ApellidoUsuario, a.NombreSala, a.Filas, a.NumeroAsientos,a.NumeroAsientos,idSala
FROM RegistroUsuarios u
INNER JOIN Asientos a ON u.IDUsuarios = a.IDUsuarios


