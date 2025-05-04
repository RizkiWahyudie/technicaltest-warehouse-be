-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               PostgreSQL 17.4 on x86_64-windows, compiled by msvc-19.42.34436, 64-bit
-- Server OS:                    
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table public.product
CREATE TABLE IF NOT EXISTS "product" (
	"code" VARCHAR(50) NOT NULL,
	"name" VARCHAR(100) NOT NULL,
	"description" TEXT NULL DEFAULT NULL,
	"weight" NUMERIC(10,2) NULL DEFAULT NULL,
	"unit_of_measurement" VARCHAR(20) NOT NULL,
	"category" VARCHAR(50) NOT NULL,
	"created_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	"updated_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ("code"),
	KEY ("category")
);

-- Dumping data for table public.product: -1 rows
/*!40000 ALTER TABLE "product" DISABLE KEYS */;
REPLACE INTO "product" ("code", "name", "description", "weight", "unit_of_measurement", "category", "created_at", "updated_at") VALUES
	('PRD007', 'Headset', 'High performance', 500.00, 'gr', 'Electronics', '2025-05-03 11:30:51.822253', '2025-05-03 11:30:51.822253'),
	('PRD001', 'Laptop Mini ++', 'performance Mini', 1.00, 'kg', 'Electronics', '2025-05-03 10:06:35.903151', '2025-05-03 12:36:37.258141'),
	('PRD006', 'Laptop Gaming', 'High performance Mini', 1.00, 'kg', 'Electronics', '2025-05-03 11:30:31.021513', '2025-05-05 00:21:53.320326'),
	('PRD004', 'Earphone', 'Latest earphone model', 0.20, 'kg', 'Electronics', '2025-05-05 00:22:44.516296', '2025-05-05 00:22:44.516296');
/*!40000 ALTER TABLE "product" ENABLE KEYS */;

-- Dumping structure for table public.role
CREATE TABLE IF NOT EXISTS "role" (
	"id" SERIAL NOT NULL,
	"role_name" VARCHAR(50) NOT NULL,
	"status" SMALLINT NOT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "role_status_check" CHECK ((status = ANY (ARRAY[0, 1])))
);

-- Dumping data for table public.role: -1 rows
/*!40000 ALTER TABLE "role" DISABLE KEYS */;
REPLACE INTO "role" ("id", "role_name", "status") VALUES
	(1, 'Admin', 1),
	(2, 'Staff', 1);
/*!40000 ALTER TABLE "role" ENABLE KEYS */;

-- Dumping structure for table public.user
CREATE TABLE IF NOT EXISTS "user" (
	"id" SERIAL NOT NULL,
	"fullname" VARCHAR(100) NOT NULL,
	"email" VARCHAR(100) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"role_id" INTEGER NULL DEFAULT NULL,
	"phone" VARCHAR(20) NULL DEFAULT NULL,
	"created_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ("id"),
	UNIQUE ("email"),
	KEY ("email"),
	KEY ("role_id"),
	CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.user: -1 rows
/*!40000 ALTER TABLE "user" DISABLE KEYS */;
REPLACE INTO "user" ("id", "fullname", "email", "password", "role_id", "phone", "created_at") VALUES
	(1, 'Admin User', 'admin@warehouse.com', '$2a$12$Jwur1xWwOLCD7L865piNHugN4AhlFYljHu/vcY7REo1RnwBtCQeUy', 1, '081234567890', '2025-05-03 10:06:35.895579'),
	(2, 'Staff User', 'staff@warehouse.com', '$2a$12$Jwur1xWwOLCD7L865piNHugN4AhlFYljHu/vcY7REo1RnwBtCQeUy', 2, '081234567891', '2025-05-03 10:06:35.895579');
/*!40000 ALTER TABLE "user" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
