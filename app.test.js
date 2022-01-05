const request = require("supertest");
const app = require("./app");

describe("HTTP API endpoint tests", () => {

    test("the server returns 200 with json that contains the list of user data", async () => {
        await request(app)
            .get("/")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                expect(res.body.data.length).toBe(1);
                expect(res.body.data[0].email).toBe("tech@sendjoynow.com");
            });
    });

    test("the server returns 201 Created HTTP status with the updated user list", async () => {
        await request(app)
            .post("/send")
            .expect("Content-Type", /json/)
            .send({
                email: "amal@getsolar.ai",
              })
            .expect(201)
            .then((res) => {
                expect(res.body.data.length).toBe(2);
                expect(res.body.data[0].email).toBe("tech@sendjoynow.com");
                expect(res.body.data[1].email).toBe("amal@getsolar.ai");
            });
    });

    test("the server returns a 404 status code with a custom message", async () => {
        await request(app)
            .get("/unknown")
            .expect(404)
            .then((res) => {
                expect(res.text).toContain('Cannot GET /unknown')
            })
    })
})