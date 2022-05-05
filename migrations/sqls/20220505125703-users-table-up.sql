-- create users table:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name CHAR(100) NOT NULL,
    last_name CHAR(100) NOT NULL,
    user_name CHAR(50) NOT NULL,
    email CHAR(255) NOT NULL,
    password CHAR(255) NOT NULL
);
