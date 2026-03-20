import { useState, useEffect, useRef } from "react";
import { MessageSquare, Shield, Disc } from "lucide-react";

const Card = ({ children, className }) => <div className={`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden ${className}`}>{children}</div>;
const Button = ({ children, onClick, className, variant }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded font-medium transition-all active:scale-95 ${variant === 'outline' ? 'border border-slate-700 hover:bg-slate-800' : 'bg-amber-600 hover:bg-amber-700'} ${className}`}>
    {children}
  </button>
);

export default function App() {
  const [players, setPlayers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [modifier, setModifier] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  const joinGame = () => {
    if (players.length < 6) {
      const name = prompt("Nome do seu personagem:") || `Herói ${players.length + 1}`;
      setPlayers([...players, { id: Date.now(), name, hp: 20, ca: 15 }]);
      setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), user: "SISTEMA", text: `**${name}** entrou na aventura!` }]);
    }
  };

  const rollDice = (sides) => {
    const roll = Math.floor(Math.random() * sides) + 1;
    const total = roll + parseInt(modifier || 0);
    setLogs((prev) => [...prev, { time: new Date().toLocaleTimeString(), user: "DADOS", text: `D${sides}: ${roll} (${modifier >= 0 ? "+" : ""}${modifier}) = **${total}**` }]);
  };

  return (
    <div className="min-h-screen p-4 grid grid-cols-1 lg:grid-cols-4 gap-4 bg-slate-950 text-white font-sans">
      <div className="space-y-4">
        <Card className="p-4">
          <h2 className="text-amber-500 font-bold flex items-center gap-2 mb-4"><Shield size={20}/> Grupo ({players.length}/6)</h2>
          <div className="space-y-2">
            {players.map(p => (
              <div key={p.id} className="p-2 bg-slate-800 rounded flex justify-between font-bold">
                <span>{p.name}</span>
                <span className="text-red-400 text-sm">HP: {p.hp}</span>
              </div>
            ))}
            <Button onClick={joinGame} className="w-full mt-2" disabled={players.length >= 6}>Entrar no Jogo</Button>
          </div>
        </Card>
        <Card className="p-4">
          <h2 className="text-amber-500 font-bold mb-4 text-center">Dados</h2>
          <div className="grid grid-cols-3 gap-2">
            {[4, 6, 8, 10, 12, 20].map(d => (
              <Button key={d} variant="outline" onClick={() => rollDice(d)}>D{d}</Button>
            ))}
          </div>
          <input type="number" placeholder="Modificador" className="w-full mt-4 bg-slate-800 border-none p-2 rounded text-white text-center" 
            onChange={(e) => setModifier(e.target.value)} value={modifier} />
        </Card>
      </div>
      <div className="lg:col-span-2 flex flex-col gap-4">
        <Card className="flex-grow flex flex-col h-[550px]">
          <div className="p-3 border-b border-slate-800 bg-slate-800/50">
            <span className="flex items-center gap-2 font-bold"><MessageSquare size={18}/> Diário de Ações (Livre)</span>
          </div>
          <div className="flex-grow p-4 overflow-y-auto" ref={scrollRef}>
            {logs.map((l, i) => (
              <div key={i} className="mb-2 text-sm border-b border-slate-800/30 pb-1">
                <span className="text-slate-500">[{l.time}] </span>
                <span className={l.user === 'DADOS' ? 'text-amber-400 font-bold' : 'text-blue-400 font-bold'}>{l.user}: </span>
                <span dangerouslySetInnerHTML={{ __html: l.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="h-full">
        <Card className="h-full min-h-[400px] flex flex-col border-indigo-500/20">
          <div className="p-3 bg-[#5865F2] flex items-center gap-2 font-bold text-white">
            <Disc size={20}/> Discord
          </div>
          <iframe src="https://discord.com/widget?id=123456789&theme=dark" width="100%" height="100%" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
        </Card>
      </div>
    </div>
  );
}