import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Apartment } from 'src/apatrments/schemas/apatrment.schema';

export type ContactDocument = Contact & Document;
export enum Pet {
  cat = 'cat',
  dog = 'dog',
}
export const phoneNumberPattern =
  /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

@Schema()
export class Contact {
  @Prop({ required: [true, 'Contact firts name required'] })
  FirstName: string;

  @Prop({ required: [true, 'Contact last name required'] })
  LastName: string;

  @Prop({
    validate: {
      validator: (phoneNumber: string) => phoneNumberPattern.test(phoneNumber),
      message: (props: any) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'Contact phone number required'],
    unique: true,
  })
  PhoneNumber: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Apartment',
  })
  Apartment: Apartment;

  @Prop({
    type: [String],
    enum: Pet,
    required: [true, 'Contact pets list required'],
  })
  pets: string[];
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
