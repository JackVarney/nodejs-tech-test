import request from "supertest";
import { createApp } from "../../../core/app";
import { createThingStore } from "../thing.store";

Date.now = jest.fn(() => 0);
const now = "1970-01-01T00:00:00.000Z";

let app: request.SuperTest<request.Test>;

const createThing = (
  body: any = {
    name: "some name",
    value: 1234
  }
) => app.post("/api/thing").send(body);

beforeEach(() => {
  app = request(createApp({ thingStore: createThingStore() }));
});

it("should create a thing", async () => {
  const { body } = await createThing().expect(201);

  expect(body).toEqual({
    name: "some name",
    value: 1234,
    id: "1",
    dateCreated: now
  });
});

it("should fail to create a thing", async () => {
  await createThing({}).expect(400);
  await createThing({ value: 123, name: 123 }).expect(400);
  await createThing({ value: "not a number", name: "not a number" }).expect(
    400
  );
});

it("should create a thing then get a thing", async () => {
  await createThing();

  const {
    body: [createdItem]
  } = await app.get("/api/thing").expect(200);

  expect(createdItem).toEqual({
    dateCreated: now,
    id: "1",
    name: "some name",
    value: 1234
  });
});

it("should create a thing then get a thing by its id", async () => {
  await createThing();

  const { body } = await app.get("/api/thing/1").expect(200);

  expect(body).toEqual({
    dateCreated: now,
    id: "1",
    name: "some name",
    value: 1234
  });
});

it("should return a message when no item found", async () => {
  const { body } = await app.get("/api/thing/1").expect(404);

  expect(body).toEqual("Thing not found");
});
