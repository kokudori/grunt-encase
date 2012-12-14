# grunt-encase
Concat and encased in an anonymous function to export any variable.
Test every possible individual files and variables can be selected to be published at release file.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-encase`

Then add this line to your project's `grunt.js` gruntfile:

    grunt.loadNpmTasks('grunt-encase');

## Example

src1.js

    // Does not need to be wrapped in an anonymous function.
    var hoge = 'hogehoge';
    ...

src2.js

    // Does not need to be wrapped in an anonymous function.
    var piyo = 'piyopiyo';
    ...

dest.js

    (function() {
      // concat src1.js and src2.js
      var hoge = 'hogehoge';
      ...
      var piyo = 'piyopiyo';
      ...
      
      // export variable can select with option.
      module.exports = {hoge: hoge, piyo: piyo}; // if enviroment is 'browser', window = {...}
    })();


## Documentation
You'll need to install `grunt-encase` first:

    npm install grunt-encase

Then modify your `grunt.js` file by adding the following line:

    grunt.loadNpmTasks('grunt-encase');

Then add some configuration for the plugin like so:

    grunt.initConfig({
        ...
        grunt.initConfig({
          encase: {                         // Task
            develop: {                      // Target
              separator: '\n',             // Concat Separator
              enviroment: 'browser',   // Target Enviroment ('node' or 'browser')
              exports: ['hoge', 'piyo'],  // Export Variables (string expression or variable names array)
              src: 'src/*.js',               // source (string expression or filenames array)
              dest: 'dest/build.js'        // destination
            }
          }
        });
        ...
    });

Then just run `grunt encase` and enjoy!

## TODO
+ When enviroment is 'node', can select export method by option.  
    module.exports = {name: value} or module.exports = value. (first version now)
+ Minify option.

## Release History
0.0.1 - iniial release with a minimum feature

## License
Copyright (c) 2012 Kokudori
Licensed under the MIT license.