# Welcome on the backend of the project

## Project
This is the backend of the project. It is a REST API made with NodeJS and ExpressJS. It is connected to a MySQL database. Models and queries are done thanks to Sequelize ORM.
It is hosted on Railway.

The project is a vitrine website for a garage. It allows the garage to show its services and its and its cars for sale.
Employees and admin can connect to there professional space to manage the website.

## Installation

1. **Clone the repository**

    ```shell
    $ git clone https://github.com/MisterWaner/garage-vincent-parrot-back.git
    ```	

2. **Install the dependencies**

    ```shell
    $ npm install
    ```
3. **Create the database**
You need to create a `.env` file at the root of the project and fill it with the following variables:

    ```
    PORT=
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    DB_PORT=
    JWT_SECRET=
    ```

You need to create a database with the name you filled in the `.env` file.

4. **Run the project**
You can then run the project with `npm start` or `npm run dev` to use it with nodemon.

## Routes
The routes are available in the `routes` folder. There are s main routes: `auth`, `car`, `mail, `, `planning`, `review` and `user`.
Each route has its own controller in the `controllers` folder.

## Models
The models are available in the `models` folder. There are 5 models: `Car`, `Mail`, `Planning`, `Review` and `User`.
Each model has its own controller in the `controllers` folder.

## Controllers
The controllers are available in the `controllers` folder. There are 6 controllers: `auth`, `car`, `mail, `, `planning`, `review` and `user`.
Each controller has its own routes in the `routes` folder.

## Middlewares
The middlewares are available in the `middlewares` folder. There is only one middleware: `multerMiddleware.js` that allows to rename images and then save them in the folder `uploads` at the root of the project.

You can find the frontend repo of the project [here](
https://github.com/MisterWaner/garage-vincent-parrot-front).

You can find the website [here](https://garage-vicent-parrot-studi-ecf-2023.netlify.app/).
