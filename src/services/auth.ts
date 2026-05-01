import api from './api'

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/api/auth/register', data)
  return res.data
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/api/auth/login', data)
  return res.data
}

export const saveToken = (token: string): void => {
  localStorage.setItem('token', token)
}

export const getToken = (): string | null => {
  return localStorage.getItem('token')
}

export const removeToken = (): void => {
  localStorage.removeItem('token')
}