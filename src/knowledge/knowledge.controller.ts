import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';

/*
    Request y Response son tipos de TypeScript proporcionados por Express,
    no valores que necesitemos utilizar durante la ejecución.

    Al utilizar "import type", indicamos explícitamente que estas
    importaciones solo se utilizan como información de tipos y no deben
    aparecer en el JavaScript generado.
*/
import type { Request, Response } from 'express';

/*
    Los DTO definidos mediante interfaces solo existen durante la
    compilación de TypeScript, por lo que deben importarse utilizando
    "import type".

    En cambio, los DTO definidos mediante clases sí existen en tiempo de
    ejecución, por lo que pueden importarse mediante un import normal.
*/
import type { UpdateKnowledgeDto } from './dto/update-knowledge.dto';

import {
    CreateKnowledgeDirectDto,
    CreateKnowledgeDto,
} from './dto/create-knowledge.dto';

import { AuthGuard } from './guard/auth/auth.guard';
import { KnowledgeService } from './knowledge.service';
import { ValidateUserPipe } from './pipes/validate-user/validate-user.pipe';

/*
    Define el prefijo de las rutas pertenecientes a este controlador.
 
    Por ejemplo:
 
    @Get()
    -> GET /knowledge
 
    @Get('/direct')
    -> GET /knowledge/direct
*/
@Controller('knowledge')
export class KnowledgeController {
    /*
        KnowledgeService es inyectado automáticamente por NestJS mediante
        Dependency Injection.
     
        "private readonly" permite utilizar la dependencia dentro de la
        clase sin necesidad de declararla como una propiedad adicional y
        evita que la referencia sea reasignada posteriormente.
    */
    constructor(private readonly knowledgeService: KnowledgeService) {}

    /*
        Ejemplo de acceso directo a los objetos Request y Response
        proporcionados por Express.
     
        Al utilizar @Res(), el controlador se encarga directamente de
        construir y enviar la respuesta HTTP.
     
        Normalmente se recomienda retornar el resultado directamente y
        dejar que NestJS gestione la respuesta, salvo que sea necesario
        utilizar funcionalidades específicas de Express.
    */
    @Get('/hello')
    index(@Req() _request: Request, @Res() response: Response) {
        response.status(200).json({
            message: 'Hello World',
            code: 200,
        });
    }

    /*
        @HttpCode() permite definir manualmente el código de estado HTTP
        que devolverá el endpoint cuando la solicitud sea procesada
        correctamente.
     
        Por defecto, un endpoint GET devuelve 200.
    */
    @Get('/notfound')
    @HttpCode(404)
    notFoundPage() {
        return '404 Not Found';
    }

    /*
        ParseIntPipe valida que el parámetro pueda convertirse a un número
        entero y, si es válido, transforma el valor recibido de string a
        number antes de entregarlo al método.
     
        Los parámetros de una URL llegan inicialmente como strings.
     
        Ejemplo:
     
        GET /knowledge/10
               ↓
        "10" -> 10
    */
    @Get('/knowledge/:num')
    getKnowledge(@Param('num', ParseIntPipe) num: number) {
        return this.knowledgeService.getKnowledgeById(num);
    }

    /*
        Los Guards permiten determinar si una solicitud puede continuar
        hasta el controlador.
     
        Se ejecutan antes de que el método del controlador sea ejecutado
        y son comúnmente utilizados para autenticación y autorización.
     
        En este caso, AuthGuard determina si la solicitud puede acceder
        al endpoint.
    */
    @Get('/greet')
    @UseGuards(AuthGuard)
    /*
        Los Pipes permiten transformar y/o validar los datos antes de que
        lleguen al método del controlador.
     
        ValidateUserPipe es un pipe personalizado creado específicamente
        para validar los datos recibidos en este endpoint.
    */
    greet(@Query(ValidateUserPipe) query: { name: string; age: number }) {
        return `Hello ${query.name}, you are ${query.age} years old`;
    }

    /*
        Ejemplo de consulta a la base de datos utilizando Prisma a través
        de KnowledgeService.
    */
    @Get('/direct')
    getKnowledgeDirect() {
        return this.knowledgeService.getKnowledgeDirect();
    }

    /*
        @Body() obtiene el contenido enviado en el cuerpo de la solicitud
        HTTP y lo proporciona como argumento al método.
     
        CreateKnowledgeDto define la estructura esperada del body y sus
        reglas de validación.
     
        El ValidationPipe se configura globalmente en main.ts, por lo que
        no es necesario utilizar @UsePipes() individualmente en cada ruta.
    */
    @Post()
    createKnowledge(@Body() knowledge: CreateKnowledgeDto) {
        return this.knowledgeService.createKnowledge(knowledge);
    }

    /*
        Ejemplo de creación de un registro directamente en la base de
        datos mediante Prisma.
     
        CreateKnowledgeDirectDto define la estructura de los datos
        recibidos.
    */
    @Post('/direct')
    createKnowledgeDirect(@Body() knowledge: CreateKnowledgeDirectDto) {
        return this.knowledgeService.createKnowledgeDirect(knowledge);
    }

    /*
        @Put() se utiliza normalmente para actualizar un recurso completo.
     
        @Body() obtiene los datos enviados en el cuerpo de la solicitud
        y los proporciona como un UpdateKnowledgeDto.
     */
    @Put()
    updateKnowledge(@Body() knowledge: UpdateKnowledgeDto) {
        return this.knowledgeService.updateKnowledge(knowledge);
    }
}
