# ResumeParser

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.4.

## Project Setup

1.  Fork the Repository in `https://github.com/SanjeevG-Mirafra/resumeparser` and clone the forked repository in local.
2.  Run the command `npm i` to install the node modules.
3.  Run the command `npm install -g @angular/cli` to install the Angular CLI.

## Github Setup

1.  Open Github on Chrome browser and signUp with your mail id
2.  Navigate to the project location and run the below command to clone the project to your local folder. open cmd promt cd over the new folder and just write
    `git clone https://github.com/SanjeevG-Mirafra/resumeparser.git`.
4.  Run the below command to pull the latest upstream master branch changes into your local.
    `git fetch <remote> <branch>`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# About Project

* The project uses Angular Reactive Form for form implementation.

* Before running the project, ensure that the "ALLOW CORS" extension is added to the browser and enabled.

* Bootstrap is used for styling the project.

* Upon uploading a candidate's resume, the data from the resume is fetched from a Python backend server.

* The fetched data is automatically populated in the respective inputs of the form.

* Mandatory fields that are not fetched and filled automatically must be manually filled by the user.

* If the form is submitted before filling all the mandatory fields, an alert message will pop up, prompting the user to fill all mandatory fields before submitting.

* If all the mandatory fields are filled, submitting the form will trigger a success message popup, and the form will automatically reset.


