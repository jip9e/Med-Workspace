import { SterileNav } from './modules/SterileNav/SterileNav'
import { HoloAnatomyScene } from './modules/HoloAnatomy/Scene'
import { VisionCamera } from './components/VisionCamera'
import { useVision } from './components/VisionProvider'
import { NotesManager } from './modules/Notes/NotesManager'
import { useVoiceCommands } from './hooks/useVoiceCommands'
import { Activity, ShieldCheck } from 'lucide-react'
import { BentoGrid, BentoItem } from './components/BentoGrid'
import { BurnoutStats } from './components/BurnoutStats'

function App() {
  const { setHandResults, setFaceResults } = useVision();
  const { isDictating, transcript } = useVoiceCommands();

  return (
    <div className="min-h-screen bg-clinical-black text-gray-100 flex flex-col items-center font-sans selection:bg-medical-blue-500/30">
      <header className="sticky top-0 z-10 w-full bg-clinical-black/90 backdrop-blur-xl border-b border-clinical-border p-4 flex justify-between items-center px-6 lg:px-12">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-medical-blue-500" />
          <h1 className="text-xl font-bold tracking-tight text-white uppercase font-sans">Med-Workspace <span className="text-medical-blue-500">V3 PRO</span></h1>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-medical-blue-400 bg-medical-blue-500/10 px-3 py-1.5 rounded-full border border-medical-blue-500/20 shadow-[0_0_15px_rgba(14,140,233,0.1)]">
          <ShieldCheck className="w-3 h-3 animate-pulse" />
          SECURE_SYSTEM_READY
        </div>
      </header>

      <main className="w-full max-w-screen-2xl p-4 md:p-8 space-y-4">
        <BentoGrid>
          {/* Main Anatomical View - Large Tile */}
          <BentoItem 
            className="md:col-span-3 md:row-span-4"
            title="HoloAnatomy_Render"
            subtitle="Spatial Model View"
          >
            <HoloAnatomyScene />
          </BentoItem>

          {/* Notes Manager - Vertical Tile */}
          <BentoItem 
            className="md:col-span-1 md:row-span-6"
            title="Clinical_Notes"
            subtitle="Voice-to-Text Active"
          >
            <NotesManager 
              currentTranscript={transcript} 
              isDictating={isDictating}
              onSave={(content) => console.log('Note saved:', content)}
            />
          </BentoItem>

          {/* Vision/Camera - Utility Tile */}
          <BentoItem 
            className="md:col-span-1 md:row-span-2"
            title="Vision_Input_01"
            subtitle="Gestural Control"
          >
            <VisionCamera 
              onHandResults={setHandResults} 
              onFaceResults={setFaceResults} 
            />
          </BentoItem>

          {/* Burnout Stats - Small Tile */}
          <BentoItem 
            className="md:col-span-1 md:row-span-2"
            title="Biometric_Analysis"
            subtitle="Observer Health"
          >
            <BurnoutStats />
          </BentoItem>

          {/* Navigation - Utility Tile */}
          <BentoItem 
            className="md:col-span-1 md:row-span-2"
            title="System_Navigation"
            subtitle="Sterile Interface"
          >
            <div className="p-4 h-full flex flex-col justify-center">
              <SterileNav />
            </div>
          </BentoItem>
        </BentoGrid>
      </main>
      
      <footer className="w-full py-6 border-t border-clinical-border text-center text-gray-600 text-[9px] tracking-[0.3em] uppercase font-bold">
        &copy; 2026 Med-Workspace Systems // Secure Clinical Environment // V3.0.0-PRO-MAX
      </footer>
    </div>
  )
}

export default App


export default App
