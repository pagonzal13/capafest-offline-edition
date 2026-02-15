'use client'

import { motion } from 'framer-motion'

export default function MafiaPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-4">
            La Mafia
          </h1>
          <p className="text-xl md:text-2xl text-retro-cyan font-display">
            El juego secreto del festival
          </p>
        </motion.div>

        {/* Rules Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="festival-card rounded-2xl p-8 md:p-10 mb-12"
        >
          <h2 className="text-2xl font-display font-bold text-retro-cyan mb-6">
            ¿Cómo funciona?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-retro-purple to-retro-pink rounded-full flex items-center justify-center font-display font-bold text-white">
                1
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Recibe tu papel "Top Secret"
                </h3>
                <p className="text-offline-light/80">
                  Al llegar al festival, recibirás un papel secreto con el nombre de tu objetivo 
                  y un objeto específico que deberás usar para "eliminarlo".
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-retro-purple to-retro-pink rounded-full flex items-center justify-center font-display font-bold text-white">
                2
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Ejecuta la "eliminación"
                </h3>
                <p className="text-offline-light/80">
                  Para eliminar a tu objetivo, debes conseguir que tome el objeto de tu mano. 
                  Puede ser ofreciéndoselo, dejándolo caer "accidentalmente", o cualquier método 
                  creativo que se te ocurra. <span className="text-retro-yellow font-semibold">¡Sé sigiloso!</span>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-retro-purple to-retro-pink rounded-full flex items-center justify-center font-display font-bold text-white">
                3
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Continúa la cadena
                </h3>
                <p className="text-offline-light/80">
                  Una vez eliminado tu objetivo, este te entregará su papel con su objetivo. 
                  ¡Ahora ese es tu nuevo objetivo! El juego continúa hasta que quede un solo jugador.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="festival-card rounded-2xl p-8 md:p-10 mb-12"
        >
          <h2 className="text-2xl font-display font-bold text-retro-cyan mb-8 text-center">
            Diagrama del juego
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Player 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-retro-purple to-retro-pink rounded-full flex items-center justify-center text-3xl mb-3 mx-auto">
                👤
              </div>
              <div className="text-sm font-display font-semibold mb-2">Jugador 1</div>
              <div className="text-xs text-offline-light/60 bg-offline-darker px-3 py-1 rounded">
                Objetivo: Jugador 2
              </div>
            </div>

            {/* Arrow */}
            <div className="text-4xl text-retro-cyan rotate-90 md:rotate-0">→</div>

            {/* Object exchange */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-retro-yellow to-retro-orange rounded-full flex items-center justify-center text-3xl mb-3 mx-auto animate-pulse">
                🎁
              </div>
              <div className="text-sm font-display font-semibold">
                Entrega objeto
              </div>
            </div>

            {/* Arrow */}
            <div className="text-4xl text-retro-cyan rotate-90 md:rotate-0">→</div>

            {/* Player 2 (eliminated) */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-offline-dark to-offline-darker border-2 border-retro-pink rounded-full flex items-center justify-center text-3xl mb-3 mx-auto opacity-50">
                💀
              </div>
              <div className="text-sm font-display font-semibold mb-2">Jugador 2</div>
              <div className="text-xs text-retro-pink bg-retro-pink/10 px-3 py-1 rounded border border-retro-pink/30">
                Eliminado
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-block bg-retro-cyan/10 border border-retro-cyan/30 rounded-lg px-6 py-3">
              <p className="text-sm text-retro-cyan font-display">
                Jugador 2 entrega su papel → Nuevo objetivo para Jugador 1
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="festival-card rounded-2xl p-8 md:p-10"
        >
          <h2 className="text-2xl font-display font-bold text-retro-cyan mb-6">
            Consejos estratégicos 🎯
          </h2>

          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <span className="text-2xl">🕵️</span>
              <span className="text-offline-light/80">
                <strong className="text-retro-yellow">Sé discreto:</strong> No reveles tu objetivo ni tu objeto a otros jugadores.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">🎭</span>
              <span className="text-offline-light/80">
                <strong className="text-retro-yellow">Actúa natural:</strong> Integra la entrega del objeto en una conversación o situación cotidiana.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">⚡</span>
              <span className="text-offline-light/80">
                <strong className="text-retro-yellow">Sé creativo:</strong> Piensa en formas originales de hacer que tu objetivo tome el objeto.
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">👀</span>
              <span className="text-offline-light/80">
                <strong className="text-retro-yellow">Mantente alerta:</strong> ¡Tú también puedes ser el objetivo de alguien!
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Winner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-block festival-card rounded-2xl px-8 py-6">
            <p className="text-lg text-offline-light/80">
              El último jugador en pie se corona como 
              <span className="gradient-text font-display font-bold text-2xl block mt-2">
                👑 El Padrino de Capafest 👑
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
