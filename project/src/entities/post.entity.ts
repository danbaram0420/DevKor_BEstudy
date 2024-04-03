import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()//primary key 설정. 기본은 auto increment
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    likes: number;

    @ManyToOne(() => UserEntity, {onDelete:'SET NULL'})//참조된 애 사라지면 자동으로 null 설정)//foreign key 설정. 당연히 UserEntity의 primary key를 참조함.
    author: UserEntity;//얘 말고도 oneToMany, oneToOne, ManyToMany 등 다양한 관계 설정 가능

    @CreateDateColumn({ type: 'date'})//생성일자 자동으로 생성
    createdAt: Date;

    
}