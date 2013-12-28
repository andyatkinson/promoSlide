module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
     index: "index.html"
    }
  });

  grunt.loadNpmTasks('grunt-contrib-qunit');
};
