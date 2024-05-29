import { Controller, Get, Post , Delete , Put, Body, UseFilters} from '@nestjs/common';
import { UserService } from './user.service';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';
import { UserResponseDto } from './dtos/user.response.dto';
import { EmailRequestDto, PasswordRequestDto, UserRequestDto } from './dtos/user.request.dto';

@Controller('user')//user라는 경로로 들어오는 요청을 처리하는 컨트롤러. 루트 경로에 /user를 붙여서 들어오면 이 컨트롤러가 실행, 아래의 모든 함수들에 적용됨.
@UseFilters(HttpExceptionFilter)//예외처리를 위한 filter를 사용함. 이 컨트롤러의 모든 함수에 적용됨.

export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers(): Promise<UserResponseDto[]> {//굳이 여기 함수 이름과 userService의 함수 이름이 같을 필요는 없음. 다르게 적어도 됨.
        return this.userService.getUsers();//async함수는 Promise로 리턴값 타입 약속
    }

    @Post()
    async addUser(@Body() body: UserRequestDto): Promise<UserResponseDto> {//body에 있는 UserRequestDto정보를 받음(Json형식이 DTO형식과 일치할 때 정상적으로 들어옴)
        return this.userService.addUser(body);//userService의 addUser 함수에 body를 넣어서 실행함.
    }

    @Delete()
    deleteUser(@Body() body: EmailRequestDto): Promise<void> {//body에 있는 EmailRequestDto정보를 받음(Json형식이 DTO형식과 일치할 때 정상적으로 들어옴)
        return this.userService.deleteUser(body);
    }

    @Get('/find')
    async findByEmail(@Body() body: EmailRequestDto): Promise<UserResponseDto> {//body에 있는 EmailRequestDto정보를 받음(Json형식이 DTO형식과 일치할 때 정상적으로 들어옴)
        return this.userService.findByEmail(body);
    }

    //위 함수 이후 @Get('추가 경로')가 있다면 위 함수인 index로 받아들여 typeerror가 발생할 수 있다.
    //해결하는 방법은 그 함수를 위 함수보다 위에 적어주는 것이다.

    //nestjs는 리턴할 때 계산 완료된 상황에서 리턴하기에 await를 굳이 붙일 필요는 없다.
    //다만 디버깅할 때 await를 붙이면 디버깅이 더 쉬울 수 있다.

    @Put('/password')
    updatePassword(@Body() body: PasswordRequestDto): Promise<void> {
        return this.userService.updatePassword(body);
    }

}
