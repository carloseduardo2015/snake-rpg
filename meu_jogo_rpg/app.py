from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Dados iniciais do jogo
jogo = {
    "p_hp": 100,
    "e_hp": 50,
    "log": "Um inimigo apareceu! O que você vai fazer?"
}

@app.route('/')
def index():
    return render_template('index.html', jogo=jogo)

@app.route('/acao', methods=['POST'])
def acao():
    escolha = request.json.get('escolha')
    
    if escolha == 'atacar':
        dano_p = random.randint(10, 20)
        dano_e = random.randint(8, 15)
        
        jogo["e_hp"] -= dano_p
        log = f"Você causou {dano_p} de dano!"
        
        if jogo["e_hp"] > 0:
            jogo["p_hp"] -= dano_e
            log += f" O inimigo revidou com {dano_e} de dano."
        else:
            jogo["e_hp"] = 0
            log = "🏆 Você venceu! Atualize a página para jogar de novo."
            
        if jogo["p_hp"] <= 0:
            jogo["p_hp"] = 0
            log = "💀 Você morreu! Atualize a página para tentar de novo."
            
        jogo["log"] = log
        
    return jsonify(jogo)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)