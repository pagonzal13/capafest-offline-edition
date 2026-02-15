'use client'

import { motion } from 'framer-motion'

const timelineEvents = [
  // VIERNES
  { day: 'viernes', icon: '🎉', title: 'Empezamos!', desc: 'Apertura de puertas y jolgorio' },
  { day: 'viernes', icon: '🏊‍♂️', title: 'Un poquito de pisci y jajas', desc: '' },
  { day: 'viernes', icon: '🔥', title: 'Cabrones a ENCENDER LA BBQ!!!!', desc: 'A echar una manita, venga' },
  { day: 'viernes', icon: '🍕', title: 'Cena carnívora y de plantas a la bbq', desc: 'Viernes' },
  { day: 'viernes', icon: '🪩', title: 'Dance', desc: 'Taki Taki Variado' },
  { day: 'viernes', icon: '🕺', title: 'DJ Polita', desc: 'DJs' },
  { day: 'viernes', icon: '🏋️', title: 'AdolFit', desc: 'DJs' },
  { day: 'viernes', icon: '🥁', title: 'Capreini Drum & Bass', desc: 'DJs' },
  { day: 'viernes', icon: '🎲', title: 'Lo que surja', desc: 'Como surja' },
  { day: 'viernes', icon: '😴', title: 'A recargarse que mañana hay más', desc: 'Ibuprofeno y a la cama' },
  
  // SÁBADO
  { day: 'sabado', icon: '🥘', title: 'A comeeer!', desc: 'Paella' },
  { day: 'sabado', icon: '🍹', title: 'Quevedo Beach Club', desc: 'Cocktail bar feat DJ Paulish' },
  { day: 'sabado', icon: '🥦', title: 'Cena picoteo', desc: 'Pizzas, tortillas, y lo que cada uno pille' },
  { day: 'sabado', icon: '🎭', title: 'Carnavaaal, Carnavaaal!', desc: 'Toca lucir los disfraces infernales' },
  { day: 'sabado', icon: '🏆', title: 'Capawards', desc: 'Ceremonia de la 5ª edición (disfrazados)' },
  { day: 'sabado', icon: '🪩', title: 'Dance', desc: 'Como el viernes pero rellenos de carne y pizza' },
  { day: 'sabado', icon: '🎧', title: 'V4', desc: 'DJs' },
  { day: 'sabado', icon: '🍄', title: 'Techno Setas', desc: 'DJs' },
  { day: 'sabado', icon: '⚔️', title: 'Capa y espada (Capreini B2B V4)', desc: 'DJs' },
  { day: 'sabado', icon: '💋', title: 'Santini', desc: 'Beso o chupito' },
  
  // DOMINGO
  { day: 'domingo', icon: '🌅', title: 'Amanecer muertos vivientes', desc: 'Esta vez con CHURROS' },
  { day: 'domingo', icon: '🧹', title: 'Recogición', desc: 'A echar una manita, venga' },
  { day: 'domingo', icon: '👋', title: 'A vuestra puta casa', desc: 'Hasta el próximo año!' },
]

const dayLabels = {
  viernes: 'Viernes',
  sabado: 'Sábado',
  domingo: 'Domingo',
}

const dayColors = {
  viernes: 'from-retro-purple to-retro-pink',
  sabado: 'from-retro-cyan to-retro-blue',
  domingo: 'from-retro-yellow to-retro-orange',
}

export default function CartelPage() {
  const groupedEvents = {
    viernes: timelineEvents.filter(e => e.day === 'viernes'),
    sabado: timelineEvents.filter(e => e.day === 'sabado'),
    domingo: timelineEvents.filter(e => e.day === 'domingo'),
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-4">
            Cartel del finde
          </h1>
          <p className="text-xl md:text-2xl text-retro-cyan font-display">
            Que no te lo cuenten
          </p>
        </motion.div>

        {/* Timeline for each day */}
        <div className="space-y-20">
          {Object.entries(groupedEvents).map(([day, events], dayIndex) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: dayIndex * 0.2 }}
            >
              {/* Day Header */}
              <div className="mb-8">
                <div className={`inline-block px-8 py-3 bg-gradient-to-r ${dayColors[day as keyof typeof dayColors]} rounded-full`}>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                    {dayLabels[day as keyof typeof dayLabels]}
                  </h2>
                </div>
              </div>

              {/* Events */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-retro-purple via-retro-cyan to-retro-pink opacity-30" />

                <div className="space-y-6">
                  {events.map((event, index) => (
                    <motion.div
                      key={`${day}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="relative pl-20"
                    >
                      {/* Icon bubble */}
                      <div className="absolute left-0 w-16 h-16 bg-gradient-to-br from-offline-dark to-offline-darker border-2 border-retro-purple/50 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-retro-purple/20">
                        {event.icon}
                      </div>

                      {/* Event card */}
                      <div className="festival-card rounded-xl p-6 group">
                        <h3 className="text-xl font-display font-bold mb-2 group-hover:text-retro-cyan transition-colors">
                          {event.title}
                        </h3>
                        {event.desc && (
                          <p className="text-offline-light/70">
                            {event.desc}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="festival-card rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-lg text-offline-light/80">
              ⏰ Los horarios son aproximados y pueden cambiar según el flow de la fiesta
            </p>
            <p className="text-sm text-offline-light/60 mt-3">
              (Como siempre, vamos)
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
