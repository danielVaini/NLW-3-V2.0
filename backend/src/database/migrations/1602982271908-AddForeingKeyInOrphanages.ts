import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddForeingKeyInOrphanages1602982271908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn('orphanages',  new TableColumn({
            name: 'user_id',
            type: 'integer',
            isNullable: true
        }));

        await queryRunner.createForeignKey('orphanages', new TableForeignKey({
            name: 'IdUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orphanages', 'IdUser');

        await queryRunner.dropColumn('orphanage', 'user_id')
    }

}
