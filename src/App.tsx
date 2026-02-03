function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-400 mb-4">Med-Workspace</h1>
      <p className="text-lg text-gray-300">Next-Gen Medical Assistant Implementation</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Vision Orchestrator</h2>
          <p className="text-gray-400">MediaPipe Hand & Face Tracking</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Holo-Anatomy</h2>
          <p className="text-gray-400">3D/AR Scene with Three.js</p>
        </div>
      </div>
    </div>
  )
}

export default App
