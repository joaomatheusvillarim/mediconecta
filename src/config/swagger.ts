import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { Announcement } from "../model/Announcement";

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
            password: {type:"string", example: "Joaomatheus123!"},
            cpf: {type: "string", example: "12345678900"},
            birthday: {type: "date", example: "01/01/2000"},
            sex: {type: "string", example: "MASCULINO"},
            address: {type: "string", example: "Rua Aprigio Veloso, 880"},
            phone: {type: "string", example: "83987654321"},
          },
          required: ["name", "email", "password", "cpf", "birthday", "sex",
            "address", "phone"],
        },
        UserPutRequest: {
          type: "object",
          properties: {
            name: {type:"string", example: "Joao Matheus"},
            email: {type:"string", example: "joaomatheus@gmail.com"},
            password: {type:"string", example: "joaomatheus123"},
            cpf: {type: "string", example: "12345678900"},
            birthday: {type: "date", example: "01/01/2000"},
            sex: {type: "string", example: "MASCULINO"},
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
            birthday: {type: "date", example: "01/01/2000"},
            sex: {type: "string", example: "MASCULINO"},
            address: {type: "string", example: "Rua Aprigio Veloso, 880"},
            phone: {type: "string", example: "83987654321"},
          }
        },

        ClinicPostRequest: {
          type: "object",
          properties: {
            adminId: {type: "number", example: "1"},
            name: {type: "string", example: "Clínica Top Exames"},
            address: {type: "string", example: "Rua Aprígio Veloso, 1000"},
            workingHours: {type: "string", example: "seg-sex 8:00-12:00 14:00-18:00"},
            specialties: {type: "string", example: "Endocrinologia e otorrinolaringologia"},
            phone: {type: "string", example: "83987654321"},
            email: {type: "string", example: "clinicatopexames@gmail.com"},
          },
          required: ["adminId", "name", "address", "workingHours", "specialties",
            "phone", "email"
          ],
        },
        ClinicPutRequest: {
          type: "object",
          properties: {
            adminId: {type: "number", example: "1"},
            name: {type: "string", example: "Clínica Top Exames"},
            address: {type: "string", example: "Rua Aprígio Veloso, 1000"},
            workingHours: {type: "string", example: "seg-sex 8:00-12:00 14:00-18:00"},
            specialties: {type: "string", example: "Endocrinologia e otorrinolaringologia"},
            phone: {type: "string", example: "83987654321"},
            email: {type: "string", example: "clinicatopexames@gmail.com"},
          },
        },
        ClinicResponse: {
          type: "object",
          properties: {
            id: {type: "number", example: "1"},
            adminId: {type: "number", example: "1"},
            name: {type: "string", example: "Clínica Top Exames"},
            address: {type: "string", example: "Rua Aprígio Veloso, 1000"},
            workingHours: {type: "string", example: "seg-sex 8:00-12:00 14:00-18:00"},
            specialties: {type: "string", example: "Endocrinologia e otorrinolaringologia"},
            phone: {type: "string", example: "83987654321"},
            email: {type: "string", example: "clinicatopexames@gmail.com"},
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
            userId: {type: "number", example: "1"},
            clinicId: {type: "number", example: "1"},
          }
        },

        RecordPostRequest: {
          type: "object",
          properties: {
            content: {type: "string", example: "{\nregistro\ndata:01/01/2025\nidade: 21\naltura: 1,75\npeso: 57kg\ncirurgias: nao\n}"}
          },
          required: ["content"],
        },
        RecordPutRequest: {
          type: "object",
          properties: {
            content: {type: "string", example: "{\nregistro\ndata:01/01/2025\nidade: 21\naltura: 1,75\npeso: 57kg\ncirurgias: nao\n}"}
          },
          required: ["content"],
        },
        RecordResponse: {
          type: "object",
          properties: {
            id: {type: "number", example: "1"},
            patientId: {type: "number", example: "1"},
            entries: {type: "array", items: {type: "string"}},
          },
          required: ["userId", "entries"],
        },
        
        DoctorPostRequest: {
          type: "object",
          properties: {
            userId: {type: "number", example: "1"},
            clinicId: {type: "number", example: "1"},
            credentials: {type: "string", example: "1234PB"},
            workingHours: {type: "string", example: "seg-sex 8-12h 14-18h"},
            specialty: {type: "string", example: "endocrinologia"},
            insurance: {type: "string", example: "unimed"},
          },
          required: ["userId", "clinicId", "credentials", "specialty"],
        },
        DoctorPutRequest: {
          type: "object",
          properties: {
            credentials: {type: "string", example: "1234PB"},
            workingHours: {type: "string", example: "seg-sex 8-12h 14-18h"},
            specialty: {type: "string", example: "endocrinologia"},
            insurance: {type: "string", example: "unimed"},          },
        },
        DoctorResponse: {
          type: "object",
          properties: {
            userId: {type: "number", example: "1"},
            clinicId: {type: "number", example: "1"},
            credentials: {type: "string", example: "1234PB"},
            workingHours: {type: "string", example: "seg-sex 8-12h 14-18h"},
            specialty: {type: "string", example: "endocrinologia"},
            insurance: {type: "string", example: "unimed"},
          }
        },
        
        AppointmentPostRequest: {
          type: "object",
          properties: {
            clinicId: {type: "number", example: 1},
            date: {type:"string", format: "date", example: "2025-03-15"},
            time: {type:"string", example: "14:30"},
            isReturn: {type:"boolean", example: false},
            exam: {type:"string", example: "Raio-X"},
            insurance: {type:"string", example: "Plano Saúde"},
            price: {type:"number", example: 150.50},
            hasMedicalCertificate: {type:"boolean", example: true},
          },
          required: ["clinicId", "date", "time", "isReturn", "price", "hasMedicalCertificate"],
        },
        AppointmentPutRequest: {
          type: "object",
          properties: {
            date: {type:"string", format: "date", example: "2025-03-20"},
            time: {type:"string", example: "16:00"},
          },
        },
        AppointmentResponse: {
          type: "object",
          properties: {
            appointmentId: {type: "number", example: "1"},
            clinicId: {type: "number", example: "1"},
            date: {type:"string", format: "date", example: "2025-03-15"},
            time: {type:"string", example: "14:30"},
            isReturn: {type:"boolean", example: false},
            exam: {type:"string", example: "Raio-X"},
            insurance: {type:"string", example: "Plano Saúde"},
            price: {type:"number", example: 150.50},
            hasMedicalCertificate: {type:"boolean", example: true},
          }
        },

        AnnouncementPostRequest: {
          type: "object",
          properties: {
            announcementId: {type: "number", example: "1"},
            clinicId: {type: "number", example: "1"},
            title: {type:"string", example: "Aviso Importante"},
            text: {type:"string", example: "Consulta cancelada devido à manutenção."},
            timestamp: {type:"string", format: "date-time", example: "2025-02-21T14:30:00Z"},
          },
          required: ["title", "body", "timestamp"],
        },
        AnnouncementPutRequest: {
          type: "object",
          properties: {
            title: {type:"string", example: "Aviso Atualizado"},
            text: {type:"string", example: "Novo aviso sobre expediente."},
          },
        },
        AnnouncementResponse: {
          type: "object",
          properties: {
            announcementId: {type: "number", example: "1"},
            clinicId: {type: "number", example: "1"},
            title: {type:"string", example: "Aviso Importante"},
            text: {type:"string", example: "Consulta cancelada devido à manutenção."},
            timestamp: {type:"string", format: "date-time", example: "2025-02-21T14:30:00Z"},
          }
        },

        SecretaryPostRequest: {
          type: "object",
          properties: {
            userId: {type: "number", example: "1"},
            clinicId: {type: "number", example: "1"},
            workingHours: {type: "string", example: "seg-sex 8-12h 14-18h"},
          },
          required: ["userId", "clinicId"],
        },
        SecretaryPutRequest: {
          type: "object",
          properties: {
            workingHours: {type: "string", example: "seg-sex 8-12h 14-18h"}, },
        },
        SecretaryResponse: {
          type: "object",
          properties: {
            userId: {type: "number", example: "1"},
            clinicId: {type: "number", example: "1"},
            workingHours: {type: "string", example: "seg-sex 8-12h 14-18h"},
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
