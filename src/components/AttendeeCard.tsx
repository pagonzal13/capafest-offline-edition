'use client'

import { useState } from 'react'
import type { Attendee } from '@/types'

interface AttendeeCardProps {
  attendee: Attendee
}

const editionLabels: Record<string, string> = {
  aliens: '👽 Aliens',
  love: '❤️ Love',
  awaked: '👁️ Awaked',
  human: '🧬 Human',
  hippie: '🌸 Hippie',
  metro: '🚇 Metro',
  inferno: '🔥 Inferno',
}

export default function AttendeeCard({ attendee }: AttendeeCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      className={`flip-card cursor-pointer ${isFlipped ? 'flipped' : ''}`}
      onClick={handleClick}
      style={{ height: '400px' }}
    >
      <div className="flip-card-inner">
        {/* Front of card */}
        <div className="flip-card-front festival-card rounded-2xl overflow-hidden">
          <div className="relative h-full flex flex-col">
            {/* Photo */}
            <div className="flex-1 bg-gradient-to-br from-retro-purple/20 to-retro-pink/20 flex items-center justify-center">
              {attendee.photo_url ? (
                <img
                  src={attendee.photo_url}
                  alt={attendee.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-6xl">👤</div>
              )}
            </div>
            
            {/* Name */}
            <div className="p-6 bg-gradient-to-t from-offline-darker to-transparent">
              <h3 className="text-2xl font-display font-bold text-center">
                {attendee.name}
              </h3>
            </div>

            {/* Tap hint */}
            <div className="absolute top-4 right-4 bg-retro-purple/80 text-white text-xs px-3 py-1 rounded-full">
              Tap para ver más
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="flip-card-back festival-card rounded-2xl overflow-hidden">
          <div className="relative h-full flex flex-col p-6 bg-gradient-to-br from-offline-dark/95 to-offline-darker/95">
            {/* Room info */}
            <div className="mb-4">
              <div className="inline-flex items-center space-x-2 bg-retro-purple/20 px-4 py-2 rounded-full">
                <span className="text-xl">🚪</span>
                <span className="font-display font-semibold">{attendee.room}</span>
              </div>
            </div>

            {/* Previous editions */}
            <div className="mb-4">
              <h4 className="text-sm font-display font-bold text-retro-cyan mb-2 uppercase tracking-wider">
                Ediciones
              </h4>
              <div className="flex flex-wrap gap-2">
                {attendee.previous_editions.map((edition) => (
                  <span
                    key={edition}
                    className="text-xs bg-offline-darker border border-retro-purple/30 px-2 py-1 rounded"
                  >
                    {editionLabels[edition] || edition}
                  </span>
                ))}
              </div>
            </div>

            {/* Groups */}
            <div>
              <h4 className="text-sm font-display font-bold text-retro-cyan mb-2 uppercase tracking-wider">
                Grupos
              </h4>
              <div className="flex flex-wrap gap-2">
                {attendee.group_names.map((group) => (
                  <span
                    key={group}
                    className="px-3 py-1 bg-gradient-to-r from-retro-purple to-retro-pink rounded-full text-sm font-semibold text-white"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>

            {/* Tap hint */}
            <div className="absolute top-4 right-4 bg-retro-cyan/80 text-offline-darker text-xs px-3 py-1 rounded-full font-semibold">
              Tap para volver
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
