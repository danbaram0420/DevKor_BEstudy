import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],//사용할 typeorm 모듈들을 import
  controllers: [UserController],
  providers: [UserService, UserRepository]
})
export class UserModule {}
