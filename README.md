### Box9D LED manager ###

* Box9D LED manager is a web-based tool for configuring and playing back LED light shows on the Raspberry PI (in conjunction with the Box9D LED Pi API)

### How do I get set up? ###

* Install git, and clone this repository onto your machine.

The project is developed in 2 environments:

* Web (in the web folder)
Download and use NPM (requires installation first) to run
  - npm install
  - npm start (to run)

* API (in the api/src folder)
 - Build in Visual Studio 2015 as administrator. If you don't have visual studio, you can run and download the community edition for free.
 - Ensure that the build configuration is set to x86
 - By default, Nuget packages/3rd party dependencies should be restored as you build the project.

To run, debug in visual studio after building. Ensure that inbound TCP connections are allowed over port 8001 on your firewall - this will allow the Raspberry PI to communicate with the manager API

### Semantic UI theming ###

Semantic themes are defined in `/web/semantic`. If you change any parts of the theme, you'll need to re-build `semantic.min.css` by running `gulp build` in `/web/semantic`. The new `semantic.min.css` should be automatically picked up by webpack.
