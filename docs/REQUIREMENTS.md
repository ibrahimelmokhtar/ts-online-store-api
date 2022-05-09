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
    - [Create New Order](#create-new-order)
    - [Show Specific Order](#show-specific-order)
    - [Show All Orders](#show-all-orders)
    - [Update Specific Order](#update-specific-order)
    - [Delete Specific Order](#delete-specific-order)
    - [Add New Product Into Order](#add-new-product-into-order)
    - [Show Specific Product From Order](#show-specific-product-from-order)
    - [Show All Products Within Order](#show-all-products-within-order)
    - [Update Product Within Order](#update-product-within-order)
    - [Delete Product From Order](#delete-product-from-order)
- [Data Shapes](#data-shapes)
  - [User Shape](#user-shape)
  - [Product Shape](#product-shape)
  - [Order Shape](#order-shape)
  - [OrderProducts Shape](#orderproducts-shape)

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
- Endpoint: `/users/show/:userID`
- Request Body: `N/A`
- Request Params: `:userID [UUIDv4]`
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
- Endpoint: `/users/update/:userID`
- Request Body: `User object`
- Request Params: `:userID [UUIDv4]`
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
- Endpoint: `/users/delete/:userID`
- Request Body: `N/A`
- Request Params: `:userID [UUIDv4]`
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
- Endpoint: `/products/show/:productID`
- Request Body: `N/A`
- Request Params: `:productID [UUIDv4]`
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
- Endpoint: `/products/update/:productID`
- Request Body: `Product object`
- Request Params: `:productID [UUIDv4]`
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
- Endpoint: `/products/delete/:productID`
- Request Body: `N/A`
- Request Params: `:productID [UUIDv4]`
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

### Create New Order

[(Back to top)](#table-of-contents)

- HTTP Method: **`POST`**
- Endpoint: `/orders/create`
- Request Body: `Order object`
- Request Params: `N/A`
- Response Body: `Order object`
- Example:

    ```http
    - Request URL: /orders/create/
    ```

    ```json
    - Request Body:
        {
            "userID": "d485b697-69c2-4198-8231-f6054841baaf",
            "isDone": false,
        }
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "72aa3c1e-290b-458b-9522-e10d98ab6131",
                "is_done": false,
                "user_id": "d485b697-69c2-4198-8231-f6054841baaf"
            },
            "message": "Order created successfully."
        }
    ```

### Show Specific Order

[(Back to top)](#table-of-contents)

- HTTP Method: **`GET`**
- Endpoint: `/orders/show/:orderID`
- Request Body: `N/A`
- Request Params: `:orderID [UUIDv4]`
- Response Body: `order object`
- Example:

    ```http
    - Request URL: /orders/show/72aa3c1e-290b-458b-9522-e10d98ab6131
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "72aa3c1e-290b-458b-9522-e10d98ab6131",
                "is_done": false,
                "user_id": "d485b697-69c2-4198-8231-f6054841baaf"
            },
            "message": "Order shown successfully."
        }
    ```

### Show All Orders

[(Back to top)](#table-of-contents)

- HTTP Method: **`GET`**
- Endpoint: `/orders/showAll`
- Request Body: `N/A`
- Request Params: `N/A`
- Response Body: `Array of Order objects`
- Example:

    ```http
    - Request URL: /orders/showAll
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "totalUsers": 2,
            "data": [{
            "id": "72aa3c1e-290b-458b-9522-e10d98ab6131",
            "is_done": false,
            "user_id": "9c9b58d5-7bfb-4be0-b1c3-95479df6d821"
        },
        {
            "id": "7b5b366e-935f-4e6e-8a9d-271725b153e3",
            "is_done": true,
            "user_id": "9c9b58d5-7bfb-4be0-b1c3-95479df6d821"
        }],
            "message": "Orders shown successfully."
        }
    ```

### Update Specific Order

[(Back to top)](#table-of-contents)

- HTTP Method: **`PUT`**
- Endpoint: `/orders/update/:orderID`
- Request Body: `Order object`
- Request Params: `:orderID [UUIDv4]`
- Response Body: `Order object`
- Example:

    ```http
    - Request URL: /orders/update/72aa3c1e-290b-458b-9522-e10d98ab6131
    ```

    ```json
    - Request Body:
        {
            "isDone": true,
            "userID": "9c9b58d5-7bfb-4be0-b1c3-95479df6d821"
        }
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "72aa3c1e-290b-458b-9522-e10d98ab6131",
                "is_done": true,
                "user_id": "9c9b58d5-7bfb-4be0-b1c3-95479df6d821"
            },
            "message": "Order updated successfully."
        }
    ```

### Delete Specific Order

[(Back to top)](#table-of-contents)

- HTTP Method: **`DELETE`**
- Endpoint: `/orders/delete/:orderID`
- Request Body: `N/A`
- Request Params: `:orderID [UUIDv4]`
- Response Body: `Order object`
- Example:

    ```http
    - Request URL: /orders/delete/7b5b366e-935f-4e6e-8a9d-271725b153e3
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "7b5b366e-935f-4e6e-8a9d-271725b153e3",
                "is_done": false,
                "user_id": "9c9b58d5-7bfb-4be0-b1c3-95479df6d821"
            },
            "message": "Order deleted successfully."
        }
    ```

### Add New Product Into Order

[(Back to top)](#table-of-contents)

- HTTP Method: **`POST`**
- Endpoint: `/orders/:orderID/products/add`
- Request Body: `OrderProduct object`
- Request Params: `:orderID [UUIDv4]`
- Response Body: `OrderProduct object`
- Example:

    ```http
    - Request URL: /orders/72da8597-11cb-4ba5-b4ef-4125525e1084/products/add
    ```

    ```json
    - Request Body:
        {
            "productID": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
            "quantity": 10
        }
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "b6a62a3c-9195-482d-8f46-83c61d440951",
                "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                "quantity": 10
            },
            "message": "Product added successfully to the order."
        }
    ```

### Show Specific Product From Order

[(Back to top)](#table-of-contents)

- HTTP Method: **`GET`**
- Endpoint: `/orders/:orderID/products/show/:productID`
- Request Body: `N/A`
- Request Params: `:orderID [UUIDv4]`, `:productID [UUIDv4]`
- Response Body: `OrderProduct object`
- Example:

    ```http
    - Request URL: /orders/72da8597-11cb-4ba5-b4ef-4125525e1084/products/show/ac85b670-9f17-4ae0-8c71-f517dc037e47
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "ee75debb-f292-416a-95d3-0ea8a449d5f8",
                "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                "quantity": 10
            },
            "message": "Product shown successfully from the order."
        }
    ```

### Show All Products Within Order

[(Back to top)](#table-of-contents)

- HTTP Method: **`GET`**
- Endpoint: `/orders/:orderID/products/showAll`
- Request Body: `N/A`
- Request Params: `:orderID [UUIDv4]`
- Response Body: `Array of OrderProduct objects`
- Example:

    ```http
    - Request URL: /orders/72da8597-11cb-4ba5-b4ef-4125525e1084/products/showAll
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "totalProductsInOrder": 2,
            "data": [{
                    "id": "ee75debb-f292-416a-95d3-0ea8a449d5f8",
                    "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                    "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                    "quantity": 10
                },
                {
                    "id": "e07f5c7f-3f63-4452-9921-ae53f4bd36ed",
                    "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                    "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                    "quantity": 15
            }],
            "message": "Products shown successfully from the order."
        }
    ```

### Update Product Within Order

[(Back to top)](#table-of-contents)

- HTTP Method: **`PUT`**
- Endpoint: `/orders/:orderID/products/update/:productID`
- Request Body: `OrderProduct object`
- Request Params: `:orderID [UUIDv4]`, `:productID [UUIDv4]`
- Response Body: `OrderProduct object`
- Example:

    ```http
    - Request URL: /orders/72da8597-11cb-4ba5-b4ef-4125525e1084/products/update/ac85b670-9f17-4ae0-8c71-f517dc037e47
    ```

    ```json
    - Request Body:
        {
            "productID": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
            "quantity": 500
        }
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "b6a62a3c-9195-482d-8f46-83c61d440951",
                "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                "quantity": 500
            },
            "message": "Product updated successfully within the order."
        }
    ```

### Delete Product From Order

[(Back to top)](#table-of-contents)

- HTTP Method: **`DELETE`**
- Endpoint: `/orders/:orderID/products/delete/:productID`
- Request Body: `N/A`
- Request Params: `:orderID [UUIDv4]`, `:productID [UUIDv4]`
- Response Body: `OrderProduct object`
- Example:

    ```http
    - Request URL: /orders/72da8597-11cb-4ba5-b4ef-4125525e1084/products/delete/ac85b670-9f17-4ae0-8c71-f517dc037e47
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "b6a62a3c-9195-482d-8f46-83c61d440951",
                "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                "quantity": 10
            },
            "message": "Product deleted successfully from the order."
        }
    ```

# Data Shapes

[(Back to top)](#table-of-contents)

## User Shape

| Parameter | Data Type | Additional Information |
| :--------- | :---------: | :---------: |
| `id` | uuid (v4) | *automatically generated* |
| `firstName` | string | - |
| `lastName` | string | - |
| `userName` | string | - |
| `email` | string | - |
| `password` | string | *will be hashed before saving into database* |

## Product Shape

| Parameter | Data Type | Additional Information |
| :--------- | :---------: | :---------: |
| `id` | uuid (v4) | *automatically generated* |
| `name` | string | - |
| `price` | float | - |
| `category` | string | - |

## Order Shape

| Parameter | Data Type | Additional Information |
| :--------- | :---------: | :---------: |
| `id` | uuid (v4) | *automatically generated* |
| `isDone` | boolean | *`true`: completed, `false`: active* |
| `userID` | uuid (v4) | *must be in `users` table* |

## OrderProducts Shape

| Parameter | Data Type | Additional Information |
| :--------- | :---------: | :---------: |
| `id` | uuid (v4) | *automatically generated* |
| `orderID` | uuid (v4) | *must be in `orders` table* |
| `productID` | uuid (v4) | *must be in `products` table* |
| `quantity` | integer | - |
