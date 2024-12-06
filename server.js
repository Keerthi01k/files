const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

mongoose.connect('mongodb://localhost:27017/events', { useNewUrlParser: true, useUnifiedTopology: true });

const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: String,
    image: String,
    message: String,
    event: String,
});

const Registration = mongoose.model('Registration', registrationSchema);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', upload.single('image'), async (req, res) => {
    const { name, email, date, message } = req.body;
    const event = req.query.event;

    const registration = new Registration({
        name,
        email,
        date,
        message,
        event,
        image: req.file ? req.file.filename : null,
    });

    await registration.save();
    res.status(200).send('Registration successful');
});

app.listen(5000, () => console.log('Server running on http://localhost:2919'));
