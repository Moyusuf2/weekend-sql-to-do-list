DROP TABLE IF EXISTS "tasks";

CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (255),
	"isComplete" BOOLEAN DEFAULT FALSE);
	
INSERT INTO "tasks"
	("task","isComplete")
VALUES
('laundry', TRUE),
('wash dishes', FALSE),
('work on assignment', TRUE),
('chill', FALSE);

SELECT * 
FROM "tasks" 
ORDER BY "id";
UPDATE "tasks"
SET "isComplete" = NOT "isComplete"
WHERE "id" = 2;

DELETE FROM "tasks"
WHERE "id" = 4;

SELECT * 
    FROM "tasks" 
    ORDER BY "id";