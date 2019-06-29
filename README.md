# Car Lords - The Site to Help You Get All the Info You Need for Your Next Car!

This was my final project in USC's ITP 301 Intro to Web Dev Class. Though it's not exactly what it was when I submitted it
(due to issues with the 3rd party libraries I was using at the time), I tried to keep things as close as I could. Its purpose
was as simple as any of my other projects, but ultimately an incredibly tough task -- Offer the user as much info about a particular
car model based on its year or any search terms he or she input.

## Description

Originally this site worked by using W3CSS in combination with the NoUISlider and Magnific PopUp jQuery Plugins to handle the design. Currently I'm using Bootstrap 4 to reproduce that original design. On the other hand, it used a combination of Javascript and jQuery to render various elements and components in an attempt to imitate Front-End Frameworks like React and Angular. By making requests to the Edmunds API (no longer available publically, so instead I saved a few requests to display the original functionality), I'd append the required HTML elements to existing components such as car makes into dropdown menus or replace existing components to display a different section of the site such as a list of articles related to a particular search term. I found it was ton of work to handle the HTML manipulation in vanilla JS and jQuery, and in retrospect, I wish I would have just learned React or Angular. Since then, I've spent a fair amount of time learning React, Angular 2+, and Vue.js, and realize just how valuable of an asset these frameworks would be for this project. Given their helpfulness, I'll likely switch the project over to Vue.js and refactor certain components into
reusable Vue.js components as well as look for a new API to source the articles and car information.

## Uses Github Pages

https://nlcaceres.github.io/carSearch-site
