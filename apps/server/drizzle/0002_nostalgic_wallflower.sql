CREATE TABLE "images" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"image_key" text NOT NULL,
	"width" integer,
	"height" integer,
	"size" integer,
	"type" "image_type_enum" DEFAULT 'profile' NOT NULL,
	"is_primary" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "user_images" CASCADE;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "images_type_idx" ON "images" USING btree ("type");--> statement-breakpoint
CREATE INDEX "images_is_primary_idx" ON "images" USING btree ("is_primary");