# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

# Table of Contents

- [API Requirements](#api-requirements)
- [Table of Contents](#table-of-contents)
- [Database Schemas](#database-schemas)
  - [`users` Table Schema](#users-table-schema)
  - [`products` Table Schema](#products-table-schema)
  - [`orders` Table Schema](#orders-table-schema)
  - [`order_products` Table Schema](#order_products-table-schema)
- [Data Shapes](#data-shapes)
  - [User Shape](#user-shape)
  - [Product Shape](#product-shape)
  - [Order Shape](#order-shape)
  - [OrderProducts Shape](#orderproducts-shape)
  - [ProductsInOrder Shape](#productsinorder-shape)
- [API Endpoints](#api-endpoints)
  - [`/users` Endpoints](#users-endpoints)
    - [Create New User](#create-new-user)
    - [Show Specific User](#show-specific-user)
    - [Show All Users](#show-all-users)
    - [Update Specific User](#update-specific-user)
    - [Delete Specific User](#delete-specific-user)
    - [Signin User](#signin-user)
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
    - [Update Specific Order Status](#update-specific-order-status)
    - [Delete Specific Order](#delete-specific-order)
    - [Add New Product Into Order](#add-new-product-into-order)
    - [Show Specific Product From Order](#show-specific-product-from-order)
    - [Show All Products Within Order](#show-all-products-within-order)
  - [`/dashboard` Endpoints](#dashboard-endpoints)
    - [Show All Products In Orders](#show-all-products-in-orders)

# Database Schemas

## `users` Table Schema

<table>
    <thead>
        <tr>
            <th rowspan=2 bgColor="cccccc"></th>
            <th colspan=6 bgColor="cccccc">column name</th>
        </tr>
        <tr>
            <th bgColor="eeeeee">id</th>
            <th bgColor="eeeeee">first_name</th>
            <th bgColor="eeeeee">last_name</th>
            <th bgColor="eeeeee">user_name</th>
            <th bgColor="eeeeee">email</th>
            <th bgColor="eeeeee">password</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th bgColor="cccccc">column type</th>
            <td align="center">UUID</td>
            <td align="center">VARCHAR(100)</td>
            <td align="center">VARCHAR(100)</td>
            <td align="center">VARCHAR(50)</td>
            <td align="center">VARCHAR(255)</td>
            <td align="center">VARCHAR(100)</td>
        </tr>
    </tbody>
</table>

## `products` Table Schema

<table>
    <thead>
        <tr>
            <th rowspan=2 bgColor="cccccc"></th>
            <th colspan=4 bgColor="cccccc">column name</th>
        </tr>
        <tr>
            <th bgColor="eeeeee">id</th>
            <th bgColor="eeeeee">name</th>
            <th bgColor="eeeeee">price</th>
            <th bgColor="eeeeee">category</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th bgColor="cccccc">column type</th>
            <td align="center">UUID</td>
            <td align="center">VARCHAR(100)</td>
            <td align="center">FLOAT</td>
            <td align="center">VARCHAR(50)</td>
        </tr>
    </tbody>
</table>

## `orders` Table Schema

<table>
    <thead>
        <tr>
            <th rowspan=2 bgColor="cccccc"></th>
            <th colspan=5 bgColor="cccccc">column name</th>
        </tr>
        <tr>
            <th bgColor="eeeeee">id</th>
            <th bgColor="eeeeee">is_done</th>
            <th bgColor="eeeeee">user_id</th>
            <th bgColor="eeeeee">products_ids</th>
            <th bgColor="eeeeee">products_quantities</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th bgColor="cccccc">column type</th>
            <td align="center">UUID</td>
            <td align="center">BOOLEAN</td>
            <td align="center">UUID</td>
            <td align="center">UUID[ ]</td>
            <td align="center">INTEGER[ ]</td>
        </tr>
    </tbody>
</table>

## `order_products` Table Schema

<table>
    <thead>
        <tr>
            <th rowspan=2 bgColor="cccccc"></th>
            <th colspan=4 bgColor="cccccc">column name</th>
        </tr>
        <tr>
            <th bgColor="eeeeee">id</th>
            <th bgColor="eeeeee">order_id</th>
            <th bgColor="eeeeee">product_id</th>
            <th bgColor="eeeeee">product_quantity</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th bgColor="cccccc">column type</th>
            <td align="center">UUID</td>
            <td align="center">UUID</td>
            <td align="center">UUID</td>
            <td align="center">INTEGER</td>
        </tr>
    </tbody>
</table>

# Data Shapes

[(Back to top)](#table-of-contents)

## User Shape

| Parameter | Data Type | Additional Information |
| :--------- | :---------: | :---------: |
| **`id`** | uuid (v4) | *automatically generated* |
| **`first_name`** | string | - |
| **`last_name`** | string | - |
| **`user_name`** | string | - |
| **`email`** | string | - |
| **`password`** | string | *will be hashed before saving into database* |

## Product Shape

| Parameter | Data Type | Additional Information |
| :--------- | :---------: | :---------: |
| **`id`** | uuid (v4) | *automatically generated* |
| **`name`** | string | - |
| **`price`** | float | - |
| **`category`** | string | - |

## Order Shape

| Parameter | Data Type | Additional Information |
| :--------- | :---------: | :---------: |
| **`id`** | uuid (v4) | *automatically generated* |
| **`is_done`** | boolean | *`true`: completed, `false`: active* |
| **`user_id`** | uuid (v4) | *must be in `users` table* |
| **`products_ids`** | uuid[ ] (v4) | *must be in `products` table* |
| **`products_quantities`** | integer [ ] | - |

## OrderProducts Shape

| Parameter | Data Type | Additional Information |
| :--------- | :---------: | :---------: |
| **`id`** | uuid (v4) | *automatically generated* |
| **`order_id`** | uuid (v4) | *must be in `orders` table* |
| **`product_id`** | uuid (v4) | *must be in `products` table* |
| **`product_quantity`** | integer | - |

## ProductsInOrder Shape

| Parameter | Data Type | Additional Information |
| :--------- | :---------: | :---------: |
| **`order_id`** | uuid (v4) | *retrieved from `orders` table* |
| **`is_order_done`** | boolean | *`true`: completed, `false`: active* |
| **`product_id`** | uuid (v4) | *retrieved from `products` table* |
| **`product_name`** | string | *retrieved from `products` table* |
| **`product_category`** | string | *retrieved from `products` table* |
| **`product_price`** | float | *retrieved from `products` table* |
| **`product_quantity`** | integer | *retrieved from `order_products` table* |
| **`total_price`** | float | *calculated within sql command* |

# API Endpoints

[(Back to top)](#table-of-contents)

This API has **multiple** endpoints using the different `HTTP methods` as explained below:

## `/users` Endpoints

### Create New User

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`POST`**
- **Endpoint**: **`/users/create`**
- **Request Body**: **`User object`**
- **Request Params**: **`N/A`**
- **Response Body**: **`User object`**
- **Example**:

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

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/users/show/:userID`**
- **Request Body**: **`N/A`**
- **Request Params**: **`:userID [UUIDv4]`**
- **Response Body**: **`User object`**
- **Example**:

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

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/users/showAll`**
- **Request Body**: **`N/A`**
- **Request Params**: **`N/A`**
- **Response Body**: **`Array of User objects`**
- **Example**:

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

- **HTTP Method**: **`PUT`**
- **Endpoint**: **`/users/update/:userID`**
- **Request Body**: **`User object`**
- **Request Params**: **`:userID [UUIDv4]`**
- **Response Body**: **`User object`**
- **Example**:

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

- **HTTP Method**: **`DELETE`**
- **Endpoint**: **`/users/delete/:userID`**
- **Request Body**: **`N/A`**
- **Request Params**: **`:userID [UUIDv4]`**
- **Response Body**: **`User object`**
- **Example**:

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

### Signin User

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`POST`**
- **Endpoint**: **`/users/signin`**
- **Request Body**: **`User object`**
- **Request Params**: **`N/A`**
- **Response Body**: **`User object` + `token`**
- **Example**:

    ```http
    - Request URL: /users/signin/
    ```

    ```json
    - Request Body:
        {
            // we only need the user's email and password:
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
                "password": "$2b$10$1mOTa6VX2zuJr/MAZIaxBOFjnwFLR4TWAHZT34As4mVd4LQ9nDXz2",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYjUwYjNiYTktYmY5MS00YjA1LWJmODAtNTlkOTljNzFkYmE0IiwiZmlyc3RfbmFtZSI6IklicmFoaW0iLCJsYXN0X25hbWUiOiJFbC1Nb2todGFyIiwidXNlcl9uYW1lIjoiaWJyYWhpbWVsbW9raHRhciIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDU3cGFIQ1hURm1jdDRTam04ZU1PVXU0NnpGcmMySFBCU1BrZlpVelYwdXlLWkNHa3c5WkJDIn0sImlhdCI6MTY1MjI3NzUzNX0.7pPPtjDomqteV0byD89oAQw6F5coF5l7ZOVo0O-gep0"
            },
            "message": "User created successfully."
        }
    ```

## `/products` Endpoints

### Create New Product

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`POST`**
- **Endpoint**: **`/products/create`**
- **Request Body**: **`Product object`**
- **Request Params**: **`N/A`**
- **Response Body**: **`Product object`**
- **Example**:

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
                "categoty": "Clothing"
            },
            "message": "Product created successfully."
        }
    ```

### Show Specific Product

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/products/show/:productID`**
- **Request Body**: **`N/A`**
- **Request Params**: **`:productID [UUIDv4]`**
- **Response Body**: **`Product object`**
- **Example**:

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
                "category": "Clothing"
            },
            "message": "Product shown successfully."
        }
    ```

### Show All Products

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/products/showAll`**
- **Request Body**: **`N/A`**
- **Request Params**: **`N/A`**
- **Response Body**: **`Array of Product objects`**
- **Example**:

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
                "category": "Clothing"
            },
            {
                "id": "de26da30-2622-4f46-b777-a698c216f365",
                "name": "Hat",
                "price": 9.88,
                "category": "Clothing"
            }],
            "message": "Products shown successfully."
        }
    ```

### Update Specific Product

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`PUT`**
- **Endpoint**: **`/products/update/:productID`**
- **Request Body**: **`Product object`**
- **Request Params**: **`:productID [UUIDv4]`**
- **Response Body**: **`Product object`**
- **Example**:

    ```http
    - Request URL: /products/update/515de79c-a194-47d1-8e76-af097da06ed0
    ```

    ```json
    - Request Body:
        {
            "name": "T-Shirt",
            "price": 40.88,
            "category": "Clothing"
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
                "category": "Clothing"
            },
            "message": "Product updated successfully."
        }
    ```

### Delete Specific Product

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`DELETE`**
- **Endpoint**: **`/products/delete/:productID`**
- **Request Body**: **`N/A`**
- **Request Params**: **`:productID [UUIDv4]`**
- **Response Body**: **`Product object`**
- **Example**:

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
                "category": "Clothing"
            },
            "message": "Product deleted successfully."
        }
    ```

## `/orders` Endpoints

### Create New Order

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`POST`**
- **Endpoint**: **`/orders/create`**
- **Request Body**: **`Order object`**
- **Request Params**: **`N/A`**
- **Response Body**: **`Order object`**
- **Example**:

    ```http
    - Request URL: /orders/create/
    ```

    ```json
    - Request Body:
        {
            "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
            "is_done": false,
            "products_ids_": ["53d01fd5-7fcb-4f1e-84d7-227c50089651", "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"],
            "products_quantities": [2, 1]
        }
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [
                    2,
                    1
                ]
            },
            "message": "Order created successfully."
        }
    ```

### Show Specific Order

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/orders/show/:orderID`**
- **Request Body**: **`N/A`**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`order object`**
- **Example**:

    ```http
    - Request URL: /orders/show/4428b5d9-a52f-4fa8-8494-92bf5c050c04
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [
                    2,
                    1
                ]
            },
            "message": "Order shown successfully."
        }
    ```

### Show All Orders

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/orders/showAll`**
- **Request Body**: **`N/A`**
- **Request Params**: **`N/A`**
- **Response Body**: **`Array of Order objects`**
- **Example**:

    ```http
    - Request URL: /orders/showAll
    ```

    ```json
    - Response Body:
        {
        "status": "success",
        "totalOrders": 2,
        "data": [{
                "id": "3bc72e17-10d0-4f81-bd8e-0b0f72791b78",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651"
                ],
                "products_quantities": [ 3 ]
            },
            {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [ 2, 1 ]
        }],
        "message": "Orders shown successfully."
    }
    ```

### Update Specific Order Status

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`PUT`**
- **Endpoint**: **`/orders/updateStatus/:orderID`**
- **Request Body**: **`Order object`**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`Order object`**
- **Example**:

    ```http
    - Request URL: /orders/updateStatus/4428b5d9-a52f-4fa8-8494-92bf5c050c04
    ```

    ```json
    - Request Body:
        {
            // we only need the order status:
            "is_done": true,
        }
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": true,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [ 2, 1 ]
            },
            "message": "Order updated successfully."
        }
    ```

### Delete Specific Order

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`DELETE`**
- **Endpoint**: **`/orders/delete/:orderID`**
- **Request Body**: **`N/A`**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`Order object`**
- **Example**:

    ```http
    - Request URL: /orders/delete/4428b5d9-a52f-4fa8-8494-92bf5c050c04
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "data": {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [ 2, 1 ]
            },
            "message": "Order deleted successfully."
        }
    ```

### Add New Product Into Order

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`POST`**
- **Endpoint**: **`/orders/:orderID/products/add`**
- **Request Body**: **`OrderProduct object`**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`OrderProduct object`**
- **Example**:

    ```http
    - Request URL: /orders/72da8597-11cb-4ba5-b4ef-4125525e1084/products/add
    ```

    ```json
    - Request Body:
        {
            "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
            "product_quantity": 10
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
                "product_quantity": 10
            },
            "message": "Product added successfully to the order."
        }
    ```

### Show Specific Product From Order

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/orders/:orderID/products/show/:productID`**
- **Request Body**: **`N/A`**
- **Request Params**: **`:orderID [UUIDv4]`**, **`:productID [UUIDv4]`**
- **Response Body**: **`OrderProduct object`**
- **Example**:

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
                "product_quantity": 10
            },
            "message": "Product shown successfully from the order."
        }
    ```

### Show All Products Within Order

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/orders/:orderID/products/showAll`**
- **Request Body**: **`N/A`**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`Array of OrderProduct objects`**
- **Example**:

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
                    "product_quantity": 10
                },
                {
                    "id": "e07f5c7f-3f63-4452-9921-ae53f4bd36ed",
                    "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                    "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                    "product_quantity": 15
            }],
            "message": "Products shown successfully from the order."
        }
    ```

## `/dashboard` Endpoints

### Show All Products In Orders

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/dashboard/showProductsInOrders`**
- **Request Body**: **`N/A`**
- **Request Params**: **`N/A`**
- **Response Body**: **`Array of ProductsInOrder objects`**
- **Example**:

    ```http
    - Request URL: /dashboard/showProductsInOrders
    ```

    ```json
    - Response Body:
        {
            "status": "success",
            "totalProductsInOrders": 2,
            "data": [{
                    "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                    "is_order_done": true,
                    "product_name": "T-Shirt",
                    "product_category": "clothes",
                    "product_price": 10.99,
                    "product_quantity": 15,
                    "total_price": 164.85
                },
                {
                    "order_id": "a98da1b3-3d65-409c-af97-be13843104df",
                    "is_order_done": false,
                    "product_name": "T-Shirt",
                    "product_category": "clothes",
                    "product_price": 10.99,
                    "product_quantity": 5,
                    "total_price": 54.95
            }],
            "message": "Products in orders shown successfully."
        }
    ```
