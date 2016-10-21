var tour = [];
var steps = [];

var product  = "Demo"
var page = "screen1";

function saveStep() {
  var step ={
    "stepName" : $("input[name='step']:checked").val(),
    "title" : $('#title').val(),
    "content" : $('#content').val(),
    "element" : $('#element').val()
  };


  for(i=0;i<steps.length;i++){
   if(steps[i].stepName == step.stepName){
     if (i > -1) {
       steps.splice(i, 1);
       break;
     }
   }
 }

 steps.push(step);
 return false;
}

function getStepData(){
 var stepName = $("input[name='step']:checked").val();
 var stepFound = false;
 for(i=0;i<steps.length;i++){
   if(steps[i].stepName== stepName){
    $('#title').val(steps[i].title);
    $('#content').val(steps[i].content);
    stepFound=true;
    break;
  }
}
if(!stepFound){
  $('#title').val('');
  $('#content').val('');
}
}


function saveTour() {
  console.log(steps)

  var tour = {'steps' : steps}
  tour = JSON.stringify(tour);

  submitTour(product, page, tour );
}

function previewTour() {
  console.log("preview")
/*  var tour = {'steps' : steps}
 // showTour(tour);*/


  fetchTour(product, page);
}



$(document).ready(function() {
   //var steps = ['1','2','3','4','5','6','7','8','9','10'];
  /* for (i = 0; i < steps.length; i++) {
     var radioBtn = $('<tr><td style="font-size: 10px;"><input type="radio" class="round-button" name="step" id="step" style="float: left;" value="'+steps[i]+'" onclick="getStepData()"><span class="label">'+steps[i]+'</span></td></tr>');
      radioBtn.appendTo('#stepsContainer');
    }*/

    $('#my-button').bind('click', function(e) {

                // Prevents the default action to be triggered.
                e.preventDefault();

                // Triggering bPopup when click event is fired
                $('#modal').bPopup({
                  transition : 'slideUp',
                  escClose:true,
                  modal:false,
          //position : [1266,400]
        });
              });

    $('#btnClose').bind('click', function(e) {

                // Prevents the default action to be triggered.
                e.preventDefault();
                tour = [];

                for(i=0;i<steps.length;i++){
                 $("#step").remove();
               }
               steps = [];
               console.log(tour);
                // Triggering bPopup when click event is fired
                var bPopup = $('#modal').bPopup();
                bPopup.close();

              });

    $('#btnMinimize').bind('click', function(e) {

                // Prevents the default action to be triggered.
                e.preventDefault();
                // Triggering bPopup when click event is fired
                var bPopup = $('#modal').bPopup({
                  position : [0,0]
                });


              });

    $('#btnAddStep').bind('click', function(e) {

                // Prevents the default action to be triggered.
                e.preventDefault();
                // Triggering bPopup when click event is fired
                var step = {'stepName':steps.length + 1,'element':'','title':'','content':''};
                steps.push(step);
                var radioBtn = $('<tr id="step"><td style="font-size: 10px;"><input type="radio" class="round-button" name="step" style="float: left;" value="'+step.stepName+'" onclick="getStepData()"><span class="label">'+step.stepName+'</span></td></tr>');
                radioBtn.appendTo('#stepsContainer');
              });

    $('#btnDeleteStep').bind('click', function(e) {

                // Prevents the default action to be triggered.
                e.preventDefault();
                // Triggering bPopup when click event is fired
                var step = $("input[name='step']:checked").val();
        //var radioSelector = '#' + step;
        for(i=0;i<steps.length;i++){
         $("#step").remove();
       }

       for(i=0;i<steps.length;i++){
        if(steps[i].stepName == step){
          if (i > -1) {
            steps.splice(i, 1);
            break;
          }
        }
      }

      var tempSteps = steps;
      steps = [];

      for(j=0;j<tempSteps.length;j++){
       tempSteps[j].stepName = j+1;
       steps.push(tempSteps[j]);
     }


     for(i=0;i<steps.length;i++){
      var radioBtn = $('<tr id="step"><td style="font-size: 10px;"><input type="radio" class="round-button" name="step" style="float: left;" value="'+steps[i].stepName+'" onclick="getStepData()"><span class="label">'+steps[i].stepName+'</span></td></tr>');
      radioBtn.appendTo('#stepsContainer');
    }
        //steps.push(step);
        //var radioBtn = $('<tr><td style="font-size: 10px;"><input type="radio" class="round-button" name="step" id="step" style="float: left;" value="'+step+'" onclick="getStepData()"><span class="label">'+step+'</span></td></tr>');

      });



});



var REST_BASE = "http://localhost:3000/api/";



function submitTour(product,page,tour) {


  var data = {
    "product" : product,
    "screen" : page,
    "tour" : tour
  }


  $.ajax({
    type: "POST",
    url: REST_BASE+ "tours?callback = ?",
    dataType: 'application/json',
   data: data,
    success: function( sData) {
     alert("success");
     console.log(sData);
   }
 });

}


function fetchTour(product,page) {


  var data = {
    "product" : product,
    "screen" : page
  }


  $.ajax({
    type: "POST",
    url: REST_BASE+ "tourByScreen",
     dataType: 'json',
    data:data,
    success: function( sData) {
      showTour(JSON.parse(sData.data.tour));
}
});

}





function showTour(data){
 var tour = new Tour(data);
 localStorage.clear();
  // Initialize the tour
  tour.init();

  tour.start();
}
