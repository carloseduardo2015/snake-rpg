const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(__dirname));

const DB_RANK = path.join(__dirname, 'ranking.json');
const DB_CHAT = path.join(__dirname, 'chat.json');

const init = (f) => { if (!fs.existsSync(f)) fs.writeFileSync(f, '[]'); };
init(DB_RANK); init(DB_CHAT);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'jogo.html')));

app.post('/save-ranking', (req, res) => {
    try {
        let data = JSON.parse(fs.readFileSync(DB_RANK, 'utf8') || "[]");
        data.push(req.body);
        data.sort((a, b) => b.pontos - a.pontos);
        fs.writeFileSync(DB_RANK, JSON.stringify(data.slice(0, 10)));
        res.json({ status: 'ok' });
    } catch(e) { res.status(500).send(e); }
});

app.get('/get-ranking', (req, res) => res.json(JSON.parse(fs.readFileSync(DB_RANK, 'utf8') || "[]")));

app.post('/send-chat', (req, res) => {
    try {
        let msgs = JSON.parse(fs.readFileSync(DB_CHAT, 'utf8') || "[]");
        msgs.push({ ...req.body, time: new Date() });
        if(msgs.length > 25) msgs.shift();
        fs.writeFileSync(DB_CHAT, JSON.stringify(msgs));
        res.json({ status: 'ok' });
    } catch(e) { res.status(500).send(e); }
});

app.get('/get-chat', (req, res) => res.json(JSON.parse(fs.readFileSync(DB_CHAT, 'utf8') || "[]")));

app.listen(PORT, () => console.log(`Senior RPG Server On: ${PORT}`));