import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

 class AuthenticationUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email }})

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }
 

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect email/password combination');
    }

    // Usuário autenticado

    const token = sign( {}, '6849b96d5afa6e61cea0191e9ccfd389', { 
      subject: String(user.id),
      expiresIn: '1d',
    });

    return { 
      user,
      token,
    };

 

  }
}

export default AuthenticationUserService;
