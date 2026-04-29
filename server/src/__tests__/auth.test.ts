import request from 'supertest'
import app from '../index'
import { prisma } from '../lib/prisma'

beforeEach(async () => {
  await prisma.transaction.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.transaction.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()
  await prisma.$disconnect()
})

// ─── REGISTER ───────────────────────────────────────────

describe('POST /api/auth/register', () => {
  it('TC-001: should register a new user and return a token', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Calvin Then',
      email: 'calvin@test.com',
      password: 'password123',
    })

    expect(res.status).toBe(201)
    expect(res.body.token).toBeDefined()
    expect(res.body.user.email).toBe('calvin@test.com')
    expect(res.body.user.name).toBe('Calvin Then')
  })

  it('TC-002: should return 400 if email already registered', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Calvin Then',
      email: 'calvin@test.com',
      password: 'password123',
    })

    const res = await request(app).post('/api/auth/register').send({
      name: 'Calvin Then',
      email: 'calvin@test.com',
      password: 'password123',
    })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Email already registered')
  })

  it('TC-003: should return 400 if fields are missing', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'calvin@test.com',
    })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe('All fields are required')
  })

  it('TC-008: should never expose passwordHash in response', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Calvin Then',
      email: 'calvin@test.com',
      password: 'password123',
    })

    expect(res.body.user.passwordHash).toBeUndefined()
  })
})

// ─── LOGIN ───────────────────────────────────────────────

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Calvin Then',
      email: 'calvin@test.com',
      password: 'password123',
    })
  })

  it('TC-004: should login with valid credentials and return a token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'calvin@test.com',
      password: 'password123',
    })

    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.user.email).toBe('calvin@test.com')
  })

  it('TC-005: should return 401 for wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'calvin@test.com',
      password: 'wrongpassword',
    })

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid credentials')
  })

  it('TC-006: should return 401 for unknown email', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'unknown@test.com',
      password: 'password123',
    })

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid credentials')
  })

  it('TC-007: should return 400 if fields are missing', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'calvin@test.com',
    })

    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Email and password are required')
  })
})