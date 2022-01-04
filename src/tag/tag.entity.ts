import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tags'}) //table name
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

}