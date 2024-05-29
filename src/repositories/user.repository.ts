import { HttpException, Injectable } from "@nestjs/common";
import { UserEntity } from "src/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRequestDto } from "src/user/dtos/user.request.dto";

@Injectable()
export class UserRepository {//repository는 데이터베이스와 직접적으로 소통하는 클래스
    //최대한 general한 코드로 작성하는 것이 좋음(다양한 서비스에서 이용할 수 있도록)
    constructor(//repository에서 userEntity를 Repository로 변환
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}
    
    async findAll(): Promise<UserEntity[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }

    async existsByEmail(email: string): Promise<boolean> {
        const user = await this.userRepository.exists({ where: { email } });
        return user;
    }

    async create(info: UserRequestDto): Promise<UserEntity> {
        if (!(await this.existsByEmail(info.email))) {
            //함수명에 마우스 대 봤을 때 반환타입이 Promise로 지정되어 있으면 await를 사용해야 함.
            const user = this.userRepository.create(info);
            //만약 데이터를 entity로 받지 않고 따로따로 받더라도 create를 통해 entity를 만들어서 저장할 수 있음.
            //이 함수는 UserEntity를 받기 때문에 딱히 쓸 데는 없는 코드긴 함
            return await this.userRepository.save(user);
        } else {
            throw new HttpException('User already exists', 409);
        }
    }

    async deleteByEmail(email: string): Promise<void> {
        if (await this.existsByEmail(email)) {
            await this.userRepository.delete({ email });
        } else {
            throw new HttpException('User not found', 404);
        }

    }

    async updatePassword(email: string, password: string): Promise<void> {
        if (await this.existsByEmail(email)) {
            await this.userRepository.update({ email }, { password });
        } else {
            throw new HttpException('User not found', 404);
        }
    }

    async updateToken(email: string, token: string): Promise<void> {
        if (await this.existsByEmail(email)) {
            await this.userRepository.update({ email }, { token });
        } else {
            throw new HttpException('User not found', 404);
        }
    }
}