import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1742264491356 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN location;
      ALTER TABLE "user" ADD COLUMN location_id VARCHAR(30);
      ALTER TABLE "user" ADD CONSTRAINT "FK_location_id" FOREIGN KEY (location_id) REFERENCES "location" (location_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
