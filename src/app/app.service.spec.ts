import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppNotFoundException } from './exceptions/appNotFoundException.exception';

describe('AppService', () => {
    let service: AppService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({ 
        providers: [AppService, AppNotFoundException], 
      }).compile();
  
      service = module.get<AppService>(AppService); 
    });

    it('Debe estar definido', () => {
        expect(service).toBeDefined();
    });

    it('Find return find', async () => {
        const result = await service.find();
        expect(result).toEqual('find');
    })
    
});