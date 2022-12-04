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
- User role (organization, applicant)
- Get all programs
- Get programs by organization
- Detail program by id
- Create program
- Update program by id
- Delete program by id
- Applicant user can apply program
- Organization user can accept or reject applicant
- Organization user can see all applicants


## ERD
![erd](https://user-images.githubusercontent.com/49114801/202921921-87a72ea7-57a3-4ebd-92cd-72cab36f502c.jpg)


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
    "gender": "enum ('Pria', 'Perempuan')",
    "profession": "Programmer",
    "disability": boolean,
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
        "gender": "enum ('Pria', 'Perempuan')",
        "profession": "Programmer",
        "disability": boolean
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

### Get logged user
Request :
- Method : GET
- Endpoint : `/auth/me`
- Header :
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>"

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
            "id": 7,
            "organization_id": 3,
            "title": "Bantuan Kepada Anak Yatim",
            "description": "Unilever memberikan bantuan...",
            "rules": "Ini adalah ketentuan",
            "thumbnail": "images/pexels-kindel-media-7979758.jpg",
            "qouta": 343,
            "end_date": "2022-11-29",
            "announcement_date": "2022-11-30",
            "createdAt": "2022-11-25T00:00:00.000Z",
            "updatedAt": "2022-11-25T00:00:00.000Z",
            "organization": {
                "id": 3,
                "name": "Unilever",
                "photo": "images/unilever.jpg"
            }
        },
        {
            "id": 8,
            "organization_id": 3,
            "title": "Beasiswa Siswa Berprestasi 2022",
            "description": "Pendidikan dipercaya dapat menjadi...",
            "rules": "Ini adalah ketentuan",
            "thumbnail": "images/428438353-photo-1648518295678-f78670c35924.png",
            "qouta": 455,
            "end_date": "2022-12-01",
            "announcement_date": "2022-12-02",
            "createdAt": "2022-11-25T00:00:00.000Z",
            "updatedAt": "2022-12-01T19:53:50.000Z",
            "organization": {
                "id": 3,
                "name": "Unilever",
                "photo": "images/unilever.jpg"
            }
        },
    ]
}
```

### Get one program
Request :
- Method : GET
- Endpoint : `/programs/:idProgram`
- Header :
    - Accept: application/json

Response :

```json 
{
    "data" : {
            "id": 7,
            "organization_id": 3,
            "title": "Bantuan Kepada Anak Yatim",
            "description": "Unilever memberikan bantuan...",
            "rules": "Ini adalah ketentuan",
            "thumbnail": "images/pexels-kindel-media-7979758.jpg",
            "qouta": 343,
            "end_date": "2022-11-29",
            "announcement_date": "2022-11-30",
            "createdAt": "2022-11-25T00:00:00.000Z",
            "updatedAt": "2022-11-25T00:00:00.000Z",
            "organization": {
                "id": 3,
                "name": "Unilever",
                "photo": "images/unilever.jpg"
            }
    }
}
```

### Create program
Request :
- Method : POST
- Endpoint : `/programs`
- Header :
    - Content-Type: multipart/form-data
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (organization only)

- Body :
```json 
{
    "title" : "string",
    "description" : "text",
    "rules" : "string",
    "image" : "file",
    "quota": "integer",
    "end_date": "date",
    "announcement_date": "date"
}
```

Response :

```json ****
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
- Endpoint : `/programs/:idProgram`
- Header :
    - Content-Type: multipart/form-data
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (organization only)

- Body :
```json 
{
    "title" : "string",
    "description" : "text",
    "rules" : "string",
    "image" : "file",
    "quota": "integer",
    "end_date": "date",
    "announcement_date": "date"
}
```

Response :

```json 
{
    "data" : {
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
- Endpoint : `/programs/:idProgram`
- Header :
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (organization only)

Response :

```json 
{
    "message" : "Program successfully deleted"
}
```

### Get programs I'm applied
Request :
- Method : GET
- Endpoint : `/programs/my-programs`
- Header :
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (applicant only)

Response :

```json 
{
    "data": [
        {
            "id": 7,
            "organization_id": 3,
            "title": "Bantuan Kepada Anak Yatim",
            "description": "Unilever memberikan bantuan...",
            "rules": "Ini adalah ketentuan",
            "thumbnail": "images/pexels-kindel-media-7979758.jpg",
            "qouta": 343,
            "end_date": "2022-11-29",
            "announcement_date": "2022-11-30",
            "createdAt": "2022-11-25T00:00:00.000Z",
            "updatedAt": "2022-11-25T00:00:00.000Z",
            "Program_Users": {
                "status": "Ditolak"
            },
            "organization": {
                "id": 3,
                "name": "Unilever",
                "photo": "images/unilever.jpg"
            }
        },
        {
            "id": 8,
            "organization_id": 3,
            "title": "Beasiswa Siswa Berprestasi 2022",
            "description": "Pendidikan dipercaya dapat...",
            "rules": "Ini adalah ketentuan",
            "thumbnail": "images/428438353-photo-1648518295678-f78670c35924.png",
            "qouta": 455,
            "end_date": "2022-12-01",
            "announcement_date": "2022-12-02",
            "createdAt": "2022-11-25T00:00:00.000Z",
            "updatedAt": "2022-12-01T19:53:50.000Z",
            "Program_Users": {
                "status": "Diterima"
            },
            "organization": {
                "id": 3,
                "name": "Unilever",
                "photo": "images/unilever.jpg"
            }
        },
     ]
}
```

### Approve applicant
Request :
- Method : PUT
- Endpoint : `/programs/:idProgram/approve/:idUser`
- Header :
    - Content-Type: application/json
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (organization only)

Response :

```json 
{
    "data" : {
        "message": "User has been approved for this program"
    }
}
```

### Reject applicant
Request :
- Method : PUT
- Endpoint : `/programs/:idProgram/reject/:idUser`
- Header :
    - Content-Type: application/json
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (organization only)

Response :

```json 
{
    "data" : {
        "message": "User has been rejected for this program"
    }
}
```

### Get organization programs
Request :
- Method : GET
- Endpoint : `/organizations/programs`
- Header :
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (organization only)

Response :

```json 
{
    "data" : [
        {
            "id": 7,
            "organization_id": 3,
            "title": "Bantuan Kepada Anak Yatim",
            "description": "Unilever memberikan bantuan...",
            "rules": "Ini adalah ketentuan",
            "thumbnail": "images/pexels-kindel-media-7979758.jpg",
            "qouta": 343,
            "end_date": "2022-11-29",
            "announcement_date": "2022-11-30",
            "createdAt": "2022-11-25T00:00:00.000Z",
            "updatedAt": "2022-11-25T00:00:00.000Z",
            "organization": {
                "id": 3,
                "name": "Unilever",
                "photo": "images/unilever.jpg"
            }
        },
        {
            "id": 8,
            "organization_id": 3,
            "title": "Beasiswa Siswa Berprestasi 2022",
            "description": "Pendidikan dipercaya dapat menjadi...",
            "rules": "Ini adalah ketentuan",
            "thumbnail": "images/428438353-photo-1648518295678-f78670c35924.png",
            "qouta": 455,
            "end_date": "2022-12-01",
            "announcement_date": "2022-12-02",
            "createdAt": "2022-11-25T00:00:00.000Z",
            "updatedAt": "2022-12-01T19:53:50.000Z",
            "organization": {
                "id": 3,
                "name": "Unilever",
                "photo": "images/unilever.jpg"
            }
        }
     ]
}
```

### Get applicants in program
Request :
- Method : GET
- Endpoint : `/organizations/programs/:idProgram`
- Header :
    - Accept: application/json
    - Authorization: "Bearer <JWT ACCESS TOKEN>" (organization only)

Response :

```json 
{
    "data": {
        "id": 7,
        "organization_id": 3,
        "title": "Bantuan Kepada Anak Yatim",
        "description": "Unilever memberikan bantuan kepada...",
        "rules": "Ini adalah ketentuan",
        "thumbnail": "images/pexels-kindel-media-7979758.jpg",
        "qouta": 343,
        "end_date": "2022-11-29",
        "announcement_date": "2022-11-30",
        "createdAt": "2022-11-25T00:00:00.000Z",
        "updatedAt": "2022-11-25T00:00:00.000Z",
        "organization": {
            "id": 3,
            "name": "Unilever",
            "photo": "images/unilever.jpg"
        },
        "applicant": [
            {
                "id": 2,
                "name": "Bruno Fernandes",
                "email": "applicant@gmail.com",
                "address": "Klaten",
                "photo": null,
                "phone_number": "089347294823",
                "status": "applicant",
                "createdAt": "2022-11-24T18:34:52.000Z",
                "updatedAt": "2022-11-24T18:34:52.000Z",
                "Program_Users": {
                    "status": "Ditolak"
                }
            },
            {
                "id": 22,
                "name": "Arya Wirawan",
                "email": "aryawirawan@gmail.com",
                "address": "Jakarta",
                "photo": null,
                "phone_number": "123456789",
                "status": "applicant",
                "createdAt": "2022-12-01T04:50:22.000Z",
                "updatedAt": "2022-12-01T04:50:22.000Z",
                "Program_Users": {
                    "status": "Menunggu"
                }
            },
        ]
    }
}
```

