# My first videogame using Phaser and Bitnami
A simple example of how to implement a videogame using [Phaser - HTML5 Game Framework](https://github.com/photonstorm/phaser) and [Bitnami Apache Docker Image](https://github.com/bitnami/bitnami-docker-apache) with a docker-compose image.

![A web browser showing our videogame implemented with Phaser](./my-first-video-game.png)

## TL;DR
```bash
git clone https://github.com/cscazorla/phaser-bitnami.git
cd phaser-bitnami
docker-compose up
```
Access your web server in the browser by navigating to [http://localhost:8080](http://localhost:8080/) and start playing.

## Introduction
The main goal of this tutorial is to help people to start developing videogames in the browser. Thanks to [Bitnami Docker Images](https://bitnami.com/docker) we can forget about setting up the infrastructure (i.e. Apache web server) and focus on developing the game.

This videogame is based on the [Making your first Phaser game tutorial](http://phaser.io/tutorials/making-your-first-phaser-game) but it has some extra improvements features like stages (which allows you to organize your code while also adding a more complete and dynamic gaming experience for the player) and a "bad guy" who tries to catch you.

## Next steps
Are you comfortable with this code and you would like to improve the game? Here you are a few challenges:
- Implement a victory message when all Bitnami logos are collected.
- Make the baddie jump randomly when chasing you.

## To Do
- Explain the code base
