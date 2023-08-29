import express from 'express'; 
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'piwo',
});

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.json('Hello World');
}); 

app.get('/piwo', (req, res) => {
    const q = 'select * from piwska';
    db.query(q, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/piwo', (req, res) => {
    const q = 'insert into piwska (`piwoTitle`, `piwoDesc`, `piwoGrade`, `piwoThumb`) values (?)';
    const values = [
        req.body.piwoTitle,
        req.body.piwoDesc,
        req.body.piwoGrade,
        req.body.piwoThumb,
    ];
    db.query(q, [values], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.delete('/piwo/:id', (req, res) => {
    const id = req.params.id;
    const q = 'delete from piwska where piwoId = ?';
    db.query(q, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.put('/piwo/:id', (req, res) => {
    const id = req.params.id;
    const q = 'update piwska set piwoTitle = ?, piwoDesc = ?, piwoGrade = ?, piwoThumb = ? where piwoId = ?';
    const values = [
        req.body.piwoTitle,
        req.body.piwoDesc,
        req.body.piwoGrade,
        req.body.piwoThumb,
    ];
    db.query(q, [...values, id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(8080, () => {
    console.log('Server started');
})

    
