// Simple test to verify Jest setup
describe('Simple Test', () => {
  it('should pass', () => {
    expect(1 + 1).toBe(2)
  })

  it('should test environment variables', () => {
    expect(process.env.API_KEY).toBe('test-api-key-123')
  })
})