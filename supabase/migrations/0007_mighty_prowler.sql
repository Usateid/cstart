CREATE TABLE "active_bundles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"bundle_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "active_bundles" ADD CONSTRAINT "active_bundles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "active_bundles" ADD CONSTRAINT "active_bundles_bundle_id_bundles_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles"("id") ON DELETE no action ON UPDATE no action;