import { SterileNav } from './modules/SterileNav/SterileNav'
import { HoloAnatomyScene } from './modules/HoloAnatomy/Scene'
import { VisionCamera } from './components/VisionCamera'
import { useVision, BurnoutMonitorOverlay } from './components/VisionProvider'

function App() {
  const { setHandResults, setFaceResults } = useVision();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <BurnoutMonitorOverlay />
      <header className="sticky top-0 z-10 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">Med-Workspace</h1>
        <div className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Vision Ready</div>
      </header>

      <main className="w-full max-w-5xl p-8 space-y-12">
        <section className="text-center">
          <p className="text-lg text-gray-300">Next-Gen Medical Assistant Implementation</p>
        </section>

        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 space-y-4">
            <VisionCamera 
              onHandResults={setHandResults} 
              onFaceResults={setFaceResults} 
            />
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-sm mb-2">Controls</h3>
              <p className="text-xs text-gray-400">Move your hand to rotate the 3D anatomy model.</p>
            </div>
            <SterileNav />
          </div>
          
          <div className="w-full md:w-2/3 aspect-square md:aspect-video min-h-[400px]">
            <HoloAnatomyScene />
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700 h-64 flex flex-col justify-end">
              <h2 className="text-xl font-semibold mb-2">Medical Module {i}</h2>
              <p className="text-gray-400">Sample data for visualization and scrolling demonstration.</p>
              <div className="mt-4 w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: `${Math.random() * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="w-full p-8 border-t border-gray-800 text-center text-gray-600 text-sm">
        &copy; 2026 Med-Workspace Systems
      </footer>
    </div>
  )
}

export default App
