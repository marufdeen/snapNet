# snapnet

## Application Features

snapnet is a car pooling application.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Testing](#testing)
  - [Development](#development)

### API DeploymeUserUsernt (Non-Persistent)

API is deployed at [https://snapnet-app-v1.herokuapp.com/](https://snapnet-app-v1.herokuapp.com/)

## Technologies

- [NodeJS](https://nodejs.org/) - Runtime Environment
- [ExpressJs](https://expressjs.com/) - Web Application Framework
- [MongoDB](https://www.mongodb.com/) - Database

## Features

### Users
 
- Create an account
- Login into your account
- Create a citizen
- View all citizens
- View a particular citizen

## API Endpoints

###

<table>

<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<th colspan=3>Users</th>

<tr><td>POST</td> <td>/register</td> <td>User Register</td></tr> 

<tr><td>POST</td> <td>/login</td> <td>User Register</td></tr> 

<tr><td>POST</td> <td>/citizens</td> <td> Only registered users can create a citizen</td></tr> 

<tr><td>GET</td> <td>/citizens</td> <td>View all citizens</td></tr>

<tr><td>GET</td> <td>/citizens/:citizenId</td> <td>View a particular citizen</td></tr>
 
</table>

## Getting Started

### Installation

- git clone
  [snapnet]https://github.com/marufdeen/snapNet)
- Run `yarn install` or `npm install` to install packages
- Run `yarn run seed` or `npm run seed` to automatically seed admin into the database
- Run `yarn run dev` or `npm run dev` to start the server
- Navigate to [localhost:8080](http://localhost:8080) in browser to access the application

## Testing

#### Data

* User Creation

```sh
 {
 name: String,
 email: String,
 password: String, 
}
```
* Citizen Creation

```sh
 {
 name: String,
 gender: String,
 address: String, 
 phone: String,
 ward_id: Numner 
}
```
 
#### Prerequisites

- [Postman](https://getpostman.com/) - API Toolchain

#### Testing with Postman

- After installing as shown above
- Navigate to [localhost:8080](http://localhost:8080/api) in
  [Postman](https://getpostman.com/) to access the application
- Super-admin login details ( {email: admin@dervac.com, password: admin} )
