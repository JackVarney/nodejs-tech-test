type CreateFunction<T> = (entity: Omit<T, "id" | "dateCreated">) => T;
type GetAllFunction<T> = () => T[];
type GetByIdFunction<T> = (id: string) => T | undefined;

export interface Store<T extends { id: string; dateCreated: Date }> {
  getAll: GetAllFunction<T>;
  create: CreateFunction<T>;
  getById: GetByIdFunction<T>;
}

const createStore = <T extends { id: string; dateCreated: Date }>(
  store: Map<string, T> = new Map()
): Store<T> => {
  const getAll: GetAllFunction<T> = () =>
    [...store.entries()].map(([key, value]) => ({
      ...value,
      id: key
    }));

  const create: CreateFunction<T> = entity => {
    const id = String([...store.entries()].length + 1);
    const dateCreated = new Date(Date.now());

    store.set(id, {
      ...entity,
      id,
      dateCreated
    } as T);

    return store.get(id)!;
  };

  const getById: GetByIdFunction<T> = id => store.get(id);

  return {
    getAll,
    create,
    getById
  };
};

export { createStore };
