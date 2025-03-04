import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Gestor_de_opiniones API",
            version:"1.0.0",
            description: "API para sistema de gestion de opiniones",
            contact:{
                name: "Harol Rodriguez",
                email: "hrodriguez-2023278@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/facebook/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js",
        "./src/categories/*.js",
        "./src/post/*.js",
        "./src/comments/*.js"
        
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
export { swaggerDocs, swaggerUI }