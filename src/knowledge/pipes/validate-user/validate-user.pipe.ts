import {
    ArgumentMetadata,
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateUserPipe implements PipeTransform {
    /*
        transform() es el método que NestJS ejecuta automáticamente cuando
        se utiliza este pipe.
    
        value:
        Contiene el valor que recibe el pipe. En este caso corresponde a
        los parámetros obtenidos mediante @Query().
    
        metadata:
        Contiene información sobre el argumento que está siendo procesado,
        como su tipo, origen y nombre.
    
        Un pipe puede utilizarse para validar y/o transformar los datos
        antes de entregarlos al controlador.
    */
    transform(value: any, metadata: ArgumentMetadata) {
        /*
            Los valores recibidos mediante HTTP generalmente llegan como
            strings.
        
            Por ejemplo:
        
            ?name=Camilo&age=25
        
            age inicialmente será "25".
        
            Se convierte a Number para trabajar con él como un número
            dentro de la aplicación.
        */
        const ageNumber = Number(value.age.toString());

        if (isNaN(ageNumber)) {
            /*
                OPCIÓN 1:
            
                HttpException es la excepción HTTP base de NestJS.
                Permite especificar manualmente el mensaje y el código
                de estado HTTP que debe devolver la aplicación.
            
                Es útil cuando necesitamos un código de estado o un
                comportamiento que no está cubierto por las excepciones
                específicas proporcionadas por NestJS.
            */
            throw new HttpException(
                'Age must be a number',
                HttpStatus.BAD_REQUEST,
            );

            /*
                OPCIÓN 2:
            
                NestJS proporciona excepciones específicas para los
                códigos de estado HTTP más utilizados.
            
                BadRequestException representa directamente un error
                HTTP 400 Bad Request, por lo que no es necesario indicar
                HttpStatus.BAD_REQUEST manualmente.
            
                No se ejecuta porque está después del throw anterior.
            
                Para utilizar esta opción:
            
                throw new BadRequestException('Age must be a number');
            */
        }

        /*
            El pipe no solamente valida el dato, también lo transforma.
        
            Se devuelve una copia del objeto original reemplazando age
            por su versión numérica.
        
            Ejemplo:
        
            { name: 'Camilo', age: '25' }
                         ↓
            { name: 'Camilo', age: 25 }
        */
        return {
            ...value,
            age: ageNumber,
        };
    }
}
