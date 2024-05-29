import { Injectable } from '@nestjs/common';//의존성 주입을 위한 데코레이터

@Injectable()
export class AppService {//자신의 클래스(Appservice)를 export함. 다른 파일에서 사용할 수 있도록.
  getHello(): string {//함수 getHello()는 문자열을 반환함. 함수의 타입을 뒤에 적어줌.
    return 'Hello World!';
  }
}
