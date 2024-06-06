import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sendspark code challenge API with Swagger",
      version: "1.0.0",
      description: "Check all the api routes for the Sendspark code challenge",
    },
  },
  apis: ["./src/routes/*.ts", "./src/routes.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
