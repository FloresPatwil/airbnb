import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractDocument } from "./abstrac.schema";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";

export abstract class AbstractRepository<TDocument extends AbstractDocument>{
    protected abstract readonly logger: Logger;    
    constructor(protected readonly model: Model<TDocument>) {}

    async create(document: Omit<TDocument, '_id'>):Promise<TDocument>{  // Omit crea uno nuevo TODO elemento que venga lo eleimina el ID
        const createDocument = new this.model({
            ...document,    // crea una copia como un clon
            _id: new Types.ObjectId(),  // agrega a_id al clon
        });
        return (await createDocument.save()).toJSON() as unknown as TDocument;  // unknown porque no sabemos de que tipo sera en compilacion y no se pueda operar con el 
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument>{
        const document = await this.model
        .findOne(filterQuery)
        .lean<TDocument>(true);
        
        if(!document){
            this.logger.warn('Document was not found with filterQuery', filterQuery);
            throw new NotFoundException('Document was not found');
        }

        return document;
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>, 
        update: UpdateQuery<TDocument>
    ): Promise<TDocument> {
        const document = await this.model
        .findOneAndUpdate(filterQuery, update, {
            new: true,

        })
        .lean<TDocument>(true);
        if (!document) {
            this.logger.warn('Document was not found with fielterQuery', filterQuery);
            throw new NotFoundException('Document was not found');
        }
        return document;
    }

    async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]>{
        return this.model.find(filterQuery).lean<TDocument[]>(true);
    }

    async findOneAndDelete(
        filterQuery: FilterQuery<TDocument>,
    ):Promise<TDocument>{
        return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
    }
}