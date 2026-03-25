const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Rota para o jogo
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'jogo.html'));
});

// Sistema de Ranking
app.post('/save-ranking', (req, res) => {
    const novoPlacar = req.body;
    let dados = JSON.parse(fs.readFileSync('ranking.json', 'utf8') || "[]");
    dados.push(novoPlacar);
    dados.sort((a, b) => b.pontos - a.pontos);
    fs.writeFileSync('ranking.json', JSON.stringify(dados.slice(0, 10), null, 2));
    res.json({ success: true });
});

app.get('/get-ranking', (req, res) => {
    const dados = fs.readFileSync('ranking.json', 'utf8');
    res.send(dados);
});

// Sistema de Chat
app.post('/send-chat', (req, res) => {
    let msgs = JSON.parse(fs.readFileSync('chat.json', 'utf8') || "[]");
    msgs.push(req.body);
    if (msgs.length > 20) msgs.shift();
    fs.writeFileSync('chat.json', JSON.stringify(msgs, null, 2));
    res.json({ success: true });
});

app.get('/get-chat', (req, res) => {
    const dados = fs.readFileSync('chat.json', 'utf8');
    res.send(dados);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});