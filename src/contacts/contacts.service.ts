import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { Model } from 'mongoose';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<Contact>,
  ) {}

  async findOneByPhoneNumber(
    phoneNumber: string,
  ): Promise<ContactDocument | null> {
    return await this.contactModel.findOne({ PhoneNumber: phoneNumber });
  }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contactsAmount: number = await this.contactModel.countDocuments();
    if (contactsAmount === 1000)
      throw new ForbiddenException(
        'cannot create, contact list reached 1000 contacts',
      );

    const savedContact: Contact = await this.findOneByPhoneNumber(
      createContactDto.PhoneNumber,
    );
    if (savedContact) {
      const { FirstName, LastName, PhoneNumber } = savedContact;
      throw new ForbiddenException(
        `found similar phone number: ${PhoneNumber} for both ${FirstName} ${LastName} and ${createContactDto.FirstName} ${createContactDto.LastName}`,
      );
    }

    const createdContact = new this.contactModel(createContactDto);
    return await createdContact.save();
  }

  async createMany(createContactDto: CreateContactDto[]) {
    const createdContacts = [];
    for (let i = 0; i < createContactDto.length; i++) {
      const contact = createContactDto[i];
      createdContacts.push(await this.create(contact));
    }
    return createdContacts;
  }

  async findAll() {
    return await this.contactModel.find().populate('Apartment');
  }

  async findOne(id: string): Promise<ContactDocument | null> {
    const contact = await this.contactModel.findById(id).populate('Apartment');
    if (!contact) throw new NotFoundException(id, 'contact not found');
    return contact;
  }

  async findOneByApartment(
    apartmentId: string,
  ): Promise<ContactDocument | null> {
    return await this.contactModel
      .findOne({ Apartment: apartmentId })
      .populate('Apartment');
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    if (updateContactDto.PhoneNumber) {
      const savedContact: ContactDocument = await this.findOneByPhoneNumber(
        updateContactDto.PhoneNumber,
      );
      if (savedContact && savedContact._id.toString() !== id) {
        const { PhoneNumber, FirstName, LastName } = savedContact;
        throw new ForbiddenException(
          `found similar phone number: ${PhoneNumber} for both ${FirstName} ${LastName} and updating user with Id: ${id}`,
        );
      }
    }

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

  async removeByPhoneNumber(phoneNumber: string) {
    const removedDocument = await this.contactModel.findOneAndRemove({
      PhoneNumber: phoneNumber,
    });
    if (!removedDocument)
      throw new NotFoundException(phoneNumber, 'contact not found');
    return removedDocument;
  }

  async removeAll() {
    return await this.contactModel.remove();
  }
}
