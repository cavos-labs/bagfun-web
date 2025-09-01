'use client'

export default function ScrollIndicator() {
  const scrollToNext = () => {
    document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button 
      onClick={scrollToNext}
      className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors font-inter text-xs sm:text-sm fade-in-up cursor-pointer"
    >
      scroll down ↓
    </button>
  )
}