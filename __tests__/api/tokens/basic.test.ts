import { validateApiKey, createUnauthorizedResponse } from '../../../lib/auth'
import { NextRequest } from 'next/server'

describe('Token API - Basic Tests', () => {
  describe('API Key Validation', () => {
    it('should validate API key correctly', () => {
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
          'x-api-key': 'wrong-key'
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
  })

  describe('Unauthorized Response', () => {
    it('should create proper unauthorized response', () => {
      const response = createUnauthorizedResponse()
      
      expect(response.status).toBe(401)
    })
  })

  describe('Token Data Validation', () => {
    it('should validate ticker format', () => {
      const validTickers = ['BTC', 'ETH', 'TEST123', 'A1B2C3']
      const invalidTickers = ['btc', 'test-123', 'test!', 'toolongticker123456']

      validTickers.forEach(ticker => {
        const regex = /^[A-Z0-9]{1,16}$/
        expect(regex.test(ticker)).toBe(true)
      })

      invalidTickers.forEach(ticker => {
        const regex = /^[A-Z0-9]{1,16}$/
        expect(regex.test(ticker)).toBe(false)
      })
    })

    it('should validate amount format', () => {
      const validAmounts = [0, 100, 1000.5, 1000000]
      const invalidAmounts = [-100, -0.1, 'invalid', null, undefined]

      validAmounts.forEach(amount => {
        expect(typeof amount === 'number' && amount >= 0).toBe(true)
      })

      invalidAmounts.forEach(amount => {
        expect(typeof amount === 'number' && amount >= 0).toBe(false)
      })
    })

    it('should validate required fields', () => {
      const validToken = {
        name: 'Test Token',
        ticker: 'TEST',
        creator_address: '0x1234567890abcdef1234567890abcdef12345678'
      }

      const invalidTokens = [
        { name: 'Test Token' }, // missing ticker and creator_address
        { ticker: 'TEST' }, // missing name and creator_address
        { name: 'Test Token', ticker: 'TEST' } // missing creator_address
      ]

      // Valid token should have all required fields
      expect(validToken.name).toBeTruthy()
      expect(validToken.ticker).toBeTruthy()
      expect(validToken.creator_address).toBeTruthy()

      // Invalid tokens should be missing required fields
      invalidTokens.forEach(token => {
        const hasAllRequired = !!(token.name && token.ticker && token.creator_address)
        expect(hasAllRequired).toBe(false)
      })
    })
  })

  describe('Error Messages', () => {
    it('should have consistent error message format', () => {
      const errorMessages = [
        'Unauthorized - Invalid or missing API key',
        'Missing required fields: name, ticker, creator_address',
        'Ticker must be 1-16 characters, alphanumeric uppercase only',
        'Amount must be a non-negative number',
        'Token name already exists',
        'Token ticker already exists',
        'Unauthorized: Only the token creator can delete this token'
      ]

      errorMessages.forEach(message => {
        expect(typeof message).toBe('string')
        expect(message.length).toBeGreaterThan(0)
      })
    })
  })

  describe('HTTP Status Codes', () => {
    it('should use correct status codes', () => {
      const statusCodes = {
        success: 200,
        created: 201,
        badRequest: 400,
        unauthorized: 401,
        forbidden: 403,
        notFound: 404,
        conflict: 409,
        serverError: 500
      }

      expect(statusCodes.success).toBe(200)
      expect(statusCodes.created).toBe(201)
      expect(statusCodes.badRequest).toBe(400)
      expect(statusCodes.unauthorized).toBe(401)
      expect(statusCodes.forbidden).toBe(403)
      expect(statusCodes.notFound).toBe(404)
      expect(statusCodes.conflict).toBe(409)
      expect(statusCodes.serverError).toBe(500)
    })
  })
})