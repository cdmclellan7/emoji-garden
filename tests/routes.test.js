// Integration Tests for API Routes

import request from "supertest";

import app from '../app.js';

describe("GET /emojis", () => {
    it("should respond with {success: true, payload: [all the emojis rows]}", async () => {
        await request(app)
            .get('/emojis')
            .expect(200)
            .expect( (res) => {
                const expected = {success: true, payload: expect.any(Array)};
                const actual = res.body;
                expect(actual).toStrictEqual(expected);
            });
    });
});

describe("POST /emojis", () => {
    it("should respond with {success: true, payload: [new emoji]}", async () => {
        const input = {code: 1, xPos: 2, yPos: 3};
        await request(app)
            .post('/emojis')
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