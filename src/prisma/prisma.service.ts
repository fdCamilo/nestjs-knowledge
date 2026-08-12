import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    /*
        ConfigService permite acceder a las variables de entorno
        cargadas por ConfigModule.

        getOrThrow() devuelve el valor de la variable y lanza una
        excepción si no está definida, evitando que la aplicación
        continúe ejecutándose con una configuración incompleta.
    */
    constructor(configService: ConfigService) {
        const databaseUrl = configService.getOrThrow<string>('DATABASE_URL');

        /*
            Convierte la cadena de conexión en un objeto URL para
            poder acceder fácilmente a sus diferentes componentes:
                hostname -> host de la base de datos
                port     -> puerto
                username -> usuario
                password -> contraseña
                pathname -> nombre de la base de datos
            Ejemplo:
                mysql://root:password@localhost:3306/nestjs
        */
        const url = new URL(databaseUrl);

        /*
            Prisma 7 utiliza Driver Adapters para establecer la conexión
            con la base de datos.
        
            PrismaMariaDb utiliza el driver de MariaDB para comunicarse
            con bases de datos MySQL/MariaDB.
        */
        const adapter = new PrismaMariaDb({
            host: url.hostname,
            port: Number(url.port),
            user: url.username,
            password: url.password,
            database: url.pathname.slice(1),
        });

        /* Inicializa PrismaClient utilizando el adapter configurado. */
        super({ adapter });
    }

    /*
        OnModuleInit se ejecuta automáticamente cuando NestJS
        termina de inicializar el módulo.    
        $connect() establece la conexión de Prisma con la base de datos.
    */
    async onModuleInit() {
        await this.$connect();
    }
}
