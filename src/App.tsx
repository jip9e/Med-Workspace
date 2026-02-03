import { SterileNav } from './modules/SterileNav/SterileNav'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <header className="sticky top-0 z-10 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">Med-Workspace</h1>
        <div className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Vision Ready</div>
      </header>

      <main className="w-full max-w-4xl p-8 space-y-12">
        <section className="text-center">
          <p className="text-lg text-gray-300">Next-Gen Medical Assistant Implementation</p>
        </section>

        <section className="flex flex-col items-center">
          <SterileNav />
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
