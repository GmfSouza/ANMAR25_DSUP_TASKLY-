import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { Task } from "./Task";

@Entity("notes")
export class Note {
    @PrimaryGeneratedColumn()
    id!:number

    @Column({length: 150, nullable: false})
    content!: string

    @Column()
    task_id!: number

    @ManyToOne(() => Task, (task) => task.id)
    task!: Task

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
}