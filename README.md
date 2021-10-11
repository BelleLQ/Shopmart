# Shopmart RESTful API

This is simple RESTful API that allows client applications to create, read, update and delete customers and products.

# Data Models

This API contains two data models, which are customer and product model.

## Customer Model

This model contains the data of customers, which includes:

- firstName (required)
- lastName (required)
- email (required)
- password (required)
- phoneNumber

## Product Model

This model contains the data of products, which includes:

- prodName (required)
- price (required)
- description
- category (required)
- quantity
- isBestSeller (required)
- photoUrl

# End points

## Customer endpoints

### GET /customers

This end point returns a list of all customers.

### GET /customers/id

This end point returns the customers with the provided id.

### POST /customers

This end point creates a new customer with the provided data. The data is required to submit in the body of the request as JSON. The required data is specified in the customer model. Note that the customer's password field will be encrypted before saving to the database.

### PUT /heroes/id

This end point updates a new customer with the provided data. The data is required to submit in the body of the request as JSON.

### DELETE /heroes/id

This end point deletes the customers with the provided id.

## Product endpoints

### GET /products

This end point returns a list of all products.
If you add a filter in the query string, the products with provided conditions will be returned.

### GET /products/categories

This end point returns a list of all categories of products.

### GET /customers/id

This end point returns the product with the provided id.

### POST /customers

This end point creates a new product with the provided data. The data is required to submit in the body of the request as JSON. The required data is specified in the product model.

### PUT /heroes/id

This end point updates a new product with the provided data. The data is required to submit in the body of the request as JSON.

### DELETE /heroes/id

This end point deletes the product with the provided id.

# Setting up application

- Clone the source code: run "npm install"
- Create a config folder
- Create a file called keys.env within the config folder
- In the keys.env, add two environment variables

1. MONGODB_QUERY_STRING = your connection string
2. PORT - 3000

- Run the application: run "npm run dev"
