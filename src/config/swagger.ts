import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MediConecta",
      version: "1.0.0",
      description: "Projeto da disciplina 'Programação para a Web II'",
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
        },

        PatientPostRequest: {
          type: "object",
          properties: {
            userId: {type:"number", example: "1"},
          },
          required: ["userId"],
        },
        PatientPutRequest: {
        },
        PatientResponse: {
          type: "object",
          properties: {
            id: {type: "number", example: "1"},
            userId: {type: "number", example: "1"},
          }
        },
        
        DoctorPostRequest: {
          type: "object",
          properties: {
            userId: {type:"number", example: "1"},
            crm: {type:"string", example: "123456"},
          },
          required: ["userId", "crm"],
        },
        DoctorPutRequest: {
          type: "object",
          properties: {
            crm: {type:"string", example: "654321"},
          },
        },
        DoctorResponse: {
          type: "object",
          properties: {
            id: {type: "number", example: "1"},
            userId: {type: "number", example: "1"},
            crm: {type: "string", example: "123456"},
          }
        },
        
        ClinicPostRequest: {
          type: "object",
          properties: {
            address: {type:"string", example: "Rua das Flores, 123"},
            workingHours: {type:"string", example: "08:00 - 18:00"},
            specialties: {type:"string", example: "Cardiologia, Ortopedia"},
          },
          required: ["address", "workingHours", "specialties"],
        },
        ClinicPutRequest: {
          type: "object",
          properties: {
            address: {type:"string", example: "Avenida Brasil, 456"},
            workingHours: {type:"string", example: "07:00 - 19:00"},
            specialties: {type:"string", example: "Pediatria, Dermatologia"},
          },
        },
        ClinicResponse: {
          type: "object",
          properties: {
            id: {type: "number", example: "1"},
            address: {type:"string", example: "Rua das Flores, 123"},
            workingHours: {type:"string", example: "08:00 - 18:00"},
            specialties: {type:"string", example: "Cardiologia, Ortopedia"},
          }
        },

        AnnouncementPostRequest: {
          type: "object",
          properties: {
            title: {type:"string", example: "Aviso Importante"},
            body: {type:"string", example: "Consulta cancelada devido à manutenção."},
            timestamp: {type:"string", format: "date-time", example: "2025-02-21T14:30:00Z"},
          },
          required: ["title", "body", "timestamp"],
        },
        AnnouncementPutRequest: {
          type: "object",
          properties: {
            title: {type:"string", example: "Aviso Atualizado"},
            body: {type:"string", example: "Novo aviso sobre expediente."},
          },
        },
        AnnouncementResponse: {
          type: "object",
          properties: {
            id: {type: "number", example: "1"},
            title: {type:"string", example: "Aviso Importante"},
            body: {type:"string", example: "Consulta cancelada devido à manutenção."},
            timestamp: {type:"string", format: "date-time", example: "2025-02-21T14:30:00Z"},
          }
        },

        SecretaryPostRequest: {
          type: "object",
          properties: {
            userId: {type:"number", example:"1"}
          },
          required: ["userId"],
        },
        SecretaryPutRequest: {
        },
        SecretaryResponse: {
          type: "object",
          properties: {
            id: {type: "number", example: "1"},
            userId: {type: "number", example: "1"},
          }
        },

      }
    }
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
