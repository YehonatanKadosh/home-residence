import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & Document;
export enum Role {
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
    enum: Role,
    required: [true, 'User role required'],
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
