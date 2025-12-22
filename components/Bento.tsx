import React from 'react';
import { AIVoiceInput } from './ui/ai-voice-input';
import { InfiniteSlider } from './infinite-slider';
import { Gemini, Replit, MagicUI, VSCodium, MediaWiki, GooglePaLM } from './logos';
import { cn } from '@/lib/utils';
import { Mic, ArrowRight, Code2, Globe, Cpu, Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Bento = () => {
  return (
    <section className="dark w-full bg-[#0b0f0c] py-20"> {/* Force dark mode context and match background */}
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-white">
          Intelligent <span className="text-purple-400">Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Voice Input Card - Large feature */}
          <div className="col-span-1 md:col-span-2 row-span-1 relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-md p-6 shadow-xl flex flex-col justify-between group hover:border-purple-500/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <Mic size={20} />
                </div>
                <h3 className="font-semibold text-lg text-white">AI Voice Command</h3>
              </div>
              <p className="text-neutral-400 text-sm max-w-sm">
                Speak naturally to interact with your AI assistant. Real-time processing and visualization.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-center h-full mt-4">
              <AIVoiceInput demoMode={true} />
            </div>
          </div>

          {/* Integrations Card */}
          <div className="col-span-1 row-span-1 relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-md p-6 shadow-xl flex flex-col group hover:border-emerald-500/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Globe size={20} />
                </div>
                <h3 className="font-semibold text-lg text-white">Seamless Integration</h3>
              </div>
              <p className="text-neutral-400 text-sm">
                Connects with your favorite tools.
              </p>
            </div>

            <div className="relative z-10 flex-1 flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
              <InfiniteSlider gap={24} speed={30}>
                <IntegrationCard><VSCodium /></IntegrationCard>
                <IntegrationCard><MediaWiki /></IntegrationCard>
                <IntegrationCard><GooglePaLM /></IntegrationCard>
                <IntegrationCard><Gemini /></IntegrationCard>
                <IntegrationCard><Replit /></IntegrationCard>
                <IntegrationCard><MagicUI /></IntegrationCard>
              </InfiniteSlider>
            </div>
          </div>

          {/* Third Card - Latest AI Models */}
          <div className="col-span-1 row-span-1 relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50 backdrop-blur-md p-6 shadow-xl flex flex-col justify-between group hover:border-rose-500/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-semibold text-lg text-white">Latest Models</h3>
              </div>
              <p className="text-neutral-400 text-sm">
                Access the most powerful LLMs instantly.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 content-start mt-4">
              <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-colors text-xs py-1.5 px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                GPT-4o
              </Badge>
              <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-colors text-xs py-1.5 px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                Claude 3.5 Sonnet
              </Badge>
              <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-colors text-xs py-1.5 px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                Gemini 1.5 Pro
              </Badge>
              <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-colors text-xs py-1.5 px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                Llama 3.1
              </Badge>
              <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-colors text-xs py-1.5 px-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
                Mistral Large
              </Badge>
            </div>
          </div>

          {/* Fourth Card - Processing Power/Performance */}
          <div className="col-span-1 md:col-span-2 row-span-1 relative overflow-hidden rounded-3xl border border-white/10 bg-black/80 p-8 shadow-xl flex items-center justify-between group hover:border-white/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
            <div className="relative z-10 max-w-md">
              <h3 className="font-bold text-2xl mb-2 text-white">High Performance</h3>
              <p className="text-neutral-400">
                Powered by advanced shading and optimization techniques for smooth experiences.
              </p>
              <button className="mt-6 flex items-center gap-2 text-sm font-semibold text-white hover:text-purple-400 hover:gap-3 transition-all">
                Explore Docs <ArrowRight size={16} />
              </button>
            </div>
            <div className="relative z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 text-white">
              <Cpu size={120} strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const IntegrationCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center p-3 rounded-2xl shadow-sm w-16 h-16 hover:bg-white/10 transition-colors">
      <div className="w-8 h-8 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full object-contain text-white/80">
        {children}
      </div>
    </div>
  )
}

export default Bento;