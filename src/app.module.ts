import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';//TypeORM(데이터베이스 연동)을 사용하기 위한 모듈
import { ConfigModule } from '@nestjs/config';//환경변수를 사용하기 위한 모듈

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),//환경변수를 사용하기 위한 모듈
    TypeOrmModule.forRoot({//TypeORM(데이터베이스 연동)을 사용하기 위한 모듈
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB,
        autoLoadEntities: true,
        synchronize: true
    })
    ,UserModule],//다른 모듈을 import할 때 사용(ex: service에서 typeorm을 사용할 때 typeorm을 import함.)
  controllers: [AppController],//받은 요청을 어떻게 처리할지 제공
  providers: [AppService],//필요한 의존성 함수 제공
})
export class AppModule {}
