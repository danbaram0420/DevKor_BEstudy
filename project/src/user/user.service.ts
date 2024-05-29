import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    users: string[] = ['Alice', 'Bob', 'Eve'];//users는 string 배열. 말했듯, 변수 또는 함수의 타입을 뒤에 적어줌.

    getUsers(): string[] {//getUsers는 string 배열을 반환함.
        return this.users;//UserService 클래스(자기 자신)의 users를 반환함.
    }

    async addUser(name: string): Promise<string[]> {//addUser 함수는 name이라는 변수의 string을 받아서 Promise<string[]>을 반환함.
        //Promise는 비동기라 string을 반환할 것을 확신할 수 없기에 string으로 반환될 것이라고 약속하는 것(비동기일 때 promise를 사용함.)
        //update관련 함수는 대부분 비동기로 설정함.
        if (!this.users.includes(name)) {//users 배열에 name이 없으면
            await this.users.push(name);//name을 users 배열에 추가함.
        }
        return this.users;//users 배열을 반환함.
    }

    async deleteUser(name: string): Promise<string[]> {
        if (this.users.includes(name)) {//users 배열에 name이 있으면
            await this.users.splice(this.users.indexOf(name), 1);//users 배열에서 name을 제거함.
        }
        return this.users;//users 배열을 반환함.
    }

    getUserName(index: number): string {//동기, 비동기 설정은 크게 관련이 없는 함수들은 동기로 설정해도 상관없다. 다 async로 설정해도 상관없긴 한데 시간이 오래 걸린다.
        return this.users[index];//users 배열에서 num번째 요소를 반환함.
    }

}
