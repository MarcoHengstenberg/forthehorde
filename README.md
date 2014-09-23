# For the hooooorde
## This is my basic grunt setup for front end development

First of all: Feel free to open issues, ask questions and tinker with the code to your likes. There is no license whatsoever I added to the game apart from the "Do whatever the f*** you want" license.

May this repo be useful for each and everyone around the world. I have commented on as much as possible and as little as I hope was needed to keep the files from being a comment-mess with no real content.

**Update (23.09.2014):** As I have not come around updating the repo until yesterday since my last deploy in... errr... well... long ago... I have to update the readme, now, as well.

### What's in this for me

**Table of Contents:**

- [Grunt](#grunt)
- [LESStoCSS Workflow](#lesstocss)
- [Javascript Workflow](#javascript-workflow)
- [Image Compression](#image-compression)
- [The Index.html](#the-indexhtml)

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

Here my (new) workflow for working with less:

I separated the critical CSS from the main stylesheet and also extracted the print-styles from it, too. As I did that manually before, I thought I'd come up with a new setup, hence the update yesterday (22.09.2014).

1. Inside the `less` directory are three directories, where each is related to a different stylesheet. `atf` is short for _"above-the-fold"_ and contains all less files connected with the critical CSS part of my website, which is the inlined in the head section of the html file. `main` contains all less files for our main stylesheet, which will be loaded after the content has rendered. `print`, as the name suggests it, contains all files for the print stylesheet (also being loaded after the page is done loading).
2. All LESS-files have `-projectname.less` as an ending, with a suffix to separate them related to their purpose. `-projectname-atf.less` for _above-the-fold_ styles, `-projectname-main.less` for the main stylesheet and `-projectname-print.less` for, quelle surprise, the print styles.
3. I create unminified and unprefixed `projectname-suffix.css` files inside the LESS-folder for each of the three stylesheets
4. Then I run *autoprefixer* (which saves me from writing mixins for vendor-prefix madness and a few kilobytes here and there as I only support browsers 3 versions back and those with at least 1% market-share) and add all prefixes to `projectname-suffix.css` and push them into the CSS folder
5. Finally the minified `projectname.suffix.min.css` files are created inside the `css` directory

The good thing here comes with the _watch-task_ making every saved change into a working development file and a minified production version of it.

### Javascript Workflow

Here comes the Javascript Workflow:

1. All Javascript files go into the `uncompressed-js` directory, uncompressed, unminified, ideally documented and commented and explained and whatever you should do in terms of _"This file does this and that because"_
2. They are then taken, concatenated and placed as `projectname.js` inside the `concatenated` directory
3. Following up comes the uglify task and creates `projectname.min.js` inside the `js` folder

Again, I'm only saving changes to the js-files inside `uncompressed-js` and let the *watch-task* do the hard work.

### Image Compression

That is quite an easy workflow. Place some PNG or JPEG file into the `raw` directory and the imagemin task will create a crunched version of the image inside the `images` directory.

This is handled by the *watch-task* as well, yet with one caveat: You will need to have at least on image inside the `raw` folder when using the imagemin task as a standalone tool. In the case of this project this rule can be ignored as the watch task has enough other stuff it can take a look after.

### The index.html

This is really only for me myself and I. Whether you might want to use it is completely up to you. Take a look around the head-section to see what's in there for you.

What should be noted is the part in the head section concerning the infamous favicon. Jonathan T. Neal pointed out in a [blogpost](http://www.jonathantneal.com/blog/understand-the-favicon/) how [incredibly awesome](https://twitter.com/nice2meatu/status/514045061425020928) (not) the favicon actually is. So, after reading his article about this matter I included his suggested way of cross-browser support for a favicon while maintaining a larger PNG version for retina-displays.

Another important note: I added a `<noscript>` to the head section as a fallback for our stylesheets (main and print stylesheet) being laoded with JavaScript AFTER the content has rendered. So, if there will be no JavaScript, no developer will have to die that day.

If you want the HTML5 shiv included or not is completely up to you and depends on how far back you want to support IE. If IE8 is an option, then you should keep it and add a separated IE8-only stylesheet to the game (ideally also inside the conditional comment with the Shiv). Optionally you could as well throw respond.js at IE8 and feed it media-queries the hard way, whereas this is a bit problematic when your IE8 user turned JavaScript off... but then he shouldn't be on the internet anyways, right? \*jk\*