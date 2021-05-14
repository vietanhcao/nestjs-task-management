
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt , Strategy} from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as config from "config";
const jwtConfig: any = config.get('jwt');

Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { //service
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ){
    super({ 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET ||  jwtConfig.secret,
    })
  }

  async validate(payload: JwtPayload): Promise<User>{
    const { username } = payload;
    const user = await this.userRepository.findOne({username});

    if(!user){
      throw new UnauthorizedException();
    }

    return user
  }
}