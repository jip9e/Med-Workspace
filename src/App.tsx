import { SterileNav } from './modules/SterileNav/SterileNav'
import { HoloAnatomyScene } from './modules/HoloAnatomy/Scene'
import { VisionCamera } from './components/VisionCamera'
import { useVision, BurnoutMonitorOverlay } from './components/VisionProvider'
import { NotesManager } from './modules/Notes/NotesManager'
import { useVoiceCommands } from './hooks/useVoiceCommands'
import { Activity, ShieldCheck, Box, Info } from 'lucide-react'

function App() {
  const { setHandResults, setFaceResults } = useVision();
  const { isDictating, transcript } = useVoiceCommands();

  return (
    <div className="min-h-screen bg-clinical-black text-gray-100 flex flex-col items-center font-sans selection:bg-medical-blue-500/30">
      <BurnoutMonitorOverlay />
      <NotesManager 
        currentTranscript={transcript} 
        isDictating={isDictating}
        onSave={(content) => console.log('Note saved:', content)}
      />
      <header className="sticky top-0 z-10 w-full bg-clinical-black/90 backdrop-blur-xl border-b border-white/5 p-4 flex justify-between items-center px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-medical-blue-500" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase">Med-Workspace <span className="text-medical-blue-500">V3 PRO</span></h1>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-medical-blue-400 bg-medical-blue-500/10 px-3 py-1.5 rounded-full border border-medical-blue-500/20 shadow-[0_0_15px_rgba(14,140,233,0.1)]">
          <ShieldCheck className="w-3 h-3 animate-pulse" />
          SECURE_SYSTEM_READY
        </div>
      </header>

      <main className="w-full max-w-7xl p-4 md:p-8 lg:p-12 space-y-12">
        <section className="text-left py-4 relative">
          <div className="absolute -left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-medical-blue-500/50 to-transparent hidden xl:block" />
          <span className="medical-accent flex items-center gap-2">
            <Activity className="w-3 h-3" />
            Clinical Environment
          </span>
          <p className="text-4xl md:text-5xl font-light text-gray-400 mt-2 tracking-tight">Intelligent Assistant <span className="text-white font-medium">Active</span></p>
        </section>

        <section className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="clinical-card p-4 overflow-hidden group">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Vision_Input_01</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>
              <VisionCamera 
                onHandResults={setHandResults} 
                onFaceResults={setFaceResults} 
              />
            </div>
            
            <div className="clinical-card p-6 border-l-4 border-l-medical-blue-500 bg-gradient-to-r from-medical-blue-500/5 to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <Box className="w-4 h-4 text-medical-blue-400" />
                <h3 className="medical-accent">Spatial Controls</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed font-medical">Gesture-based interaction enabled. Use hand movements to manipulate the anatomical visualization with zero-latency response.</p>
            </div>
            <SterileNav />
          </div>
          
          <div className="w-full lg:w-2/3 aspect-[4/3] lg:aspect-video min-h-[400px] clinical-card overflow-hidden relative group">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="bg-medical-blue-500/20 backdrop-blur-md text-medical-blue-300 text-[10px] px-2 py-1 rounded border border-medical-blue-500/30 font-bold tracking-widest uppercase">3D_RENDER_VIEW</span>
            </div>
            <HoloAnatomyScene />
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="clinical-card p-8 h-64 flex flex-col justify-between hover:border-medical-blue-500/40 transition-all duration-300 group hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-medical-blue-500 text-xs font-mono font-bold tracking-tighter">MOD_0{i}</span>
                  <Info className="w-4 h-4 text-gray-700 group-hover:text-medical-blue-400 transition-colors" />
                </div>
                <h2 className="text-xl font-semibold mt-2 tracking-tight text-white/90">Diagnostic Data</h2>
              </div>
              <div>
                <p className="text-gray-500 text-sm leading-relaxed font-medical">Real-time telemetry and clinical observation metrics for automated analysis and decision support.</p>
                <div className="mt-6 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-medical-blue-500 h-full shadow-[0_0_10px_rgba(14,140,233,0.5)]" style={{ width: `${30 + Math.random() * 60}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="w-full p-12 border-t border-white/5 text-center text-gray-600 text-[10px] tracking-[0.3em] uppercase font-bold">
        &copy; 2026 Med-Workspace Systems // Secure Clinical Environment // V3.0.0-PRO
      </footer>
    </div>
  )
}

export default App
