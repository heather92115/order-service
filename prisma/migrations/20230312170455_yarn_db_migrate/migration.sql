-- CreateEnum
CREATE TYPE "order_item_actions" AS ENUM ('routed', 'pv1', 'pv2', 'shipped');

-- CreateTable
CREATE TABLE "order_items" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "clinician_id" UUID NOT NULL,
    "rx_id" UUID NOT NULL,
    "status_id" UUID NOT NULL,
    "previous_status_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_on" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "priority" SMALLINT NOT NULL,
    "product_id" UUID NOT NULL,
    "mapped_ndc" VARCHAR(13),
    "dispensed_product_id" UUID,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "patient_id" UUID NOT NULL,
    "pharmacy_id" UUID,
    "order_batch_id" UUID,
    "shipped_address_id" UUID,
    "status_id" UUID NOT NULL,
    "previous_status_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_on" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "highest_priority" SMALLINT NOT NULL DEFAULT 1,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regimens" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "billing_unit_quantity" SMALLINT NOT NULL,
    "billing_unit_type" TEXT NOT NULL,
    "days_supply" SMALLINT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "regimens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "upc" VARCHAR(255) NOT NULL,
    "formatted_ndc" VARCHAR(13),
    "display_name" VARCHAR(255) NOT NULL,
    "package_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packages" (
    "id" UUID NOT NULL,
    "vendor" VARCHAR(255) NOT NULL,
    "weight" REAL NOT NULL,
    "length" REAL NOT NULL,
    "width" REAL NOT NULL,
    "height" REAL NOT NULL,

    CONSTRAINT "packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescriptions" (
    "id" UUID NOT NULL,
    "dose_spot_id" VARCHAR(255) NOT NULL,
    "dose_spot_status" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filled_prescriptions" (
    "id" UUID NOT NULL,
    "rx_dose_spot_id" VARCHAR(255) NOT NULL,
    "patient_id" UUID NOT NULL,
    "patient_first_name" VARCHAR(255) NOT NULL,
    "patient_last_name" VARCHAR(255) NOT NULL,
    "patient_dob" TIMESTAMPTZ(6) NOT NULL,
    "patient_dose_spot_id" VARCHAR(255) NOT NULL,
    "prescribed_ndc" VARCHAR(13),
    "dispensed_ndc" VARCHAR(13),
    "details" JSON NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "filled_prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_addresses" (
    "id" UUID NOT NULL,
    "address_1" VARCHAR(255) NOT NULL,
    "address_2" VARCHAR(255),
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "zip_code" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shipping_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pharmacies" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "dose_spot_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pharmacies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "dob" TIMESTAMPTZ(6) NOT NULL,
    "dose_spot_id" VARCHAR(255),
    "shipping_address_id" UUID NOT NULL,
    "alt_shipping_address_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clinicians" (
    "id" UUID NOT NULL,
    "prefix" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "suffix" VARCHAR(255) NOT NULL,
    "dose_spot_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clinicians_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_batches" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "valid_until" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "order_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_statuses" (
    "id" SMALLINT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "terminal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "order_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_commentaries" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" VARCHAR(255) NOT NULL,

    CONSTRAINT "order_commentaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item_commentaries" (
    "id" UUID NOT NULL,
    "order_item_id" UUID NOT NULL,
    "order_item_action" "order_item_actions" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "comment" VARCHAR(255) NOT NULL,

    CONSTRAINT "order_item_commentaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payload_logs" (
    "id" SERIAL NOT NULL,
    "http_status_code" INTEGER,
    "request_service" VARCHAR(255),
    "request_payload" JSON,
    "response_payload" JSON,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "order_id" UUID,
    "order_item_id" UUID,

    CONSTRAINT "payload_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "valid_until_index" ON "order_batches"("valid_until");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
