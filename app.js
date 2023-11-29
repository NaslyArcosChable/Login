const express = require('express');
const app = express();


//permite capturar los datos de nuestro formulario medio urlencoded// 
app.use(express.urlencoded({extended:false}))
app.use(express.json());

//invocar o importar dotenv//
const dotenv = require('dotenv');
dotenv.config({path: './env/.env'});

//Directorio public
app.use('/', express.static('public'));
app.use('/', express.static(__dirname + '/public'));

//Establecer motor de plantilla 
app.set('view engine', 'ejs');

//Invocar el bcryptjs
const bcryptjs = require('bcryptjs');

//variable de sesion
const session = require('express-session');
app.use(session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true 
}))

//invocar el modulo de conexion de nuestra bd
 const connection = require ('./database/db')



/*app.get('/', (req, res)=>{
    res.send('Hello World');
})*/

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/login', (req, res)=>{
    res.render('login');
})

app.get('/register', (req, res)=>{
    res.render('register');
})

//register
app.post('/register', async(req, res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);
    connection.query ('INSERT INTO users SET ?' , {
        user:user, name:name, rol:rol, pass:passwordHash
    }, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.send('registro exitoso');
        }
    })
})


app.listen(3000, (req, res)=>{
    console.log('Server running on https://localhost:3000/');
    
})