import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import request from "supertest";
import axios from "axios";
import { app } from "./index";

let server: import("http").Server;

beforeAll(() => {
  server = app.listen(8081);
});

afterAll(() => {
  server.close();
});

describe("GET /", () => {
  it("should fetch data successfully", async () => {
    const mockData = { data: "mock data" };
    vi.spyOn(axios, "get").mockResolvedValueOnce({ data: mockData });
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  it("should handle errors", async () => {
    vi.spyOn(axios, "get").mockRejectedValueOnce(
      new Error("Error fetching data")
    );
    const response = await request(app).get("/");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error fetching data");
  });
});
