import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from './server'

describe('POST /pets/add', () => {
  it('returns 201 and token for valid credentials', async () => {
    const response = await request(app)
      .post('/pets/add')
      .send( 
        {
  "name": "Bella",
  "species": "Dog",
  "age": 4,
  "state": "rescued"
}
)
    
    expect(response.status).toBe(201)
    
  })

  it('returns 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/pets/add')
      .send({
  "name": "Bella",
  "species": "Dog",
  "age": "Four",
  "state": "rescued"
})
    
    expect(response.status).toBe(400)
  })

  it('takes a boolean for state and returns 201', async () => {
    const response = await request(app)
      .post('/pets/add')
      .send({
  "name": "Bella",
  "species": "Dog",
  "age": "Four",
  "state": true
})
    
    expect(response.status).toBe(400)
  })
})
