import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateApatrmentDto } from './dto/create-apatrment.dto';
import { UpdateApatrmentDto } from './dto/update-apatrment.dto';
import { Apartment } from './schemas/apatrment.schema';
import { Model } from 'mongoose';
import { ContactsService } from 'src/contacts/contacts.service';
import { Contact } from 'src/contacts/schemas/contact.schema';

@Injectable()
export class ApatrmentsService {
  constructor(
    @InjectModel(Apartment.name) private apartmentModel: Model<Apartment>,
    private contactsService: ContactsService,
  ) {}
  async create(createApatrmentDto: CreateApatrmentDto) {
    const createdApartment = new this.apartmentModel(createApatrmentDto);
    return await createdApartment.save();
  }

  async findAll() {
    return await this.apartmentModel.find();
  }

  async findOne(id: string) {
    const apartment = await this.apartmentModel.findById(id);
    if (!apartment) throw new NotFoundException(id, 'apartment not found');
    return apartment;
  }

  async update(id: string, updateApatrmentDto: UpdateApatrmentDto) {
    const modifiedApartment = await this.apartmentModel
      .findByIdAndUpdate(id, updateApatrmentDto)
      .setOptions({ new: true });
    if (!modifiedApartment)
      throw new NotFoundException(id, 'apartment not found');
    return modifiedApartment;
  }

  async remove(id: string) {
    const residentInTheApartment: Contact | null =
      await this.contactsService.findOneByApartment(id);
    if (residentInTheApartment) {
      const { City, Street, BuildingNumber, AppartmentNumber } =
        residentInTheApartment.Apartment;
      const { FirstName, LastName } = residentInTheApartment;

      throw new ForbiddenException(
        `cannot delete apartment: ${Street} ${BuildingNumber} apt. ${AppartmentNumber}, ${City} which habitad by resident ${FirstName} ${LastName}`,
      );
    }

    const removedApartment = await this.apartmentModel.findByIdAndRemove(id);
    return removedApartment;
  }

  async removeAll() {
    return await this.apartmentModel.remove();
  }
}
