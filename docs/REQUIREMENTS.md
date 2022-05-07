# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

# Table of Contents

- [API Requirements](#api-requirements)
- [Table of Contents](#table-of-contents)
- [API Endpoints](#api-endpoints)
  - [`/users` Endpoints](#users-endpoints)
    - [Create New User](#create-new-user)
    - [Show Specific User](#show-specific-user)
    - [Show All Users](#show-all-users)
    - [Update Specific User](#update-specific-user)
    - [Delete Specific User](#delete-specific-user)
  - [`/products` Endpoints](#products-endpoints)
    - [Create New Product](#create-new-product)
    - [Show Specific Product](#show-specific-product)
    - [Show All Products](#show-all-products)
    - [Update Specific Product](#update-specific-product)
    - [Delete Specific Product](#delete-specific-product)
  - [`/orders` Endpoints](#orders-endpoints)
- [Data Shapes](#data-shapes)
  - [User Shape](#user-shape)
  - [Product Shape](#product-shape)
  - [Order Shape](#order-shape)

# API Endpoints

[(Back to top)](#table-of-contents)

This API has **multiple** endpoints using the different `HTTP methods` as explained below:

## `/users` Endpoints

### Create New User

[(Back to top)](#table-of-contents)

- HTTP Method: **`POST`**
- Endpoint: `/users/create`
- Request Body: `User object`
- Request Params: `N/A`
- Response Body: `User object`
- Example:

    ```http
    - Request URL: /users/create/
    ```

    ```json
    - Request Body:
        {
            "first_name": "Ibrahim",
            "last_name": "El-Mokhtar",
            "user_name": "ibrahimelmokhtar",
            "email": "test@test.com",
            "password": "password123"
        }
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "d485b697-69c2-4198-8231-f6054841baaf",
                "first_name": "Ibrahim",
                "last_name": "El-Mokhtar",
                "user_name": "ibrahimelmokhtar",
                "email": "test@test.com",
                "password": "$2b$10$1mOTa6VX2zuJr/MAZIaxBOFjnwFLR4TWAHZT34As4mVd4LQ9nDXz2"
            },
            "message": "User created successfully."
        }
    ```

### Show Specific User

[(Back to top)](#table-of-contents)

- HTTP Method: **`GET`**
- Endpoint: `/users/show/:id`
- Request Body: `N/A`
- Request Params: `:id [integer]`
- Response Body: `User object`
- Example:

    ```http
    - Request URL: /users/show/d485b697-69c2-4198-8231-f6054841baaf
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "d485b697-69c2-4198-8231-f6054841baaf",
                "first_name": "Ibrahim",
                "last_name": "El-Mokhtar",
                "user_name": "ibrahimelmokhtar",
                "email": "test@test.com",
                "password": "$2b$10$1mOTa6VX2zuJr/MAZIaxBOFjnwFLR4TWAHZT34As4mVd4LQ9nDXz2"
            },
            "message": "User shown successfully."
        }
    ```

### Show All Users

[(Back to top)](#table-of-contents)

- HTTP Method: **`GET`**
- Endpoint: `/users/showAll`
- Request Body: `N/A`
- Request Params: `N/A`
- Response Body: `Array of User objects`
- Example:

    ```http
    - Request URL: /users/showAll
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "totalUsers": 2,
            "data": [{
                "id": "d485b697-69c2-4198-8231-f6054841baaf",
                "first_name": "Ibrahim",
                "last_name": "El-Mokhtar",
                "user_name": "ibrahimelmokhtar",
                "email": "test@test.com",
                "password": "$2b$10$1mOTa6VX2zuJr/MAZIaxBOFjnwFLR4TWAHZT34As4mVd4LQ9nDXz2"
            },
            {
                "id": "b2eee22f-4e60-464d-9456-314ae190388d",
                "first_name": "James",
                "last_name": "Bond",
                "user_name": "jamesbond",
                "email": "email@email.com",
                "password": "$2b$10$JzbrVDsB0AbYmDYV7TgqGuTNKiHJP9brF1xVrV6krgNw/VBoRemce"
            }],
            "message": "Users shown successfully."
        }
    ```

### Update Specific User

[(Back to top)](#table-of-contents)

- HTTP Method: **`PUT`**
- Endpoint: `/users/update/:id`
- Request Body: `User object`
- Request Params: `:id [integer]`
- Response Body: `User object`
- Example:

    ```http
    - Request URL: /users/update/d485b697-69c2-4198-8231-f6054841baaf
    ```

    ```json
    - Request Body:
        {
            "first_name": "Ibrahim",
            "last_name": "El-Mokhtar",
            "user_name": "ibrahimelmokhtar",
            "email": "email@email.com",
            "password": "password123123"
        }
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "d485b697-69c2-4198-8231-f6054841baaf",
                "first_name": "Ibrahim",
                "last_name": "El-Mokhtar",
                "user_name": "ibrahimelmokhtar",
                "email": "email@email.com",
                "password": "$2b$10$T77i34Eg9xI/1jJr8ZJkUupn1CvcfbhE1t7afKZ4AtIo8sPtYbJ4m"
            },
            "message": "User updated successfully."
        }
    ```

### Delete Specific User

[(Back to top)](#table-of-contents)

- HTTP Method: **`DELETE`**
- Endpoint: `/users/delete/:id`
- Request Body: `N/A`
- Request Params: `:id [integer]`
- Response Body: `User object`
- Example:

    ```http
    - Request URL: /users/delete/d485b697-69c2-4198-8231-f6054841baaf
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "d485b697-69c2-4198-8231-f6054841baaf",
                "first_name": "Ibrahim",
                "last_name": "El-Mokhtar",
                "user_name": "ibrahimelmokhtar",
                "email": "test@test.com",
                "password": "$2b$10$1mOTa6VX2zuJr/MAZIaxBOFjnwFLR4TWAHZT34As4mVd4LQ9nDXz2"
            },
            "message": "User deleted successfully."
        }
    ```

## `/products` Endpoints

[(Back to top)](#table-of-contents)

### Create New Product

[(Back to top)](#table-of-contents)

- HTTP Method: **`POST`**
- Endpoint: `/products/create`
- Request Body: `Product object`
- Request Params: `N/A`
- Response Body: `Product object`
- Example:

    ```http
    - Request URL: /products/create/
    ```

    ```json
    - Request Body:
        {
            "name": "T-Shirt",
            "price": 50.99,
            "category": "Clothes"
        }
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "515de79c-a194-47d1-8e76-af097da06ed0",
                "name": "T-Shirt",
                "price": 50.99,
                "categoty": "Clothes"
            },
            "message": "Product created successfully."
        }
    ```

### Show Specific Product

[(Back to top)](#table-of-contents)

- HTTP Method: **`GET`**
- Endpoint: `/products/show/:id`
- Request Body: `N/A`
- Request Params: `:id [integer]`
- Response Body: `Product object`
- Example:

    ```http
    - Request URL: /products/show/515de79c-a194-47d1-8e76-af097da06ed0
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "515de79c-a194-47d1-8e76-af097da06ed0",
                "name": "T-Shirt",
                "price": 50.99,
                "category": "Clothes"
            },
            "message": "Product shown successfully."
        }
    ```

### Show All Products

[(Back to top)](#table-of-contents)

- HTTP Method: **`GET`**
- Endpoint: `/products/showAll`
- Request Body: `N/A`
- Request Params: `N/A`
- Response Body: `Array of Product objects`
- Example:

    ```http
    - Request URL: /products/showAll
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "totalProducts": 2,
            "data": [{
                "id": "515de79c-a194-47d1-8e76-af097da06ed0",
                "name": "T-SHirt",
                "price": 50.99,
                "category": "Clothes"
            },
            {
                "id": "de26da30-2622-4f46-b777-a698c216f365",
                "name": "Hat",
                "price": 9.88,
                "category": "Clothes"
            }],
            "message": "Products shown successfully."
        }
    ```

### Update Specific Product

[(Back to top)](#table-of-contents)

- HTTP Method: **`PUT`**
- Endpoint: `/products/update/:id`
- Request Body: `Product object`
- Request Params: `:id [integer]`
- Response Body: `Product object`
- Example:

    ```http
    - Request URL: /products/update/515de79c-a194-47d1-8e76-af097da06ed0
    ```

    ```json
    - Request Body:
        {
            "name": "T-Shirt",
            "price": 40.88,
            "category": "Clothes"
        }
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "515de79c-a194-47d1-8e76-af097da06ed0",
                "name": "T-Shirt",
                "price": 40.88,
                "category": "Clothes"
            },
            "message": "Product updated successfully."
        }
    ```

### Delete Specific Product

[(Back to top)](#table-of-contents)

- HTTP Method: **`DELETE`**
- Endpoint: `/products/delete/:id`
- Request Body: `N/A`
- Request Params: `:id [integer]`
- Response Body: `Product object`
- Example:

    ```http
    - Request URL: /products/delete/515de79c-a194-47d1-8e76-af097da06ed0
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "515de79c-a194-47d1-8e76-af097da06ed0",
                "name": "T-Shirt",
                "price": 50.99,
                "category": "Clothes"
            },
            "message": "Product deleted successfully."
        }
    ```

## `/orders` Endpoints

[(Back to top)](#table-of-contents)

# Data Shapes

[(Back to top)](#table-of-contents)

## User Shape

- [OPTIONAL] id
- firstName
- lastName
- userName
- email
- password

## Product Shape

- [OPTIONAL] id
- name
- price
- category

## Order Shape

- [OPTIONAL] id
- id of each product in the order
- quantity of each product in the order
- userID
- status of order (active or complete)
