// gruntfile.js
module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// HTML Hint Block
		htmlhint: {
	    build: {
        options: {
          'tag-pair': true, // always watch for matching end-tags
          'tagname-lowercase': true, // lowercase for tagnames
          'attr-lowercase': true, // lowercase for attributes
          'attr-value-double-quotes': true, // double quotationmarks for attributes
          'doctype-first': true, // Check for a doctype
          'spec-char-escape': true, // Check for unescaped special characters
          'id-unique': true, // Check for unique IDs, not unique -> kickbandie
          'head-script-disabled': true, // Scripts go to the footer

          /* We are not looking for style in our head as we
             need that for the critical CSS part. */

        },
        src: ['*.html'] // check all HTML files
	    }
		},

		// LESS to CSS Block
		less: {
			atf: { // above the fold CSS
				options: {
					paths: ['less/atf/'], // watch this folder
					report: true // report in the terminal what you did
				},

				files: {
					'less/projectname-atf.css' : 'less/atf/combined-projectname-atf.less' // create a css file out of the given less file
				}
			},

			main: { // Main CSS-File
				options: {
					paths: ['less/main/'], // watch this folder
					report: true // report in the terminal what you did
				},

				files: {
					'less/projectname-main.css' : 'less/main/combined-projectname-main.less' // create a css file out of the given less file
				}
			}
		},

		// Autoprefixer Block
		autoprefixer: {
			atf: {
				options: {
					browsers: ['last 3 versions', '> 1%']
				},

				files: {
					'less/projectname-atf.css' : 'css/projectname-atf.css'
				}
			},

			main: {
				options: {
					browsers: ['last 3 versions', '> 1%']
				},

				files: {
					'less/projectname-main.css' : 'css/projectname-main.css'
				}
			}
		},

		// CSS Minifier Block
		cssmin: {
			atf: {
				src: 'css/projectname-atf.css',
				dest: 'css/projectname.atf.min.css'
			},

			main: {
				src: 'css/projectname-main.css',
				dest: 'css/projectname.main.min.css'
			}
		},

		// Javascript Concatenation Block
		concat: {
			options: {
				separator: ';', // separate all our scripts with semicolons
			},

			dist: {
				src: ['uncompressed-js/*.js'], // take all scripts from this folder
				dest: 'concatenated/projectname.js' // concatenate them into one and put it here
			}
		},

		// Javascript Uglification Block
		uglify: {
			my_target: {
				files: {
					'js/projectname.min.js': 'concatenated/projectname.js'
				}
			}
		},

		// Image Compression Block
		imagemin: {
			png: {
				options: {
					optimizationLevel: 7 // compression level
				},

				files: [{
					expand: true, // Dynamic expansion of capabilities
					cwd: 'raw', // cwd = current working directory = where do we have the uncompressed images
					src: ['**/*.png'], // check for all png files in cwd
					dest: 'images', // put images into this directory after compression
					ext: '.png' // give them the extension .png
				}]
			},

			jpg: {
				options: {
					progressive: true // progressive conversion, compress that JPG
				},

				files: [{
					expand: true, // see for png
					cwd: 'raw',
					src: ['**/*.jpg'],
					dest: 'images',
					ext: '.jpg'
				}]
			}
		},

		// Watch Block
		watch: {

			options: {
        livereload: true,
    	},

			html: {
				files: ['index.html'], // watch index.html for changes
				tasks: ['htmlhint'] // when changes -> do task
			},

			atf: {
				files: ['less/atf/*.less'], // watch all .less files for the above-the-fold CSS for changes
				tasks: ['lessy-atf'] // when changes -> do all defined tasks (see grunt.registerTask 'lessy-atf')
			},

			main: {
				files: ['less/main/*.less'], // watch all .less files for the main CSS for changes
				tasks: ['lessy-main'] // when changes -> do all defined tasks (see grunt.registerTask 'lessy-main')
			}

			js: {
				files: ['uncompressed-js/*.js'], // watch all separated and unminified js files for changes
				tasks: ['jayessy'] // when changes -> do all defined tasks
			},

			imagemin: {
				files: ['raw/*.jpg', 'raw/*.png'], // watch for images with those extensions being put into the raw folder
				tasks: ['imageminify'] // new images -> do task
			}
		}


	});

	grunt.registerTask('default', []);
	grunt.registerTask('lessy-atf', ['less:atf', 'autoprefixer:atf', 'cssmin:atf']);
	grunt.registerTask('lessy-main', ['less:main', 'autoprefixer:main', 'cssmin:main']);
	grunt.registerTask('jayessy', ['concat', 'uglify']);
	grunt.registerTask('imageminify', ['imagemin']); // giving both the same name causes issues
}