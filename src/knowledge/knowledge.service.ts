import { Injectable, NotFoundException } from '@nestjs/common';

import {
    CreateKnowledgeDirectDto,
    CreateKnowledgeDto,
} from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import { PrismaService } from '../prisma/prisma.service';

/*
    Una interfaz permite definir la estructura que debe cumplir un objeto
    en TypeScript.

    En este caso, cualquier objeto de tipo Knowledge debe contener:
    - id: identificador numérico.
    - name: nombre del conocimiento.
    - content: contenido del conocimiento.

    Las interfaces únicamente existen durante la compilación de TypeScript;
    no existen en tiempo de ejecución.
*/
export interface Knowledge {
    id: number;
    name: string;
    content: string;
}

@Injectable()
export class KnowledgeService {
    /*
        NestJS utiliza Dependency Injection para proporcionar las
        dependencias necesarias al servicio.

        PrismaService es inyectado automáticamente por NestJS y permite
        interactuar con la base de datos mediante Prisma.
    */
    constructor(private prisma: PrismaService) {}

    /*
        Ejemplo de almacenamiento temporal en memoria.

        Esta información solamente existe mientras la aplicación está
        ejecutándose y se perderá cuando el servidor se reinicie.
    */
    private knowledge: Knowledge[] = [];

    /*
        Ejemplo de consulta utilizando Prisma.

        findMany() obtiene todos los registros de la tabla Knowledge.
        En este caso, los datos son obtenidos directamente desde la
        base de datos.
    */
    getKnowledgeDirect() {
        return this.prisma.knowledge.findMany();
    }

    /*
        Busca un conocimiento dentro del arreglo almacenado en memoria
        utilizando su identificador.
    */
    getKnowledgeById(id: number) {
        const knowledgeFound = this.knowledge.find(
            (knowledge) => knowledge.id === id,
        );

        /*
            NotFoundException es una excepción HTTP proporcionada por NestJS
            para representar una respuesta 404 Not Found.

            Las excepciones deben lanzarse con throw para que NestJS
            interrumpa la ejecución del método y genere automáticamente
            la respuesta HTTP correspondiente.
        */
        if (!knowledgeFound) {
            throw new NotFoundException('Conocimiento no encontrado');
        }

        return knowledgeFound;
    }

    /*
        Ejemplo de creación de información en memoria.

        El nuevo conocimiento se agrega al arreglo utilizando push().
        El identificador se genera manualmente a partir de la cantidad
        actual de elementos.
    */
    createKnowledge(knowledge: CreateKnowledgeDto) {
        this.knowledge.push({
            id: this.knowledge.length + 1,
            ...knowledge,
        });

        return knowledge;
    }

    /*
        Ejemplo de creación de un registro directamente en la base de datos.
    
        prisma.knowledge.create() genera y ejecuta la consulta necesaria
        para insertar el registro en la tabla correspondiente.
    
        El objeto recibido mediante el DTO se proporciona como data,
        que contiene los valores que serán almacenados.
    */
    createKnowledgeDirect(knowledge: CreateKnowledgeDirectDto) {
        return this.prisma.knowledge.create({
            data: knowledge,
        });
    }

    /* Ejemplo de actualización de un registro. */
    updateKnowledge(knowledge: UpdateKnowledgeDto) {
        return 'Actualizando conocimiento';
    }
}
