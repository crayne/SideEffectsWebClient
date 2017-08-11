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

   this.restoreMedicationList = function(){
     var localStorageString = localStorage.getItem("medications");
     if (localStorageString == null) return;
     var ar = JSON.parse(localStorageString);
     var i;
     for (i=0; i<ar.length; i++){
       var id = "medication" + i;
       $("ul.medication-list").append('<li id=' + id + ' draggable="true" ondragstart="(new MedicationList()).dragToDelete(event)"' + '><a href="#"><span class="tab list-group-item medication-list-item">' + ar[i] + '</span></a></li>');
     }
     $("ul.medication-list").css("visibility", "visible");
     $("#medication0" ).get(0).scrollIntoView();
     //set all items to inactive
     $("ul.medication-list").find('li').removeClass('active');
     //set added item to active
     $("#medication0").addClass('active');
     $("#trashcan").css("visibility", "visible");
   }


   this.dragToDelete = function(ev) {
    //TODO replace "text" with name of medication - maybe make it a parameter?
    ev.dataTransfer.setData("text", ev.target.id);
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

  this.allowDrop = function(ev){
    ev.preventDefault();
  }


}
