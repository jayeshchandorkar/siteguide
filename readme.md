# Site Guide

Site Guide is the easiest way to show people how to use your website.

* Great way to introduce people to the website.
* Easy to use way of creating tours without any technical knowledge.
* Zero coding required to plug-in this feature in any product of your choice.
* A real time admin app to view, discuss and edit the tours that were created.


### Version
1.0.0 Alpha

### Tech

Site Guide uses a number of open source projects to make this application awesome.

* [Meteor] - The JavaScript App Platform for fast development
* [MongoDB] - For database
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [Bootstrap Tour] - The easiest way to show people how to use your website. 
* [RESTIVUS]- Create authenticated REST APIs in Meteor and Setup CRUD endpoints for Collections.
* [HTML2CANVAS]- To create the CANVAS of DOM.
* [jQuery] - Manipulate the DOM using CSS selectors.
* [MomentJS] -Moment.js, a JavaScript date library for parsing, validating, manipulating, and formatting dates.

### Architecture
There are two portions of the solution.  
 1.Client lib to be included in the target product.     
 2.Admin App where the DB, Rest services and adminstraion web app is deployed.
 
 The client lib is mainly uses html2canvas, jQuery and boostrap tour to show and create the tours created by this solution.The tour that is created is send to the app server over a rest call.
 
 The Server app is made using meteor.js. REST services to save and fetch the tours created are created using a plugin called Restivus which store the data in mongo collections exposed by meteor.js.
 Also a realtime webapp is created using Meteor.js.
 
 

### Installation
Download meteor for the intended OS www.meteo.com .Clone the repository and run the below commands from scrumit directory.

```
$ meteor update 
```

```
$ meteor  
```

For the client application make sure all the files in TourClient are included in the target product.
  
## Tips
If you are running behind the proxy have a look at the setConfig.bat file.  
There are two sample products checked Scrumit (Meteor based app) and a SunGard HTML5 framework project that can used to test this application.


##Cool factor 
* A bettter way of introducing potential users to the products without the need of personal session, long videos and boring documentations.
* Zero coding required to create tour for the whole application.
* Seamless integration with any product with minimal to Zero coding (Products using HTML5)
* A Real time app to discuss and make changes to tours created without any changes in the website.

