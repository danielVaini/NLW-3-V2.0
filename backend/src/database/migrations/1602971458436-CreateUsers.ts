import { MigrationInterface, QueryRunner, Table } from "typeorm";


export class CreateUsers1602971458436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        generationStrategy: 'increment',

                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'password',
                        type: 'varchar'
                    },
                  
                    
                    
                ],
                  
                
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
