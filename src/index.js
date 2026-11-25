import express from 'express'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'
import indexRoutes from './routes/index.js'
import emailService from './emailService.js'

const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))

app.set('views', join(__dirname, 'views') )
app.set('view engine', 'ejs')

// middleware
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const email = new emailService();

// routes
app.use(indexRoutes);
app.use(express.static(join(__dirname, 'public')));

// correo
app.post('/send', async( req, res ) => {
    console.log(req.body);
    try {
        await email.sendEmail( {
            email: req.body.email,
            //email: 'eramirezgz@hotmail.com',
            subject: 'Información de contacto',
            message: req.body.message
            //message: 'test2'
        });
        res.render('contact', { title: 'Contact Page', postEmail: 'Email sent successfully!'})
        //res.json({ success: true, message: 'Email sent successfully!' });
    } catch(error) {
        console.log(error);
        res.render('contact', { title: 'Contact Page', postEmail: 'Error sending email'})
        //res.json({ success: false, message: 'Error sending email' });
    }
});

app.listen(3000)
console.log('Server is listening on port ', 3000)
