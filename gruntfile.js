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

				src: ['unminified-html/*.html'] // check all HTML files in this directory
			}
		},

		// HTML Minification Block
		htmlmin: {
			// mumin stands for "Markup Minification"
			mumin: {
				options: {
					collapseWhitespace: true, // yes, we want exactly that
					preserveLineBreaks: true, // safety first, can be removed later
					removeComments: true, // this is already optional but I like it that way
					keepClosingSlash: true // this is something I always do and want to keep
				},

				files: {
					'unminified-html/*.html' : '*.html' // minify HTML files in this directory and place them in the root
				}
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
					'less/projectname-atf.css' : 'less/atf/combined-projectname-atf.less' // create the "above-the-fold" Stylesheet
				}
			},

			main: { // Main CSS-File
				options: {
					paths: ['less/main/'], // watch this folder
					report: true // report in the terminal what you did
				},

				files: {
					'less/projectname-main.css' : 'less/main/combined-projectname-main.less' // create the main Stylesheet
				}
			},

			print: {
				options: {
					paths: ['less/print/'], // watch this folder
					report: true // tell me what happened
				},

				files: {
					'less/projectname-print.css' : 'less/print/combined-projectname-print.less' // create a Print Stylesheet
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
					'css/projectname-atf.css' : 'less/projectname-atf.css'
				}
			},

			main: {
				options: {
					browsers: ['last 3 versions', '> 1%']
				},

				files: {
					'css/projectname-main.css' : 'less/projectname-main.css'
				}
			},

			print: {
				options: {
					browsers: ['last 3 versions', '> 1%']
				},

				files: {
					'css/projectname-print.css' : 'less/projectname-print.css'
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
		},

		print: {
			src: 'css/projectname-print.css',
			dest: 'css/projectname.print.min.css'
		}
	},

	// CSS Linting Block
	csslint: {

		// Options on what throws a warning can be found in the dotfile
		options: {
			csslintrc: '.csslintrc'
		},

		atf: {
			src: 'css/projectname.atf.min.css'
		},

		main: {
			src: 'css/projectname.main.min.css'
		},

		print: {
			src: 'css/projectname.print.min.css'
		}
	},

	// Javascript Concatenation Block
	concat: {
		options: {
			separator: ';' // separate all our scripts with semicolons
		},

		dist: {
			src: ['uncompressed-js/*.js'], // take all scripts from this folder
			dest: 'concatenated/projectname.js' // concatenate them into one and put it here
		}
	},

	// Javascript Uglification Block
	uglify: {
		options: {
			screwIE8: true
		},

		beauty: {
			options: {
				beautify: {
					width: 75,
					beautify: true
				},

				mangle: false
			},

			files: {
				'concatenated/beauty/projectname.beauty.js': 'concatenated/projectname.js'
			}
		},

		ugly: {
			files: {
				'js/projectname.min.js': 'concatenated/projectname.js'
			}
		}
	},

	// Javascript Hinting Block
	jshint: {
		options: {
			jshintrc: '.jslintrc'
		},

		afterconcat: ['concatenated/projectname.js'],
		afteruglify: ['js/projectname.min.js']
	},

	// Image Compression Block
	imagemin: {
		png: {
			options: {
				optimizationLevel: 2 // compression level
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
			files: ['unminified-html/*.html'], // watch all html-files for changes
			tasks: ['htmlhint'] // when changes -> do lint
		},

		mumin: {
			files: ['unminified-html/*.html'], // watch all html-files for changes
			tasks: ['mumin'] // when changes -> do minify
		},

		atf: {
			files: ['less/atf/*.less'], // watch all .less files for the above-the-fold CSS for changes
			tasks: ['lessy-atf'] // when changes -> do all defined tasks (see grunt.registerTask 'lessy-atf')
		},

		main: {
			files: ['less/main/*.less'], // watch all .less files for the main CSS for changes
			tasks: ['lessy-main'] // when changes -> do all defined tasks (see grunt.registerTask 'lessy-main')
		},

		print: {
			files: ['less/print/*.less'], // watch all .less files for the print CSS for changes
			tasks: ['lessy-print'] // when changes -> do all defined tasks (see grunt.registerTask 'lessy-print')
		},

		jayessy-beauty: {
			files: ['uncompressed-js/*.js'], // watch all separated and unminified js files for changes
			tasks: ['jayessy-beauty'] // when changes -> do all defined tasks
		},

		jayessy-ugly: {
			files: ['uncompressed-js/*.js'], // watch all separated and unminified js files for changes
			tasks: ['jayessy-ugly'] // when changes -> do all defined tasks
		},

		imagemin: {
			files: ['raw/*.jpg', 'raw/*.png'], // watch for images with those extensions being put into the raw folder
			tasks: ['imageminify'] // new images -> do task
		}
	}
});

grunt.registerTask('default', []);
grunt.registerTask('mumin', ['htmlmin']);
grunt.registerTask('lessy-atf', ['less:atf', 'autoprefixer:atf', 'cssmin:atf', 'csslint:atf']);
grunt.registerTask('lessy-main', ['less:main', 'autoprefixer:main', 'cssmin:main', 'csslint:main']);
grunt.registerTask('lessy-print', ['less:print', 'autoprefixer:print', 'cssmin:print', 'csslint:print']);
grunt.registerTask('jayessy-beauty', ['concat', 'jshint:afterconcat', 'uglify:beauty', 'jshint:afteruglify']);
grunt.registerTask('jayessy-ugly', ['concat', 'jshint:afterconcat', 'uglify:ugly', 'jshint:afteruglify']);
grunt.registerTask('imageminify', ['imagemin']); // giving both the same name causes issues
}