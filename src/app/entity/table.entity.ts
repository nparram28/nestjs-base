import {
	BaseEntity,
	Column,
	Entity,
	PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'Table' })
export class Table extends BaseEntity {
	@PrimaryColumn({
		name: 'Id',
		type: 'varchar',
	})
	id: number;

	@Column({
		name: 'Column',
		type: 'varchar',
	})
	column: string;
}