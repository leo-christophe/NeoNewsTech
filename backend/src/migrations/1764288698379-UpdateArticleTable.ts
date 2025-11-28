import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateArticleTable1764288698379 implements MigrationInterface {
    name = 'UpdateArticleTable1764288698379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f330baf6be412e8dd60ff7f78e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a4b47830d1eada345ad116ed4"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_8a4b47830d1eada345ad116ed4" ON "article" ("archivedAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_f330baf6be412e8dd60ff7f78e" ON "article" ("publishedAt") `);
    }

}
