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
    const createdContact = new this.apartmentModel(createApatrmentDto);
    return await createdContact.save();
  }

  async findAll() {
    return await this.apartmentModel.find();
  }

  async findOne(id: string) {
    const contact = await this.apartmentModel.findById(id);
    if (!contact) throw new NotFoundException(id, 'contact not found');
    return contact;
  }

  async update(id: string, updateApatrmentDto: UpdateApatrmentDto) {
    const modifiedDocument = await this.apartmentModel
      .findByIdAndUpdate(id, updateApatrmentDto)
      .setOptions({ overwrite: true, new: true, runValidators: true });
    if (!modifiedDocument) throw new NotFoundException(id, 'contact not found');
    return modifiedDocument;
  }

  async remove(id: string) {
    return await this.apartmentModel.findByIdAndRemove(id);
  }
}
