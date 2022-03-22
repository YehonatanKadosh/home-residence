import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './schemas/contact.schema';
import { Model, Error } from 'mongoose';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}
  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const createdContact = new this.contactModel(createContactDto);
    return await createdContact.save();
  }

  async findAll() {
    return await this.contactModel.find();
  }

  async findOne(id: string) {
    const contact = await this.contactModel.findById(id);
    if (!contact) throw new NotFoundException(id, 'contact not found');
    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const modifiedDocument = await this.contactModel
      .findByIdAndUpdate(id, updateContactDto)
      .setOptions({ overwrite: true, new: true, runValidators: true });
    if (!modifiedDocument) throw new NotFoundException(id, 'contact not found');
    return modifiedDocument;
  }

  async remove(id: string) {
    const removedDocument = await this.contactModel.findByIdAndRemove(id);
    if (!removedDocument) throw new NotFoundException(id, 'contact not found');
    return removedDocument;
  }
}
