import { AbstractDocument } from "@app/common/database/abstrac.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
    @Prop()
    timeStamp: Date;
    @Prop()
    startDate: Date;
    @Prop()
    endDate: Date;
    @Prop()
    userId: string;  // relacionado
    @Prop()
    placeId: string;    // relacionado
    @Prop()
    invoiceId: string;
}

export const ReservationSchema = 
    SchemaFactory.createForClass(ReservationDocument);
