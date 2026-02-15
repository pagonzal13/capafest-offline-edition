'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { setCookie } from '@/lib/utils'

export default function AccesoPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    // Verify password with API
    const response = await fetch('/api/verify-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (response.ok) {
      // Set cookie for 7 days
      setCookie('capafest_auth', password, 7)
      
      // Redirect to home
      router.push('/')
      router.refresh()
    } else {
      setError(true)
      setLoading(false)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-retro-purple to-retro-pink rounded-full mb-4 animate-breathe">
            <span className="text-4xl font-bold text-white">C</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
            Capafest
          </h1>
          <p className="text-lg text-retro-cyan font-display">
            Offline edition
          </p>
        </div>

        {/* Password Form */}
        <div className="festival-card rounded-2xl p-8">
          <h2 className="text-2xl font-display font-bold text-center mb-6">
            Acceso privado
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-offline-darker border border-retro-purple/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-retro-purple focus:border-transparent transition-all"
                placeholder="Introduce la contraseña"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-retro-pink/10 border border-retro-pink/30 rounded-lg p-3 text-sm text-retro-pink animate-slide-up">
                ❌ Contraseña incorrecta. Inténtalo de nuevo.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verificando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-offline-light/60">
            <p>Solo para invitados 🎪</p>
          </div>
        </div>

        {/* Fun message */}
        <div className="mt-8 text-center text-sm text-offline-light/40">
          <p>¿No tienes la contraseña?</p>
          <p className="mt-1">Es que no estás invitado, colega 😎</p>
        </div>
      </div>
    </div>
  )
}
