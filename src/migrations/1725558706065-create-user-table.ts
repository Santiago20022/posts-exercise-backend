import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1725558706065 implements MigrationInterface {
    name = 'CreateUserTable1725558706065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`city\` datetime NOT NULL, \`zipcode\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
