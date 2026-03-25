const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(__dirname));

const DB_RANK = path.join(__dirname, 'ranking.json');
const DB_CHAT = path.join(__dirname, 'chat.json');

// Inicializa arquivos de banco de dados se não existirem
const init = (f) => { if (!fs.existsSync(f)) fs.writeFileSync(f, '[]'); };
init(DB_RANK); init(DB_CHAT);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'jogo.html')));

// Salva pontuação e organiza o Top 5
app.post('/save-ranking', (req, res) => {
    try {
        let data = JSON.parse(fs.readFileSync(DB_RANK, 'utf8') || "[]");
        data.push(req.body);
        data.sort((a, b) => b.pontos - a.pontos);
        fs.writeFileSync(DB_RANK, JSON.stringify(data.slice(0, 10)));
        res.json({ success: true });
    } catch(e) { res.status(500).json({ error: "Erro ao salvar ranking" }); }
});

app.get('/get-ranking', (req, res) => {
    let data = JSON.parse(fs.readFileSync(DB_RANK, 'utf8') || "[]");
    res.json(data);
});

// Sistema de Chat Global
app.post('/send-chat', (req, res) => {
    try {
        let msgs = JSON.parse(fs.readFileSync(DB_CHAT, 'utf8') || "[]");
        msgs.push({ ...req.body, timestamp: new Date() });
        if(msgs.length > 30) msgs.shift(); // Mantém o chat leve
        fs.writeFileSync(DB_CHAT, JSON.stringify(msgs));
        res.json({ success: true });
    } catch(e) { res.status(500).json({ error: "Erro ao enviar mensagem" }); }
});

app.get('/get-chat', (req, res) => {
    let data = JSON.parse(fs.readFileSync(DB_CHAT, 'utf8') || "[]");
    res.json(data);
});

app.listen(PORT, () => console.log(`Servidor RPG ativo na porta ${PORT}`));