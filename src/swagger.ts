import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my TypeScript project",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        UserPostRequest: {
          type: "object",
          properties: {
            name: {type:"string", example: "Joao Matheus"},
            email: {type:"string", example: "joaomatheus@gmail.com"},
            password: {type:"string", example: "joaomatheus123"},
            cpf: {type: "string", example: "12345678900"},
            birthdate: {type: "date", example: "01/01/2000"},
            sex: {type: "string", example: "male"},
            address: {type: "string", example: "Rua Aprigio Veloso, 880"},
            phone: {type: "string", example: "83987654321"},
          },
          required: ["name", "email", "password", "cpf", "birthdate", "sex",
            "address", "phone"],
        },
        UserPutRequest: {
          type: "object",
          properties: {
            name: {type:"string", example: "Joao Matheus"},
            email: {type:"string", example: "joaomatheus@gmail.com"},
            password: {type:"string", example: "joaomatheus123"},
            cpf: {type: "string", example: "12345678900"},
            birthdate: {type: "date", example: "01/01/2000"},
            sex: {type: "string", example: "male"},
            address: {type: "string", example: "Rua Aprigio Veloso, 880"},
            phone: {type: "string", example: "83987654321"},
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            id: {type:"number", example: "1"},
            name: {type:"string", example: "Joao Matheus"},
            email: {type:"string", example: "joaomatheus@gmail.com"},
            password: {type:"string", example: "joaomatheus123"},
            cpf: {type: "string", example: "12345678900"},
            birthdate: {type: "date", example: "01/01/2000"},
            sex: {type: "string", example: "male"},
            address: {type: "string", example: "Rua Aprigio Veloso, 880"},
            phone: {type: "string", example: "83987654321"},
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
