module.exports = function(grunt) {
		grunt.registerTask('install', 'install the backend and frontend dependencies', function() {
				var exec = require('child_process').exec;
				var cb = this.async();
				exec('bower install', {cwd: './client'}, function(err, stdout, stderr) {
						console.log(stdout);
						cb();
				});
		});
};