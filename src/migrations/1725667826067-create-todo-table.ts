import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTodoTable1725667826067 implements MigrationInterface {
    name = 'CreateTodoTable1725667826067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`todo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`completed\` tinyint NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_1e982e43f63a98ad9918a86035c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_1e982e43f63a98ad9918a86035c\``);
        await queryRunner.query(`DROP TABLE \`todo\``);
    }

}
