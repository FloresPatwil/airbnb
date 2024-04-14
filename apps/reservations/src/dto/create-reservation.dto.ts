export class CreateReservationDto {
    startDate: Date;
    endDate: Date;
    placeId: string;    // relacionado
    invoiceId: string;
}
