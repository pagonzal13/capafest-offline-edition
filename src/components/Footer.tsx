'use client'

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-retro-purple/20 bg-offline-darker/50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-retro-purple to-retro-pink rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">C</span>
              </div>
              <span className="text-lg font-display font-bold gradient-text">
                Capafest
              </span>
            </div>
            <p className="text-sm text-offline-light/60">
              Festival privado. Offline edition 2026.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-retro-cyan">
              Enlaces
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-offline-light/60 hover:text-retro-cyan transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/cartel" className="text-sm text-offline-light/60 hover:text-retro-cyan transition-colors">
                  Cartel
                </a>
              </li>
              <li>
                <a href="/la-people" className="text-sm text-offline-light/60 hover:text-retro-cyan transition-colors">
                  La people
                </a>
              </li>
              <li>
                <a href="/capawards" className="text-sm text-offline-light/60 hover:text-retro-cyan transition-colors">
                  Capawards
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-retro-cyan">
              Info
            </h3>
            <ul className="space-y-2 text-sm text-offline-light/60">
              <li>28-30 Agosto 2026</li>
              <li>Finca La Calancha</li>
              <li>Cuerva, Toledo</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4 text-retro-cyan">
              Social
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/capafest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-retro-purple/20 hover:bg-retro-purple/40 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://open.spotify.com/playlist/capafest"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-retro-purple/20 hover:bg-retro-purple/40 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Spotify"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-retro-purple/20 text-center text-sm text-offline-light/40">
          <p>© 2026 Capafest. Offline edition. Hecho con 💜 para los amigos.</p>
        </div>
      </div>
    </footer>
  )
}
