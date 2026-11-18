CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullname" text NOT NULL,
	"email" text NOT NULL,
	"gender" text NOT NULL,
	"date_of_birth" date NOT NULL,
	"department" text NOT NULL,
	"level" text NOT NULL,
	"registration_number" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "students_email_unique" UNIQUE("email"),
	CONSTRAINT "students_registration_number_unique" UNIQUE("registration_number")
);
--> statement-breakpoint
DROP TABLE "student" CASCADE;