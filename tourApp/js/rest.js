
  // That's it for a typical collection!


  Tours = new Mongo.Collection('tours');
  Products = new Mongo.Collection('products');
  if(Meteor.isServer) {


   Meteor.startup(function () {
    // Global configuration
    Restivus.configure({
      useAuth: false,
      prettyJson: true
    });



    Restivus.addRoute('tours', {authRequired: false}, {
     get: function () {
      recompute();
      return {status: 'success', data: Tours.find({}).fetch()};
    },
    post:  {
     action: function () {
      console.log("Inserting data")
      var data = this.bodyParams;
      data.editedOn = new Date();
      Tours.insert(this.bodyParams);
      recompute();
      return {status: 'success', data: this.bodyParams};
    }
  }
});


    Restivus.addRoute('tourByScreen', {authRequired: false}, {

     post:  {

       action: function () {
         recompute();
         var tour = Tours.findOne(this.bodyParams,{sort:{editedOn: -1}});
         if (tour) {
          return {status: 'success', data: tour};
        }else {
         return {status: 'fail'};
      }


    }
  }
});



  });




 }


 function recompute() {
  var tour = Tours.find({}).fetch();
  console.log(tour);
  var products = [];

  for (var i = tour.length - 1; i >= 0; i--) {
    if(products.indexOf(tour[i].product)  == -1 && tour[i].product != undefined) {
      products.push(tour[i].product)
    }
  }

  var productList = [];
  Products.remove({});
  for (var i = products.length - 1; i >= 0; i--) {
    var count = getScreenCount( products[i])
   Products.insert({product : products[i] , count : count})
 }
}

function getScreenCount(productName){

    var screenNames = [];
    var pages = [];
    var count = 0;

    var screens = Tours.find({product : productName}).fetch();
    for (var i = screens.length - 1; i >= 0; i--) {
      if(screenNames.indexOf(screens[i].screen)  == -1 && screens[i].screen != undefined) {
          count++;
        screenNames.push(screens[i].screen)
        pages.push( {'screen' : screens[i].screen, 'editedBy': screens[i].editedBy, editedOn : screens[i].editedOn })
      }
    }
   // item.count = count;

    return count;
  }




