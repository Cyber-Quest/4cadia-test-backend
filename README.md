<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://pbs.twimg.com/profile_images/1157284387945422848/Xx-SXfR2_400x400.jpg" width="320" alt="Nest Logo" /></a>
</p>
## Description

Evaluative test backend 4cadia created with nestjs.

## Installation

```bash
$ npm install
```

## Requirements
Install postgres ([download](https://www.postgresql.org/download/)) in your machine on port: 5432:5432 and password: docker

Or

Install docker ([download](https://docs.docker.com/engine/install/)) in your machine and run these commands
```bash 
# docker
$ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres 
$ docker start postgres
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# development
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Wesley Campana Ferreira](https://www.linkedin.com/in/wesley-campana-ferreira-081b55152)
- Website - [Portfolio](https://cyber-portfolio.netlify.app/)

## License

Nest is [MIT licensed](LICENSE).
