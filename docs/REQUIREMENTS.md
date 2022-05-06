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
  - [`/orders` Endpoints](#orders-endpoints)
- [Data Shapes](#data-shapes)
  - [Product Shape](#product-shape)
  - [User Shape](#user-shape)
  - [Orders Shape](#orders-shape)

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

    ```json
    - Request URL: /users/create/
    - Request Body:
        {
            "first_name": "Ibrahim",
            "last_name": "El-Mokhtar",
            "user_name": "ibrahimelmokhtar",
            "email": "test@test.com",
            "password": "password123"
        }

    - Response Body:
        {
            "status": "success",
            "data": {
                "id": 1,
                "first_name": "Ibrahim",
                "last_name": "El-Mokhtar",
                "user_name": "ibrahimelmokhtar",
                "email": "test@test.com",
                "password": "password123"
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

    ```json
    - Request URL: /users/show/1

    - Response Body:
        {
            "status": "success",
            "data": {
                "id": 1,
                "first_name": "Ibrahim",
                "last_name": "El-Mokhtar",
                "user_name": "ibrahimelmokhtar",
                "email": "test@test.com",
                "password": "password123"
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

    ```json
    - Request URL: /users/showAll

    - Response Body:
        {
            "status": "success",
            "data": [{
                "id": 1,
                "first_name": "Ibrahim",
                "last_name": "El-Mokhtar",
                "user_name": "ibrahimelmokhtar",
                "email": "test@test.com",
                "password": "password123"
            },
            {
                "id": 2,
                "first_name": "James",
                "last_name": "Bond",
                "user_name": "jamesbond",
                "email": "email@email.com",
                "password": "password123123"
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

    ```json
    - Request URL: /users/update/1
    - Request Body:
        {
            "first_name": "Ibrahim",
            "last_name": "El-Mokhtar",
            "user_name": "ibrahimelmokhtar",
            "email": "email@email.com",
            "password": "password123123"
        }

    - Response Body:
        {
            "status": "success",
            "data": {
                "id": 1,
                "first_name": "Ibrahim",
                "last_name": "El-Mokhtar",
                "user_name": "ibrahimelmokhtar",
                "email": "email@email.com",
                "password": "password123123"
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

    ```json
    - Request URL: /users/delete/1

    - Response Body:
        {
            "status": "success",
            "data": {
                "id": 1,
                "first_name": "Ibrahim",
                "last_name": "El-Mokhtar",
                "user_name": "ibrahimelmokhtar",
                "email": "test@test.com",
                "password": "password123"
            },
            "message": "User deleted successfully."
        }
    ```

## `/products` Endpoints

[(Back to top)](#table-of-contents)

## `/orders` Endpoints

[(Back to top)](#table-of-contents)

# Data Shapes

[(Back to top)](#table-of-contents)

## Product Shape

- id
- name
- price
- category

## User Shape

- [OPTIONAL] id
- firstName
- lastName
- email
- password

## Orders Shape

- [OPTIONAL] id
- id of each product in the order
- quantity of each product in the order
- userID
- status of order (active or complete)
