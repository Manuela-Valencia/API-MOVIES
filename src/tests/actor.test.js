const request = require("supertest");
const app = require("../app");

const URL_ACTOR = "/api/v1/actors";

const actor = {
    firstName: "Prueba",
    lastName: "uno",
    nationality: "Colombia",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/LINCOLN.jpg/800px-LINCOLN.jpg",
    birthday: "2000-05-01",
};

let actorId;

test(`POST -> 'URL_ACTOR' should return status code 201`, async () => {
    const res = await request(app).post(URL_ACTOR).send(actor);

    actorId = res.body.id;

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("birthday", actor.birthday);
});

test(`GET -> 'URL_ACTOR' should return status code 200 and res.body.length = 1`, async () => {
    const res = await request(app).get(URL_ACTOR);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveLength(1);
});

test(`GET ONE -> 'URL_ACTOR/:id' should return status code 200 and res.body toBe defined`, async () => {
    const res = await request(app).get(`${URL_ACTOR}/${actorId}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("nationality", actor.nationality);
});

test(`Update -> 'URL_ACTOR/:id' should return status code 200 `, async () => {
    const actorUpdate = {
        firstName: "ActualizadaP",
        lastName: "ActualizadaP",
        nationality: "Canada",
    };

    const res = await request(app)
        .put(`${URL_ACTOR}/${actorId}`)
        .send(actorUpdate);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("nationality", actorUpdate.nationality);
});

test(`Delete -> 'URL_ACTOR/:id' should return status code 204`, async () => {
    const res = await request(app).delete(`${URL_ACTOR}/${actorId}`);
    expect(res.status).toBe(204);
});