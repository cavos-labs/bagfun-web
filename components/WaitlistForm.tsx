'use client'

import { useState } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist')
      }

      setStatus('success')
      setMessage('Successfully joined the waitlist!')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      {status === 'success' ? (
        <div className="text-center">
          <p className="text-green-400 font-inter text-base sm:text-lg mb-4">{message}</p>
          <button
            onClick={() => {
              setStatus('idle')
              setMessage('')
            }}
            className="text-gray-400 hover:text-white transition-colors font-inter text-sm underline"
          >
            Join another email?
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="leave your email buddy"
              required
              disabled={status === 'loading'}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 font-inter text-sm sm:text-base focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 disabled:opacity-50"
            />
          </div>
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full relative overflow-hidden cursor-pointer"
          >
            <img 
              src="/join-waitlist.png" 
              alt="Join Waitlist"
              className="w-full h-auto hover:opacity-90 transition-opacity disabled:opacity-50"
            />
          </button>

          {status === 'error' && (
            <p className="text-red-400 font-inter text-xs sm:text-sm text-center">{message}</p>
          )}
        </form>
      )}
    </div>
  )
}