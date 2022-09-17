const express = require('express');
const app = express();
const bcrypt = require('bcrypt-node');
const cors = require("cors");
const knex = require('knex');
const { json } = require('express');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
          }
    }
})
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => { res.send('ta funcionando!')})

app.post('/signin',signin.handleSignin(db, bcrypt))

app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image',(req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl',(req, res) => {image.handleApiCall(req, res)})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});

