import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {//기본적으로는 동기처리이나 비동기 처리(한꺼번에 처리해야 할 때) async.
  //다만 일부 경우에는 비동기임에도 순서가 중요한데, 그럴 때 await를 사용하면 됨.
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());//전역 필터로 사용할 filter를 등록함.
  await app.listen(3000);//포트번호 3000(localhost)
}
bootstrap();
