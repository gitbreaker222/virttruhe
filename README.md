# VIRTTRUHE
## Experimental game to explore the border between physical and virtual space. A playground for augmented reality (or maybe augmented virtuality)

(insert fancy image here)

This repository is in sequel to the old ["VIRTTRUHE HTML5 App"](https://github.com/gitbreaker222/virttruhe_html5_app), to give it a clean start and making it more scalable.

## Getting started

As long as there is no installer script, you need to:
 - install the dependencies for the build task (1)
 - run the the build task (2)
 - run the index.html from the new app folder (3)

 ### 1: installing dependecies

 I think this can be done from project directory via terminal with:
 ```
 npm install --dev
 ```
 It should create a folder _node_modules_ with the packages listed in _package.json_. At the time of writing:
 ```json
 "devDependencies": {
     "coffee-script": "^1.10.0",
     "del": "^2.2.0",
     "gulp": "^3.9.1",
     "gulp-coffee": "^2.3.2",
     "gulp-jade": "^1.1.0",
     "gulp-sass": "^2.2.0",
     "gulp-util": "^3.0.7",
     "jade": "^1.11.0",
     "run-sequence": "^1.1.5",
     "sass": "^0.5.0"
   }
 ```

 ### 2: run the build task

 Run ```gulp``` in the terminal to trigger the _gulp default_ task. An IDE like Webstorm shows these tasks usually on the left. You can also run the _default_ task from there.

  A new folder **app** will be created with all compiled files from **src_app**.

 ### 3: run index.html

 In the new folder its best to use an IDE to lauch the _index.html_, so it runs in a webserver.

 ## License

 ### MIT License

 Copyright (c) 2016 Ruben La Biunda

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
