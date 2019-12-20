import express, { Express, ErrorRequestHandler } from "express";
import { createThingController } from "../api/thing/thing.controller";
import { Store } from "./store";
import { Thing } from "../types/Thing";

const createApp = ({ thingStore }: { thingStore: Store<Thing> }): Express => {
  const app = express();

  app.use(express.json());

  const thingController = createThingController(thingStore);

  app.use("/api/thing", thingController.getRouter());

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (!Boolean(err)) {
      err = {};
    }

    res.status(err.status || 500).json(err.message || "An error occurred");
  };

  app.use(errorHandler);

  return app;
};

export { createApp };
