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

					/*
						We are not looking for style in our head as we
						need that for the critical CSS part. Also it might make sense
						to have scripts in your head… whyever… then remove the last line
						from the htmlhint-block.
					*/
				},

				src: ['unminified-html/*.html'] // check all HTML files in this directory
			}
		},

		// HTML Minification Block
		htmlmin: {
			// mumin stands for "MarkUp MINification"
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

		// PostCSS Block
		postcss: {
			options: {
				map: {
					inline: false, // saving sourcemaps as separate files
					annotation: 'css/maps/' // putting sourcemaps here
				},

				processors: [
					require('autoprefixer')({browsers: 'last 2 versions'}), // autoprefixer plugin with setting
					require('cssnano')() // cssnano = minifier for CSS
				]
			},

			dist: {
				src: 'less/*.css',
				dest: 'css/*.min.css'
			}
		},

		// Javascript Concatenation Block
		concat: {
			options: {
				separator: ';' // separate all our scripts with semicolons
			},

			dist: {
				src: ['uncompressed-js/*.js'], // take all scripts from this folder
				dest: 'concatenated/projectname.concat.js' // concatenate them into one and put it here
			}
		},

		// Javascript Uglification Block
		uglify: {
			// yeah, we don't support IE8 here in JS lands
			options: {
				screwIE8: true
			},

			// first of all I want to have a readable concatenated file
			beauty: {
				options: {
					// so we beautify
					beautify: {
						width: 75,
						beautify: true
					},

					// and we don't mangle
					mangle: false
				},

				files: {
					'concatenated/beauty/projectname.beauty.js': 'concatenated/projectname.concat.js'
				}
			},

			// uglyfying the concatenated JS file
			ugly: {
				// standard, no options, just compression and mangling the whole thing
				files: {
					'js/projectname.concat.min.js': 'concatenated/projectname.concat.js'
				}
			},

			// special task in order to minify each script on its own without concatenation
			// TO DO: currently throws an error after it has run, that the task cannot be found
			ugly2production: {
				// in this case it's only whitespace-trimming here
				options: {
					mangle: false,
					compress: false
				},

				files: [{
					expand: true,
					cwd: 'uncompressed-js',
					src: '*.js',
					dest: 'js/'
				}]
			}
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

			beauty: {
				files: ['uncompressed-js/*.js'], // watch all separated and unminified js files for changes
				tasks: ['jayessy-beauty'] // when changes -> do all defined tasks
			},

			ugly: {
				files: ['uncompressed-js/*.js'], // watch all separated and unminified js files for changes
				tasks: ['jayessy-ugly'] // when changes -> do all defined tasks
			},

			ugly2production: {
				files: ['uncompressed-js/*.js'],
				tasks: ['ugly2production']
			},

			imagemin: {
				files: ['raw/*.jpg', 'raw/*.png'], // watch for images with those extensions being put into the raw folder
				tasks: ['imageminify'] // new images -> do task
			}
		}
	});

	grunt.registerTask('default', []);
	grunt.registerTask('mumin', ['htmlmin']);
	grunt.registerTask('lessy-atf', ['less:atf', 'postcss']);
	grunt.registerTask('lessy-main', ['less:main', 'postcss']);
	grunt.registerTask('lessy-print', ['less:print', 'postcss']);
	grunt.registerTask('jayessy-beauty', ['concat', 'uglify:beauty']);
	grunt.registerTask('jayessy-ugly', ['concat', 'uglify:ugly']);
	grunt.registerTask('ugly2production', ['uglify:ugly2production']);
	grunt.registerTask('imageminify', ['imagemin']); // giving both the same name causes issues
}
