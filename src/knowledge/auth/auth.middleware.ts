import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    /*
        Un middleware se ejecuta durante el ciclo de vida de una solicitud
        HTTP antes de que esta llegue al controlador.
     
        En este caso, el middleware se utiliza como una validación sencilla
        de autenticación/autorización mediante la cabecera Authorization.
     
        next() permite que la solicitud continúe hacia el siguiente
        middleware o hacia el controlador.
    */
    use(req: Request, res: Response, next: NextFunction) {
        /*
            Se obtiene la cabecera Authorization del objeto Request.
            Ejemplo:
            Authorization: xyz123
        
            Si la cabecera no existe, authorization tendrá el valor
            undefined.
        */
        const { authorization } = req.headers;

        /*
            401 Unauthorized:
         
            Indica que la solicitud no contiene las credenciales necesarias
            para autenticarse.
         
            En este ejemplo, se devuelve 401 cuando no se proporciona
            la cabecera Authorization.
        */
        if (!authorization) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        /*
            403 Forbidden:
        
            Indica que el cliente está identificado mediante algún tipo
            de credencial, pero no tiene autorización para acceder
            al recurso.
        
            En este ejemplo, cualquier valor diferente de "xyz123"
            se considera una credencial no autorizada.
        */
        if (authorization !== 'xyz123') {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        /*
            Si las validaciones anteriores son superadas, se permite que
            la solicitud continúe hacia el siguiente middleware o
            controlador.
        */
        next();
    }
}
