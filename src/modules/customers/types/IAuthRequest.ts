import { Request } from 'express';

interface IAuthRequest extends Request {
    user: {
        id: string;
    };
}

export { IAuthRequest };
