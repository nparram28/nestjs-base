import { Test, TestingModule } from '@nestjs/testing';
import { AppController} from './app.controller';
import { AppService} from './app.service';
import { AppMessages } from './messages/app.messages';

describe('AppController', () => {
    let controller: AppController;
    let mockAppService = {};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService,AppMessages]
        })
            .overrideProvider(AppService)
            .useValue(mockAppService)
            .compile();

            controller = module.get<AppController>(AppController);
    });

    it('Debe estar definido', () => {
        expect(controller).toBeDefined();
    })

})