import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseException extends Error {

    public readonly code: number;
    public readonly isOperational: boolean;

    constructor(message: string, code: number, isOperational: boolean){
        super(message);

        this.code = code;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}