# gulp-build
> Treehouse - Project8 - Using Gulp to Build a Front End Website

## Getting Started

### Setup
```
$ git clone https://github.com/anoopmundathan/gulp-build.git
$ cd gulp-buld
```
### Install
```
$ npm install
```
### Build
```
$ gulp 
```
 This will run following tasks
 * Clean ```dist``` folder
 * Lint JavaScript files
 * Minify ```index.html``` and copy to ```dist``` folder
 * Concatenate, minify, and copy all of the JavaScript files into an ```all.min.js``` file that is then copied to the ```dist/scripts``` folder.
 * Compile the SCSS files into CSS, then concatenate and minify into an all.min.css file that is then copied to the ```dist/styles``` folder.
 * Optimize images and copy to ```dist/content``` folder
 
### Run
```
$ gulp serve
```

