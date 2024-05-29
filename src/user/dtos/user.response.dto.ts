import { IsDate, IsNotEmpty, IsEnum } from 'class-validator';
import { UserEntity } from 'src/entities';
import { Rank } from 'src/common/enums';

export class UserResponseDto {
    //response에서는 굳이 class validator를 사용하지 않아도 됨(어짜피 서버에서 보내는 데이터는 검증이 끝난 데이터이기 때문)
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    password: string;
    
    email: string;

    name: string;

    @IsNotEmpty()
    @IsEnum(Rank)
    rank: Rank;

    image?: string;

    @IsDate()
    createdAt: Date;

    constructor(entity: UserEntity) {
        this.email = entity.email;
        this.name = entity.name;
        this.rank = entity.rank;
        this.image = entity.image;
        this.createdAt = entity.createdAt;
    }//responseDto는 entity를 수정해서 반환하는 경우가 많은데
    // 이런 경우 constructor를 사용하여 entity를 DTO로 변환해서 가져와야 함.
}