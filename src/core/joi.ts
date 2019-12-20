import Joi from "@hapi/joi";

const joi: typeof Joi = new Proxy(Joi, {
  get(target: typeof Joi, name: keyof typeof Joi) {
    return (<Function>target[name]).bind(target);
  }
});

const { object, string, array, number, valid } = joi;

export { object, string, array, number, valid, joi as default };
