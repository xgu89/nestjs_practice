import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from '../cats.controller';
import { CatsService } from '../cats.service';
import { Cat } from "../entities/cat.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('CatsController', () => {
  let controller: CatsController;
  let catsService: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useValue: {
            find:jest.fn().mockResolvedValue([])
          }
        }
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    catsService = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('finaAll', () => {
    it('should return an array of cats', async () => {
      const cat: Cat = new Cat();
      cat.name = 'test';
      cat.age = 2;
      cat.breed = 'test';
      const result: Cat[] = [cat];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => Promise.resolve(result));
      expect(await controller.findAll()).toBe(result);
    })
  })
});
