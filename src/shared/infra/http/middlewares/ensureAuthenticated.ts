import { NextFunction, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppErros';

import { IAuthRequest } from '../../../../modules/customers/types/IAuthRequest';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: IAuthRequest,
    response: Response,
    next: NextFunction,
) {
    const authheader = request.headers.authorization;

    if (!authheader) {
        throw new AppError('Token missing', 401);
    }

    const [, token] = authheader.split(' ');

    try {
        const { sub: user_id } = decode(token) as IPayload;

        if (user_id !== '794fad69-3917-498f-8a65-1ecde969f0db') {
            throw new AppError('Não autorizado', 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch (error) {
        throw new AppError('Invalid token!', 401);
    }
}
