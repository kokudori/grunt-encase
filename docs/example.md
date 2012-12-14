#Example config
---
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
    
    grunt.registerTask('default', 'wrap');
