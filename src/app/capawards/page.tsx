'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { sampleAttendees, categories } from '@/lib/seedData'
import type { Attendee } from '@/types'

export default function CapawardsPage() {
  const [votingOpen, setVotingOpen] = useState(true) // Will be controlled by admin
  const [hasStarted, setHasStarted] = useState(false)
  const [currentStep, setCurrentStep] = useState<'identity' | 'voting' | 'review' | 'complete'>('identity')
  const [selectedVoter, setSelectedVoter] = useState<Attendee | null>(null)
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [votes, setVotes] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  // Check if voting is open (would be fetched from API in production)
  useEffect(() => {
    // In production: fetch voting status from API
    // For now, it's always open
  }, [])

  const handleStartVoting = () => {
    setHasStarted(true)
    setCurrentStep('identity')
  }

  const handleSelectVoter = (attendee: Attendee) => {
    setSelectedVoter(attendee)
    setCurrentStep('voting')
  }

  const handleVoteForCategory = (nomineeId: string) => {
    setVotes({
      ...votes,
      [categories[currentCategoryIndex].id]: nomineeId,
    })
  }

  const handleNext = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1)
    } else {
      setCurrentStep('review')
    }
  }

  const handleBack = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    
    // In production: POST to /api/vote
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setCurrentStep('complete')
    setSubmitting(false)
  }

  const getCurrentNominees = () => {
    const category = categories[currentCategoryIndex]
    return sampleAttendees.filter(attendee => {
      // Exclude the voter
      if (attendee.id === selectedVoter?.id) return false
      
      // For Bizacap, only DJs
      if (category.dj_only) {
        return attendee.group_names.includes('DJ')
      }
      
      return true
    })
  }

  const getVotedNomineeName = (categoryId: string) => {
    const nomineeId = votes[categoryId]
    return sampleAttendees.find(a => a.id === nomineeId)?.name || 'No votado'
  }

  if (!votingOpen && !hasStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-6">🏆</div>
            <h1 className="text-4xl font-display font-bold gradient-text mb-6">
              Capawards
            </h1>
            <div className="festival-card rounded-2xl p-8">
              <p className="text-xl text-offline-light/80">
                Las votaciones aún no están abiertas.
              </p>
              <p className="text-lg text-offline-light/60 mt-4">
                Vuelve más tarde 😊
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!hasStarted && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="text-6xl mb-6">🏆</div>
              <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-6">
                Capawards
              </h1>
              
              <div className="festival-card rounded-2xl p-8 md:p-10 mb-8">
                <p className="text-lg leading-relaxed text-offline-light/90 mb-6">
                  Bienvenido/a a la 6ª edición de los Capawards! Desde aquí podrás votar a los 
                  mayores personajes de esta edición (o al menos del primer día, como siempre, sí, 
                  ya sabemos que eso es un problema pero todo el mundo estará ya en otra cosa mañana).
                </p>
                <p className="text-lg leading-relaxed text-offline-light/90">
                  Vota en cada categoría a quien consideres que merece el honor. 
                  <span className="text-retro-yellow font-semibold"> No se podrá votar por uno mismo.</span>
                </p>
              </div>

              <div className="festival-card rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-display font-bold text-retro-cyan mb-4">
                  ¿Cómo funciona?
                </h2>
                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">1️⃣</span>
                    <p className="text-offline-light/80">
                      Primero, selecciona quién estás votando (sin login, confiamos en ti)
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">2️⃣</span>
                    <p className="text-offline-light/80">
                      Vota en cada categoría (no podrás votarte a ti mismo)
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">3️⃣</span>
                    <p className="text-offline-light/80">
                      Revisa tus votos y envíalos
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">4️⃣</span>
                    <p className="text-offline-light/80">
                      Solo puedes votar una vez por edición
                    </p>
                  </div>
                </div>
              </div>

              <button onClick={handleStartVoting} className="btn-primary">
                Comenzar votación 🗳️
              </button>
            </motion.div>
          )}

          {currentStep === 'identity' && (
            <motion.div
              key="identity"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-display font-bold text-center gradient-text mb-8">
                ¿Quién está votando?
              </h2>
              <p className="text-center text-offline-light/60 mb-8">
                Esto NO es tu voto, solo necesitamos saber quién eres
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sampleAttendees.map((attendee) => (
                  <button
                    key={attendee.id}
                    onClick={() => handleSelectVoter(attendee)}
                    className="festival-card rounded-xl p-6 text-center hover:scale-105 transition-transform"
                  >
                    <div className="text-4xl mb-3">👤</div>
                    <div className="font-display font-semibold">{attendee.name}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 'voting' && selectedVoter && (
            <motion.div
              key={`voting-${currentCategoryIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-offline-light/60">
                    Categoría {currentCategoryIndex + 1} de {categories.length}
                  </span>
                  <span className="text-sm text-retro-cyan font-display">
                    Votando como: {selectedVoter.name}
                  </span>
                </div>
                <div className="w-full bg-offline-dark rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-retro-purple to-retro-pink h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentCategoryIndex + 1) / categories.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="festival-card rounded-2xl p-8 mb-8">
                <h2 className="text-3xl font-display font-bold text-center gradient-text mb-8">
                  {categories[currentCategoryIndex].name}
                </h2>

                {/* Nominees */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {getCurrentNominees().map((nominee) => (
                    <button
                      key={nominee.id}
                      onClick={() => handleVoteForCategory(nominee.id)}
                      className={`festival-card rounded-xl p-6 text-center transition-all ${
                        votes[categories[currentCategoryIndex].id] === nominee.id
                          ? 'ring-2 ring-retro-cyan scale-105'
                          : 'hover:scale-105'
                      }`}
                    >
                      <div className="text-4xl mb-3">
                        {votes[categories[currentCategoryIndex].id] === nominee.id ? '⭐' : '👤'}
                      </div>
                      <div className="font-display font-semibold">{nominee.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentCategoryIndex === 0}
                  className="px-6 py-3 bg-offline-dark border border-retro-purple/30 rounded-full font-display disabled:opacity-30 disabled:cursor-not-allowed hover:border-retro-purple/60 transition-colors"
                >
                  ← Anterior
                </button>
                <button
                  onClick={handleNext}
                  disabled={!votes[categories[currentCategoryIndex].id]}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentCategoryIndex === categories.length - 1 ? 'Revisar →' : 'Siguiente →'}
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-3xl font-display font-bold text-center gradient-text mb-8">
                Revisa tus votos
              </h2>

              <div className="festival-card rounded-2xl p-8 mb-8">
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex justify-between items-center pb-4 border-b border-retro-purple/20 last:border-0"
                    >
                      <span className="font-display text-offline-light/80">{category.name}</span>
                      <span className="font-display font-semibold text-retro-cyan">
                        {getVotedNomineeName(category.id)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setCurrentStep('voting')
                    setCurrentCategoryIndex(categories.length - 1)
                  }}
                  className="px-6 py-3 bg-offline-dark border border-retro-purple/30 rounded-full font-display hover:border-retro-purple/60 transition-colors"
                >
                  ← Modificar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary disabled:opacity-50"
                >
                  {submitting ? 'Enviando...' : 'Enviar votos ✅'}
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-4xl font-display font-bold gradient-text mb-6">
                ¡Votos enviados!
              </h2>
              <div className="festival-card rounded-2xl p-8 max-w-2xl mx-auto">
                <p className="text-lg text-offline-light/80 mb-4">
                  Gracias por participar en los Capawards 2026
                </p>
                <p className="text-offline-light/60">
                  Los resultados se anunciarán durante la ceremonia 🏆
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
