import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  })
  PhoneNumber: string;

  @Prop({ required: [true, 'Contact appartment number required'] })
  AppartmentNumber: number;

  @Prop({
    type: [String],
    enum: Pet,
    required: [true, 'Contact pets list required'],
  })
  pets: string[];
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
