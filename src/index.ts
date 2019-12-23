import { createApp } from "./core/app";
import { createThingStore } from "./api/thing/thing.store";
import config from "./config";

const app = createApp({ thingStore: createThingStore() });

app.listen(config.port, () =>
  console.log("app listening on port: " + config.port)
);
