import {MigrationInterface, QueryRunner} from "typeorm";

export class addModel_Migrate1634782245439 implements MigrationInterface {
    name = 'addModel_Migrate1634782245439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company_locations_location" ("companyId" uuid NOT NULL, "locationId" uuid NOT NULL, CONSTRAINT "PK_3fefdfd0b06f0c4aa76a14dd446" PRIMARY KEY ("companyId", "locationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eeaf52a644d38d5b2489c4966f" ON "company_locations_location" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_304ce79c9dde47c86f9dc52008" ON "company_locations_location" ("locationId") `);
        await queryRunner.query(`ALTER TABLE "company_locations_location" ADD CONSTRAINT "FK_eeaf52a644d38d5b2489c4966f5" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "company_locations_location" ADD CONSTRAINT "FK_304ce79c9dde47c86f9dc52008e" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_locations_location" DROP CONSTRAINT "FK_304ce79c9dde47c86f9dc52008e"`);
        await queryRunner.query(`ALTER TABLE "company_locations_location" DROP CONSTRAINT "FK_eeaf52a644d38d5b2489c4966f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_304ce79c9dde47c86f9dc52008"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eeaf52a644d38d5b2489c4966f"`);
        await queryRunner.query(`DROP TABLE "company_locations_location"`);
    }

}
