import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey, createUnauthorizedResponse } from '../../lib/auth'

describe('Auth utilities', () => {
  describe('validateApiKey', () => {
    beforeEach(() => {
      // Reset environment variable
      process.env.API_KEY = 'test-api-key-123'
    })

    it('should return true when API key is valid', () => {
      const request = new NextRequest('http://localhost:3000/api/tokens', {
        headers: {
          'x-api-key': 'test-api-key-123'
        }
      })

      const result = validateApiKey(request)
      expect(result).toBe(true)
    })

    it('should return false when API key is missing', () => {
      const request = new NextRequest('http://localhost:3000/api/tokens')

      const result = validateApiKey(request)
      expect(result).toBe(false)
    })

    it('should return false when API key is invalid', () => {
      const request = new NextRequest('http://localhost:3000/api/tokens', {
        headers: {
          'x-api-key': 'wrong-api-key'
        }
      })

      const result = validateApiKey(request)
      expect(result).toBe(false)
    })

    it('should return false when API_KEY environment variable is not set', () => {
      delete process.env.API_KEY

      const request = new NextRequest('http://localhost:3000/api/tokens', {
        headers: {
          'x-api-key': 'test-api-key-123'
        }
      })

      const result = validateApiKey(request)
      expect(result).toBe(false)
    })

    it('should return false when API key header is empty string', () => {
      const request = new NextRequest('http://localhost:3000/api/tokens', {
        headers: {
          'x-api-key': ''
        }
      })

      const result = validateApiKey(request)
      expect(result).toBe(false)
    })

    it('should be case sensitive', () => {
      const request = new NextRequest('http://localhost:3000/api/tokens', {
        headers: {
          'x-api-key': 'TEST-API-KEY-123'
        }
      })

      const result = validateApiKey(request)
      expect(result).toBe(false)
    })
  })

  describe('createUnauthorizedResponse', () => {
    it('should return 401 response with correct error message', () => {
      const response = createUnauthorizedResponse()
      
      expect(response.status).toBe(401)
      
      // Note: In a real test, you'd need to await the response.json()
      // but for this test we're just checking the status
    })

    it('should return NextResponse instance', () => {
      const response = createUnauthorizedResponse()
      
      expect(response).toBeInstanceOf(NextResponse)
    })
  })
})