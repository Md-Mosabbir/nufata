import { Migration } from '@mikro-orm/migrations';

export class Migration20250514022038 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "ingredient" ("id" text not null, "name" text not null, "grams" real not null, "removable" boolean not null default false, "product_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "ingredient_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_INGREDIENT_PRODUCT_ID" ON "ingredient" (product_id) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_ingredient_deleted_at" ON "ingredient" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "ingredient" cascade;`);
  }

}
