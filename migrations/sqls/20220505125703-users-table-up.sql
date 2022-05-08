-- create users table:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS users (
    -- id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    user_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(100) NOT NULL
);
