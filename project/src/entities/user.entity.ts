import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    image?: string;

    @CreateDateColumn({ type: 'date'})
    createdAt: Date;
}