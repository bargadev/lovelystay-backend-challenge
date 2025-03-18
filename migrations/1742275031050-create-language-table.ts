import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1742275031050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "language" (
        language_id VARCHAR(30) PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
      );

      CREATE TABLE "user_language" (
        user_id VARCHAR,
        language_id VARCHAR,
        PRIMARY KEY (user_id, language_id),
        FOREIGN KEY (user_id) REFERENCES "user" (user_id) ON DELETE CASCADE,
        FOREIGN KEY (language_id) REFERENCES "language" (language_id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
