import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

export enum Status {
	Todo = "Todo",
	InProgress = "In-Progress",
	Done = "Done",
}

export enum Priority {
	Low = "Low",
	Medium = "Medium",
	High = "High",
}

@Entity("tasks")
export class Task {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 100, nullable: false })
	title!: string;

	@Column({ length: 255, nullable: false })
	description!: string;

	@Column({
		type: "enum",
		enum: Status,
		default: Status.Todo,
		nullable: false,
	})
	status!: Status;

	@Column({
		type: "enum",
		enum: Priority,
		default: Priority.Low,
		nullable: false,
	})
	priority!: Priority;

	@Column({ length: 50, nullable: true })
	category!: string;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}
