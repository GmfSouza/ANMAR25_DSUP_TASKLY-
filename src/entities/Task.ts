import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("tasks")
export class Task {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ length: 100, nullable: false })
	title!: string;

	@Column({ length: 255, nullable: false })
	description!: string;

	@Column({ enum: ["Todo", "In-Progress", "Done"], nullable: false })
	status!: string;

	@Column({ enum: ["Low", "Medium", "High"], nullable: false })
	priority!: string;

	@Column({ length: 50, nullable: true })
	category!: string;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;
}
