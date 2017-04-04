# MEAN Tournament Simulator

A barely functional prototype of tournament simulator on the MongoDB - ExpressJS - AngularJS - NodeJS stack, a by-product from my learning process as I try to put the following technologies together. A deployed version is available at https://tournament-sim.herokuapp.com/tournaments/.

Technologies used:

- [NodeJS + NPM](https://nodejs.org/en/) as the ecosystem
- [Angular 4 + Typescript](https://angular.io/docs/ts/latest/quickstart.html) for the front-end
- [Angular CLI ](https://github.com/angular/angular-cli) for development
- [ExpressJS](https://expressjs.com/) for the back-end web application framework
- [MongoDB + Mongoose](http://mongoosejs.com/) for the database
- [Heroku + Heroku CLI + mLab add-on](http://heroku.com) to simplify deployment

Credits to [this article](https://devcenter.heroku.com/articles/mean-apps-restful-api) for the initial guidance.

## TODO

This web application is by no means the best way to implement a tournament simulator, nor it is intended to be functional to a normal user. However, there are various improvements (or rather, fixes) I can see:

### Must-Do

- Add deleting of tournaments
- Fix possible bug where deletion of player could break app
- Basic navigation controls (back buttons)
- More sensible ordering of matches and rankings (e.g. 1-5 should not be higher than 1-2) 

### Nice-To-Do

- Make interface prettier, clearer and more user-friendly
- Undoing match results
- (Refactoring) Split server.js into modules
- (Refactoring) Static typing for data types passed around in Angular components (e.g. Match/Tournament/Player) 

### Do-If-Too-Free

- More types of tournaments, and more options to customize tournaments
- Left & right arrow keys to submit match result
- Try adding tests

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

### Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source fi*les


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class Dmodule`.
####

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

