# FOR THE HOOOORDE
## This is my basic grunt setup for front end development

First of all: Feel free to open issues, ask questions and tinker with the code to your likes.

May this repo be useful for each and everyone around the world. I have commented on as much as possible and as little as I hope was needed to keep the files from being a comment-mess with no real content.

The name "For the horde" stems from the basic orcish fighting unit in Warcraft 3, screaming upon the attack command being given:"[FOR THE HORDE!](https://youtu.be/yswGnzDazdY?t=14s)". As it is, this unit is named "[Grunt](http://classic.battle.net/war3/orc/units/grunt.shtml)".

## How to use

Clone this repository to your computer (or fork first, then clone) and run `npm install` after cd'ing into the directory created. It will create the node_modules directory and install all needed tasks for the grunt workflow to commence.

When looking through the gruntfile and any other assets around the project repo, you'll run into the word `projectname` pretty often. This is thought to be a placeholder for whatever the project you're working on may be, so feel free to replace it with any word you come up with – or what the project at hand suggests.

As there's **no license**, there's also **no warranty**, **no support** (apart from me answering questions whenever I can), **no money** involved and whatever you do, **handle with care**. I'm not perfect and while all of this works for me, it might not for you without changing things

## Changelog

**Update (19.09.2016):** After adjusting here and there, the ServiceWorker is now working. Heureka. Just make sure to use it with care and learn _how_ to use it before deploying it. There are a ton of resources on the matter; have some I can recommend:

- [Lyza Danger Gardner's pragmatist Service Worker](https://github.com/lyzadanger/pragmatist-service-worker)
- [Lyza's Case-Study on Service Worker](https://www.smashingmagazine.com/2016/02/making-a-service-worker/)
- [Serviceworke.rs by Mozilla and contributors](https://serviceworke.rs/)
- [Jake Archibald's blog is a goldmine](https://jakearchibald.com/)
- [Free Udacity Course by and with Jake Archibald](https://www.udacity.com/course/offline-web-applications--ud899)
- [HTML5 Rocks Introduction to ServiceWorkers (Outdated but good for a starting point)](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)

I also added the loadCSS script and the [preload](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/) polyfill to the unminified `index.html` file. As I'll be using preload anyways, I will add in the polyfill and loadCSS no matter what.

While being on the matter of updating I kicked good ol' autoprefixer and replaced it with postCSS and its plugins "autoprefixer" and "cssnano". Setup is done with. By doing so I got rid of the CSSlinting task for now. I didn't see the point apart from telling others how I write my CSS in a pretty obtrusive way: as soon as you diverged from my favorite CSS syntax, you'd get an error in Terminal… didn't feel quite right. I'll have to think of something else.

As I added in a few scripts now, which I only need minified and not concatenated, I added an `ugly2production` task to the grunt workflow. That way all JS files in `uncompressed-js` have their whitespace trimmed (nothing else) and then be put directly into the `js` folder.

––––

**HUGE Update (16.09.2016):** I added in a bit of my current knowledge about [Service Worker](https://jakearchibald.github.io/isserviceworkerready/). Will add any additional knowledge as soon as it hits my brain and got digested. Please don't take it as it is right now, as it will not work as you might expect it to.

Just so you know what is what:

- peon.js: this is the serviceworker, named after [the orcish worker-unit](http://classic.battle.net/war3/orc/units/peon.shtml) in Warcraft
- cachefiles.json: list of files to be cached by the serviceworker
- manifest.json: provides meta-data about the project so it can be turned into a progressive web app
- uncompressed-js/peon-register.js: registerscript for the serviceworker
- uncompressed-js/peon-unregister.js: unregisterscript for the serviceworker (naming conventions are great, right?)

So, how does the Serviceworker do its magic? Content updates will be recognized as the worker looks over the network for content updates first and then goes to the cache storage. Images and other assets will require the worker to be updated or the version of the asset to be bumped. If all goes wrong we'll deliver the offline page and contents we defined (if we did so).

Also I added in a polyfill for the `rel="preload"` link tag so older browsers understand what's going on here. On top of that I added loadCSS, onloadCSS and loadJS in order to have all asynchronously loaded assets for my project.

Nextup: cleanup, further setup of the serviceworker et al, updating the gruntfile and package.json

––––

**Update (31.05.2016):** End of May 2016 already and all I got is a tiny update on "Resource Hinting" in the `<head>` section of my HTML file. Yet, what an update it is indeed. `preload` landed browser support and the one for `preconnect` got much better than the last time I checked. Also removed the part with `subresource` as it might come in handy at some point but I haven't found it yet.

**Update (16.10.2015):** I added some placeholder `<link>` elements in the `<head>` section of my unminified HTML file with different _rel-attributes_ on them. I'll explain in the comments next to those `<link>` elements what they do and why it's helpful to have them and how not to overdo it with those. As there's only so much space, here's a link to a [Slidedeck](https://docs.google.com/presentation/d/18zlAdKAxnc51y_kj-6sWLmnjl6TLnaru_WH0LJTjP-o/present#slide=id.p19) by [Ilya Grigorik](https://github.com/igrigorik) explaining the whole concept in more detail.

**Update (04.05.2015):** Got rid of unneeded projectfiles, which will be generated as soon as one is working with this Grunt setup. I also <del>added jshint to the workflow and</del> enhanced the uglify task with a beautify task, so I can have both mangled and compressed production-ready files but also beautified JavaScript for debugging purposes. Realized I forgot about some commas and added them as well. Mea Culpa.

After killing different files some folders remained empty thus I added a few `.gitkeep files in there. Kill them or leave them or gitignore them – whatever suits you best.

<del>The `.jshintignore` file ignores all node_modules.</del> <ins>jshinting went out the window.</ins>

Lowered the compression level for pngquant. Will have to think of a better option to work on PNG files or may be completely switch to a different Plug-In (TinyPNG looks promising).

I hope I was able to fix a few bugs without introducing new ones.

**Update (24.02.2015):** Had to take care of my indentation and also of the generated index.html file being filled. Makes more sense to leave that empty and to only write stuff in the HTML files inside the *_unminified-html_ folder.

**Update (24.09.2014):** While I was already on it I added two new tasks to the Grunt workflow and a new dotfile entered the arena as well. Check it out. May it be useful to you.

**Update (23.09.2014):** As I have not come around updating the repo until yesterday since my last deploy in... errr... well... long ago... I have to update the readme, now, as well.

––––

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
- [htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin)
- [less](https://github.com/gruntjs/grunt-contrib-less)
- [postcss](https://github.com/nDmitry/grunt-postcss)
- [concat](https://github.com/gruntjs/grunt-contrib-concat)
- [uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)
- [watch](https://github.com/gruntjs/grunt-contrib-watch)

### LESStoCSS

Here my (new) workflow for working with less:

I separated the critical CSS from the main stylesheet and also extracted the print-styles from it, too. As I did that manually before, I thought I'd come up with a new setup, hence the update yesterday (22.09.2014).

1. Inside the `less` directory are three directories, where each is related to a different stylesheet. `atf` is short for _"above-the-fold"_ and contains all less files connected with the critical CSS part of my website, which is the inlined in the head section of the html file. `main` contains all less files for our main stylesheet, which will be loaded after the content has rendered. `print`, as the name suggests it, contains all files for the print stylesheet (also being loaded after the page is done loading). The fourth folder contains files being distributed to all three stylesheets. There we have our variables and mixins set up in order to use them in the other stylesheet. Currently there are only three files but may be you have even better ideas what to do inside that folder. `variables.less` is by its name pretty straight-forward: put color-, length- and other variables in there you want to use later on or do math with or whatever suits you best (and if you don't want to use it, cool, kick it). `general-mixins.less` could contain prefixed stuff but as we're taking care of that with autoprefixer (and grunt) you might have to think of other use-cases; I'm sure you'll find some or can think of at least something. `font-mixins.less` exists as I like to separate font-stuff from my other assets slightly but that's also something very personal, it's up to you if you want to go down that road with me.
2. All LESS-files have `-projectname.less` as an ending, with a suffix to separate them related to their purpose. `-projectname-atf.less` for _above-the-fold_ styles, `-projectname-main.less` for the main stylesheet and `-projectname-print.less` for, quelle surprise, the print styles.
3. I create unminified and unprefixed `projectname-suffix.css` files inside the LESS-folder for each of the three stylesheets
4. Then I run *postCSS* with its autoprefixer plugin (which saves me from writing mixins for vendor-prefix madness and a few kilobytes here and there as I only support browsers 3 versions back and those with at least 1% market-share) and add all prefixes to `projectname-suffix.css` and push them into the CSS folder
5. Finally the minified `projectname.suffix.min.css` files are created by cssnano (another plugin of postCSS) inside the `css` directory

The good thing here comes with the _watch-task_ making every saved change into a working development file and a minified production version of it.

In case you were to prefer [Sass](https://github.com/gruntjs/grunt-contrib-sass) or [Stylus](https://github.com/gruntjs/grunt-contrib-stylus), then go ahead and kill anything LESS-related and create your own setup with one of the other preprocessors/postprocessors.

### Javascript Workflow

Here comes the Javascript Workflow:

1. All Javascript files go into the `uncompressed-js` directory, uncompressed, unminified, ideally documented and commented and explained and whatever you should do in terms of _"This file does this and that because"_
2. They are then taken, concatenated and placed as `projectname.js` inside the `concatenated` directory
3. Following up comes the uglify task and creates `projectname.min.js` inside the `js` folder
4. Parallely they are concatenated and beautified and put in the `concatenated/beauty/` folder
5. Also there's a second uglify task (`uglify2production`) now, taking the separate files and trimming their whitespace before putting them into the production (`js`) folder without any concatenation going on.

Again, I'm only saving changes to the js-files inside `uncompressed-js` and let the *watch-task* do the hard work.

### Image Compression

That is quite an easy workflow. Place some PNG or JPEG file into the `raw` directory and the imagemin task will create a crunched version of the image inside the `images` directory.

This is handled by the *watch-task* as well, yet with one caveat: You will need to have at least on image inside the `raw` folder when using the imagemin task as a standalone tool. In the case of this project this rule can be ignored as the watch task has enough other stuff it can take a look after.

### The index.html

**What's first, first:** Find the unminified version inside the `unminified-html` directory.

**Apart from that:** This file is really only for me myself and I. Whether you might want to use it is completely up to you. Take a look around the head-section to see what's in there for you.

What should be noted is the part in the head section concerning the infamous favicon. Jonathan T. Neal pointed out in a [blogpost](http://www.jonathantneal.com/blog/understand-the-favicon/) how [incredibly awesome](https://twitter.com/nice2meatu/status/514045061425020928) (not) the favicon actually is. So, after reading his article about this matter I included his suggested way of cross-browser support for a favicon while maintaining a larger PNG version for retina-displays.

Another important note: I added a `<noscript>` to the head section as a fallback for our stylesheets (main and print stylesheet) being laoded with [loadCSS](https://github.com/filamentgroup/loadCSS/) AFTER the content has rendered (gotta love asynchronous CSS). So, if there will be no JavaScript, no developer will have to die that day.

If you want the HTML5 shiv included or not is completely up to you and depends on how far back you want to support IE. If IE8 is an option, then you should keep it and add a separated IE8-only stylesheet to the game (ideally also inside the conditional comment with the Shiv). Optionally you could as well throw respond.js at IE8 and feed it media-queries the hard way, whereas this is a bit problematic when your IE8 user turned JavaScript off. Just thinking out loud here… progressive enhancement et al.

You will find some scripts being added to the footer but they are minified. For the unminified version take a look inside the `unminified-js` directory. What they'll do: provide true asynchronous loading for your stylesheet(s) and polyfilling the [preload](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/) technique for non-supporting browsers.
