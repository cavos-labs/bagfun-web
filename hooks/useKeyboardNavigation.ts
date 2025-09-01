'use client'

import { useEffect } from 'react'

const sections = ['hero', 'create', 'mobile', 'waitlist']

export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        const currentIndex = sections.findIndex(id => {
          const element = document.getElementById(id)
          if (!element) return false
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        })
        
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1)
        const nextSection = document.getElementById(sections[nextIndex])
        if (nextSection && nextIndex !== currentIndex) {
          nextSection.scrollIntoView({ behavior: 'smooth' })
        }
      }
      
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        const currentIndex = sections.findIndex(id => {
          const element = document.getElementById(id)
          if (!element) return false
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        })
        
        const prevIndex = Math.max(currentIndex - 1, 0)
        const prevSection = document.getElementById(sections[prevIndex])
        if (prevSection && prevIndex !== currentIndex) {
          prevSection.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
}