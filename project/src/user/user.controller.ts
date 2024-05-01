import { Controller, Get, Post , Delete , Put, Body, UseFilters} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Controller('user')//user라는 경로로 들어오는 요청을 처리하는 컨트롤러. 루트 경로에 /user를 붙여서 들어오면 이 컨트롤러가 실행, 아래의 모든 함수들에 적용됨.
@UseFilters(HttpExceptionFilter)//예외처리를 위한 filter를 사용함. 이 컨트롤러의 모든 함수에 적용됨.

export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    async getUsers(): Promise<UserEntity[]> {//굳이 여기 함수 이름과 userService의 함수 이름이 같을 필요는 없음. 다르게 적어도 됨.
        return await this.userService.getUsers();//async함수는 Promise로 리턴값 타입 약속
    }

    @Get('/find')
    async findByEmail(@Body() info) {
        return await this.userService.findByEmail(info.email);
    }

    //위 함수 이후 @Get('추가 경로')가 있다면 위 함수인 index로 받아들여 typeerror가 발생할 수 있다.
    //해결하는 방법은 그 함수를 위 함수보다 위에 적어주는 것이다.

    //nestjs는 리턴할 때 계산 완료된 상황에서 리턴하기에 await를 굳이 붙일 필요는 없다.
    //다만 디버깅할 때 await를 붙이면 디버깅이 더 쉬울 수 있다.

    @Post()
    async addUser(@Body() info) {//body에 있는 정보를 받음
        return await this.userService.addUser(info);//userService의 addUser 함수에 info를 넣어서 실행함.
    }

    @Delete()
    deleteUser(@Body() info) {
        return this.userService.deleteUser(info.email);
    }

    @Put()
    updatePassword(@Body() info) {
        return this.userService.updatePassword(info.email, info.password);
    }

}
