# This repository shows a microservice and a gateway for a game service and a publisher service
## Features of this api
This example is basically an API for some game api. It provides a possibility to crud on games, flushing games and applying discount
## Running the example with docker-compose
Execute `cp .env.example .env && docker-compose up -d` from the root of the repository
## Accessing the API itself on the postman docs provided
https://documenter.getpostman.com/view/6226738/TzRPi8d6
- Once you launch the API it will be accessible on port 3000.
localhost:3000/**"
## Launch services  (using docker-compose)
- Execute`cp .env.example .env && 


## Brief architecture overview
This API showcase consists of the following parts:
- API gateway --- Users Rabbitmq for interaction
- Game Service  - responsible for crud oprations on Game
- Publisher service - responsible for seeding the publisher db and also return the publisher

This example uses a SINGLE database (MongoDB) instance for all microservices. **This is not a correct point, the correct way is to use a separate DB instance for every microservice.** I used one DB instance for all microservices to simplify this example.
