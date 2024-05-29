import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserRequestDto {//요청으로 들어오는 형식 정의. 불일치하면 서버로 보내지기 전에 걸러질 수 있도록.
    @IsNotEmpty()
    @IsEmail()
    email: string;//string형태로 해석되는 email은 반드시 존재해야 하며, 이메일 형식이어야 함.

    @IsNotEmpty()
    @IsString()
    password: string;//string형으로 해석되는 password는 반드시 존재해야 함.

    @IsNotEmpty()
    @IsString()
    name: string;//string형으로 해석되는 name은 반드시 존재해야 함.

    @IsOptional()
    @IsString()
    image?: string;//string형으로 해석되는 image는 존재하지 않아도 됨. 존재할 때만 string인지 확인
}

export class EmailRequestDto extends PickType(UserRequestDto, ['email'] as const) {}
//PickType(원래 DTO, [원하는 속성] as const)를 사용하면 원래 DTO에서 원하는 속성만 가져와 재활용 가능
export class PasswordRequestDto extends PickType(UserRequestDto, ['email', 'password'] as const) {}