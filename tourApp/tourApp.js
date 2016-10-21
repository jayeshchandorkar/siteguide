
Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {

   // var screens = [ {screen : "Welcome" , editedBy : 'Johnson', editedOn : '6/10/2015'},{screen : "About" ,  editedBy : 'Abhay' , editedOn : '6/10/2015'}]
   Session.set('pages', []);


   Template.messages.helpers({
    messages: function() {
      var tourObj = Session.get('selectedTourObj');
      var product = tourObj.product;
      var page = tourObj.screen;
      if (!product || !page){
        console.log('In No Data')
        return Messages.find({page :"nodata"}, { sort: { time: -1}});
      }

      console.log(product + "" +page);
    //  return Messages.find({prouct : product, page : page}, { sort: { time: -1}});
    return Messages.find({page : page,product : product }, { sort: { time: -1}});
  }
})

   Template.products.helpers({
    products: function() {
     return Products.find({});
   }
 });

   Template.products.events({
    'click': function() {
     console.log(this);
     console.log("You clicked something");
     $(".products").removeClass("active");
    // $(".pages").removeClass("active");
     $("#"+this.product).addClass("active");
     Session.set('selectedProduct', this);
     computeScreens(this);

   }
 });


   function computeScreens(item){
    var productName = item.product;
    var screenNames = [];

    var pages = [];

    var screens = Tours.find({product : productName}).fetch();
    for (var i = screens.length - 1; i >= 0; i--) {
      if(screenNames.indexOf(screens[i].screen)  == -1 && screens[i].screen != undefined) {
        screenNames.push(screens[i].screen)
        pages.push( {'screen' : screens[i].screen, 'editedBy': screens[i].editedBy, editedOn : screens[i].editedOn })
      }
    }
    console.log(pages);
    Session.set('pages', pages);
  }

  Template.screens.helpers({
    screens: function() {
     return Session.get('pages');
        //return  Tours.find({});
      }
    })



  Template.tourEdit.helpers({
    values: function() {
     return Session.get('selectedTour');
   }
 })

  Template.tourEdit.events({

    'click #delete': function() {

     var save = Session.get('selectedTourObj');

     $( "#tourDeleteAlert" ).fadeIn( 500 );
     console.log("delete called"+save._id);
     var result =  Tours.remove({_id : save._id});
     console.log("delete  result" + result);
     $( "#tourDeleteAlert" ).delay( 800 ).function(alert());
     $( "#tourDeleteAlert" ).delay( 800 ).fadeOut( 1000 );
     Session.set('selectedTourObj',{});
     Session.set('selectedTour', []);
     $(".products").removeClass("active");
     $(".pages").removeClass("active");
   },

   'click #save': function() {

    var save = Session.get('selectedTourObj');
    var tourLength = Session.get('selectedTour').length;
    save.title = "test";
    console.log(save['_id']);


    var steps = [];
    for( i =0; i <tourLength ; i++) {

      var step = {};
      if( $($(".tourTitle")[i ]).html()){
        console.log( $($(".tourTitle")[i ]).html())
        step.title =$($(".tourTitle")[i ]).html();
      }else{
        break;
      }


      if( $($(".tourElement")[i]).val()){
        console.log( $($(".tourElement")[i]).val())
        step.element = $($(".tourElement")[i]).val();

      }


      if($($(".tourContent")[i]).val()){
        console.log( $($(".tourContent")[i]).val())
        step.content = $($(".tourContent")[i]).val();
      }
      step.stepName = i + 1;
      steps.push(step)
    }
    console.log("steps tpo save")

    console.log(steps)

    save.tour = JSON.stringify({steps : steps});
    save.editedOn = new Date();
    if (Meteor.user())
      save.editedBy= Meteor.user().username;
    else
     save.editedBy = 'Anonymous';
   $( "#tourAlert" ).fadeIn( 500 );

   Tours.update({_id : save._id}, save);
   $( "#tourAlert" ).delay( 800 ).fadeOut( 1000 );


 }

})

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD-MMM-YYYY HH:mm');
});

Template.registerHelper('formatSmallDate', function(date) {
  return moment(date).format('DD-MMM HH:mm');
});




Template.screens.events({
  'click': function() {
   $(".pages").removeClass("active");
   $("#"+this.screen).addClass("active");
   console.log(this);
   var selectedProduct =  Session.get('selectedProduct');
   var selectedTours =   Tours.find({product :selectedProduct.product , screen : this.screen},{ sort: { editedOn: -1}}).fetch();
   var selectedTour = selectedTours[0];
   console.log("Selected tour" )
   var parsedTour =  jQuery.parseJSON( selectedTour.tour );
   console.log(parsedTour.steps);
   Session.set('selectedTour', parsedTour.steps);
   Session.set('selectedTourObj',selectedTour);
 }
});

Template.products.events({
  'click': function() {
   console.log(this);
   console.log("You clicked something");
   $(".products").removeClass("active");
   $("#"+this.product).addClass("active");
   computeScreens(this);

 }
});



Template.input.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      if (Meteor.user())
        var name = Meteor.user().username;
      else
        var name = 'Anonymous';
      var tourObj = Session.get('selectedTourObj');
      if(!tourObj ){
        return;
      }

      var message = document.getElementById('message');

      if (message.value != '') {
        Messages.insert({
          product : tourObj.product,
          page : tourObj.screen,
          name: name,
          message: message.value,
          time: Date.now(),
        });

        document.getElementById('message').value = '';
        message.value = '';
      }
    }
  }
}

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

}


if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
