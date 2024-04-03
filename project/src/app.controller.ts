import { Controller, Get, Post, Put } from '@nestjs/common';//여기서 필요한 기능(데코레이터)들을 import함.
import { AppService } from './app.service';//service.ts에서 export한 AppService를 import함.

@Controller()//코드 받았을 때 어떻게 처리할지 정의하는 데코레이터. 데코레이터는 클래스 위에 적어줌. 괄호 안에 아무것도 없으면 루트 경로로 들어오는 요청을 처리함.
//보통 기능은 service.ts에, 기능을 어떻게 사용할지는 controller.ts에 적음. 그만큼 db는 보통 service.ts에 적음.
export class AppController {
  constructor(private readonly appService: AppService) {}//AppService를 appService라는 변수로 받아옴. Appservice 없이 사용할 수 없음.

  @Put('/hello')//get, post 등 요청이 특정 경로(괄호 안)로 들어올 때 아래 함수를 실행하도록 함.
  getHello(): string {//얘의 getHello와 appService의 getHello는 같은 이름이지만 다른 함수임.
    return this.appService.getHello();
  }
}
