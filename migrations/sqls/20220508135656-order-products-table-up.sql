-- create products table:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_quantity INTEGER NOT NULL,
    order_id UUID REFERENCES orders(id) NOT NULL,
    product_id UUID REFERENCES products(id) NOT NULL
);
