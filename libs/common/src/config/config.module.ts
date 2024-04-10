import { Module } from '@nestjs/common';
import { ConfigService, 
    ConfigModule as NestConfigModule
} from '@nestjs/config';
import * as Joi from 'joi';  // Toda la configuracion de Joi

@Module({
    imports: [NestConfigModule.forRoot({
        validationSchema : Joi.object({     // Validar variable de entorno
            MONGODB_URI: Joi.string().required(),   // Variable de entorno de tipo String
            
        })
    })],
    providers: [ConfigService],
    exports: [ConfigService],   
})
export class ConfigModule {}
