/**
 * Created by: Terrence C. Watson
 * Date: 3/25/14
 * Time: 10:26 PM
 */
module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    //karma: {
      mochaTest: {
        unit: {
          options: {
            reporter: 'spec'
          },
          src: ['test/unit/**/*.js'],
          files: {
            rootDirectory: '../../../'
          }
        }
      }
    //}
  });
  grunt.registerTask('test:unit', ['mochaTest:unit']);
};