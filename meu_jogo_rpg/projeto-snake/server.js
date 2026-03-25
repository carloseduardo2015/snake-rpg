const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'jogo.html'));
});

app.post('/save-ranking', (req, res) => {
    let dados = JSON.parse(fs.readFileSync('ranking.json', 'utf8') || "[]");
    dados.push(req.body); 
    dados.sort((a, b) => b.pontos - a.pontos);
    fs.writeFileSync('ranking.json', JSON.stringify(dados.slice(0, 10), null, 2));
    res.json({ success: true });
});

app.get('/get-ranking', (req, res) => {
    res.send(fs.readFileSync('ranking.json', 'utf8') || "[]");
});

app.post('/send-chat', (req, res) => {
    let msgs = JSON.parse(fs.readFileSync('chat.json', 'utf8') || "[]");
    msgs.push(req.body);
    if (msgs.length > 30) msgs.shift();
    fs.writeFileSync('chat.json', JSON.stringify(msgs, null, 2));
    res.json({ success: true });
});

app.get('/get-chat', (req, res) => {
    res.send(fs.readFileSync('chat.json', 'utf8') || "[]");
});

app.listen(PORT, () => {
    console.log(`Servidor Snake Ultra Online!`);
});