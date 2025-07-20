import { useState } from 'preact/hooks'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          Preact + Tailwind CSS
        </h1>
        <p class="text-gray-600 mb-6">
          Count: <span class="font-semibold text-blue-600">{count}</span>
        </p>
        <div class="space-x-4">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            onClick={() => setCount(count + 1)}
          >
            Increment
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            onClick={() => setCount(0)}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
