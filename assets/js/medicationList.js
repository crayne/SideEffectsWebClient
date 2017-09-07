function MedicationList(){

  this.saveMedication = function(medication){
    var ar = [];
    $("#medication-list li").each(function() { ar.push($(this).text()) });

     //need to save the array in local storage
     localStorage.setItem("medications", null);
     var localStorageString = JSON.stringify(ar);
     localStorage.setItem("medications", localStorageString);
     $("#trashcan").css("visibility", "visible");
   }
   //TODO - add onclick handler to list side effects
   this.restoreMedicationList = function(){
     var localStorageString = localStorage.getItem("medications");
     if (localStorageString == null) return;
     var ar = JSON.parse(localStorageString);
     var i;
     for (i=0; i<ar.length; i++){
       var id = "medication" + i;
       $("ul.medication-list").append('<li id=' + id  + '><a href="#"><span class="tab list-group-item medication-list-item ui-widget-content">' + ar[i] + '</span></a></li>');
       //click handler shows side effects when user clicks on medication
       $('#' + id).click(function(e){
         e.preventDefault()
         $that = $(this);
         $that.parent().find('li').removeClass('active');
         $that.addClass('active');
         selectedMedication = $(this);
         var thisMed = $(this).text();
         getSideEffectsForMedication(thisMed);
        });
        selectedMedication = $("#medication0");
     }
     $("ul.medication-list").css("visibility", "visible");
     $("#medication0" ).get(0).scrollIntoView();
     //set all items to inactive
     $("ul.medication-list").find('li').removeClass('active');
     //set added item to active
     $("#medication0").addClass('active');
     $("#trashcan").css("visibility", "visible");
   }


  this.processDrop = function(ev){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    var medName = $("#" + data).text();
    alert("medication name of item dropped is: " + medName);
    //Now delete the list item with this id
    $("#" + data).remove();

    //Also delete it from local storage
    this.saveMedication(medName);


  }

/*
Click on trashcan to remove currently selected medication
*/
  this.trashcanClicked = function(ev){
    var medName = $(selectedMedication).text();
    $(selectedMedication).remove();
    this.saveMedication(medName);
  }


}
