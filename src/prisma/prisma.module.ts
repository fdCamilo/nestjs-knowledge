import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

/*
    @Global() hace que este módulo sea global.

    Una vez que PrismaModule es importado por el módulo raíz de la
    aplicación, PrismaService puede ser utilizado desde otros módulos
    sin necesidad de importar PrismaModule nuevamente en cada uno.
*/
@Global()
@Module({
    /*
        Registra PrismaService como un provider de este módulo.

        Esto le indica a NestJS que debe encargarse de crear y administrar
        la instancia de PrismaService mediante Dependency Injection.
    */
    providers: [PrismaService],

    /*
        Exporta PrismaService para que pueda ser utilizado por otros módulos.
    
        providers -> PrismaModule puede utilizar PrismaService.
        exports   -> otros módulos pueden utilizar PrismaService.
    */
    exports: [PrismaService],
})
export class PrismaModule {}
