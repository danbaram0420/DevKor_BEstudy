import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)//entity는 바로 사용할 수 없어서 repository로 변환해 줌.
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    users: string[] = ['Alice', 'Bob', 'Eve'];//users는 string 배열. 말했듯, 변수 또는 함수의 타입을 뒤에 적어줌.

    async getUsers(): Promise<UserEntity[]> {//getUsers는 UserEntity 배열을 반환함.
        const users = await this.userRepository.find();//userRepository의 find 실행. 
        return users;//find는 userRepository의 모든 데이터를 찾아서 반환함. 즉, 모든 유저 정보를 반환함.
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: {email} });//userRepository의 findOne 실행. email이 일치하는 유저를 찾아서 반환함.
        return user;//찾은 유저를 반환함.
    }

    async addUser(info: UserEntity): Promise<UserEntity> {//addUser 함수는 info이라는 변수의 UserEntity를 받아서 UserEntity반환.
        //Promise는 비동기라 반환 타입을 확정지을 수 없어 UserEntity 반환을 '약속'함
        //update관련 함수는 대부분 비동기로 설정함.
        if (!(await this.findByEmail(info.email))) {//users 배열에 email로 찾은 name이 없으면
            //함수명에 마우스 대 봤을 때 반환타입이 Promise로 지정되어 있으면 await를 사용해야 함.
            const user = this.userRepository.create(info);//userRepository에 info를 생성함.
            //만약 데이터를 entity로 받지 않고 따로따로 받더라도 create를 통해 entity를 만들어서 저장할 수 있음.
            //이 함수는 UserEntity를 받기 때문에 딱히 쓸 데는 없는 코드긴 함
            return await this.userRepository.save(user);//userRepository에 user를 저장함.
        }
        else {
            throw new HttpException('User already exists', 409);//이미 존재하는 유저라는 에러를 반환함.
        }
    }

    async deleteUser(email: string): Promise<void> {//삭제는 반환값이 없음
        if (await this.findByEmail(email)) {//users 배열에 email로 찾은 name이 있으면
            await this.userRepository.delete({email});//userRepository에서 email이 일치하는 유저를 삭제함.
        }
        else {
            throw new HttpException('User not found', 404);//유저를 찾을 수 없다는 에러를 반환함.
        }
    }

    async updatePassword(email: string, password: string): Promise<void> {
        if (await this.findByEmail(email)) {//users 배열에 email로 찾은 name이 있으면
            await this.userRepository.update({email}, {password});//userRepository에서 email이 일치하는 유저의 password를 변경함.
        }//입력으로 받는 변수명이 UserEntity의 변수명과 같아 그대로 사용, 다를 경우 {email: 변수명} 이런 식으로 사용.
        else {
            throw new HttpException('User not found', 404);//유저를 찾을 수 없다는 에러를 반환함.
        }
    }

}
