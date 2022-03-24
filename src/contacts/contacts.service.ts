import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './schemas/contact.schema';
import { Model } from 'mongoose';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}
  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contactsAmount: number = await this.contactModel.countDocuments();
    if (contactsAmount === 1000)
      throw new ForbiddenException(
        'cannot create, contact list reached 1000 contacts',
      );

    const savedContact: Contact = await this.contactModel.findOne({
      PhoneNumber: createContactDto.PhoneNumber,
    });
    if (savedContact) {
      const { FirstName, LastName, PhoneNumber } = savedContact;
      throw new ForbiddenException(
        `found similar phone number: ${PhoneNumber} for both ${FirstName} ${LastName} and ${createContactDto.FirstName} ${createContactDto.LastName}`,
      );
    }

    const createdContact = new this.contactModel(createContactDto);
    return await createdContact.save();
  }

  async findAll() {
    return await this.contactModel.find().populate('Apartment');
  }

  async findOne(id: string) {
    const contact = await this.contactModel.findById(id).populate('Apartment');
    if (!contact) throw new NotFoundException(id, 'contact not found');
    return contact;
  }

  async findOneByApartment(apartmentId: string) {
    return await this.contactModel
      .findOne({ Apartment: apartmentId })
      .populate('Apartment');
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const modifiedDocument = await this.contactModel
      .findByIdAndUpdate(id, updateContactDto)
      .setOptions({ new: true });
    if (!modifiedDocument) throw new NotFoundException(id, 'contact not found');
    return modifiedDocument;
  }

  async remove(id: string) {
    const removedDocument = await this.contactModel.findByIdAndRemove(id);
    if (!removedDocument) throw new NotFoundException(id, 'contact not found');
    return removedDocument;
  }

  async removeAll() {
    return await this.contactModel.remove();
  }
}
