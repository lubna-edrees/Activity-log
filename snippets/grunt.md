# Grunt

- `task runners` : simplfiy the pre-proccesses of deployment: `grunt` `gulp`.
- `grunt`: - `npm i grunt` - touch `Gruntfile.js` - npm i `grunt-contrib-less` `time-grunt` `jit-grunt` - npm i `grunt-contrib-watch` `grunt-browser-sync` - simple grunt file for watching and compieling `.less` files:

      ```javascript
      module.exports = function (grunt) {
        // Time how long tasks take. Can help when optimizing build times
        require("time-grunt")(grunt);

        // Automatically load required Grunt tasks
        require("jit-grunt")(grunt);

        // Define the configuration for all the tasks
        grunt.initConfig({
          less: {
            css: {
              files: {
                "css/styles.css": "css/styles.less",
              },
            },
          },
          watch: {
            files: "css/*.less",
            tasks: ["less"],
          },
          browserSync: {
            dev: {
              bsFiles: {
                src: ["css/*.css", "*.html", "js/*.js"],
              },
              options: {
                watchTask: true,
                server: {
                  baseDir: "./",
                },
              },
            },
          },
        });

        grunt.registerTask("css", ["less"]);
        grunt.registerTask("default", ["browserSync", "watch"]);
      };
      ```

- Grunt:
  - at the `cmd`: `grunt less` => All `.less` files compiling into css.
  - at the `cmd`: `grunt` => watching and compiling automatically
  - for pre-deploy process we need: - `grunt-contrib-copy`: copying files to `dist` folder.
  - `grunt-contrib-clean`: clean `dist` each time before run `build`
  - `grunt-contrib-imagemin` : minimizing images. - `grunt-contrib-concat` : concat files. - `grunt-contrib-cssmin`: min css.
  - `grunt-contrib-htmlmin` : min html.
  - `grunt-contrib-uglify`: min js.
  - `grunt-filerev`. - `grunt-usemin`: use all min files.
- Best resource for Grunt : <https://www.coursera.org/learn/bootstrap-4/supplement/SIHkS/exercise-instructions-grunt-part-2>
