import request from 'supertest'
import app from '../config/app'

describe('Cors Middleware', () => {
  test('should return default Content-Type as JSON', async () => {
    app.get('/test_content_type_json', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_content_type_json')
      .expect('content-type', /json/)
  })

  test('should return XML when forced', async () => {
    app.get('/test_content_type_xml', (_req, res) => {
      res.type('xml')
      res.send()
    })

    await request(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
