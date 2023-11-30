import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class ForenkeyCustomer1699508902769 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'public.customer',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'public.user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('public.customer', 'FK_customer_user');
  }
}
