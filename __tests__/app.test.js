import dotenv from "dotenv";
dotenv.config();
import supertest from "supertest";
import app from "../src/app.js";

test("GET /", async () => {
  await supertest(app)
    .get("/")
    .expect(200)
    .then(async (res) => {
      await expect(res.body.result).toBe("success");
      await expect(res.body.data.message).toBe("Hello From Express!");
    });
});
