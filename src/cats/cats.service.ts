import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>,
  ) {}

  create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat = new Cat();
    cat.name = createCatDto.name;
    cat.age = createCatDto.age;
    cat.breed = createCatDto.breed;
    return this.catRepository.save(cat);
  }

  findAll(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  findOne(id: number) {
    return this.catRepository.findOneBy({ id });
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return this.catRepository.update(
      { id },
      {
        name: updateCatDto.name,
        age: updateCatDto.age,
        breed: updateCatDto.breed,
      },
    );
  }

  remove(id: number) {
    return this.catRepository.delete({ id });
  }

}
