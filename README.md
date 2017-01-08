# VIRTTRUHE
## Experimental game to explore the border between physical and virtual space. A playground for augmented reality (or maybe augmented virtuality)

![Logo](https://github.com/gitbreaker222/virttruhe/blob/master/concept/logo/Icon.png?raw=true)

This repository is in sequel to the old ["VIRTTRUHE HTML5 App"](https://github.com/gitbreaker222/virttruhe_html5_app), to give it a clean start and making it more scalable.

## Starting the app

[Click here to view the online demo](https://rawgit.com/gitbreaker222/virttruhe/master/app/index.html).

To run it locally and as long as there is no distributed app or extra run script, you just open the file `app/index.html` in your browser.

## Contributing: Getting started

 1. install the development dependencies
 1. run the the build task
 1. run the app

### 1: installing dependecies

First please make sure you have [git](https://git-scm.com) for version commits installed and [nodeJS](https://nodejs.org/en/), to run "serverside javascrip" programs on your machine. They are used for the build tasks.

When you have this, you can use your favourite [git client](https://git-scm.com/downloads/guis) to _clone_ from `https://github.com/gitbreaker222/virttruhe.git` into your development folder. A folder _virttruhe_ will be created.

Next you install the development dependencies into this folder. Therefor you need to open a terminal window and enter the enter the nodeJS command:

```
npm i && bower i
```

It automatically downloads all packages listed in the file _package.json_ into a new folder _node_modules_ (needed to build the app) and then downloads all packages listed in _bower.json_ into a new folder _bower components_ (needed by the app itself).

### 2: run the build task

NodeJS has now installed the task runner _gulp_ from the _node package manager (npm)_ for you.

Run

```
gulp
```

in the terminal to trigger the _gulp default_ task. An IDE like Webstorm shows these tasks usually on the left. You can also run the _default_ task from there.

The folder **app** will be created/overridden. It contains now the compiled (to html/js) and concatenated (all js) files from **src_app, bower_components and lib**.

### 3: run the app

Run the web server with the _serve_ task. To start it from terminal, type:

```
gulp serve
```

This will serve `app/index.html`. You can access the app in your browser now on `localhost:3000`.

---

Congratulation! You are now familiar with the technology to work on modern web applications :) (Says me in 2016. Maybe outdated after 2 years)

## App Architechture
 
 ```
 virttruhe/
 ├── app/ ( built app for preview, completely created by gulp )
 │    ├── data/
 │    │    └── ( audio, img, json )
 │    ├── js/
 │    │    └── main.js ( concatenated scripts )
 │    ├── style/
 │    │    └── main.css ( compiled & concatenated sass files )
 │    └── index.html ( compiled index.jade )
 │
 ├── concept/
 │    └── ( sketches, notes, designs, etc... )
 │
 ├── src_app/ ( development directory )
 │    ├── .tmp/ (riot tags get compiled into here)
 │    │
 │    ├── data/
 │    │    └── ( audio, img, json / data )
 │    │
 │    ├── modules/ (pages/riot tags, js)
 │    │    ├── sample_module/
 │    │    │    ├── sample-module-model.js (model with logic)
 │    │    │    ├── sample-module-service.js (object with service functions, e.g. fetch data)
 │    │    │    └── sample-module.tag ( riot.js tag, template + controller )
 │    │    ├── app.js ( root js file )
 │    │    └── routes.js (manage url/page states)
 │    │
 │    ├── style/
 │    │    ├── _sample-module.sass
 │    │    └── main.sass
 │    │
 │    ├── favicon.ico
 │    └── index.jade ... (renamed to .pug)
 │
 ├── ( some config files )
 ├── gulpfile.js ( config for the build tasks )
 ├── package.json ( metadata for the app )
 └── README.md ( this description file )
 ```


 ## License

 ### MIT License

 Copyright (c) 2016 Ruben La Biunda

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
