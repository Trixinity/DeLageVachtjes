import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Birthday {
	@PrimaryColumn({
		type: 'varchar',
		length: 20,
	})
	public id!: string;

	@Column({
		type: 'integer',
	})
	public day!: number;

	@Column({
		type: 'integer',
	})
	public month!: number;
}