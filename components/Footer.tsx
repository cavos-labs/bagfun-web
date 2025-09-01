export default function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-gray-800 py-4 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo/Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-[family-name:var(--font-rama)] text-xl text-white mb-2">
              BAG.FUN
            </h3>
            <p className="font-inter text-gray-400 text-sm">
              meme coins everywhere
            </p>
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {/* X/Twitter */}
            <a
              href="https://x.com/bagdotfun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Follow us on X"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            
            {/* Services Website */}
            <a
              href="https://aegis.cavos.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Visit our services"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
              </svg>
            </a>
            
            {/* Telegram */}
            <a
              href="https://t.me/adrianvrj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Contact us on Telegram"
            >
              <img 
                src="/tg-icon.svg" 
                alt="Telegram" 
                width="24" 
                height="24"
                className="w-6 h-6 brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-200"
              />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="font-inter text-gray-500 text-xs">
              © 2025 bag.fun. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}