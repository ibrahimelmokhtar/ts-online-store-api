-- create order_products table:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS order_products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL,
    product_quantity INTEGER NOT NULL,
    date_time TIMESTAMPTZ NOT NULL,
    date_time_readable VARCHAR(80) NOT NULL
);
