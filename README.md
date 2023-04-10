# Final Challenge Compass - Grid Cars 🚗💨

## 📈 Miro - Sketch from project: [Miro Sketch](https://miro.com/app/board/uXjVMW3cfKc=/?share_link_id=862161931447)

This sketch was prepared to me for the beginning and development of the project.
<br/>
<br/>

## 📚 Swagger - Documentation

The documentation is on one of the endpoints of the API and also on SwaggerHub for remote access.

Local access: [Swagger Documentation Local](http://localhost:3000/api/v1/api-docs/) <br/>
SwaggerHub: [Swagger Documentation Online](https://app.swaggerhub.com/apis/GGOES269/event-planner_api_challenge_two/1.0.0#/)
<br/>
<br/>

## 💡 Trello - Board of project: [Trello](https://trello.com/invite/b/G0Imsv9p/ATTI1c0a5766317b3ab7ec04a4cfe05b60d0DA8EB5CA/desafio-final)

This is the trello board that I organized and used to prepare this project and monitor each activity to be done
<br/>
<br/>

## 🗺️ How this API was divided

In terms of the consumption of this API, it was divided into **three main parts**, regarding its endpoints, we have the endpoints of: **Users**, **Cars** and **Reservations**, our endpoints are the **routes**, available in the **routes directory**, they are controlled by the **functions** found in the **controller directory** and these functions manage to carry out all the logistics of the project based on the **schemas of our models**, which are in the **models directory**.
<br/>
<br/>

## ⚙️ How the development of this API was planned

In terms of the development of this project, first i list the features that are easily visible according to the project documentation. I categorized the features in relation to the difficulty i would have with them and the time i would probably need to spend on them.

After organizing the functionalities and labeling them in Trello, i started the development of the project, i used a branch called **development** for this, which did all the development of some functionality or something that would add to the project, to only later pass them on to the **main** branch.

I tried to keep each commit directly related to a specific functionality, action or modification, for its own organization and also for a clearer view of what each commit would be, i chose to use some emoji's based on the pattern of another person who made this same way.

[Commit Patterns](https://github.com/iuricode/padroes-de-commits)

- ✨ - Related to the addition of functionalities or developed code that adds value at the end of a delivery
- 📚 - Related to documentation
- 💡 - Related to comments and things to do in some function or code snippet
- 🔧 - Related to configuration of project
- 🎉 - Related to initial project settings
- 🐛 - Related to fixing bugs and momentary improvisations
- ♻️ - Related to the improvement of already produced code or adjustment according to the required documentation
- 🧪 - Related to producing tests with JEST
- 🔒 - Related to security-related features
- 📦 - Related to adding packages and dependencies in the project
  <br/>
  <br/>

## 💻 How to run this project

### Required:

- NodeJS
- Postman or Insomnia (To test endpoints and their responses)
- Internet

### Installation

Clone the project to a folder on your device or download a zipped copy and then unzip it to your device folder.

```
git clone https://github.com/GMgoes/final-challenge-compass.git
```

**In the project folder**, open a terminal and run the following command to install all necessary project dependencies, compile to JavaScript and start our server.

```
npm run start
```

Once the npm run start command installs the necessary dependencies to run our tests and also compiles the code to JavaScript, just type the command below now, which will start the tests

```
npm run test:dev
```
<br/>
<br/>

## 🧪 Tests

This API is not completed in terms of testing, only unit tests were implemented for the functions that are in the utils directory, it is necessary to complete the integrated tests of the endpoints and the entire flow of functions in the controller directory, the command npm run test:dev tests only these unit tests

<br/>
<br/>

## 🚀 Deploy

The deployment was done through the **Railway**, it's link to access the dashboard of deploy [is here](https://railway.app/invite/AaGW0M7mFxy)

And to acess the API remotely it is through the URL: [challenge-one-compass-production.up.railway.app](challenge-one-compass-production.up.railway.app/api/v1/api-docs)

<br/>
<br/>

## ✔️ Server On

After typing the command *npm run start*, using Postman or Insomnia we can access our endpoints, separating through the three divisions of our project, we have the endpoints of: **Cars**, **Users** and **Reservations**, some routes require authentication of a valid user, they are flagged with a 🔒, let's look at each one of them:

- _Obs: Clicking on one of the lines below will direct you to the explanation of the selected route_

### Cars - Base Endpoint - /api/v1/car

[- GET - http://localhost:3000/api/v1/car🔓](#get---httplocalhost3000apiv1car-🔓) <br/>
[- GET - http://localhost:3000/api/v1/car/:id🔓](#get---httplocalhost3000apiv1carid-🔓)<br/>
[- POST - http://localhost:3000/api/v1/car 🔒](#post---httplocalhost3000apiv1car-🔒)<br/>
[- DELETE - http://localhost:3000/api/v1/car/:id 🔒](#delete---httplocalhost3000apiv1carid-🔒)<br/>
[- PUT - http://localhost:3000/api/v1/car/:id 🔒](#put---httplocalhost3000apiv1carid-🔒)<br/>
[- PATCH - http://localhost:3000/api/v1/car/:id/acessories/:id 🔒](#patch---httplocalhost3000apiv1caridacessoriesid-🔒)<br/>

### Reserves - Base Endpoint - /api/v1/reserve

[- GET - http://localhost:3000/api/v1/reserve🔓](#get---httplocalhost3000apiv1reserve-🔓)<br/>
[- GET - http://localhost:3000/api/v1/reserve/:id🔓](#get---httplocalhost3000apiv1reserveid-🔓)<br/>
[- POST - http://localhost:3000/api/v1/reserve🔒](#post---httplocalhost3000apiv1reserve-🔒)<br/>
[- DELETE - http://localhost:3000/api/v1/reserve/:id🔒](#delete---httplocalhost3000apiv1reserveid-🔒)<br/>
[- PUT - http://localhost:3000/api/v1/reserve/:id 🔒](#put---httplocalhost3000apiv1reserveid-🔒)<br/>

### Users - Base Endpoint - /api/v1/user

[- POST - http://localhost:3000/api/v1/user🔓](#post---httplocalhost3000apiv1user-🔓)<br/>
[- POST - http://localhost:3000/api/v1/user/authenticate🔓](#post---httplocalhost3000apiv1userauthenticate-🔓)<br/>
[- GET - http://localhost:3000/api/v1/user/logout 🔒](#get---httplocalhost3000apiv1userlogout-🔒)<br/>
[- GET - http://localhost:3000/api/v1/user/:id🔓](#get---httplocalhost3000apiv1userid-🔓)<br/>
[- DELETE - http://localhost:3000/api/v1/user/:id🔒](#delete---httplocalhost3000apiv1userid-🔒)<br/>
[- GET - http://localhost:3000/api/v1/user🔓](#get---httplocalhost3000apiv1user🔓)<br/>
[- PUT - http://localhost:3000/api/v1/user/:id 🔒](#put---httplocalhost3000apiv1userid-🔒)<br/>

<br/>
<br/>

## 📌 How do each of these routes work?

# Users

### - POST - http://localhost:3000/api/v1/user 🔓

This route returns the created user to us, if the record creation is successful. This user is created based on the data passed in the body of the request and also together with an API that provides us with the geographic data of the person, based on the CEP code that he/she informed in the body of the request, this data is obtained from the API: [viaCEP](https://viacep.com.br/), this route does some validations before creating the user record

## Requirements ⚠️

- A valid email, and unique in the database
- The user must be 18 years old or older
- A valid CEP
- A valid CPF, and unique in the database
- In addition, the fields: **name**, **cpf**, **birth**, **email**, **password**, **cep** and **qualifed** are mandatory in the request body.

## Examples:

Request Body

- http://localhost:3000/api/v1/user

```
{
    "name": "Joãozinho",
    "cpf": "915.945.120-35",
    "birth": "10/09/2001",
    "email": "chegdali7315@uorak.com",
    "password": "JoaozinhoTheSilly",
    "cep": "79400000",
    "qualifed": "yes"
}
```

Response Body

```
{
    "message": "New registered user",
    "createdUser": {
        "id": "6433c49fd8102300bdae5494",
        "name": "Joãozinho",
        "cpf": "915.945.120-35",
        "birth": "10/09/2001",
        "email": "chegdali7315@uorak.com",
        "cep": "79400000",
        "qualifed": "yes",
        "patio": "",
        "complement": "",
        "neighborhood": "",
        "locality": "",
        "uf": ""
    }
}
```

<br/>
<br/>

### - POST - http://localhost:3000/api/v1/user/authenticate 🔓

This route gives us a success message when we log in correctly with a user in the system (which allows us to access protected routes), it is necessary to inform the user's email and password in the body of the request, then validation is carried out if that user exists in the database and if its encrypted password matches the information, if so, an access token is generated for it, otherwise an error is reported to the user

## Examples:

Request Body with valid credentials

- http://localhost:3000/api/v1/user/authenticate

```
{
    "email": "chegdali7315@uorak.com",
    "password": "JoaozinhoTheSilly"
}
```

Response Body

```
{
    "message": "User logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzNjNDlmZDgxMDIzMDBiZGFlNTQ5NCIsImVtYWlsIjoiY2hlZ2RhbGk3MzE1QHVvcmFrLmNvbSIsImlhdCI6MTY4MTExNDQ4MSwiZXhwIjoxNjgxMTU3NjgxfQ.QABNNW4NVphWmQH5UKsGRNb3JDOLKIlgPsI0usR4QFQ"
}
```

Request Body with invalid credentials

- http://localhost:3000/api/v1/user/authenticate

```
{
    "email": "chegdali7315@uorak.com",
    "password": "AAAAAAAAAAA"
}
```

Response Body

```
{
    "message": "Email not found or invalid password"
}
```

<br/>
<br/>

### - GET - http://localhost:3000/api/v1/user/logout 🔒

This route returns a success message if the user was successfully logged out (deletes cookies with the access token generated at login), it can only be accessed if the user is logged in before.

## Examples:

- http://localhost:3000/api/v1/user/logout

Response Body

```
{
    "message": "User Logged out"
}
```

<br/>
<br/>

### - GET - http://localhost:3000/api/v1/user🔓

This route returns all user records from our database, it is also possible to pass query params to filter by a certain attribute, this route also contains pagination for display

## Examples:

Response Body without query params

- http://localhost:3000/api/v1/user

```
 "message": "Query performed successfully",
    "users": [
        {
            "_id": "642dc2c2c74ce2364f007db5",
            "name": "Gustavo Goes",
            "cpf": "060.320.591-70",
            "birth": "10/09/2001",
            "email": "dennerr@gmail.com",
            "cep": "79400000",
            "qualifed": "yes",
            "patio": "",
            "complement": "",
            "neighborhood": "",
            "locality": "",
            "uf": ""
        },
        {
            "_id": "642f33bf9e77935c3bd4c0d0",
            "name": "Gustavo",
            "cpf": "949.468.690-00",
            "birth": "10/09/2001",
            "email": "ggoes269@gmail.com",
            "cep": "79400000",
            "qualifed": "yes",
            "patio": "",
            "complement": "",
            "neighborhood": "",
            "locality": "",
            "uf": ""
        },
        {
            "_id": "64337addc553acfeebed05c4",
            "name": "Joãozinho Ciclano",
            "cpf": "225.305.080-62",
            "birth": "03/03/2000",
            "email": "khamsa9772@uorak.com",
            "cep": "79400000",
            "qualifed": "yes",
            "patio": "",
            "complement": "",
            "neighborhood": "",
            "locality": "",
            "uf": ""
        },
        {
            "_id": "64337b6ac553acfeebed05d3",
            "name": "Joãozinho Ciclano",
            "cpf": "333.973.590-58",
            "birth": "03/03/2000",
            "email": "hongjun8080@uorak.com",
            "cep": "79400000",
            "qualifed": "yes",
            "patio": "",
            "complement": "",
            "neighborhood": "",
            "locality": "",
            "uf": ""
        },
        {
            "_id": "64337bdac155a08ee22efde2",
            "name": "Joãozinho Ciclano",
            "cpf": "361.831.450-76",
            "birth": "03/03/2000",
            "email": "kornelia5164@uorak.com",
            "cep": "79400000",
            "qualifed": "yes",
            "patio": "",
            "complement": "",
            "neighborhood": "",
            "locality": "",
            "uf": ""
        },
        {
            "_id": "64337c29ad239f1ff6de262f",
            "name": "Joãozinho Ciclano",
            "cpf": "195.269.230-06",
            "birth": "03/03/2000",
            "email": "yonghong4743@uorak.com",
            "cep": "79400000",
            "qualifed": "yes",
            "patio": "",
            "complement": "",
            "neighborhood": "",
            "locality": "",
            "uf": ""
        },
        {
            "_id": "64337dc3a23ae38f59f91674",
            "name": "Joãozinho Ciclano",
            "cpf": "288.317.190-41",
            "birth": "03/03/2000",
            "email": "assunta1767@uorak.com",
            "cep": "79400000",
            "qualifed": "yes",
            "patio": "",
            "complement": "",
            "neighborhood": "",
            "locality": "",
            "uf": ""
        },
        {
            "_id": "6433c3fb13181eef4b6e480f",
            "name": "Joãozinho",
            "cpf": "091.867.540-50",
            "birth": "10/09/2001",
            "email": "abenchara8215@uorak.com",
            "cep": "79400000",
            "qualifed": "yes",
            "patio": "",
            "complement": "",
            "neighborhood": "",
            "locality": "",
            "uf": ""
        },
        {
            "_id": "6433c49fd8102300bdae5494",
            "name": "Joãozinho",
            "cpf": "915.945.120-35",
            "birth": "10/09/2001",
            "email": "chegdali7315@uorak.com",
            "cep": "79400000",
            "qualifed": "yes",
            "patio": "",
            "complement": "",
            "neighborhood": "",
            "locality": "",
            "uf": ""
        },
        {
            "_id": "6433edcd814c4a6cd2db8b9b",
            "name": "James da salada de fruta",
            "cpf": "858.454.080-67",
            "birth": "10/09/1999",
            "email": "chunhua8035@uorak.comm",
            "cep": "01001000",
            "qualifed": "yes",
            "patio": "Praça da Sé",
            "complement": "lado ímpar",
            "neighborhood": "Sé",
            "locality": "São Paulo",
            "uf": "SP"
        }
    ],
    "total": 10,
    "limit": 10,
    "offset": 0,
    "nextUrl": "none",
    "previousUrl": "none"
}
```

Response Body with query params

- http://localhost:3000/api/v1/user?name=James%20da%20salada%20de%20fruta

```
{
    "message": "Query performed successfully",
    "users": [
        {
            "_id": "6433edcd814c4a6cd2db8b9b",
            "name": "James da salada de fruta",
            "cpf": "858.454.080-67",
            "birth": "10/09/1999",
            "email": "chunhua8035@uorak.comm",
            "cep": "01001000",
            "qualifed": "yes",
            "patio": "Praça da Sé",
            "complement": "lado ímpar",
            "neighborhood": "Sé",
            "locality": "São Paulo",
            "uf": "SP"
        }
    ],
    "total": 10,
    "limit": 10,
    "offset": 0,
    "nextUrl": "none",
    "previousUrl": "none"
}
```

<br/>
<br/>

### - DELETE - http://localhost:3000/api/v1/user/:id 🔒

This route returns a response with an empty body and status 204, if there is no user with that id entered or if it is not a valid id, it will return an error message to the user, this id is provided through the parameters of the URL itself.

## Examples:

With a valid id

```
{}
```

With a invalid id

- http://localhost:3000/api/v1/user/ABCDE12345

```
{
    "message": "Invalid ID, try again with a valid ID"
}
```

<br/>
<br/>

### - GET - http://localhost:3000/api/v1/user/:id 🔓

This route returns a user that contains the same id as the one informed by parameter in the URL itself, if there is no user with that id informed, or if it is not a valid id, an error is returned to the user

## Examples:

Response Body with a valid id

- http://localhost:3000/api/v1/user/642f33bf9e77935c3bd4c0d0

```
{
    "message": "Query performed successfully",
    "user": {
        "_id": "642f33bf9e77935c3bd4c0d0",
        "name": "Gustavo",
        "cpf": "949.468.690-00",
        "birth": "10/09/2001",
        "email": "ggoes269@gmail.com",
        "cep": "79400000",
        "qualifed": "yes",
        "patio": "",
        "complement": "",
        "neighborhood": "",
        "locality": "",
        "uf": "",
        "__v": 0
    }
}
```

Response Body without a valid id

- http://localhost:3000/api/v1/user/AAAA

```
{
    "message": "Invalid ID of the user, try again with a valid ID"
}
```

<br/>
<br/>

### - PUT - http://localhost:3000/api/v1/user/:id 🔒

This route returns the data of the updated user if the update in the database is successful, the required data and the rules for validating them are the same as for creating a new user, it is also validated if the user is changing his email or cpf , in this case, an insertion of a cpf/email already existing in the database is allowed, if the email and the cpf are his own and he wants to keep this data, but it is validated if he is trying to insert an email already used by another and the the same goes for the cpf, if an error occurs during the insertion, the error is returned to the user

## Examples:

Request Body with a valid id

- http://localhost:3000/api/v1/user/6433edcd814c4a6cd2db8b9b

```
{
    "name": "James da salada de fruta",
    "cpf": "858.454.080-67",
    "birth": "10/09/1999",
    "email": "chunhua8035@uorak.comm",
    "password": "123456",
    "cep": "01001000",
    "qualifed": "yes"
}
```

Response Body with a valid id

- http://localhost:3000/api/v1/user/AAAA

```
{
    "message": "Updated user",
    "updatedUser": {
        "id": "6433edcd814c4a6cd2db8b9b",
        "name": "James da salada de fruta",
        "cpf": "858.454.080-67",
        "birth": "10/09/1999",
        "email": "chunhua8035@uorak.comm",
        "cep": "James da salada de fruta",
        "qualifed": "yes",
        "uf": "SP"
    }
}
```

<br/>
<br/>

# Cars

### - GET - http://localhost:3000/api/v1/car 🔓

this route returns all the cars in our database, it also accepts a filter to only bring data by a certain attribute of the car, such as: model = Corolla, this route has pagination, and it is possible for the user to also insert a pagination customized through query params

## Examples:

Response Body without query params

- http://localhost:3000/api/v1/car

```
{
    "message": "Query performed successfully",
    "cars": [
        {
            "_id": "642e2a7138ad6b51cc05b0c7",
            "model": "Corolla",
            "color": "Prata",
            "year": "2023",
            "value_per_day": 50,
            "accessories": [
                {
                    "description": "Volante"
                },
                {
                    "description": "Maçaneta"
                },
                {
                    "description": "Ar Condicionado"
                },

            ],
            "number_of_passengers": 5
        },
        {
            "_id": "6430ad9d79a841aacc752b98",
            "model": "Corsa",
            "color": "Preto",
            "year": "2009",
            "value_per_day": 20,
            "accessories": [
                {
                    "description": "Maçaneta"
                },
                {
                    "description": "Volante"
                }
            ],
            "number_of_passengers": 5
        },
        {
            "_id": "643337c9b7360b2a5170fe00",
            "model": "Corolla",
            "color": "Prata",
            "year": "2023",
            "value_per_day": 50,
            "accessories": [
                {
                    "description": "Freio de Mão"
                },
                {
                    "description": "Cambio"
                },
                {
                    "description": "Suvenir"
                }
            ],
            "number_of_passengers": 5
        },
    ],
    "total": 3,
    "limit": 10,
    "offset": 0,
    "nextUrl": "none",
    "previousUrl": "none"
}
```

Response Body with query params

- http://localhost:3000/api/v1/car?year=2009

```
{
    "message": "Query performed successfully",
    "cars": [
        {
            "_id": "6430ad9d79a841aacc752b98",
            "model": "Corsa",
            "color": "Preto",
            "year": "2009",
            "value_per_day": 20,
            "accessories": [
                {
                    "description": "Maçaneta"
                },
                {
                    "description": "Volante"
                }
            ],
            "number_of_passengers": 5
        }
    ],
    "total": 7,
    "limit": 3,
    "offset": 0,
    "nextUrl": "http://localhost:3000/api/v1/car?limit=3&offset=3",
    "previousUrl": "none"
}
```

<br/>
<br/>

### - POST - http://localhost:3000/api/v1/car 🔒

This route returns a created car, it receives the data for creating the car through the body of the request and does some validations before creating the car

## Requirements ⚠️

- The year of manufacture of the car must be between 1950 and 2023
- It must have at least one accessory in the list of inserted accessories
- Must not contain repeated accessories
- In addition, the fields: **model**, **color**, **year**, **value_per_day** and **number_of_passengers** are mandatory in the request body.

In the event of any breach of these obligations, it will return an error response to the user informing what happened

## Examples:

Request Body

- http://localhost:3000/api/v1/car

```
{
    "model": "Fusca",
    "color": "Bege",
    "year": "2002",
    "value_per_day": 15,
    "accessories": [
        {
            "description": "Maçaneta"
        },
        {
            "description": "Volante"
        },
        {
            "description": "Vidro Fume"
        }
    ],
    "number_of_passengers": 5
}
```

Response Body

```
{
    "message": "Car registration created",
    "body": {
        "model": "Fusca",
        "color": "Bege",
        "year": "2002",
        "value_per_day": 15,
        "accessories": [
            {
                "description": "Maçaneta"
            },
            {
                "description": "Volante"
            },
            {
                "description": "Vidro Fume"
            }
        ],
        "number_of_passengers": 5,
        "_id": "6433b8ef180586126b079677",
        "__v": 0
    }
}
```

<br/>
<br/>

### - GET - http://localhost:3000/api/v1/car/:id 🔓

This route returns the car that contains the id identical to the one passed by the parameter in the URL, if there is no car with that id, or if it is not a valid id, an error is returned to the user

## Examples:

Response Body with a valid id

- http://localhost:3000/api/v1/car/6433b8ef180586126b079677

```
{
    "message": "Query performed successfully",
    "car": {
        "_id": "6433b8ef180586126b079677",
        "model": "Fusca",
        "color": "Bege",
        "year": "2002",
        "value_per_day": 15,
        "accessories": [
            {
                "description": "Maçaneta"
            },
            {
                "description": "Volante"
            },
            {
                "description": "Vidro Fume"
            }
        ],
        "number_of_passengers": 5
    }
}
```

Response Body without a valid id

- http://localhost:3000/api/v1/car/ABCDE1234

```
{
    "message": "Invalid ID, try again with a valid ID"
}
```

<br/>
<br/>

### - DELETE - http://localhost:3000/api/v1/car/:id 🔒

This route returns a response with an empty body and status 204, if there is no car with that id entered or if it is not a valid id, it will return an error message to the user, this id is provided through the parameters of the URL itself.

## Examples:

With a valid id

```
{}
```

With a invalid id

- http://localhost:3000/api/v1/car/ABCDE1234

```
{
    "message": "Invalid ID, try again with a valid ID"
}
```

<br/>
<br/>

### - PUT - http://localhost:3000/api/v1/car/:id 🔒

This route returns a car after being updated, the data for updating the record is passed through the body of the request, since the id of the car that will be updated is passed through the parameters of the URL itself, the same restrictions for creating a car apply As for updating the car data, the only property that cannot be updated is the record id.

## Requirements ⚠️

- The year of manufacture of the car must be between 1950 and 2023
- It must have at least one accessory in the list of inserted accessories
- Must not contain repeated accessories
- In addition to the fields: **Model**, **Color**, **Year**, **Value per day** and **Number of passengers** are mandatory

## Examples:

Request Body

- http://localhost:3000/api/v1/car/6433b8ef180586126b079677

```
{
    "model": "Fusca",
    "color": "Bege",
    "year": "2002",
    "value_per_day": 20,
    "accessories": [
        {
            "description": "Maçaneta"
        },
        {
            "description": "Volante"
        },
        {
            "description": "Vidro Fume"
        }
    ],
    "number_of_passengers": 5
}
```

Response Body

```
{
    "message": "Updated car data",
    "car": {
        "_id": "6433b8ef180586126b079677",
        "model": "Fusca",
        "color": "Bege",
        "year": "2002",
        "value_per_day": 20,
        "accessories": [
            {
                "description": "Maçaneta"
            },
            {
                "description": "Volante"
            },
            {
                "description": "Vidro Fume"
            }
        ],
        "number_of_passengers": 5,
        "__v": 0
    }
}
```

<br/>
<br/>

### - PATCH - http://localhost:3000/api/v1/car/:id/acessories/:id 🔒

This route returns a car after having one of its accessories updated, the accessory to be updated is specified in the request body, if this accessory is already present in the car object, the user can remove it by passing the position (id) that is in the accessories array, if it is an accessory that is not on the list yet, he can overwrite an existing one, passing the id of an accessory that is already allocated, and if he passes an accessory that is not yet, he can add it to the list, passing an id greater than the number of existing accessories

## Examples:

Actual accessories of car with id: **6433b8ef180586126b079677**

```
"accessories": [
        {
            "description": "Maçaneta"
        },
        {
            "description": "Volante"
        },
        {
            "description": "Vidro Fume"
        }
    ],
```

If we pass the object with the description of the 'Vidro Fumê' accessory and an id greater than the size of our vector of accessories, it will return to the user that he is trying to insert a repeated accessory

Request Body

- http://localhost:3000/api/v1/car/6433b8ef180586126b079677/acessories/4

```
{
    "description": "Vidro Fume"
}
```

Response Body

```
{
    "message": "Cannot add this item again, it is already in the list"
}
```

If we pass the object with description of 'Vidro Fumê' accessory and the id where the object with description of 'Vidro Fumê' is found, then the algorithm will remove it from the list of accessories of our car

Request Body

- http://localhost:3000/api/v1/car/6433b8ef180586126b079677/acessories/2

```
{
    "description": "Vidro Fume"
}
```

Response Body

```
{
    "message": "Updated car",
    "car": {
        "_id": "6433b8ef180586126b079677",
        "model": "Fusca",
        "color": "Bege",
        "year": "2002",
        "value_per_day": 20,
        "accessories": [
            {
                "description": "Maçaneta"
            },
            {
                "description": "Volante"
            }
        ],
        "number_of_passengers": 5,
        "__v": 0
    }
}
```

If we pass the object with the description of the 'Vidro Fumê' accessory and it does not exist in our list of current accessories, we will have two options, we can pass with the id (position) of an already existing accessory and overwrite it, or we can pass an id (position) greater than the size of our vector, and this will allocate it at the end of our vector (no matter what position is entered, as long as it is greater than the size of the vector), in which case I will overwrite the first element 'Maçaneta' (at position 0).

Request Body

- http://localhost:3000/api/v1/car/6433b8ef180586126b079677/acessories/0

```
{
    "description": "Vidro Fume"
}
```

Response Body

```
{
    "message": "Updated car",
    "car": {
        "_id": "6433b8ef180586126b079677",
        "model": "Fusca",
        "color": "Bege",
        "year": "2002",
        "value_per_day": 20,
        "accessories": [
            {
                "description": "Vidro Fume"
            },
            {
                "description": "Volante"
            }
        ],
        "number_of_passengers": 5,
        "__v": 0
    }
}
```

<br/>
<br/>

# Reserves

### - GET - http://localhost:3000/api/v1/reserve 🔓

This route returns all existing reservation records in our database, this record return has pagination and it is possible to customize it through query params, it is also possible to filter the records you want by properties of the reservations.

## Examples:

Response body without query params

- http://localhost:3000/api/v1/reserve

```
{
    "message": "Query performed successfully",
    "reserves": [
        {
            "_id": "643387508a95b7c337494d6b",
            "start_date": "08/04/2023",
            "end_date": "12/04/2023",
            "id_car": "6430ad9d79a841aacc752b98",
            "id_user": "64337bdac155a08ee22efde2",
            "final_value": 80
        },
        {
            "_id": "64338781214c450aabd2a7de",
            "start_date": "08/04/2023",
            "end_date": "12/04/2023",
            "id_car": "6430ad9d79a841aacc752b98",
            "id_user": "64337bdac155a08ee22efde2",
            "final_value": 80
        }
    ],
    "total": 2,
    "limit": 10,
    "offset": 0,
    "nextUrl": "none",
    "previousUrl": "none"
}
```

Response body with query params

- http://localhost:3000/api/v1/reserve?\_id=643387508a95b7c337494d6b

```
{
    "message": "Query performed successfully",
    "reserves": [
        {
            "_id": "643387508a95b7c337494d6b",
            "start_date": "08/04/2023",
            "end_date": "12/04/2023",
            "id_car": "6430ad9d79a841aacc752b98",
            "id_user": "64337bdac155a08ee22efde2",
            "final_value": 80
        }
    ],
    "total": 2,
    "limit": 10,
    "offset": 0,
    "nextUrl": "none",
    "previousUrl": "none"
}
```

<br/>
<br/>

### - POST - http://localhost:3000/api/v1/reserve 🔒

This route returns the reservation created, it receives data from the body of the request that are used to create the record, in addition, some data is obtained indirectly, such as the daily rate of a car, which is obtained through access to the id of the car that is passed on, in addition to the id of the user and whether he has permission to drive or not

## Requirements ⚠️

- An id referring to a valid car
- An id referring to a valid user (stored in a user's login)
- A user who has a license to drive (yes)
- A valid date (end date must be later than start date)
- In addition, the fields: **start_date**, **end_date**, **id_car** are mandatory in the request body.

In the event of any breach of these obligations, it will return an error response to the user informing what happened

## Examples:

Request Body with a car id valid

- http://localhost:3000/api/v1/reserve

```
{
    "start_date": "01/03/2023",
    "end_date": "05/07/2023",
    "id_car": "6430ad9d79a841aacc752b98"
}
```

Response Body with a car id valid

```
{
    "message": "New reservation registered",
    "createdReserve": {
        "start_date": "01/03/2023",
        "end_date": "05/07/2023",
        "id_car": "6430ad9d79a841aacc752b98",
        "id_user": "6433c49fd8102300bdae5494",
        "final_value": 2520,
        "_id": "6433cb29d8102300bdae54a4",
        "__v": 0
    }
}
```

Request Body without a car id valid

```
{
    "start_date": "01/03/2023",
    "end_date": "05/07/2023",
    "id_car": "ABCD1234"
}
```

Response Body without a car id valid

```
{
    "message": "Invalid ID, try again with a valid ID"
}
```

<br/>
<br/>

### - GET - http://localhost:3000/api/v1/reserve/:id 🔓

This route returns the reservation record that has an id identical to the one passed by the URL parameter, if there is one that satisfies this equality, if there is none in the database, or if the id entered is in an unexpected format, it will return a user error

## Examples:

Response body with a valid id

- http://localhost:3000/api/v1/reserve/643387508a95b7c337494d6b

```
{
    "message": "Query performed successfully",
    "reserve": {
        "_id": "643387508a95b7c337494d6b",
        "start_date": "08/04/2023",
        "end_date": "12/04/2023",
        "id_car": "6430ad9d79a841aacc752b98",
        "id_user": "64337bdac155a08ee22efde2",
        "final_value": 80,
        "__v": 0
    }
}
```

Response body without a valid id

- http://localhost:3000/api/v1/reserve/ABCDE1234

```
{
    "message": "Invalid ID, try again with a valid ID"
}
```

<br/>
<br/>

### - DELETE - http://localhost:3000/api/v1/reserve/:id 🔒

This route returns a response with an empty request body and with the request status number 204, signaling that the reservation was successfully deleted from the database, in case it cannot find a reservation with that id, or if the id is outside the expected, will return an error message to the user depending on the situation

## Examples:

With a valid id

- http://localhost:3000/api/v1/reserve/643387508a95b7c337494d6b

```
{}
```

Without a valid id

- http://localhost:3000/api/v1/reserve/ABCD1234

```
{
    "message": "Error, no reservation was found with that ID"
}
```

<br/>
<br/>

### - PUT - http://localhost:3000/api/v1/reserve/:id 🔒

This route returns the reservation after it has been updated in our database, the same rules and logic of creating a reservation apply here as well, it is not possible to update the id of a reservation

## Requirements ⚠️

- An id referring to a valid car
- An id referring to a valid user (stored in a user's login)
- A user who has a license to drive (yes)
- A valid date (end date must be later than start date)
- In addition, the fields: **start_date**, **end_date**, **id_car** are mandatory in the request body.

In the event of any breach of these obligations, it will return an error response to the user informing what happened

## Examples:

Request Body with valid data

- http://localhost:3000/api/v1/reserve/6433cb29d8102300bdae54a4

```
{
    "start_date": "09/04/2023",
    "end_date": "11/04/2023",
    "id_car": "642e27f77c2deef8c6b263d4"
}
```

Response Body with valid data

```
{
    "message": "Updated reservation",
    "updatedReserve": {
        "_id": "64338781214c450aabd2a7de",
        "start_date": "09/04/2023",
        "end_date": "11/04/2023",
        "id_car": "642e27f77c2deef8c6b263d4",
        "id_user": "64337bdac155a08ee22efde2",
        "final_value": 100,
        "__v": 0
    }
}
```

Request Body without valid data

- http://localhost:3000/api/v1/reserve/6433cb29d8102300bdae54a4

```
{
    "start_date": "09/04/2023",
    "end_date": "11/04/2023",
    "id_car": "ABCD123"
}
```

Response Body without valid data

```
{
    "message": "Invalid ID of a car, try again with a valid ID"
}
```


----

<br>
<br>
<br>
<br>
<br>
<br>
<br>

# Dedicatória

Dedico esse projeto à minha mãe, **Vania**, que me apoiou muito durante esse período da construção do projeto, esse projeto demandou um certo nível de conhecimento e resiliência se comparado aos anteriores, por mais que tenha sido um projeto simples da área e semelhante aos que já tinham sido desenvolvidos, teve acréscimo de algumas coisas novas e principalmente a organização de modo solo, visto que no anterior fizemos em grupo, tive vários momentos em que estava para baixo e que achava que não conseguiria desenvolver tudo à tempo sozinho, porém a minha mãe e também meus amigos me apoiaram à não desistir e continuar focado, infelizmente não consegui entregar por completo (Ficou faltando testes integrados utilizando Mocks no Jest) porém gostei de ter feito esse desafio ao final, consigo ver que aprendi bastante coisa durante esse tempo no PB e espero ter novos desáfios em que possa olhar para trás e ver que continuei crescendo na área que gosto. 🚀❤️