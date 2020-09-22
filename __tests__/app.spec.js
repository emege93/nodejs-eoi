const request = require('supertest');

const app = require("../app");


describe(
    'Testing Jest',
    () => {
        it('Sums correctly', async () => {
            expect(1 + 1).toEqual(2);
        })

        if('Should go to login', async () => {
            const response = await request(app)
                .post('/api_login')
                .send({
                    'email': 'micorreo@example.com',
                    'password': 'mipass'
                })
                .get('/login');
            expect(response.statusCode).toEqual(200);
        });

        if('Test Api Login', async () => {
            const response = await request(app)
                .get('/login');
            expect(response.statusCode).toEqual(200);
        });
    }
)