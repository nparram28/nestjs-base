import { Injectable } from "@nestjs/common";
import { BaseException } from "../../config/exception/baseException.exception";

@Injectable()
export class AppNotFoundException extends BaseException {

    constructor() {
        super('La app no existe', 50500, true);
    }
}