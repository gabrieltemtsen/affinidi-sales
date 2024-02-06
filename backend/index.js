var express = require('express');
var cors = require('cors');
require('dotenv').config()
const { affinidiProvider } = require('@affinidi/passport-affinidi')

const home = require('./routes/home');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/home", home);

const PORT = process.env.PORT || 3001;

const initializeServer = async () => {

    app.get('/', function (req, res, next) {
        res.json({ success: 'Affinidi-Sales Working propperly!!!' });
    });
    app.set('trust proxy', 1);
    

    await affinidiProvider(app, {
        id: "affinidi",
        issuer: process.env.AFFINIDI_ISSUER,
        client_id: process.env.AFFINIDI_CLIENT_ID,
        client_secret: process.env.AFFINIDI_CLIENT_SECRET,
        redirect_uris: ['https://affinidi-sales.vercel.app/auth/callback'], 
        handleCredential: (credential) => {
            console.log('Received credential:', credential);
        },
    });


    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });

}

initializeServer();
