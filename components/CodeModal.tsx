
import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { GradientState } from '../types';

interface Props {
  config: GradientState;
  onClose: () => void;
}

const CodeModal: React.FC<Props> = ({ config, onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const getGradientCSS = () => {
    return config.points.map(p => {
      const rx = (p.rx || 1.0) * p.size * 1.5;
      const ry = (p.ry || 1.0) * p.size * 1.5;
      return `radial-gradient(ellipse ${rx}% ${ry}% at ${p.x.toFixed(1)}% ${p.y.toFixed(1)}%, ${p.color}, transparent)`;
    }).join(',\n    ');
  };

  const cssCode = `
.fluid-mesh {
  background-color: ${config.backgroundColor};
  background-image: 
    ${getGradientCSS()};
  filter: blur(${config.blur}px) saturate(1.4);
  width: 100%;
  height: 100%;
  transform: scale(1.2); /* 防止边缘模糊溢出 */
}
  `.trim();

  const reactCode = `
import React from 'react';

const FluidMeshGradient = () => {
  const style = {
    backgroundColor: '${config.backgroundColor}',
    backgroundImage: \`
      ${getGradientCSS().replace(/\n/g, '\n      ')}
    \`,
    filter: 'blur(${config.blur}px) saturate(1.4)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'scale(1.2)',
  };

  return <div style={style} />;
};

export default FluidMeshGradient;
  `.trim();

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-6">
      <div className="bg-slate-900 w-full max-w-3xl rounded-3xl border border-slate-800 shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-tight">Export Fluid Style</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">CSS (Fluid Field)</h3>
              <button 
                onClick={() => handleCopy(cssCode, 'css')}
                className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-bold"
              >
                {copied === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied === 'css' ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
            <pre className="p-5 bg-slate-950 rounded-2xl text-[10px] font-mono overflow-x-auto text-slate-300 border border-white/5 leading-relaxed">
              {cssCode}
            </pre>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">React Component</h3>
              <button 
                onClick={() => handleCopy(reactCode, 'react')}
                className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-bold"
              >
                {copied === 'react' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied === 'react' ? 'Copied!' : 'Copy Component'}
              </button>
            </div>
            <pre className="p-5 bg-slate-950 rounded-2xl text-[10px] font-mono overflow-x-auto text-slate-300 border border-white/5 leading-relaxed">
              {reactCode}
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
