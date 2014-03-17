# For the hooooorde
## This is my basic grunt setup for front end development

May it be useful for each and everyone around the world. I have commented on as much as possible and as few as I hope was needed to keep the files from being a comment-mess with no real content.

### What's in this for me

**Table of Contents:**

- [Grunt](#Grunt)
- [LESStoCSS Workflow](#LESStoCSS-Workflow)
- [Javascript Workflow](#Javascript-Workflow)
- [Image Compression](#Image-Compression)
- [The Index.html](#The-Index.html)

### Grunt

I'm using *[Grunt](http://gruntjs.com)* with the following tasks:

- [htmlhint](https://github.com/yaniswang/grunt-htmlhint)
- [less](https://github.com/gruntjs/grunt-contrib-less)
- [autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)
- [cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
- [concat](https://github.com/gruntjs/grunt-contrib-concat)
- [uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)
- [watch](https://github.com/gruntjs/grunt-contrib-watch)

### LESStoCSS

Here my workflow for working with less:

1. All LESS-files are inside the `less` directory and all `@import` goes into the `combined-projectname.less` file
2. All LESS-files have `-projectname.less` as an ending
3. I create an unminified and unprefixed `projectname.css` file inside the CSS-folder
4. Then I run *autoprefixer* (which saves me from writing mixins for vendor-prefix madness and a few kilobytes here and there as I only support browsers 3 versions back) and add all prefixes to `projectname.css`
5. Finally the minified `projectname.min.css` is created also inside the `css` directory

The good thing here comes with the *watch-task* making every saved change into a working development file and a minified production version of it.

### Javascript Workflow

Here comes the Javascript Workflow:

1. All Javascript files go into the `uncompressed-js` directory
2. They are then taken, concatenated and placed as `projectname.js` inside the `concatenated` directory
3. Following up comes the uglify task and creates `projectname.min.js` inside the `js` folder

Again, I'm only saving changes to the js-files inside `uncompressed-js` and let the *watch-task* do the hard work.

### Image Compression

That is quite an easy workflow. Place some PNG or JPEG file into the `raw` directory and the imagemin task will create a crunched version of the image inside the `images` directory.

This is handled by the *watch-task* as well, yet with one caveat: You will need to have at least on image inside the `raw` folder when using the imagemin task as a standalone tool. In the case of this project this rule can be ignored as the watch task has enough other stuff it can take a look after.

### The index.html

This is really only for me myself and I. Whether you might want to use it is completely up to you. Take a look around the head-section to see what's in there for you.