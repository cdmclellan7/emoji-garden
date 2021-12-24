// Integration Tests for API Routes

import request from "supertest";

import app from '../app.js';
import { pool } from '../db/index.js';

afterAll( async () => {
    await pool.end();
});

describe("GET /api/emojis", () => {
    it("should respond with {success: true, payload: [all the emojis rows]}", async () => {
        await request(app)
            .get('/api/emojis')
            .expect(200)
            .expect( (res) => {
                const expected = {success: true, payload: expect.any(Array)};
                const actual = res.body;
                expect(actual).toStrictEqual(expected);
            });
    });
});

describe("GET /api/emojis/:id", () => {
    it("should respond with {success: true, payload: [the emoji with the id from the req.params]}", async () => {
        const idParam = 1;
        await request(app)
            .get(`/api/emojis/${idParam}`)
            .expect(200)
            .expect( (res) => {
                const expected = {success: true, payload: [{id: idParam, 
                                                           dec_code: expect.any(Number), 
                                                           x_position: expect.any(Number), 
                                                           y_position: expect.any(Number)}]};
                const actual = res.body;
                expect(actual).toStrictEqual(expected);
            });
    });
});

describe("POST /api/emojis", () => {
    it("should respond with {success: true, payload: [new emoji]}", async () => {
        const input = {code: 1, xPos: 2, yPos: 3};
        await request(app)
            .post('/api/emojis')
            .send(input)
            .expect(200)
            .expect( (res) => {
                const expected = {success: true, payload: [{id: expect.any(Number), 
                                                            dec_code: input.code, 
                                                            x_position: input.xPos, 
                                                            y_position: input.yPos}]};
                const actual = res.body;
                expect(actual).toStrictEqual(expected);
            })
    });
});
