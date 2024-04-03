import { Controller, Get, Post , Delete , Param, Body} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')//user라는 경로로 들어오는 요청을 처리하는 컨트롤러. 루트 경로에 /user를 붙여서 들어오면 이 컨트롤러가 실행, 아래의 모든 함수들에 적용됨.
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers(): string[] {//굳이 여기 함수 이름과 userService의 함수 이름이 같을 필요는 없음. 다르게 적어도 됨.
        return this.userService.getUsers();
    }

    @Get('/:index')
    getUserName(@Param('index') index: number): string {//param은 경로에 있는 변수를 가져옴. user뒤에 붙은 index(:index 아니다!)를 가져와서 number로 변환함.
        return this.userService.getUserName(index);
    }

    //위 함수 이후 @Get('추가 경로')가 있다면 위 함수인 index로 받아들여 typeerror가 발생할 수 있다.
    //해결하는 방법은 그 함수를 위 함수보다 위에 적어주는 것이다.

    @Post()
    addUser(@Body() info): Promise<string[]> {//body에 있는 정보를 받아서 Promise<string[]>을 반환함.
        return this.userService.addUser(info.name);//userService의 addUser 함수에 info.name을 넣어서 실행함.
    }

    @Delete()
    deleteUser(@Body() info): Promise<string[]> {
        return this.userService.deleteUser(info.name);
    }


}
