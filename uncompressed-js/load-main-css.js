/**
 * Appended loading of the main stylesheet
 * Version: 1.0
 * Author: Marco Kunz
 *
 */
var mcss = document.createElement('link');
mcss.type = 'text/css';
mcss.rel = 'stylesheet';
mcss.href = '../css/projectname.main.min.css';
mcss.media = 'screen';
document.getElementsByTagName("head")[0].appendChild(mcss);