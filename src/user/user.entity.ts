import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {hash} from 'bcrypt';

@Entity({name: 'users'}) // users tables name
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string;

    @Column()
    username: string;

    @Column({default: ''})
    bio: string;

    @Column({default: ''})
    image: string;

    @Column({select: false}) //исключить поле из всех запросов
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }
}