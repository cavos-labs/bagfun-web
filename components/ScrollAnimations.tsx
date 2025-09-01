'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'

export default function ScrollAnimations() {
  useScrollAnimation()
  useKeyboardNavigation()
  return null
}