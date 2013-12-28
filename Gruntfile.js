module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      all: {
        options: {
          urls: ["http://localhost:8080/index.html"]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
};
