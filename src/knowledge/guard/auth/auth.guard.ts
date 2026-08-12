import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    /*
        Un Guard permite determinar si una solicitud puede continuar
        hasta el controlador. Es común utilizar Guards para 
        implementar autenticación y autorización.
    
        Al implementar CanActivate, la clase debe proporcionar el método
        canActivate(), que debe devolver:
    
        - true  -> permite continuar la solicitud.
        - false -> bloquea la solicitud.
    
        También puede devolver una Promise<boolean> u Observable<boolean>
        cuando la validación es asíncrona.
    */
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        /*
            ExecutionContext proporciona información sobre el contexto
            en el que se está ejecutando la solicitud.
         
            switchToHttp() indica que estamos trabajando con una solicitud
            HTTP y permite acceder a los objetos Request y Response.
         
            getRequest() obtiene el objeto Request de Express.
        */
        const request = context.switchToHttp().getRequest<Request>();

        /*
            Se verifica si la solicitud contiene la cabecera Authorization.
            Por ejemplo:
        
            Authorization: Bearer <token>
        
            En una aplicación real, normalmente no basta con comprobar
            que la cabecera exista; también se debe validar el token.
        */
        if (!request.headers['authorization']) {
            /*
                Al devolver false, NestJS bloquea la ejecución del
                controlador protegido por este Guard.
            */
            return false;
        }

        /* Devolver true permite que la solicitud continúe hasta el controlador. */
        return true;
    }
}
