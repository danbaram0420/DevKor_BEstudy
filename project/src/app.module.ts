import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],//다른 모듈을 import할 때 사용(ex: service에서 typeorm을 사용할 때 typeorm을 import함.)
  controllers: [AppController],//받은 요청을 어떻게 처리할지 제공
  providers: [AppService],//필요한 의존성 함수 제공
})
export class AppModule {}
