const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(express.json());
app.use(express.urlencoded({ limit: '5mb', extended: true }));

const cors = require('cors');
app.use(cors());

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tennis.db');

app.listen(8080, () => {
    console.log('Server running on port 8080');
});

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images/players');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Add a new favorite or edit an existing favorite
app.post('/api/favorites/add', upload.single('image'), (req, res, next) => {
    let fav = req.body;
    let imageName = '';
    if (fav.image === '') {
        imageName = 'defaultplayer.jpg';
    } else {
        imageName = fav.image;
    }
    if (req.file) {
        imageName = req.file.originalname;
    }
    if (fav.id) {
        db.run("UPDATE 'favorite' SET first_name = ?, last_name = ?, age = ?, height = ?, image = ?, country = ? WHERE id = ?",
            [fav.first_name, fav.last_name, fav.age, fav.height, imageName, fav.country, fav.id], (error, result) => {
            if (error) throw error;
            return res.status(200).json({ count: 1 });
        });
    } else {
        db.run("INSERT INTO 'favorite' ('first_name', 'last_name', 'age', 'height', 'image', 'country') VALUES (?,?,?,?,?,?)",
            [fav.first_name, fav.last_name, fav.age, fav.height, imageName, fav.country], (error, result) => {
            if (error) throw error;
            return res.status(200).json({ count: 1 });
        });
    }
}); 

// Get image for a player
app.get('/download/players/:name', (req, res, next) => {
    var file = './images/players/' + req.params.name;
    res.download(file);
});
// Get image for tournament
app.get('/download/tournaments/:name', (req, res, next) => {
    var file = './images/tournaments/' + req.params.name;
    res.download(file);
});

// Delete a favorite
app.get('/api/favorites/delete/:id', (req, res, next) => {
    let id = req.params.id;
    db.run("DELETE FROM 'favorite' WHERE id = ?", [id], (error, result) => {
        if (error) throw error;
        return res.status(200).json({ count: this.changes });
    });
});


// Get all favorites
app.get('/api/favorites', (req, res, next) => {
    db.all('SELECT * FROM favorite', (error, result) => {
        if (error) throw error;
        return res.status(200).json(result);
    })
});

// Get all tournaments
app.get('/api/tournaments', (req, res, next) => {
    db.all('SELECT * FROM tournament', (error, result) => {
        if (error) throw error;
        return res.status(200).json(result);
    })
});