import {MigrationInterface, QueryRunner} from "typeorm";

export class authMigration1634225898751 implements MigrationInterface {
    name = 'authMigration1634225898751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "RefreshTokens" ("id" character varying(300) NOT NULL, "isRevoked" boolean NOT NULL, "expires" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_6dfd786f75cfe054e9ae3a45f5" UNIQUE ("userId"), CONSTRAINT "PK_07ff4bc1b9063ed3401f15aea10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "RefreshTokens" ADD CONSTRAINT "FK_6dfd786f75cfe054e9ae3a45f5e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "RefreshTokens" DROP CONSTRAINT "FK_6dfd786f75cfe054e9ae3a45f5e"`);
        await queryRunner.query(`DROP TABLE "RefreshTokens"`);
    }

}
