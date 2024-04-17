import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService:ConfigService) => ({        //funcion de fabrica : para la conexion de mongodb
                uri: configService.get('MONGODB_URI'),
            }),
            inject: [ConfigService],
        })
    ],//[MongooseModule.forRoot('mongodb://localhost:27017/airbnb')],
})
export class DatabaseModule {
    static forFeature(model: ModelDefinition[]){
        return MongooseModule.forFeature(model);
    }
}
