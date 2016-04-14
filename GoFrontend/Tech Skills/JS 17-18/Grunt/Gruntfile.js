module.exports = function(grunt) {
	grunt.initConfig({

		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [
					'js/jquery.mycarousel.js',
					'js/template.js', 
					'js/script.js'
				],
				dest: 'js/script.main.js',
			},
		},

		cssmin: {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      'css/style.min.css': ['css/reset.css', 'css/mycarousel.css', 'css/style.css']
		    }
		  }
		},

		uglify: {
			my_target: {
				files: {
					'js/script.main.min.js': 
				[
					'js/jquery.mycarousel.js',
					'js/template.js', 
					'js/script.js'
				]
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['concat', 'uglify']);
	grunt.registerTask('conug', ['cssmin', 'uglify']);

};//module.exports