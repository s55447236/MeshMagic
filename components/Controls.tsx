
import React, { useState } from 'react';
import { Plus, Trash2, Wand2, Sparkles, Activity, Settings2, Box, Code, ChevronDown, ChevronUp } from 'lucide-react';
import { GradientState, ColorPoint } from '../types';
import { PRESETS } from '../constants';

interface Props {
  config: GradientState;
  setConfig: (c: GradientState) => void;
  onGenerateAI: (prompt: string) => void;
  onShowCode: () => void;
  isLoadingAI: boolean;
  prompt: string;
  setPrompt: (p: string) => void;
  onSelectPreset: (name: string) => void;
}

const Controls: React.FC<Props> = ({ 
  config, 
  setConfig, 
  onGenerateAI, 
  onShowCode, 
  isLoadingAI, 
  prompt, 
  setPrompt,
  onSelectPreset
}) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const cleanName = (name: string) => name.replace(/^\d+_/, '').replace(/_/g, ' ');

  const updatePoint = (id: string, updates: Partial<ColorPoint>) => {
    setConfig({
      ...config,
      points: config.points.map(p => p.id === id ? { ...p, ...updates } : p)
    });
  };

  const addPoint = () => {
    const newPoint: ColorPoint = {
      id: Math.random().toString(36).substr(2, 9),
      color: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
      x: 50 + (Math.random() - 0.5) * 20,
      y: 50 + (Math.random() - 0.5) * 20,
      size: 50,
      rx: 1,
      ry: 1
    };
    setConfig({ ...config, points: [...config.points, newPoint] });
  };

  const removePoint = (id: string) => {
    if (config.points.length <= 1) return;
    setConfig({ ...config, points: config.points.filter(p => p.id !== id) });
  };

  return (
    <div className="w-96 bg-slate-900/80 backdrop-blur-xl border-l border-white/10 h-full overflow-hidden flex flex-col shadow-2xl">
      <div className="p-6 space-y-8 flex-1 overflow-y-auto scroll-smooth">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">MeshMagic</h1>
        </div>

        {/* AI Section */}
        <section className="space-y-3">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">AI Background Artist</label>
          <div className="relative group">
            <input
              type="text"
              placeholder="e.g. Dreamy Cyberpunk, Liquid Gold"
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-600 group-hover:border-slate-600"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onGenerateAI(prompt)}
            />
            <button 
              onClick={() => onGenerateAI(prompt)}
              disabled={isLoadingAI || !prompt}
              className="absolute right-2 top-2 p-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-all shadow-lg active:scale-90"
            >
              <Wand2 className={`w-4 h-4 text-white ${isLoadingAI ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </section>

        {/* Preset Library (Collapsible) */}
        <section className="space-y-3">
          <button 
            onClick={() => setIsGalleryOpen(!isGalleryOpen)}
            className="w-full flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Box className="w-3.5 h-3.5 text-slate-500" />
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Preset Gallery</label>
            </div>
            {isGalleryOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />}
          </button>
          
          {isGalleryOpen && (
            <div className="grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
              {PRESETS.map((p) => {
                const displayName = cleanName(p.name);
                const isActive = prompt === displayName;
                return (
                  <button
                    key={p.name}
                    onClick={() => onSelectPreset(p.name)}
                    className={`text-[10px] py-2 px-3 rounded-lg border text-left transition-all truncate font-medium ${
                      isActive 
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' 
                        : 'bg-slate-800/30 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:bg-slate-800/50'
                    }`}
                  >
                    {displayName}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* Canvas Settings */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <Settings2 className="w-3.5 h-3.5 text-slate-500" />
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Atmosphere</label>
          </div>
          
          <div className="space-y-4 px-1">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between text-[11px] font-medium text-slate-400">
                <span>Background</span>
                <span className="font-mono text-[9px] uppercase">{config.backgroundColor}</span>
              </div>
              <input 
                type="color" 
                className="w-full h-8 rounded-lg cursor-pointer bg-transparent border-none appearance-none"
                value={config.backgroundColor}
                onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between text-[11px] font-medium text-slate-400">
                <span>Blur Depth</span>
                <span className="font-mono text-[9px]">{config.blur}px</span>
              </div>
              <input 
                type="range" 
                min="10" max="200" 
                className="w-full accent-indigo-600 h-1.5 bg-slate-800 rounded-lg"
                value={config.blur}
                onChange={(e) => setConfig({ ...config, blur: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </section>

        {/* Flow Settings */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-slate-500" />
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Flow Dynamics</label>
          </div>
          
          <div className="space-y-4 px-1">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between text-[11px] font-medium text-slate-400">
                <span>Drift Speed</span>
                <span className="font-mono text-[9px]">{(config.flowSpeed * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" 
                min="10" max="300" step="10"
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg"
                value={config.flowSpeed * 100}
                onChange={(e) => setConfig({ ...config, flowSpeed: parseInt(e.target.value) / 100 })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between text-[11px] font-medium text-slate-400">
                <span>Drift Range</span>
                <span className="font-mono text-[9px]">{config.flowRange}px</span>
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg"
                value={config.flowRange}
                onChange={(e) => setConfig({ ...config, flowRange: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </section>

        {/* Points Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between sticky top-0 bg-slate-900/80 backdrop-blur-md py-2 z-10">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Color Nodes ({config.points.length})</label>
            <button 
              onClick={addPoint}
              className="p-1 hover:bg-white/5 rounded-md transition-colors text-indigo-400 flex items-center text-[10px] gap-1 font-bold"
            >
              <Plus className="w-3.5 h-3.5" /> ADD NODE
            </button>
          </div>
          
          <div className="space-y-2 pr-1">
            {config.points.map((p, idx) => (
              <div key={p.id} className="bg-white/5 border border-white/5 p-3 rounded-xl space-y-3 group transition-all hover:bg-white/[0.08] hover:border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full ring-2 ring-white/10 shadow-lg" style={{ backgroundColor: p.color }} />
                    <span className="text-[10px] font-bold text-slate-500 tracking-tight uppercase">Node {idx + 1}</span>
                  </div>
                  <button 
                    onClick={() => removePoint(p.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/10 hover:text-red-400 transition-all rounded-md"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="color" 
                    className="w-full h-7 rounded-lg bg-slate-950 border-none cursor-pointer"
                    value={p.color}
                    onChange={(e) => updatePoint(p.id, { color: e.target.value })}
                  />
                  <div className="flex items-center bg-slate-950 rounded-lg px-2 gap-2 border border-white/5">
                    <span className="text-[9px] text-slate-500 font-bold uppercase shrink-0">LUM (Size)</span>
                    <input 
                      type="number" 
                      className="w-full bg-transparent text-[11px] text-white outline-none font-mono"
                      value={p.size}
                      onChange={(e) => updatePoint(p.id, { size: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                   <div className="flex flex-col space-y-1">
                      <label className="text-[8px] text-slate-500 font-bold">RX (Width)</label>
                      <input 
                        type="range" min="0.5" max="2.5" step="0.1"
                        className="w-full h-1 bg-slate-800 rounded-lg accent-indigo-500"
                        value={p.rx || 1}
                        onChange={(e) => updatePoint(p.id, { rx: parseFloat(e.target.value) })}
                      />
                   </div>
                   <div className="flex flex-col space-y-1">
                      <label className="text-[8px] text-slate-500 font-bold">RY (Height)</label>
                      <input 
                        type="range" min="0.5" max="2.5" step="0.1"
                        className="w-full h-1 bg-slate-800 rounded-lg accent-indigo-500"
                        value={p.ry || 1}
                        onChange={(e) => updatePoint(p.id, { ry: parseFloat(e.target.value) })}
                      />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="p-6 border-t border-white/5 bg-slate-900/40 backdrop-blur-md">
        <button 
          onClick={onShowCode}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
        >
          <Code className="w-4 h-4" /> EXPORT SOURCE
        </button>
      </div>
    </div>
  );
};

export default Controls;
