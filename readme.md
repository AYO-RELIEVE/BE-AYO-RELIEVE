# AYO Relieve API
#### Easy to use and have high performance 🚀

## 🖥️ Tech Stack
**Backend:**
![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![expressjs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)&nbsp;
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)&nbsp;
![jwt](	https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)&nbsp;


## 🎊 Features
- Register user
- Login user
- Authenticated user will get a token
- Get list all programs
- Detail program
- Create program
- Update program
- Delete program
- Get list all categories
- Detail category
- Create category
- Update category
- Delete category


## ERD


## API Documentation
Postman: https://documenter.getpostman.com/view/21482811/2s8YmSrfq6

## Specs API
Root URL: https://ayo-relieve.osorateam.com/api

### Register
Request :
- Method : POST
- Endpoint : `/auth/register`
- Header :
    - Content-Type: application/json
    - Accept: application/json

- Body :
#### For Applicant
```json 
{
    "name": "Zaki",
    "email": "zaki@gmail.com",
    "password": "password",
    "address": "Klaten",
    "phone_number": "089347294823",
    "status": "applicant",
    "date_of_birth": "2022-11-25",
    "religion": "Islam",
    "married": boolean,
    "identity_card": "path to identity image",
    "profession": "Programmer",
    "disability": boolean,
    "proof_of_disability": "path to proof_of_disability image",
    "lsm": boolean,
    "lsm_name": "string",
    "lsm_membership": "path to lsm membership image"
}
```

#### For Organization
```json 
{
    "name": "Zaki",
    "email": "zaki@gmail.com",
    "password": "zakizaki",
    "address": "Klaten",
    "phone_number": "089347294823",
    "status": "organization",
    "description": "Hello im description",
    "sector": "Technology",
    "media_social": "osorateam.com"
}
```

Response :
#### For Applicant
```json 
{
    "data" : {
        "id": 1,
        "name": "Zaki",
        "email": "zaki@gmail.com",
        "password": "password",
        "address": "Klaten",
        "phone_number": "089347294823",
        "status": "applicant",
        "date_of_birth": "2022-11-25",
        "religion": "Islam",
        "married": boolean,
        "identity_card": "path to identity image",
        "profession": "Programmer",
        "disability": boolean,
        "proof_of_disability": "path to proof_of_disability image",
        "lsm": boolean,
        "lsm_name": "string",
        "lsm_membership": "path to lsm membership image"
    }
}
```
#### For Organization
```json 
{
    "data" : {
        "id": 1,
        "name": "Zaki",
        "email": "zaki@gmail.com",
        "password": "zakizaki",
        "address": "Klaten",
        "phone_number": "089347294823",
        "status": "organization",
        "description": "Hello im description",
        "sector": "Technology",
        "media_social": "osorateam.com"
    }
}
```

### Login
Request :
- Method : POST
- Endpoint : `/auth/login`
- Header :
    - Content-Type: application/json
    - Accept: application/json

- Body :
```json 
{
    "email": "zaki@gmail.com",
    "password": "zakizaki"
}
```

Response :

```json 
{
    "message": "Login Success",
    "data": {
        "token": "<JWT ACCESS TOKEN>",
        "refreshToken": "<JWT REFRESH TOKEN>"
    }
}
```

### Get all programs
Request :
- Method : GET
- Endpoint : `/programs`
- Header :
    - Accept: application/json

Response :

```json 
{
    "data" : [
        {
            "category_id" : "integer",
            "title" : "string",
            "description" : "text",
            "rules" : "string",
            "thumbnail" : "string",
            "quota": "integer",
            "end_date": "date",
            "announcement_date": "date"
        },
        {
            "category_id" : "integer",
            "title" : "string",
            "description" : "text",
            "rules" : "string",
            "thumbnail" : "string",
            "quota": "integer",
            "end_date": "date",
            "announcement_date": "date"
        }
     ]
}
```

### Get one program
Request :
- Method : GET
- Endpoint : `/programs/:id`
- Header :
    - Accept: application/json

Response :

```json 
{
    "data" : {
        "category_id" : "integer",
        "title" : "string",
        "description" : "text",
        "rules" : "string",
        "thumbnail" : "string",
        "quota": "integer",
        "end_date": "date",
        "announcement_date": "date"
    }
}
```

### Create program
Request :
- Method : POST
- Endpoint : `/programs`
- Header :
    - Content-Type: application/json
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (organization user)

- Body :
```json 
{
    "category_id" : "integer",
    "title" : "string",
    "description" : "text",
    "rules" : "string",
    "thumbnail" : "string",
    "quota": "integer",
    "end_date": "date",
    "announcement_date": "date"
}
```

Response :

```json 
{
    "data" : {
        "category_id" : "integer",
        "title" : "string",
        "description" : "text",
        "rules" : "string",
        "thumbnail" : "string",
        "quota": "integer",
        "end_date": "date",
        "announcement_date": "date"
    }
}
```

### Update program
Request :
- Method : PUT
- Endpoint : `/programs/:id`
- Header :
    - Content-Type: application/json
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (organization user)

- Body :
```json 
{
    "category_id" : "integer",
    "title" : "string",
    "description" : "text",
    "rules" : "string",
    "thumbnail" : "string",
    "quota": "integer",
    "end_date": "date",
    "announcement_date": "date"
}
```

Response :

```json 
{
    "data" : {
        "category_id" : "integer",
        "title" : "string",
        "description" : "text",
        "rules" : "string",
        "thumbnail" : "string",
        "quota": "integer",
        "end_date": "date",
        "announcement_date": "date"
    }
}
```

### Delete program
Request :
- Method : DELETE
- Endpoint : `/programs/:id`
- Header :
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (organization user)

Response :

```json 
{
    "message" : "Program successfully deleted"
}
```

### Get all categories
Request :
- Method : GET
- Endpoint : `/categories`
- Header :
    - Accept: application/json

Response :

```json 
{
    "data" : [
        {
            "id" : "integer",
            "name" : "string"
        },
        {
            "id" : "integer",
            "name" : "string"
        }
     ]
}
```

### Get one category
Request :
- Method : GET
- Endpoint : `/categories/:id`
- Header :
    - Accept: application/json

Response :

```json 
{
    "data" : {
        "id" : "integer",
        "name" : "string"
    }
}
```

### Create category
Request :
- Method : POST
- Endpoint : `/programs`
- Header :
    - Content-Type: application/json
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (admin user)

- Body :
```json 
{
    "name" : "string"
}
```

Response :

```json 
{
    "data" : {
        "id" : "integer",
        "name" : "string"
    }
}
```

### Update category
Request :
- Method : PUT
- Endpoint : `/programs/:id`
- Header :
    - Content-Type: application/json
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (admin user)

- Body :
```json 
{
    "name" : "string"
}
```

Response :

```json 
{
    "data" : {
        "id" : "integer",
        "name" : "string"
    }
}
```

### Delete category
Request :
- Method : DELETE
- Endpoint : `/programs/:id`
- Header :
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (admin user)

Response :

```json 
{
    "message" : "Category successfully deleted"
}
```