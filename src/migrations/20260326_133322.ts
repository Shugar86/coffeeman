import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "site_settings_home_polaroids" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_home_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_about_polaroids" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "site_settings_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_masterclasses" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"image_id" integer
  );
  
  ALTER TABLE "delivery_info" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "cafes" ADD COLUMN "phone" varchar;
  ALTER TABLE "cafes" ADD COLUMN "menu_url" varchar;
  ALTER TABLE "cafes" ADD COLUMN "sort" numeric DEFAULT 0;
  ALTER TABLE "site_settings" ADD COLUMN "home_story_heading" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "home_story_body" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "about_hero_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "b2b_price_list_id" integer;
  ALTER TABLE "delivery_info" ADD COLUMN "delivery_column_title" varchar DEFAULT 'Доставка';
  ALTER TABLE "delivery_info" ADD COLUMN "delivery_body" jsonb;
  ALTER TABLE "delivery_info" ADD COLUMN "pickup_column_title" varchar DEFAULT 'Самовывоз';
  ALTER TABLE "delivery_info" ADD COLUMN "pickup_body" jsonb;
  ALTER TABLE "delivery_info" ADD COLUMN "highlight_title" varchar;
  ALTER TABLE "delivery_info" ADD COLUMN "highlight_body" jsonb;
  ALTER TABLE "delivery_info" ADD COLUMN "payment_title" varchar DEFAULT 'Оплата';
  ALTER TABLE "delivery_info" ADD COLUMN "payment_body" jsonb;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_home_polaroids" ADD CONSTRAINT "site_settings_home_polaroids_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_home_polaroids" ADD CONSTRAINT "site_settings_home_polaroids_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_home_stats" ADD CONSTRAINT "site_settings_home_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_about_polaroids" ADD CONSTRAINT "site_settings_about_polaroids_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_about_polaroids" ADD CONSTRAINT "site_settings_about_polaroids_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_about_stats" ADD CONSTRAINT "site_settings_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_masterclasses" ADD CONSTRAINT "site_settings_masterclasses_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_masterclasses" ADD CONSTRAINT "site_settings_masterclasses_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_media_id_idx" ON "articles_rels" USING btree ("media_id");
  CREATE INDEX "site_settings_home_polaroids_order_idx" ON "site_settings_home_polaroids" USING btree ("_order");
  CREATE INDEX "site_settings_home_polaroids_parent_id_idx" ON "site_settings_home_polaroids" USING btree ("_parent_id");
  CREATE INDEX "site_settings_home_polaroids_image_idx" ON "site_settings_home_polaroids" USING btree ("image_id");
  CREATE INDEX "site_settings_home_stats_order_idx" ON "site_settings_home_stats" USING btree ("_order");
  CREATE INDEX "site_settings_home_stats_parent_id_idx" ON "site_settings_home_stats" USING btree ("_parent_id");
  CREATE INDEX "site_settings_about_polaroids_order_idx" ON "site_settings_about_polaroids" USING btree ("_order");
  CREATE INDEX "site_settings_about_polaroids_parent_id_idx" ON "site_settings_about_polaroids" USING btree ("_parent_id");
  CREATE INDEX "site_settings_about_polaroids_image_idx" ON "site_settings_about_polaroids" USING btree ("image_id");
  CREATE INDEX "site_settings_about_stats_order_idx" ON "site_settings_about_stats" USING btree ("_order");
  CREATE INDEX "site_settings_about_stats_parent_id_idx" ON "site_settings_about_stats" USING btree ("_parent_id");
  CREATE INDEX "site_settings_masterclasses_order_idx" ON "site_settings_masterclasses" USING btree ("_order");
  CREATE INDEX "site_settings_masterclasses_parent_id_idx" ON "site_settings_masterclasses" USING btree ("_parent_id");
  CREATE INDEX "site_settings_masterclasses_image_idx" ON "site_settings_masterclasses" USING btree ("image_id");
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_about_hero_image_id_media_id_fk" FOREIGN KEY ("about_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_b2b_price_list_id_media_id_fk" FOREIGN KEY ("b2b_price_list_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_about_hero_image_idx" ON "site_settings" USING btree ("about_hero_image_id");
  CREATE INDEX "site_settings_b2b_price_list_idx" ON "site_settings" USING btree ("b2b_price_list_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_home_polaroids" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_home_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_about_polaroids" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_about_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_masterclasses" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "site_settings_home_polaroids" CASCADE;
  DROP TABLE "site_settings_home_stats" CASCADE;
  DROP TABLE "site_settings_about_polaroids" CASCADE;
  DROP TABLE "site_settings_about_stats" CASCADE;
  DROP TABLE "site_settings_masterclasses" CASCADE;
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_about_hero_image_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_b2b_price_list_id_media_id_fk";
  
  DROP INDEX "site_settings_about_hero_image_idx";
  DROP INDEX "site_settings_b2b_price_list_idx";
  ALTER TABLE "delivery_info" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "cafes" DROP COLUMN "phone";
  ALTER TABLE "cafes" DROP COLUMN "menu_url";
  ALTER TABLE "cafes" DROP COLUMN "sort";
  ALTER TABLE "site_settings" DROP COLUMN "home_story_heading";
  ALTER TABLE "site_settings" DROP COLUMN "home_story_body";
  ALTER TABLE "site_settings" DROP COLUMN "about_hero_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "b2b_price_list_id";
  ALTER TABLE "delivery_info" DROP COLUMN "delivery_column_title";
  ALTER TABLE "delivery_info" DROP COLUMN "delivery_body";
  ALTER TABLE "delivery_info" DROP COLUMN "pickup_column_title";
  ALTER TABLE "delivery_info" DROP COLUMN "pickup_body";
  ALTER TABLE "delivery_info" DROP COLUMN "highlight_title";
  ALTER TABLE "delivery_info" DROP COLUMN "highlight_body";
  ALTER TABLE "delivery_info" DROP COLUMN "payment_title";
  ALTER TABLE "delivery_info" DROP COLUMN "payment_body";`)
}
