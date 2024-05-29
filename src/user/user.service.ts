import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories';
import { UserResponseDto } from './dtos/user.response.dto';
import { EmailRequestDto, PasswordRequestDto, UserRequestDto } from './dtos/user.request.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}//repository를 통해 한 단계 거쳐서 데이터를 가져옴.
    //repository를 거치면 서비스 코드가 훨씬 간결해짐.

    async getUsers(): Promise<UserResponseDto[]> {//getUsers는 UserResponseDto 배열을 반환함.
        const usersEntity = await this.userRepository.findAll();//userRepository의 findAll 실행. 
        const users = usersEntity.map(user => new UserResponseDto(user));//map함수를 통해 entity를 DTO로 변환함.
        return users;//findAll은 userRepository의 모든 데이터를 찾아서 반환함. 즉, 모든 유저 정보를 dto로 반환함.
    }

    async findByEmail(body: EmailRequestDto): Promise<UserResponseDto> {
        const userEntity = await this.userRepository.findByEmail(body.email);//userRepository에서 EmailRequestDto 속 email이 일치하는 유저를 찾음.
        const user = new UserResponseDto(userEntity);//찾은 userEntity를 UserResponseDto로 변환함.
        return user;//찾은 유저를 dto형태로 반환함.
    }

    async addUser(body: UserRequestDto): Promise<UserResponseDto> {
        //update관련 함수는 대부분 비동기로 설정함.
        const newUserEntity = await this.userRepository.create(body);//userRepository에 body를 받아서 유저를 생성함.
        const newUser = new UserResponseDto(newUserEntity);//생성한 유저를 UserResponseDto로 변환함.
        return newUser;//생성한 유저를 반환함.
    }

    async deleteUser(body: EmailRequestDto): Promise<void> {//삭제는 반환값이 없음
        await this.userRepository.deleteByEmail(body.email);//userRepository에서 입력받은 dto의 email이 일치하는 유저를 삭제함.
    }

    async updatePassword(body: PasswordRequestDto): Promise<void> {
        await this.userRepository.updatePassword(body.email, body.password);//userRepository에서 email이 일치하는 유저의 비밀번호를 변경함.
    }

    async updateToken(email: string, token: string): Promise<void> {
        await this.userRepository.updateToken(email, token);//userRepository에서 email이 일치하는 유저의 토큰을 변경함.
    }

}
