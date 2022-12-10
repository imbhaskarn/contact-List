import supertest from "supertest";
import app from "../src/app.js";

test("GET /", async () => {
  await supertest(app)
    .get("/")
    .expect(200)
    .then((res) => {
        console.log(res)
      expect(response.body.result).toBe("success");
      expect(res.body.data.message).toBe("Hello From Express!");
    });
});
