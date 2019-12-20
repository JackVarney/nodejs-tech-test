import { RequestHandler, Router } from "express";
import { Controller } from "../../types/Controller";
import { Store } from "../../core/store";
import { thingPostValidationMiddleware } from "./dto/thing.post";
import { Thing } from "../../types/Thing";

const createThingController = (thingStore: Store<Thing>): Controller => {
  const get: RequestHandler = (req, res) => {
    res.status(200).json(thingStore.getAll());
  };

  const getById: RequestHandler = (req, res, next) => {
    const id = req.params.id;

    const item = thingStore.getById(id);

    if (item === undefined) {
      next({
        status: 404,
        message: "Thing not found"
      });
    }

    res.status(200).json(item);
  };

  const post: RequestHandler = (req, res) => {
    const thingToCreate = req.body;

    const createdItem = thingStore.create(thingToCreate);

    return res.status(201).json(createdItem);
  };

  return {
    getRouter() {
      const router = Router();

      router.get("/", get);
      router.get("/:id", getById);
      router.post("/", thingPostValidationMiddleware, post);

      return router;
    }
  };
};

export { createThingController };
