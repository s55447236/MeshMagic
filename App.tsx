
import React, { useState, useCallback } from 'react';
import { Layers, MousePointer2, RefreshCw, Play, Pause } from 'lucide-react';
import GradientCanvas from './components/GradientCanvas';
import Controls from './components/Controls';
import CodeModal from './components/CodeModal';
import { GradientState } from './types';
import { INITIAL_STATE, PRESETS } from './constants';
import { generateGradientFromPrompt } from './services/geminiService';

const App: React.FC = () => {
  // 辅助函数：清理预设名称中的数字前缀和下划线
  const cleanName = (name: string) => name.replace(/^\d+_/, '').replace(/_/g, ' ');

  const [config, setConfig] = useState<GradientState>(INITIAL_STATE);
  const [showPoints, setShowPoints] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [activePointId, setActivePointId] = useState<string | null>(null);
  const [isFlowing, setIsFlowing] = useState(false);
  const [prompt, setPrompt] = useState(cleanName(PRESETS[0].name)); 

  const handlePointMove = useCallback((id: string, x: number, y: number) => {
    setConfig(prev => ({
      ...prev,
      points: prev.points.map(p => p.id === id ? { ...p, x, y } : p)
    }));
  }, []);

  const handleGenerateAI = async (inputPrompt: string) => {
    if (!inputPrompt.trim()) return;
    setIsLoadingAI(true);
    setActivePointId(null);
    try {
      const newConfig = await generateGradientFromPrompt(inputPrompt);
      setConfig(newConfig);
      setPrompt(inputPrompt);
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("Failed to generate gradient. Please check your API key.");
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleSelectPreset = (presetName: string) => {
    const preset = PRESETS.find(p => p.name === presetName);
    if (preset) {
      setConfig(preset.config);
      setPrompt(cleanName(preset.name));
      setActivePointId(null);
    }
  };

  const handleRandomize = () => {
    const randomPreset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
    setConfig(randomPreset.config);
    setPrompt(cleanName(randomPreset.name)); 
    setActivePointId(null);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      <main className="flex-1 relative">
        <GradientCanvas 
          config={config} 
          showPoints={showPoints} 
          onPointMove={handlePointMove}
          activePointId={activePointId}
          setActivePointId={setActivePointId}
          isFlowing={isFlowing}
        />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20">
          <button 
            onClick={() => setIsFlowing(!isFlowing)}
            title={isFlowing ? "Stop Flow" : "Start Flow"}
            className={`p-3 rounded-xl transition-all ${isFlowing ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 animate-pulse' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            {isFlowing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button 
            onClick={() => setShowPoints(!showPoints)}
            title={showPoints ? "Hide Points" : "Show Points"}
            className={`p-3 rounded-xl transition-all ${showPoints ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <MousePointer2 className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <button 
            onClick={handleRandomize}
            title="Random Preset"
            className="p-3 rounded-xl hover:bg-slate-800 text-slate-400 transition-all active:scale-90"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <div className="flex items-center px-4 gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest select-none">
            <Layers className="w-4 h-4 opacity-50" />
            <span>{config.points.length} Nodes</span>
          </div>
        </div>

        {isLoadingAI && (
          <div className="absolute inset-0 z-30 bg-slate-950/40 backdrop-blur-xl flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-500/20 rounded-full" />
              <div className="absolute top-0 w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xl font-medium text-white tracking-tight">AI Rendering...</p>
              <p className="text-indigo-400/80 text-sm animate-pulse">Mixing colors and light</p>
            </div>
          </div>
        )}
      </main>

      <Controls 
        config={config} 
        setConfig={setConfig} 
        onGenerateAI={handleGenerateAI}
        onShowCode={() => setShowCode(true)}
        isLoadingAI={isLoadingAI}
        prompt={prompt}
        setPrompt={setPrompt}
        onSelectPreset={handleSelectPreset}
      />

      {showCode && (
        <CodeModal 
          config={config} 
          onClose={() => setShowCode(false)} 
        />
      )}
    </div>
  );
};

export default App;
