-- create products table:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    status BOOLEAN NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL
);
