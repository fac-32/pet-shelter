import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from './server'


describe("GET /details/{state}", () => {
    // test with adopted optional state
    it("returns array of adopted animals", async () => {
        const response = await request(app).get("/details/adopted");
        expect(response.status).toBe(200)
    });

    // test with rescued optional state
    it("returns array of rescued animals", async () => {
        const response = await request(app).get("/details/rescued");
        expect(response.status).toBe(200)
    });

    // test with no optional state !! fails 
    // !! your documentation is wrong because its not optional
    it("returns array of all animals", async () => {
        const response = await request(app).get("/details");
        expect(request.status).toBe(200)
    });
    
});
