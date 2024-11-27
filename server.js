
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const dotenv = require("dotenv");

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Crear el cliente de SES usando las variables de entorno
const client = new SESClient({
  region: process.env.AWS_REGION, // Obtén la región desde el archivo .env
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Usa la variable de entorno
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Usa la variable de entorno
  },
});

  
// Crear los parámetros del correo
const params = {
    Source: 'no-reply@fundasoft.org', // Identidad de dominio
    Destination: {
      ToAddresses: ['diegodavidalmiron1990@outlook.com'], // El correo también debe estar verificado o en entorno de producción
    },
    Message: {
      Subject: {
        Data: 'Prueba',
      },
      Body: {
        Text: {
          Data: 'Este es un mensaje de prueba de AWS SES',
        },
      },
    },
  };
  
  // Enviar el correo
  const command = new SendEmailCommand(params);
  
  async function sendEmail() {
    try {
      const data = await client.send(command);
      console.log("Correo enviado exitosamente:", data);
    } catch (error) {
      console.error("Error al enviar el correo:", error);
    }
  }
  
  sendEmail();