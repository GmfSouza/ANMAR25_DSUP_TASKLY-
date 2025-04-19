import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Task } from "./Task";

@Entity("notes")
export class Note {
    @PrimaryGeneratedColumn()
    id!:number

    @Column({length: 150, nullable: false})
    content!: string

    @ManyToOne(() => Task, (task) => task.id, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "task_id" }) 
	task!: Task;

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
}