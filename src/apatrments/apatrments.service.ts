import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateApatrmentDto } from './dto/create-apatrment.dto';
import { UpdateApatrmentDto } from './dto/update-apatrment.dto';
import { Apartment, ApartmentDocument } from './schemas/apatrment.schema';
import { Model } from 'mongoose';
import { ContactsService } from 'src/contacts/contacts.service';
import { Contact } from 'src/contacts/schemas/contact.schema';
import { RazeBuildingRentDto } from './dto/raze-building-rent.dto';

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

  async createMany(createContactDto: CreateApatrmentDto[]) {
    const createdContacts = [];
    for (let i = 0; i < createContactDto.length; i++) {
      const contact = createContactDto[i];
      createdContacts.push(await this.create(contact));
    }
    return createdContacts;
  }

  async findAll() {
    return await this.apartmentModel.find();
  }

  async findOne(id: string): Promise<ApartmentDocument> {
    const apartment = await this.apartmentModel.findById(id);
    if (!apartment) throw new NotFoundException('apartment not found', id);
    return apartment;
  }

  async update(id: string, updateApatrmentDto: UpdateApatrmentDto) {
    const modifiedApartment = await this.apartmentModel
      .findByIdAndUpdate(id, updateApatrmentDto)
      .setOptions({ new: true });
    if (!modifiedApartment)
      throw new NotFoundException('apartment not found', id);
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

  async removeBuilding(city: string, street: string, buildingNumber: number) {
    const apartments: ApartmentDocument[] = await this.apartmentModel.find({
      City: city,
      Street: street,
      BuildingNumber: buildingNumber,
    });

    if (!apartments.length)
      throw new NotFoundException('No apartments found on asked location');

    const removedApartments = [];
    for (let i = 0; i < apartments.length; i++) {
      const apartment = apartments[i];
      removedApartments.push(await this.remove(apartment._id.toString()));
    }

    return removedApartments;
  }

  async removeAll() {
    return await this.apartmentModel.remove();
  }

  async razeRent(id: string, precentage: number) {
    const apartment = await this.findOne(id);
    const newRent = apartment.Rent * (1 + precentage / 100);

    const modifiedApartment = await this.apartmentModel
      .findByIdAndUpdate(id, { Rent: newRent })
      .setOptions({ new: true });

    return modifiedApartment;
  }

  async razeBuildingRent(
    razeBuildingRentDto: RazeBuildingRentDto,
    precentage: number,
  ) {
    const apartments: ApartmentDocument[] = await this.apartmentModel.find(
      razeBuildingRentDto,
    );

    if (!apartments.length)
      throw new NotFoundException('No apartments found on asked location');

    const modifiedApartments = [];
    for (let i = 0; i < apartments.length; i++) {
      const apartment = apartments[i];
      const newRent = apartment.Rent * (1 + precentage / 100);

      const modifiedApartment = await this.apartmentModel
        .findByIdAndUpdate(apartment._id.toString(), { Rent: newRent })
        .setOptions({ new: true });
      modifiedApartments.push(modifiedApartment);
    }
    return modifiedApartments;
  }
}
