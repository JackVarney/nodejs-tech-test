const env = (varName: string) => process.env[varName];

export default {
  port: env("PORT") || 3000
};
