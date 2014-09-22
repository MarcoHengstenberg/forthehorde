/**
 * Appended loading of the print stylesheet
 * Version: 1.0
 * Author: Marco Kunz
 *
 */
var pcss = document.createElement('link');
pcss.type = 'text/css';
pcss.rel = 'stylesheet';
pcss.href = '../css/projectname.main.min.css';
pcss.media = 'screen';
document.getElementsByTagName("head")[0].appendChild(pcss);