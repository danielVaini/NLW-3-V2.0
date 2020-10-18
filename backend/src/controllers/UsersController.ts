import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import  { hash } from 'bcryptjs';

import AuthenticationUserService from '../services/AuthenticateUserService';

import * as Yup from 'yup';

import Users from '../models/Users';



export default {

   async create(request: Request, response: Response){

    const {name, email, password} = request.body;

    const userRepository = getRepository(Users)

    const hashdPassword = await hash(password, 8);

    const data = {
      name,
      email,
      password: hashdPassword,
    }

    const checkUserExists = await userRepository.findOne({
      where: { email }
    })

    if(checkUserExists){
      throw new Error('Email already exists')
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const user = userRepository.create(data);
    await userRepository.save(user);

    return response.status(201).json({ message: 'Success'})

  },

  async sessionCreate(request: Request, response: Response){
    try{
      const {email, password} = request.body;

      const authenticateUser = new AuthenticationUserService();

      const { user, token } = await authenticateUser.execute({
        email,
        password,
      })

      delete user.password;

      return response.json({ user, token });
    }catch(err){
      return response.status(400).json({ message: err.message });
    }
  }

} 
