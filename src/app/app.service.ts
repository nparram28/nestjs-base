import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  async findAll(): Promise<any>{
    return 'AppService';
  }
}