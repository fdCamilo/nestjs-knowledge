import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    /*
        Un middleware se ejecuta durante el ciclo de una solicitud HTTP,
        antes de que esta llegue al controlador.
    
        NestMiddleware proporciona la estructura necesaria para crear
        middleware personalizados en NestJS.
    */
    use(req: Request, res: Response, next: NextFunction) {
        /*
            originalUrl contiene la URL original solicitada por el cliente.
         
            Por ejemplo:
         
            GET /knowledge/10
            -> /knowledge/10
        */
        console.log(req.originalUrl);

        /*
            next() permite que la solicitud continúe con el siguiente
            middleware o con el controlador correspondiente.
         
            Si next() no se ejecuta y tampoco se envía una respuesta,
            la solicitud quedará esperando indefinidamente.
        */
        next();
    }
}
