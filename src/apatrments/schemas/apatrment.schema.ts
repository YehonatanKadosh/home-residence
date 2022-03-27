import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ApartmentDocument = Apartment & Document;

@Schema()
export class Apartment {
  @Prop({ required: [true, "Apartment's number required"] })
  AppartmentNumber: number;

  @Prop({ required: [true, "Apartment's city required"] })
  City: string;

  @Prop({ required: [true, "Apartment's street name required"] })
  Street: string;

  @Prop({ required: [true, "Apartment's building number required"] })
  BuildingNumber: number;

  @Prop({ required: [true, "Apartment's number of rooms required"] })
  NumberOfRooms: number;

  @Prop({ required: [true, "Apartment's rent required"] })
  Rent: number;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);
