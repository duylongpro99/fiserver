import {MigrationInterface, QueryRunner} from "typeorm";

export class authLogin_Migrate1634292660347 implements MigrationInterface {
    name = 'authLogin_Migrate1634292660347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refreshTokens" DROP CONSTRAINT "PK_c4a0078b846c2c4508473680625"`);
        await queryRunner.query(`ALTER TABLE "refreshTokens" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "refreshTokens" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "refreshTokens" ADD CONSTRAINT "PK_c4a0078b846c2c4508473680625" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refreshTokens" DROP CONSTRAINT "PK_c4a0078b846c2c4508473680625"`);
        await queryRunner.query(`ALTER TABLE "refreshTokens" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "refreshTokens" ADD "id" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refreshTokens" ADD CONSTRAINT "PK_c4a0078b846c2c4508473680625" PRIMARY KEY ("id")`);
    }

}
