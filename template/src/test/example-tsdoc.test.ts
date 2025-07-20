import { describe, it, expect } from 'vitest'
import { formatUser } from '../example-tsdoc'

describe('formatUser function', () => {
  it('should format user information correctly', () => {
    const user = { name: 'John Doe', email: 'john@example.com' }
    const result = formatUser(user)
    expect(result).toBe('John Doe (john@example.com)')
  })

  it('should throw error for invalid user', () => {
    expect(() => formatUser({ name: '', email: '' })).toThrow('Invalid user object')
  })

  it('should throw error for missing name', () => {
    expect(() => formatUser({ name: '', email: 'test@example.com' })).toThrow('Invalid user object')
  })

  it('should throw error for missing email', () => {
    expect(() => formatUser({ name: 'John', email: '' })).toThrow('Invalid user object')
  })
})
