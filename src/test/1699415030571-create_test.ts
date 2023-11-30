import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTest1699415030571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'test',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
