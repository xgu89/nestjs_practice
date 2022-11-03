import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from '../cats.service';
import { Cat } from "../entities/cat.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useValue: {
            find:jest.fn().mockResolvedValue([])
          },
        }
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('finaAll', () => {
    it('should return an array of cats', async () => {
      const cat: Cat = new Cat();
      cat.name = 'test';
      cat.age = 2;
      cat.breed = 'test';
      const result: Cat[] = [cat];
      jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(result));
      expect(await service.findAll()).toBe(result);
    })
  })
});
