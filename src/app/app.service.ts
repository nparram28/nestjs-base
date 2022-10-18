import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService {

  async findAll(): Promise<any>{
    throw new InternalServerErrorException('Exception');
  }

  async find(): Promise<any>{
    return 'find';
  }
}