import { useState } from "react";

export default function Home() {
  const [percent, setPercent] = useState(68); // porcentaje simulado
  const [autoMode, setAutoMode] = useState(false);

  const waterColor = percent < 20 ? "bg-red-400" : "bg-blue-400";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-6 gap-6">
      <h1 className="text-xl font-semibold mt-4">el ranchito</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm">Automático</span>
        <button
          className={\`w-10 h-5 rounded-full p-1 transition-colors duration-200 \${autoMode ? "bg-green-500" : "bg-gray-600"}\`}
          onClick={() => setAutoMode(!autoMode)}
        >
          <div
            className={\`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 \${autoMode ? "translate-x-5" : "translate-x-0"}\`}
          />
        </button>
      </div>

      <div className="w-24 h-48 border-2 border-white rounded relative overflow-hidden">
        <div
          className={\`\${waterColor} absolute bottom-0 w-full transition-all duration-500\`}
          style={{ height: \`\${percent}%\` }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
          {percent}%
        </div>
      </div>

      <button className="mt-6 text-sm text-gray-300">... </button>
    </div>
  );
}
