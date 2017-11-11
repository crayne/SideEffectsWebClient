function MedicationList(){

  this.saveMedication = function(medication){
    var ar = [];
    $("#medication-list li").each(function() { ar.push($(this).text()) });

     //need to save the array in local storage
     localStorage.setItem("medications", null);
     var localStorageString = JSON.stringify(ar);
     localStorage.setItem("medications", localStorageString);
   }

   this.saveMedicationsLocally = function(medication){
     var ar = [];
     $("#medication-list li").each(function() {
        var medText = $(this).children(":first").children(":first").text();
        ar.push(medText);
      });

      //need to save the array in local storage
      localStorage.setItem("medications", null);
      var localStorageString = JSON.stringify(ar);
      localStorage.setItem("medications", localStorageString);
    }



   //        var medText = this.children(":first").text();

   //TODO - add onclick handler to list side effects
   this.restoreMedicationList = function(){
     var localStorageString = localStorage.getItem("medications");
     if (localStorageString == null) return;
     var ar = JSON.parse(localStorageString);
     var i;
     for (i=0; i<ar.length; i++){
       var id = "medication" + i;
       var trashId = "trash" + i;
       /*
       $("ul.medication-list").append('<li class="list-group-item" ><a href="#">' +
       '<span id=' + id + ' class="tab medication-list-item ui-widget-content">' + ar[i] + '</span>' +
       '<span id=' + trashId + ' style="float: right"> X </span>' +
       '</a></li>');
       */
       this.appendMedicationListRow(ar[i], id, trashId);

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

        var oldThis = this;
        $('#' + trashId).click(function(e){
          e.preventDefault()
          var listItem = $(this).parent().parent();
          listItem.remove();
          selectedMedication = $("#medication0");
          oldThis.saveMedicationsLocally();

         });

     }
     if (ar.length == 0) return;
     $("#medication0" ).get(0).scrollIntoView();
     $("ul.medication-list").css("visibility", "visible");

     //set all items to inactive
     $("ul.medication-list").find('li').removeClass('active');
     //set added item to active
     $("#medication0").addClass('active');
   }

  this.appendMedicationListRow = function(medicationText, id, trashId){
    $("ul.medication-list").append('<li class="list-group-item" ><a href="#">' +
    '<span id=' + id + ' class="tab medication-list-item ui-widget-content">' + medicationText + '</span>' +
    '<span id=' + trashId + ' style="float: right"> X </span>' +
    '</a></li>');
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

}
