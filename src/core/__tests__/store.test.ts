import { createStore, Store } from "../store";

Date.now = jest.fn(() => 0);

const now = new Date("1970-01-01T00:00:00.000Z");

it("should create a store", () => {
  const store = createStore();

  expect(store.create).toBeTruthy();
  expect(store.getAll).toBeTruthy();
  expect(store.getById).toBeTruthy();
});

describe("Store", () => {
  let store: Store<{ id: string; dateCreated: Date; name: string }>;

  beforeAll(() => {
    store = createStore(
      new Map([
        ["1", { id: "1", name: "some name", dateCreated: new Date(Date.now()) }]
      ])
    );
  });

  it("should get all items", () => {
    const [item] = store.getAll();

    expect(item).toEqual({
      id: "1",
      name: "some name",
      dateCreated: now
    });
  });

  it("should get an item by its id", () => {
    const item = store.getById("1");

    expect(item).toEqual({
      id: "1",
      name: "some name",
      dateCreated: now
    });
  });

  it("should create an item", () => {
    const createdItem = store.create({ name: "some other name" });

    expect(createdItem).toEqual({
      id: "2",
      name: "some other name",
      dateCreated: now
    });

    expect(store.getAll()[1]).toEqual({
      id: "2",
      name: "some other name",
      dateCreated: now
    });
  });
});
