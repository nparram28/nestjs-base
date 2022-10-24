import { Injectable } from '@nestjs/common';
import { AppNotFoundException } from './exceptions/appNotFoundException.exception';

@Injectable()
export class AppService {

  async findAll(): Promise<any>{
    throw new AppNotFoundException();
  }

  async find(): Promise<any>{
    return 'find';
  }
}