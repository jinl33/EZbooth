# EZbooth

This is a initial repository for EZbooth, a booth model design tool. 

## Initial Setup

To start off, you need to have [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.

When you have pulled the repository, first call

```npm i```

to install all the packages that are specified. Then you are already ready to go!

## Scripts

There are currently only two scripts in this project. One is there to build the project for development `build-dev` and one to build it for production `build-prod`.

`npm run build-dev` - Starts a development server and builds the application whenever a change in one the files occurred.  
`npm run build-prod` - Builds the application and puts the final `bundle.js` and `index.html` into the `dist` folder.
