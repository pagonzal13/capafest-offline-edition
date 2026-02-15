'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { categories, sampleAttendees } from '@/lib/seedData'

export default function AdminPage() {
  const [votingOpen, setVotingOpen] = useState(true)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // In production: fetch voting status and results from API
    loadResults()
  }, [])

  const loadResults = async () => {
    // Mock results for demo
    const mockResults = categories.map(category => ({
      category_id: category.id,
      category_name: category.name,
      results: sampleAttendees
        .slice(0, 5)
        .map((attendee, index) => ({
          nominee_id: attendee.id,
          nominee_name: attendee.name,
          vote_count: Math.floor(Math.random() * 10) + 1,
        }))
        .sort((a, b) => b.vote_count - a.vote_count),
    }))
    
    setResults(mockResults)
  }

  const toggleVoting = async () => {
    setLoading(true)
    // In production: POST to /api/admin/toggle-voting
    await new Promise(resolve => setTimeout(resolve, 500))
    setVotingOpen(!votingOpen)
    setLoading(false)
  }

  const exportCSV = () => {
    // Generate CSV
    let csv = 'Categoría,Nominado,Votos\n'
    
    results.forEach(category => {
      category.results.forEach((result: any) => {
        csv += `${category.category_name},${result.nominee_name},${result.vote_count}\n`
      })
    })

    // Download
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'capawards-results-2026.csv'
    a.click()
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-retro-cyan font-display">
            Control de Capawards
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="festival-card rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-display font-bold mb-6">Controles</h2>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={toggleVoting}
              disabled={loading}
              className={`px-6 py-3 rounded-full font-display font-semibold transition-all ${
                votingOpen
                  ? 'bg-gradient-to-r from-retro-pink to-red-600 text-white'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
              } hover:scale-105 disabled:opacity-50`}
            >
              {loading ? 'Cambiando...' : (votingOpen ? '🔴 Cerrar votaciones' : '🟢 Abrir votaciones')}
            </button>

            <button
              onClick={exportCSV}
              className="px-6 py-3 bg-gradient-to-r from-retro-purple to-retro-blue text-white rounded-full font-display font-semibold hover:scale-105 transition-all"
            >
              📥 Exportar CSV
            </button>

            <button
              onClick={loadResults}
              className="px-6 py-3 bg-offline-dark border border-retro-purple/30 rounded-full font-display hover:border-retro-purple/60 transition-colors"
            >
              🔄 Actualizar resultados
            </button>
          </div>

          <div className="mt-6 p-4 bg-offline-darker rounded-lg">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${votingOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="font-display">
                Estado: <span className={votingOpen ? 'text-green-400' : 'text-red-400'}>
                  {votingOpen ? 'Votaciones abiertas' : 'Votaciones cerradas'}
                </span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-display font-bold gradient-text mb-8">
            Resultados por categoría
          </h2>

          <div className="space-y-6">
            {results.map((category, index) => (
              <motion.div
                key={category.category_id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="festival-card rounded-2xl p-6"
              >
                <h3 className="text-xl font-display font-bold text-retro-cyan mb-4">
                  {category.category_name}
                </h3>

                <div className="space-y-3">
                  {category.results.map((result: any, resultIndex: number) => (
                    <div
                      key={result.nominee_id}
                      className="flex items-center justify-between p-4 bg-offline-darker rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`text-2xl ${resultIndex === 0 ? 'text-3xl' : ''}`}>
                          {resultIndex === 0 ? '🏆' : `${resultIndex + 1}º`}
                        </div>
                        <span className={`font-display ${resultIndex === 0 ? 'font-bold text-lg text-retro-yellow' : ''}`}>
                          {result.nominee_name}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-display font-bold text-retro-cyan">
                            {result.vote_count}
                          </div>
                          <div className="text-xs text-offline-light/60">
                            votos
                          </div>
                        </div>
                        
                        {/* Vote bar */}
                        <div className="w-32 bg-offline-dark rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-retro-purple to-retro-pink h-3 rounded-full transition-all"
                            style={{
                              width: `${(result.vote_count / Math.max(...category.results.map((r: any) => r.vote_count))) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
