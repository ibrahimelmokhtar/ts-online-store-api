-- create orders table:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    is_done BOOLEAN NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL,
    products_ids UUID[] NOT NULL,
    products_quantities INTEGER[] NOT NULL,
    date_time TIMESTAMPTZ NOT NULL,
    date_time_readable VARCHAR(80) NOT NULL
);
