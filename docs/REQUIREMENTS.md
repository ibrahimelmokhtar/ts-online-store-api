# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

# Table of Contents

- [API Requirements](#api-requirements)
- [Table of Contents](#table-of-contents)
- [Database Schemas](#database-schemas)
  - [`users` Table Schema](#users-table-schema)
  - [`products` Table Schema](#products-table-schema)
  - [`orders` Table Schema](#orders-table-schema)
  - [`order_products` Table Schema](#order_products-table-schema)
- [Data Shapes](#data-shapes)
- [API Endpoints](#api-endpoints)
  - [`/users` Endpoints](#users-endpoints)
    - [Create New User](#create-new-user)
    - [Authenticate Specific User](#authenticate-specific-user)
    - [Show Specific User](#show-specific-user)
    - [Update Specific User](#update-specific-user)
    - [Delete Specific User](#delete-specific-user)
    - [Show All Users](#show-all-users)
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

- Table "`public.users`"

    | Column | Type | Collation | Nullable | Default |
    | ------ | ------ | ------ | ------ | ------ |
    | `id` | uuid | | not null | uuid_generate_v4() |
    | `first_name` | character varying(100) | | not null | |
    | `last_name` | character varying(100) | | not null | |
    | `user_name` | character varying(50)  | | not null | |
    | `email` | character varying(255) | | not null | |
    | `password` | character varying(100) | | not null | |

- Indexes:
    "`users_pkey`" PRIMARY KEY, btree (`id`)

- Referenced by:
    TABLE "`orders`" CONSTRAINT "`orders_user_id_fkey`" FOREIGN KEY (`user_id`) REFERENCES `users(id)`

## `products` Table Schema

- Table "`public.products`"
    | Column | Type | Collation | Nullable | Default |
    | ------ | ------ | ------ | ------ | ------ |
    | `id` | uuid | | not null | uuid_generate_v4() |
    | `name` | character varying(100) | | not null | |
    | `price` | double precision | | not null | |
    | `category` | character varying(50) | | not null | |

- Indexes:
    "`products_pkey`" PRIMARY KEY, btree (`id`)
- Referenced by:
    TABLE "`order_products`" CONSTRAINT "`order_products_product_id_fkey`" FOREIGN KEY (`product_id`) REFERENCES `products(id)`

## `orders` Table Schema

- Table "`public.orders`"
    | Column | Type | Collation | Nullable | Default |
    | ------ | ------ | ------ | ------ | ------ |
    | `id` | uuid | | not null | uuid_generate_v4() |
    | `is_done` | boolean   | | not null | |
    | `user_id` | uuid      | | not null | |
    | `products_ids` | uuid [ ]    | | not null | |
    | `products_quantities` | integer [ ] | | not null | |
    | `date_time` | timestamp with time zone | | not null | |
    | `date_time_readable` | character varying(80) | | not null | |

- Indexes:
    "`orders_pkey`" PRIMARY KEY, btree (`id`)
- Foreign-key constraints:
    "`orders_user_id_fkey`" FOREIGN KEY (`user_id`) REFERENCES `users(id)`
- Referenced by:
    TABLE "`order_products`" CONSTRAINT "`order_products_order_id_fkey`" FOREIGN KEY (`order_id`) REFERENCES `orders(id)`

## `order_products` Table Schema

- Table "`public.order_products`"
    | Column | Type | Collation | Nullable | Default |
    | ------ | ------ | ------ | ------ | ------ |
    | id | uuid | | not null | uuid_generate_v4() |
    | order_id | uuid | | not null | |
    | product_id | uuid | | not null | |
    | product_quantity | integer | | not null | |
    | `date_time` | timestamp with time zone | | not null | |
    | `date_time_readable` | character varying(80) | | not null | |

- Indexes:
    "`order_products_pkey`" PRIMARY KEY, btree (`id`)
- Foreign-key constraints:
    "`order_products_order_id_fkey`" FOREIGN KEY (`order_id`) REFERENCES `orders(id)`
    "`order_products_product_id_fkey`" FOREIGN KEY (`product_id`) REFERENCES `products(id)`

# Data Shapes

[(Back to top)](#table-of-contents)

<table>
    <thead>
        <tr>
            <th>Object</th>
            <th>Data Shape</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody align="center">
        <!-- User -->
        <th rowspan=7>User</th>
        <tr>
            <td>id</td>
            <td>User's ID</td>
        </tr>
        <tr>
            <td>first_name</td>
            <td>User's First Name</td>
        </tr>
        <tr>
            <td>last_name</td>
            <td>User's Last Name</td>
        </tr>
        <tr>
            <td>user_name</td>
            <td>User's Desired Username</td>
        </tr>
        <tr>
            <td>email</td>
            <td>User's Email</td>
        </tr>
        <tr>
            <td>password</td>
            <td>User's Desired Password</td>
        </tr>
        <!-- Product -->
        <th rowspan=5>Product</th>
        <tr>
            <td>id</td>
            <td>Product's ID</td>
        </tr>
        <tr>
            <td>name</td>
            <td>Product's Name</td>
        </tr>
        <tr>
            <td>price</td>
            <td>Product's Price</td>
        </tr>
        <tr>
            <td>category</td>
            <td>Product's Category</td>
        </tr>
        <!-- Order -->
        <th rowspan=8>Order</th>
        <tr>
            <td>id</td>
            <td>Order's ID</td>
        </tr>
        <tr>
            <td>is_done</td>
            <td>Order's Status</td>
        </tr>
        <tr>
            <td>user_id</td>
            <td>Order's UserID</td>
        </tr>
        <tr>
            <td>products_ids</td>
            <td>Order's Products IDs</td>
        </tr>
        <tr>
            <td>products_quantities</td>
            <td>Order's Products Quantities</td>
        </tr>
        <tr>
            <td>date_time</td>
            <td>Order's ISO Date</td>
        </tr>
        <tr>
            <td>date_time_readable</td>
            <td>Order's String Date</td>
        </tr>
        <!-- OrderProduct -->
        <th rowspan=7>OrderProduct</th>
        <tr>
            <td>id</td>
            <td>OrderProduct's ID</td>
        </tr>
        <tr>
            <td>order_id</td>
            <td>Order's ID</td>
        </tr>
        <tr>
            <td>product_id</td>
            <td>Product's ID</td>
        </tr>
        <tr>
            <td>product_quantity</td>
            <td>Product's Quantity</td>
        </tr>
        <tr>
            <td>date_time</td>
            <td>Order's ISO Date</td>
        </tr>
        <tr>
            <td>date_time_readable</td>
            <td>Order's String Date</td>
        </tr>
    </tbody>
</table>

# API Endpoints

[(Back to top)](#table-of-contents)

This API has **multiple** endpoints using the different `HTTP methods` as explained below:

## `/users` Endpoints

### Create New User

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`POST`**
- **Endpoint**: **`/users/signup`**
- **Request Body**: **`User object`**
- **Request Params**: **`N/A`**
- **Response Body**: **`User object`**
- **Example**:

    ```http
    - Request URL: /users/signup/
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
            "status": "201 Created",
            "user": {
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

### Authenticate Specific User

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
            "status": "202 Accepted",
            "user": {
                "id": "d485b697-69c2-4198-8231-f6054841baaf",
                "first_name": "Ibrahim",
                "last_name": "El-Mokhtar",
                "user_name": "ibrahimelmokhtar",
                "email": "test@test.com",
                "password": "$2b$10$1mOTa6VX2zuJr/MAZIaxBOFjnwFLR4TWAHZT34As4mVd4LQ9nDXz2",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYjUwYjNiYTktYmY5MS00YjA1LWJmODAtNTlkOTljNzFkYmE0IiwiZmlyc3RfbmFtZSI6IklicmFoaW0iLCJsYXN0X25hbWUiOiJFbC1Nb2todGFyIiwidXNlcl9uYW1lIjoiaWJyYWhpbWVsbW9raHRhciIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDU3cGFIQ1hURm1jdDRTam04ZU1PVXU0NnpGcmMySFBCU1BrZlpVelYwdXlLWkNHa3c5WkJDIn0sImlhdCI6MTY1MjI3NzUzNX0.7pPPtjDomqteV0byD89oAQw6F5coF5l7ZOVo0O-gep0"
            },
            "message": "User authenticated successfully."
        }
    ```

### Show Specific User

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/users/:userID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:userID [UUIDv4]`**
- **Response Body**: **`User object`**
- **Example**:

    ```http
    - Request URL: /users/d485b697-69c2-4198-8231-f6054841baaf
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "user": {
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

### Update Specific User

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`PUT`**
- **Endpoint**: **`/users/:userID`**
- **Request Body**: **`User object`** **[ token required ]**
- **Request Params**: **`:userID [UUIDv4]`**
- **Response Body**: **`User object`**
- **Example**:

    ```http
    - Request URL: /users/d485b697-69c2-4198-8231-f6054841baaf
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
            "status": "200 Ok",
            "user": {
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
- **Endpoint**: **`/users/:userID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:userID [UUIDv4]`**
- **Response Body**: **`User object`**
- **Example**:

    ```http
    - Request URL: /users/d485b697-69c2-4198-8231-f6054841baaf
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "user": {
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

### Show All Users

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/users`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`N/A`**
- **Response Body**: **`Array of User objects`**
- **Example**:

    ```http
    - Request URL: /users
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "totalUsers": 2,
            "users": [{
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

## `/products` Endpoints

### Create New Product

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`POST`**
- **Endpoint**: **`/products/create`**
- **Request Body**: **`Product object`** **[ token required ]**
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
            "status": "201 Created",
            "product": {
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
- **Endpoint**: **`/products/:productID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:productID [UUIDv4]`**
- **Response Body**: **`Product object`**
- **Example**:

    ```http
    - Request URL: /products/515de79c-a194-47d1-8e76-af097da06ed0
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "product": {
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
- **Endpoint**: **`/products`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`N/A`**
- **Response Body**: **`Array of Product objects`**
- **Example**:

    ```http
    - Request URL: /products
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "totalProducts": 2,
            "products": [{
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
- **Endpoint**: **`/products/:productID`**
- **Request Body**: **`Product object`** **[ token required ]**
- **Request Params**: **`:productID [UUIDv4]`**
- **Response Body**: **`Product object`**
- **Example**:

    ```http
    - Request URL: /products/515de79c-a194-47d1-8e76-af097da06ed0
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
            "status": "200 Ok",
            "product": {
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
- **Endpoint**: **`/products/:productID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:productID [UUIDv4]`**
- **Response Body**: **`Product object`**
- **Example**:

    ```http
    - Request URL: /products/515de79c-a194-47d1-8e76-af097da06ed0
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "product": {
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
- **Request Body**: **`Order object`** **[ token required ]**
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
            "status": "201 Created",
            "order": {
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
                ],
                "date_time": "2022-05-13T22:46:57.951Z",
                "date_time_readable": "Sat May 14 2022 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            "message": "Order created successfully."
        }
    ```

### Show Specific Order

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/orders/:orderID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`order object`**
- **Example**:

    ```http
    - Request URL: /orders/4428b5d9-a52f-4fa8-8494-92bf5c050c04
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "order": {
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
                ],
                "date_time": "2022-05-13T22:46:57.951Z",
                "date_time_readable": "Sat May 14 2022 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            "message": "Order shown successfully."
        }
    ```

### Show All Orders

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/orders`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`N/A`**
- **Response Body**: **`Array of Order objects`**
- **Example**:

    ```http
    - Request URL: /orders
    ```

    ```json
    - Response Body:
        {
        "status": "200 Ok",
        "totalOrders": 2,
        "orders": [{
                "id": "3bc72e17-10d0-4f81-bd8e-0b0f72791b78",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651"
                ],
                "products_quantities": [ 3 ],
                "date_time": "2022-05-13T22:46:57.951Z",
                "date_time_readable": "Sat May 14 2022 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [ 2, 1 ],
                "date_time": "2022-05-13T22:46:57.951Z",
                "date_time_readable": "Sat May 14 2022 00:46:57 GMT+0200 (Eastern European Standard Time)"
        }],
        "message": "Orders shown successfully."
    }
    ```

### Update Specific Order Status

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`PUT`**
- **Endpoint**: **`/orders/:orderID`**
- **Request Body**: **`Order object`** **[ token required ]**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`Order object`**
- **Example**:

    ```http
    - Request URL: /orders/4428b5d9-a52f-4fa8-8494-92bf5c050c04
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
            "status": "200 Ok",
            "order": {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": true,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [ 2, 1 ],
                "date_time": "2022-05-13T22:46:57.951Z",
                "date_time_readable": "Sat May 14 2022 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            "message": "Order updated successfully."
        }
    ```

### Delete Specific Order

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`DELETE`**
- **Endpoint**: **`/orders/:orderID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`Order object`**
- **Example**:

    ```http
    - Request URL: /orders/4428b5d9-a52f-4fa8-8494-92bf5c050c04
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "order": {
                "id": "4428b5d9-a52f-4fa8-8494-92bf5c050c04",
                "is_done": false,
                "user_id": "08068ea7-471c-402e-8f89-f3437a205a48",
                "products_ids": [
                    "53d01fd5-7fcb-4f1e-84d7-227c50089651",
                    "3dce8160-630e-4cb9-8a75-0bb8fcf638dc"
                ],
                "products_quantities": [ 2, 1 ],
                "date_time": "2022-05-13T22:46:57.951Z",
                "date_time_readable": "Sat May 14 2022 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            "message": "Order deleted successfully."
        }
    ```

### Add New Product Into Order

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`POST`**
- **Endpoint**: **`/orders/:orderID/add`**
- **Request Body**: **`OrderProduct object`** **[ token required ]**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`OrderProduct object`**
- **Example**:

    ```http
    - Request URL: /orders/72da8597-11cb-4ba5-b4ef-4125525e1084/add
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
            "status": "200 Ok",
            "orderProduct": {
                "id": "b6a62a3c-9195-482d-8f46-83c61d440951",
                "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                "product_quantity": 10,
                "date_time": "2022-05-13T22:46:57.951Z",
                "date_time_readable": "Sat May 14 2022 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            "message": "Product added successfully to the order."
        }
    ```

### Show Specific Product From Order

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/orders/:orderID/:productID`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:orderID [UUIDv4]`**, **`:productID [UUIDv4]`**
- **Response Body**: **`OrderProduct object`**
- **Example**:

    ```http
    - Request URL: /orders/72da8597-11cb-4ba5-b4ef-4125525e1084/ac85b670-9f17-4ae0-8c71-f517dc037e47
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "orderProduct": {
                "id": "ee75debb-f292-416a-95d3-0ea8a449d5f8",
                "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                "product_quantity": 10,
                "date_time": "2022-05-13T22:46:57.951Z",
                "date_time_readable": "Sat May 14 2022 00:46:57 GMT+0200 (Eastern European Standard Time)"
            },
            "message": "Product shown successfully from the order."
        }
    ```

### Show All Products Within Order

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/orders/:orderID/products`**
- **Request Body**: **`N/A`** **[ token required ]**
- **Request Params**: **`:orderID [UUIDv4]`**
- **Response Body**: **`Array of OrderProduct objects`**
- **Example**:

    ```http
    - Request URL: /orders/72da8597-11cb-4ba5-b4ef-4125525e1084/products
    ```

    ```json
    - Response Body:
        {
            "status": "200 Ok",
            "totalProductsInOrder": 2,
            "orderProducts": [{
                    "id": "ee75debb-f292-416a-95d3-0ea8a449d5f8",
                    "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                    "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                    "product_quantity": 10,
                    "date_time": "2022-05-13T22:46:57.951Z",
                    "date_time_readable": "Sat May 14 2022 00:46:57 GMT+0200 (Eastern European Standard Time)"
                },
                {
                    "id": "e07f5c7f-3f63-4452-9921-ae53f4bd36ed",
                    "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                    "product_id": "ac85b670-9f17-4ae0-8c71-f517dc037e47",
                    "product_quantity": 15,
                    "date_time": "2022-05-13T22:46:57.951Z",
                    "date_time_readable": "Sat May 14 2022 00:46:57 GMT+0200 (Eastern European Standard Time)"
            }],
            "message": "Products shown successfully from the order."
        }
    ```

## `/dashboard` Endpoints

### Show All Products In Orders

[(Back to top)](#table-of-contents)

- **HTTP Method**: **`GET`**
- **Endpoint**: **`/dashboard/showProductsInOrders`**
- **Request Body**: **`N/A`** **[ token required ]**
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
            "productsInOrders": [{
                    "order_id": "72da8597-11cb-4ba5-b4ef-4125525e1084",
                    "is_order_done": true,
                    "order_date_time": "2022-05-13T22:46:57.951Z",
                    "order_date_time_readable": "Sat May 14 2022 00:46:57 GMT+0200 (Eastern European Standard Time)",
                    "product_name": "T-Shirt",
                    "product_category": "clothes",
                    "product_price": 10.99,
                    "product_quantity": 15,
                    "total_price": 164.85
                },
                {
                    "order_id": "a98da1b3-3d65-409c-af97-be13843104df",
                    "is_order_done": false,
                    "order_date_time": "2022-05-13T22:46:57.951Z",
                    "order_date_time_readable": "Sat May 14 2022 00:46:57 GMT+0200 (Eastern European Standard Time)",
                    "product_name": "T-Shirt",
                    "product_category": "clothes",
                    "product_price": 10.99,
                    "product_quantity": 5,
                    "total_price": 54.95
            }],
            "message": "Products in orders shown successfully."
        }
    ```
