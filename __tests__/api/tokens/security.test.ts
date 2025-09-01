import { validateApiKey, createUnauthorizedResponse } from '../../../lib/auth'
import { NextRequest } from 'next/server'

// Simple security tests for token API
describe('Token API Security', () => {
  describe('API Key Validation', () => {
    it('should accept valid API key', () => {
      const request = new NextRequest('http://localhost:3000/api/tokens', {
        headers: {
          'x-api-key': 'test-api-key-123'
        }
      })

      const result = validateApiKey(request)
      expect(result).toBe(true)
    })

    it('should reject invalid API key', () => {
      const request = new NextRequest('http://localhost:3000/api/tokens', {
        headers: {
          'x-api-key': 'wrong-api-key'
        }
      })

      const result = validateApiKey(request)
      expect(result).toBe(false)
    })

    it('should reject missing API key', () => {
      const request = new NextRequest('http://localhost:3000/api/tokens')

      const result = validateApiKey(request)
      expect(result).toBe(false)
    })

    it('should be case sensitive', () => {
      const request = new NextRequest('http://localhost:3000/api/tokens', {
        headers: {
          'x-api-key': 'TEST-API-KEY-123' // uppercase
        }
      })

      const result = validateApiKey(request)
      expect(result).toBe(false)
    })
  })

  describe('Unauthorized Response', () => {
    it('should create proper 401 response', () => {
      const response = createUnauthorizedResponse()
      
      expect(response.status).toBe(401)
    })
  })

  describe('Environment Variables', () => {
    it('should have API key configured', () => {
      expect(process.env.API_KEY).toBeDefined()
      expect(process.env.API_KEY).toBe('test-api-key-123')
    })
  })
})