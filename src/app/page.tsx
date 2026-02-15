'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo with breathing animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-retro-purple to-retro-pink rounded-full mb-6 motion-safe:animate-breathe">
              <span className="text-6xl font-bold text-white">C</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold gradient-text mb-4"
          >
            Capafest
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-display text-retro-cyan mb-12"
          >
            Offline edition
          </motion.p>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-2 mb-12"
          >
            <p className="text-xl md:text-2xl text-offline-light font-display">
              28, 29, 30 de Agosto 2026
            </p>
            <p className="text-lg md:text-xl text-offline-light/80">
              Finca 'La Calancha', Cuerva, Toledo
            </p>
          </motion.div>

          {/* Intro Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="festival-card rounded-2xl p-8 md:p-10">
              <p className="text-lg leading-relaxed text-offline-light/90 mb-6">
                Bienvenidos a la <span className="text-retro-cyan font-semibold">8ª edición</span> de Capafest. 
                Lo que empezó como una broma, como un simple fin de semana entre amigos en una casa, 
                se ha convertido en <span className="text-retro-pink font-semibold">algo mucho más grande</span>.
              </p>
              <p className="text-lg leading-relaxed text-offline-light/90 mb-6">
                Hemos pasado por ediciones temáticas de todo tipo: aliens, love, awaked, human, hippie, 
                metro, inferno... Cada una con su propia personalidad, cada una dejando recuerdos imborrables.
              </p>
              <p className="text-lg leading-relaxed text-offline-light/90">
                Ahora, en tiempos donde la vida nos dispersa, Capafest se ha convertido en 
                <span className="text-retro-yellow font-semibold"> ese fin de semana único del año</span> donde 
                distintos grupos de amigos se reúnen. Es nuestro momento para desconectar del mundo digital, 
                volver a lo real, a lo offline, a lo que importa de verdad: <span className="gradient-text font-semibold">estar presentes</span>.
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link href="/cartel" className="btn-primary inline-block">
              Descubre el cartel de este año 🎵
            </Link>
          </motion.div>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 text-offline-light/60"
          >
            Prepárate para tres días inolvidables de música, risas y buena vibra ✨
          </motion.p>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-retro-purple/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-retro-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Cartel', emoji: '🎵', href: '/cartel', desc: 'Descubre el programa completo' },
              { title: 'La People', emoji: '👥', href: '/la-people', desc: 'Conoce a los asistentes' },
              { title: 'Capawards', emoji: '🏆', href: '/capawards', desc: 'Vota a los mejores' },
              { title: 'La Mafia', emoji: '🎯', href: '/mafia', desc: 'Las reglas del juego' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={item.href} className="block h-full">
                  <div className="festival-card rounded-2xl p-6 h-full group cursor-pointer">
                    <div className="text-4xl mb-4">{item.emoji}</div>
                    <h3 className="text-xl font-display font-bold mb-2 group-hover:text-retro-cyan transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-offline-light/60">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
