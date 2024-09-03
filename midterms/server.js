const express = require('express');
const app = express();

var bodyParser = require('body-parser');
const { urlencoded } = require('express');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));
app.use(express.static('style'));
app.use('/', express.static(__dirname));

const path = require('path');
const mime = require('mime-types');
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'file-upload/uploads')); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
    }  else {
        cb(null, false);
    }
};

const upload = multer({ 
    storage: fileStorage,
    fileFilter: fileFilter 
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html');
});

app.get('/about', (req, res) => {
    res.sendFile(process.cwd() + '/about.html');
});

app.get('/blog', (req, res) => {
    res.sendFile(process.cwd() + '/blog.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(process.cwd() + '/contact.html');
});

app.get('/File-Upload', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html');
});

app.post('/uploads', upload.single('myFile'), (req, res) => {
    if (!req.file) {
        return res.sendFile(path.join(__dirname, 'file-upload/error-upload.html'));
    }
    res.sendFile(path.join(__dirname, 'File-Upload/file-uploaded.html'));
});

app.post('/process_post', urlencodedParser, function(req, res) {
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        year_level: req.body.year_level,
        course: req.body.course,
        age: req.body.age,
        birthday: req.body.birthday
    };

console.log(response);
res.json(JSON.stringify(response));
});

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});
