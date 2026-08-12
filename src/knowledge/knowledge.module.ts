import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { KnowledgeService } from './knowledge.service';
import { KnowledgeController } from './knowledge.controller';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
    controllers: [KnowledgeController],
    providers: [KnowledgeService],
})
export class KnowledgeModule implements NestModule {
    /*
        configure() permite configurar los middleware que serán
        ejecutados antes de llegar a los controladores.

        NestJS proporciona MiddlewareConsumer para definir qué middleware
        se ejecuta y sobre qué rutas.
    */
    configure(consumer: MiddlewareConsumer) {
        /*
            Aplica LoggerMiddleware a las rutas de KnowledgeController.
            
            forRoutes() puede recibir un controlador, una ruta específica
            o diferentes opciones para determinar dónde debe ejecutarse
            el middleware.
        */
        consumer.apply(LoggerMiddleware).forRoutes(KnowledgeController);

        /*
            También se puede aplicar otro middleware.
            
            En este ejemplo, AuthMiddleware se ejecutará sobre las rutas
            definidas por KnowledgeController.
        */
        consumer.apply(AuthMiddleware);
    }
}
