import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & Document;
export enum Roles {
  Admin = 'admin',
  User = 'user',
}

@Schema()
export class User {
  @Prop({ required: [true, 'User username required'] })
  _id: Types.ObjectId;

  @Prop({ required: [true, 'User username required'] })
  username: string;

  @Prop({ required: [true, 'User password required'] })
  password: string;

  @Prop({
    type: String,
    enum: Roles,
    required: [true, 'User role required'],
  })
  role: Roles;
}

export const UserSchema = SchemaFactory.createForClass(User);
