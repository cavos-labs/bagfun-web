'use client'

import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'create', label: 'Create' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'waitlist', label: 'Waitlist' }
]

export default function SectionNavigation() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
      rootMargin: '-10% 0px -10% 0px'
    })

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col space-y-3">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 group relative ${
              activeSection === id
                ? 'bg-white border-white'
                : 'bg-transparent border-gray-500 hover:border-white'
            }`}
            aria-label={`Go to ${label} section`}
          >
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-xs font-inter text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}