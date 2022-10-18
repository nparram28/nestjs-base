import { Injectable } from '@nestjs/common';
import { ResponseMessage } from '../../config/message/interface/responseMessage.interface';

@Injectable()
export class AppMessages {

    returnDataSuccessfully(data?: any): ResponseMessage {
        return {
            apiCode: 50200,
            apiData: data,
            apiError: false,
            apiErros: null,
            apiMessage: null
        };
    }
}
