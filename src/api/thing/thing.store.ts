import { createStore } from "../../core/store";
import { Thing } from "../../types/Thing";

const createThingStore = () => createStore<Thing>();

export { createThingStore };
