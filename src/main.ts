import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
    /*
        Crea e inicializa la aplicación NestJS utilizando el módulo raíz.
        AppModule es el punto de entrada donde se registran los módulos,
        controladores y providers principales de la aplicación.
    */
    const app = await NestFactory.create(AppModule);

    /*
        Configuración de Swagger.
        Swagger permite generar automáticamente una documentación
        interactiva de los endpoints de la API.
    */
    const config = new DocumentBuilder()
        .setTitle('Documentation API')
        .setDescription('The documentation API description')
        .setVersion('1.0')
        .build();

    /*
        Genera el documento de Swagger a partir de los controladores,
        rutas, DTOs y decoradores utilizados en la aplicación.
    */
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    /*
        Expone la documentación de Swagger en /api.
        Por ejemplo: http://localhost:3000/api
    */
    SwaggerModule.setup('api', app, documentFactory);

    /*
        Registra un ValidationPipe de forma global.
        Al ser global, no es necesario utilizar @UsePipes() en cada
        controlador o endpoint que necesite validación.
    */
    app.useGlobalPipes(
        new ValidationPipe({
            /*
                Elimina del objeto los campos que no estén definidos
                en el DTO.
                Por ejemplo, si el DTO solamente define:    

                { name: string }

                y el cliente envía:

                { name: 'Camilo', admin: true }

                "admin" será eliminado antes de llegar al controlador.
            */
            whitelist: true,
        }),
    );

    /*
        Habilita CORS (Cross-Origin Resource Sharing).
        Permite controlar qué aplicaciones externas pueden realizar
        solicitudes HTTP hacia nuestra API.
        Al no proporcionar opciones, Nest permite solicitudes desde
        cualquier origen. En producción normalmente se recomienda
        restringir los orígenes permitidos.
    */
    app.enableCors();

    /*
        Inicia el servidor HTTP.
        Si existe la variable de entorno PORT, se utiliza su valor;
        de lo contrario, se utiliza el puerto 3000.
    */
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
