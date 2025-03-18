import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1742226309053 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "github_user" (
        github_user_id VARCHAR(30) PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        fullname VARCHAR(255),
        location VARCHAR(100),
        public_repositories INT,
        followers INT,
        following INT,
        profile_url VARCHAR(255),
        avatar_url VARCHAR(255),
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(): Promise<void> {}
}
