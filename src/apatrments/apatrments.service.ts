import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateApatrmentDto } from './dto/create-apatrment.dto';
import { UpdateApatrmentDto } from './dto/update-apatrment.dto';
import { Apartment } from './schemas/apatrment.schema';
import { Model } from 'mongoose';

@Injectable()
export class ApatrmentsService {
  constructor(
    @InjectModel(Apartment.name) private apartmentModel: Model<Apartment>,
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
      .setOptions({ overwrite: true, new: true, runValidators: true });
    if (!modifiedApartment)
      throw new NotFoundException(id, 'apartment not found');
    return modifiedApartment;
  }

  async remove(id: string) {
    const removedApartment = await this.apartmentModel.findByIdAndRemove(id);
    if (!removedApartment)
      throw new NotFoundException(id, 'apartment not found');
    return removedApartment;
  }
}
