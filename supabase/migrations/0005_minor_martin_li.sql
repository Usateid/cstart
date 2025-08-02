-- Add new columns with default values for existing records
ALTER TABLE "users" ADD COLUMN "surname" varchar(100) NOT NULL DEFAULT 'N/A';
ALTER TABLE "users" ADD COLUMN "birth_date" timestamp NOT NULL DEFAULT '1900-01-01 00:00:00';
ALTER TABLE "users" ADD COLUMN "tax_code" varchar(16) NOT NULL DEFAULT 'N/A';
ALTER TABLE "users" ADD COLUMN "phone_number" varchar(15) NOT NULL DEFAULT 'N/A';
ALTER TABLE "users" ADD COLUMN "address" varchar(255) NOT NULL DEFAULT 'N/A';