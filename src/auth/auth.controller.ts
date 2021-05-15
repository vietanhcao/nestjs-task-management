import {
  Body,
  Controller,
  Post,
  Req,
  ValidationPipe,
  UseGuards,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  // @Post('/test')
  // @UseInterceptors(FileInterceptor('file'))
  // test(
  //   // @Req() req
  //   @Body() body
  //   ){
  //   // console.log(req)
  //   console.log(body)
  // }  


  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(
  //   // @Req() req
  //   @GetUser() user: User
  //   ){
  //   // console.log(req)
  //   console.log(user)
  // }
}
