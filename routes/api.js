var express = require('express');
var router = express.Router();

const sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

router.post('/', (req, res) => {
    const {Date, Item, Specifications, Price}=req.body;
    sql = "INSERT INTO quote (Date, Item, Specifications, Price) VALUES (?, ?, ?, ?)";
    db.run(sql, [Date, Item, Specifications, Price], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    res.redirect('/data.html');
})

router.get('/', function(req, res, next) {
    sql= "SELECT * FROM quote";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});
module.exports = router;