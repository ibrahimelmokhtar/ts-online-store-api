-- create orders table:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    is_done BOOLEAN NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL
);
