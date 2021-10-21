import {MigrationInterface, QueryRunner} from "typeorm";

export class addModel_Migrate1634781865961 implements MigrationInterface {
    name = 'addModel_Migrate1634781865961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, CONSTRAINT "PK_6e9a1704ddb6c20558c790a7569" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refJobMature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "jobId" uuid, "matureId" uuid, CONSTRAINT "PK_fd6e8da4e8693c8aab388365fa9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying(500) NOT NULL, "description" character varying NOT NULL, "address" character varying(500) NOT NULL, "active" boolean NOT NULL, "locationId" uuid NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "title" character varying(500) NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "content" character varying NOT NULL, "salary" character varying(200) NOT NULL, "status" numeric NOT NULL, "companyId" uuid NOT NULL, "experienceYears" numeric NOT NULL, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refUserJob" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "jobId" uuid NOT NULL, "isExpired" boolean NOT NULL, "isDeleted" boolean NOT NULL, CONSTRAINT "PK_24a12b46e1819a3fde9b321343e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location_companies_company" ("locationId" uuid NOT NULL, "companyId" uuid NOT NULL, CONSTRAINT "PK_4c92ad6b1995008b27297924153" PRIMARY KEY ("locationId", "companyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c87c761a1b97eed39a809e8d07" ON "location_companies_company" ("locationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ab9fad7baf8cf0629bdb8fde6a" ON "location_companies_company" ("companyId") `);
        await queryRunner.query(`CREATE TABLE "company_locations_location" ("companyId" uuid NOT NULL, "locationId" uuid NOT NULL, CONSTRAINT "PK_3fefdfd0b06f0c4aa76a14dd446" PRIMARY KEY ("companyId", "locationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eeaf52a644d38d5b2489c4966f" ON "company_locations_location" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_304ce79c9dde47c86f9dc52008" ON "company_locations_location" ("locationId") `);
        await queryRunner.query(`ALTER TABLE "refJobMature" ADD CONSTRAINT "FK_8999449eedd5e04eb433251039c" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refJobMature" ADD CONSTRAINT "FK_7f0d11464cf5320d31d21b6e572" FOREIGN KEY ("matureId") REFERENCES "mature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_e66170573cabd565dab1132727d" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refUserJob" ADD CONSTRAINT "FK_dfc1976398d62721b3618422611" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refUserJob" ADD CONSTRAINT "FK_c5aae585808c902ec5fbe35dfbc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location_companies_company" ADD CONSTRAINT "FK_c87c761a1b97eed39a809e8d07f" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "location_companies_company" ADD CONSTRAINT "FK_ab9fad7baf8cf0629bdb8fde6a3" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "company_locations_location" ADD CONSTRAINT "FK_eeaf52a644d38d5b2489c4966f5" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "company_locations_location" ADD CONSTRAINT "FK_304ce79c9dde47c86f9dc52008e" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company_locations_location" DROP CONSTRAINT "FK_304ce79c9dde47c86f9dc52008e"`);
        await queryRunner.query(`ALTER TABLE "company_locations_location" DROP CONSTRAINT "FK_eeaf52a644d38d5b2489c4966f5"`);
        await queryRunner.query(`ALTER TABLE "location_companies_company" DROP CONSTRAINT "FK_ab9fad7baf8cf0629bdb8fde6a3"`);
        await queryRunner.query(`ALTER TABLE "location_companies_company" DROP CONSTRAINT "FK_c87c761a1b97eed39a809e8d07f"`);
        await queryRunner.query(`ALTER TABLE "refUserJob" DROP CONSTRAINT "FK_c5aae585808c902ec5fbe35dfbc"`);
        await queryRunner.query(`ALTER TABLE "refUserJob" DROP CONSTRAINT "FK_dfc1976398d62721b3618422611"`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_e66170573cabd565dab1132727d"`);
        await queryRunner.query(`ALTER TABLE "refJobMature" DROP CONSTRAINT "FK_7f0d11464cf5320d31d21b6e572"`);
        await queryRunner.query(`ALTER TABLE "refJobMature" DROP CONSTRAINT "FK_8999449eedd5e04eb433251039c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_304ce79c9dde47c86f9dc52008"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eeaf52a644d38d5b2489c4966f"`);
        await queryRunner.query(`DROP TABLE "company_locations_location"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab9fad7baf8cf0629bdb8fde6a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c87c761a1b97eed39a809e8d07"`);
        await queryRunner.query(`DROP TABLE "location_companies_company"`);
        await queryRunner.query(`DROP TABLE "refUserJob"`);
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "refJobMature"`);
        await queryRunner.query(`DROP TABLE "mature"`);
    }

}
