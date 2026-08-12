import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { PrismaModule } from './prisma/prisma.module';

/*
    Los módulos de NestJS permiten organizar la aplicación por
    funcionalidades y definir cómo se relacionan sus diferentes
    componentes.

    - imports:
    Permite importar otros módulos para utilizar los providers
    que estos exporten.

    - controllers:
    Registra los controladores que pertenecen a este módulo.
    Los controladores se encargan de recibir y responder a las
    solicitudes HTTP.

    - providers:
    Registra los providers que pertenecen a este módulo, como
    servicios, repositorios, factories, guards, etc.

    - exports:
    Define qué providers de este módulo pueden ser utilizados
    por otros módulos que importen este módulo.
*/
@Module({
    imports: [
        /*
            Carga las variables de entorno y hace que ConfigService
            esté disponible globalmente en toda la aplicación.

            Al utilizar isGlobal: true no es necesario importar
            ConfigModule nuevamente en cada módulo.
        */
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        /* Módulo encargado de proporcionar el PrismaService para interactuar con la base de datos. */
        PrismaModule,

        /* Módulo que contiene la funcionalidad relacionada con Knowledge. */
        KnowledgeModule,
    ],

    /* Controladores pertenecientes directamente a AppModule. */
    controllers: [],
    /* Providers pertenecientes directamente a AppModule. */
    providers: [],
})
export class AppModule {}
