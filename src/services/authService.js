// Mock auth service - in production, this would call a real API
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Eleanor Vance',
    school: 'Maplewood High',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR31i5pbu00WGywHEC4K9RXt5w-m9JGsb45FvBFrr54jbJVFGlnnAfPjJzLieOJWeZsCDx3pYtMSH6e3X7-0IiMajOjORp9ybblPWQN4MZM_0KuDwMdtiOz52LZTqgyAM2-vavpFZRuLvMranDUQMucJ1Eeb-wUj--aaVV0c-qz08KbsKlPpFA2BP_MhZ-DqzZ8OUuKVrUYkc0wc7Y6sQ8dqyST1akWI0SwcwmbSBruCecxglnp1c71V4AYpSjBHH5r9_R7CrDSHQM',
  },
]

// Simple JWT-like token (base64 encoded JSON)
const createToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  }
  return btoa(JSON.stringify(payload))
}

const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token))
    if (payload.exp && payload.exp < Date.now()) {
      return null // Token expired
    }
    return payload
  } catch {
    return null
  }
}

export const authService = {
  login: async (email, password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const token = createToken(user)
    const { password: _, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
      token,
    }
  },

  getUserFromToken: (token) => {
    const payload = decodeToken(token)
    if (!payload) return null

    const user = MOCK_USERS.find((u) => u.id === payload.userId)
    if (!user) return null

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  },

  logout: () => {
    // Clear any additional auth data if needed
    localStorage.removeItem('token')
  },

  isTokenValid: (token) => {
    const payload = decodeToken(token)
    return payload !== null
  },
}

