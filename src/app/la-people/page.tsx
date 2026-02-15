'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import AttendeeCard from '@/components/AttendeeCard'
import { sampleAttendees } from '@/lib/seedData'

export default function LaPeoplePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  // Get all unique groups
  const allGroups = useMemo(() => {
    const groups = new Set<string>()
    sampleAttendees.forEach(attendee => {
      attendee.group_names.forEach(group => groups.add(group))
    })
    return Array.from(groups).sort()
  }, [])

  // Filter attendees
  const filteredAttendees = useMemo(() => {
    return sampleAttendees.filter(attendee => {
      const matchesSearch = attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGroup = !selectedGroup || attendee.group_names.includes(selectedGroup)
      return matchesSearch && matchesGroup
    })
  }, [searchTerm, selectedGroup])

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold gradient-text mb-4">
            La People
          </h1>
          <p className="text-xl md:text-2xl text-retro-cyan font-display mb-2">
            Los protagonistas del festival
          </p>
          <p className="text-offline-light/60">
            {filteredAttendees.length} asistente{filteredAttendees.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 space-y-4"
        >
          {/* Search */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 bg-offline-dark border border-retro-purple/30 rounded-full focus:outline-none focus:ring-2 focus:ring-retro-purple focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Group filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedGroup(null)}
              className={`px-4 py-2 rounded-full font-display text-sm transition-all ${
                selectedGroup === null
                  ? 'bg-gradient-to-r from-retro-purple to-retro-pink text-white'
                  : 'bg-offline-dark border border-retro-purple/30 text-offline-light/80 hover:border-retro-purple/60'
              }`}
            >
              Todos
            </button>
            {allGroups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 rounded-full font-display text-sm transition-all ${
                  selectedGroup === group
                    ? 'bg-gradient-to-r from-retro-purple to-retro-pink text-white'
                    : 'bg-offline-dark border border-retro-purple/30 text-offline-light/80 hover:border-retro-purple/60'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Attendees Grid */}
        {filteredAttendees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAttendees.map((attendee, index) => (
              <motion.div
                key={attendee.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AttendeeCard attendee={attendee} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-offline-light/60">
              No se encontraron asistentes con esos criterios
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
