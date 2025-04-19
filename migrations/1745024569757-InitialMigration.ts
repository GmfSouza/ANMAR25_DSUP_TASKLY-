import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1745024569757 implements MigrationInterface {
    name = 'InitialMigration1745024569757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` enum ('Todo', 'In-Progress', 'Done') NOT NULL DEFAULT 'Todo', \`priority\` enum ('Low', 'Medium', 'High') NOT NULL DEFAULT 'Low', \`category\` varchar(50) NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(150) NOT NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`task_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notes\` ADD CONSTRAINT \`FK_notes_task_id\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notes\` DROP FOREIGN KEY \`FK_notes_task_id\``);
        await queryRunner.query(`DROP TABLE \`notes\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
    }

}
