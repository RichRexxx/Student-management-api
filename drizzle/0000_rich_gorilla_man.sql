CREATE TABLE "student" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullname" text NOT NULL,
	"email" text NOT NULL,
	"gender" text NOT NULL,
	"date_of_birth" text NOT NULL,
	"department" text NOT NULL,
	"level" text NOT NULL,
	"registration_number" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "student_registration_number_unique" UNIQUE("registration_number")
);
