### Box9D LED manager ###

* Box9D LED manager is a web-based tool for configuring and playing back LED light shows on the Raspberry PI (in conjunction with the Box9D LED Pi API)

### How do I get set up? ###

The project is developed in 2 environments:

* Web
Download and use NPM (requires installation first) to run
  - npm install
  - npm start (to run)

* API
Download the source and build in Visual Studio 2015 (requires installation first) (with automatic Nuget Package restore). To run, debug in visual studio

### Semantic UI theming ###

Semantic themes are defined in `/web/semantic`. If you change any parts of the theme, you'll need to re-build `semantic.min.css` by running `gulp build` in `/web/semantic`. The new `semantic.min.css` should be automatically picked up by webpack.
