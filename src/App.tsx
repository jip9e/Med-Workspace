import { SterileNav } from './modules/SterileNav/SterileNav'
import { HoloAnatomyScene } from './modules/HoloAnatomy/Scene'
import { VisionCamera } from './components/VisionCamera'
import { useVision, BurnoutMonitorOverlay } from './components/VisionProvider'
import { NotesManager } from './modules/Notes/NotesManager'
import { useVoiceCommands } from './hooks/useVoiceCommands'

function App() {
  const { setHandResults, setFaceResults } = useVision();
  const { isDictating, transcript } = useVoiceCommands();

  return (
    <div className="min-h-screen bg-clinical-black text-gray-100 flex flex-col items-center font-sans">
      <BurnoutMonitorOverlay />
      <NotesManager 
        currentTranscript={transcript} 
        isDictating={isDictating}
        onSave={(content) => console.log('Note saved:', content)}
      />
      <header className="sticky top-0 z-10 w-full bg-clinical-black/90 backdrop-blur-xl border-b border-white/5 p-4 flex justify-between items-center px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-medical-blue-500 rounded-full" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase">Med-Workspace <span className="text-medical-blue-500">V2</span></h1>
        </div>
        <div className="text-[10px] font-mono text-medical-blue-400 bg-medical-blue-500/10 px-3 py-1 rounded-full border border-medical-blue-500/20 animate-pulse">
          SYSTEM_READY
        </div>
      </header>

      <main className="w-full max-w-7xl p-4 md:p-8 lg:p-12 space-y-12">
        <section className="text-left py-4">
          <span className="medical-accent">Clinical Environment</span>
          <p className="text-3xl md:text-4xl font-light text-gray-400 mt-2">Intelligent Assistant <span className="text-white">Active</span></p>
        </section>

        <section className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="clinical-card p-4 overflow-hidden">
              <VisionCamera 
                onHandResults={setHandResults} 
                onFaceResults={setFaceResults} 
              />
            </div>
            
            <div className="clinical-card p-6 border-l-4 border-l-medical-blue-500">
              <h3 className="medical-accent mb-3">Spatial Controls</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Gesture-based interaction enabled. Use hand movements to manipulate the anatomical visualization.</p>
            </div>
            <SterileNav />
          </div>
          
          <div className="w-full lg:w-2/3 aspect-[4/3] lg:aspect-video min-h-[400px] clinical-card overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-medical-blue-500/20 text-medical-blue-300 text-[10px] px-2 py-1 rounded border border-medical-blue-500/30">3D_RENDER_VIEW</span>
            </div>
            <HoloAnatomyScene />
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="clinical-card p-8 h-64 flex flex-col justify-between hover:border-medical-blue-500/50 transition-colors">
              <div>
                <span className="text-medical-blue-500 text-xs font-mono">MOD_0{i}</span>
                <h2 className="text-xl font-medium mt-2">Diagnostic Data</h2>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Real-time telemetry and clinical observation metrics for automated analysis.</p>
                <div className="mt-6 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-medical-blue-500 h-full" style={{ width: `${30 + Math.random() * 60}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="w-full p-12 border-t border-white/5 text-center text-gray-600 text-[10px] tracking-[0.2em] uppercase">
        &copy; 2026 Med-Workspace Systems // Secure Clinical Environment
      </footer>
    </div>
  )
}

export default App
