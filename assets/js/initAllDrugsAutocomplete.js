
var verbalFrequencies = ['rare', 'infrequent', 'frequent'];
var FLOAT_UNDEFINED = -1.0;
var numMedications = 0;

SideEffectsClass = function(init) {
  this.verbalFrequency = init.verbalFrequency;
  this.numFrequency = init.numFrequency;
  this.sideEffectName = init.sideEffectName;
  this.freqMin = FLOAT_UNDEFINED;
  this.freqMax = FLOAT_UNDEFINED;
  this.vFreqMin = "";
  this.vFreqMax = "";
  this.totalFrequency = init.totalFrequency;
  this.averageFrequency = FLOAT_UNDEFINED;

};

copySideEffectsObject = function(from, to) {
  to.freqMin = from.freqMin;
  to.freqMax = from.freqMax;
  to.vFreqMin = from.vFreqMin;
  to.vFreqMax = from.vFreqMax;
  to.numFrequency = from.numFrequency;
  to.verbalFrequency = from.verbalFrequency;
  to.totalFrequency = from.totalFrequency;
  to.averageFrequency = from.averageFrequency;
  to.sideEffectName = from.sideEffectName;
  return to;
};


initAllDrugsAutocomplete = function(){
//changeListener
$( "#search" ).keyup(function() {
  processReturnString( $(this).val() );
});}



processReturnString = function(s){
		getAllDrugNamesThatStartWithString(s);
}

addAListItem = function(textToAdd, classOfList, classOfItem){
   if(textToAdd.length){
        //$('<li />', {html: textToAdd}).appendTo('ul.' + classOfList);
        var htmlToAdd = '<li ' + '><a href="#"><span class="' + classOfItem + '">' + textToAdd + '</span></a></li>'
        $('ul.' + classOfList).append(htmlToAdd);

        $('ul.' + classOfList).css("visibility", "visible");
    }
}

getAllDrugNamesThatStartWithString = function(search_term){
    if (search_term.length <= 2) return;
    search_term = search_term.toLowerCase();
    var urlx = Const.localHost + Const.autocomplete;
    urlx += "?searchValue=" + search_term;
    $.ajax({url: urlx, success: function(result){
    	//alert("ajax result is: " + result);
		//make medArray from string
		createSearchRows(result);
    },
    failure: function(result){
    	alert("ajax failure");
    }});

}

//Delete all list items -- then make new ones
createSearchRows = function(result){
    var medArray = result.split(",");
    //delete all list items
    $("ul.medication-dropdown").empty();
    $("ul.medication-dropdown").css("visibility", "hidden")
    //add new rows
    for (i=0; i<medArray.length; i++){
    	var id = "medication-dropdown" + i;
    	$("ul.medication-dropdown").append('<li id=' + id + '><a href="#"><span class="tab medication-dropdown-item">' + medArray[i] + '</span></a></li>');
		$('#' + id).click(function(){
			medicationClicked($(this).text(), i);
		  } );
    }
    $("ul.medication-dropdown").css("visibility", "visible");

}

saveMedication = function(medication){
  //numMedications += 1;
  //localStorage.setItem('medication'+numMedications, medication);
  //Get all medications from list
  var ar = [];
  var ul = document.getElementById("medication-list");
  if (ul != null) {
    ar = ul.getElementsByTagName("li");
  }
  //ar is now an arry of all the medication names
  for(i = 0; i < ar.length; i++){
      alert($(ar[i]).text());    //ar[i].anything results in co

   }
   //need to save the array in local storage
   localStorage.setItem("medications", null);
   localStorage.setItem("medications", JSON.stringify(ar));

 }

medicationClicked = function(medication, index) {
	//Empty dropdown
	$("ul.medication-dropdown").empty();
  //This gets rid of the line that is displays when the ul is empty
  $("ul.medication-dropdown").css("visibility", "hidden");
	var id = "medication-list" + i;
	$("ul.medication-list").append('<li id=' + id + '><a href="#"><span class="tab list-group-item medication-list-item">' + medication + '</span></a></li>');
  //scroll added item into view
  $("#" + id).get(0).scrollIntoView();
  //set all items to inactive
  $("ul.medication-list").find('li').removeClass('active');
  //set added item to active
  $("#" + id).addClass('active');
  saveMedication(medication);


  $("ul.medication-list").css("visibility", "visible");
  //Change list item color to yellow when it is clicked
  $('#' + id).click(function(e){
    e.preventDefault()
    $that = $(this);
    $that.parent().find('li').removeClass('active');
    $that.addClass('active');
    getSideEffectsForMedication(medication);
       //alert("text is: " + $(this).text());
   });

  getSideEffectsForMedication(medication);
}

getSideEffectsForMedication = function(medicationName){
  $("#side-effects-for-medication").text("for " + medicationName);
  var urlx = Const.localHost + Const.medSideEffectsUrl;
  urlx += "?medication=" + medicationName;
  $.ajax({url: urlx, success: function(result){  //make medArray from string
    if (result.indexOf("no side effects found") != -1 || result.indexOf("not found") != -1 || result.indexOf("no match") != -1) {
      alert("No side effects found for " + medName);
      return;
    }
    createSideEffectRows(result);  //add items here
    $('#symptom-search').css('visibility','visible');
    $('#symptom-search').click(new SymptomSearch());
  },
  failure: function(result){
    alert("failed to get symptoms for medications");
  }});
}

showProgressIndicator = function(){

}

hideProgressIndicator = function(){

}

addFrequencyField = function(origArray) {
    var newArray = new Array();
    for (var i = 0; i < origArray.length; i++) {
      newArray[i] = origArray[i];
      newArray[i].numFrequency = newArray[i].verbalFrequency = "";
      var freq1 = origArray[i].frequency;
      var pcentLoc = freq1.indexOf("%");
      if (pcentLoc == -1) {
        //alert("frequency is: " + freq1);
        if (verbalFrequencies.indexOf(origArray[i].frequency) != -1) {
          newArray[i].verbalFrequency = origArray[i].frequency;
        }
      } else {
        var freq2 = freq1.substring(0, pcentLoc);
        newArray[i].numFrequency = Number(freq2);
      }
      //newArray[i].sideEffectName = newArray[i].sideEffectName.charAt(0).toUpperCase() + newArray[i].sideEffectName.slice(1);
      //The first side effect does not match the Android version
      newArray[i].sideEffectName = newArray[i].sideEffectName.toLowerCase();
    }
    return newArray;
  };

  //a and b are elements of the sideEffects array
 compareFuncForCollapse = function(a, b) {
   if (a.sideEffectName === b.sideEffectName)
     return 0;
   else
     return -1;
 };

 compareFuncForSort = function(a, b) {
   if (a.sideEffectName > b.sideEffectName) {
     return 1;
   } else if (a.sideEffectName < b.sideEffectName) {
     return -1;
   }
   return 0;
 };

 compareFreqForSort = function(a,b){
        if (a.averageFrequency > b.averageFrequency) {
          return -1;
        } else if (a.averageFrequency < b.averageFrequency) {
          return 1;
        }
        return 0;
  };

 //Frequency for a given side effect expressed as a single number
 collapseRows = function(origArray) {

   origArray.sort(compareFuncForSort);

   var accumulator = new SideEffectsClass(origArray[0]);
   //newArray = new SideEffectsClass()[origArray.length];
   var newArray = new Array(origArray.length);
   var numRepeats = 1;
   var i = 1;
   var j = 0;

   accumulator.averageFrequency = 0;
   if (origArray[0].numFrequency != FLOAT_UNDEFINED)
     accumulator.totalFrequency = origArray[0].numFrequency;
   else if (origArray[0].verbalFrequency != "")
     accumulator.totalFrequency = convertToNumeric(origArray[0].verbalFrequency);
   else
     accumulator.totalFrequency = 0;

   while (i < origArray.length) {
     if (compareFuncForCollapse(accumulator, origArray[i]) === 0) {
       numRepeats++;
       if (origArray[i].numFrequency != FLOAT_UNDEFINED) {
         accumulator.totalFrequency += origArray[i].numFrequency;
       } else if (origArray[i].verbalFrequency != "") {
         accumulator.totalFrequency += convertToNumeric(origArray[i].verbalFrequency);
       }

       i += 1;

     } else {
       if (numRepeats != 0) {
         newArray[j] = new SideEffectsClass(accumulator);
         newArray[j].averageFrequency = newArray[j].totalFrequency / numRepeats;
         numRepeats = 0;
         newArray[j].totalFrequency = 0;
       }
       //This is for cases where there is only one occurrence of a side effect
       else {
         newArray[j] = new SideEffectsClass(origArray[i - 1]);
         if (origArray[i - 1].numFrequency != FLOAT_UNDEFINED)
           newArray[j].averageFrequency = origArray[i - 1].numFrequency;
         else
           newArray[j].averageFrequency = convertToNumeric(origArray[i - 1].verbalFrequency);

       }
       accumulator = copySideEffectsObject(origArray[i], accumulator);
       if (origArray[i].numFrequency != FLOAT_UNDEFINED)
         accumulator.totalFrequency = origArray[i].numFrequency;
       else if (origArray[i].verbalFrequency != "")
         accumulator.totalFrequency = convertToNumeric(origArray[i].verbalFrequency);
       else
         accumulator.totalFrequency = 0;
       numRepeats++;
       j++;

       i++;
     }
   }
   //Pick up the last symptom
   if (numRepeats != 0) {
     newArray[j] = new SideEffectsClass(accumulator);

     newArray[j].averageFrequency = newArray[j].totalFrequency / numRepeats;

   }
   //This is for cases where there is only one occurrence of a side effect
   else {
     newArray[j] = new SideEffectsClass(origArray[i - 1]);

     if (origArray[i - 1].numFrequency != FLOAT_UNDEFINED)
       newArray[j].averageFrequency = origArray[i - 1].numFrequency;
     else
       newArray[j].averageFrequency = convertToNumeric(origArray[i - 1].verbalFrequency);

   }
   var averageFrequencyIsZero = true;
   for (k=0; k<newArray.length; k++) {
     if (newArray[k].averageFrequency != 0) {
       averageFrequencyIsZero = false;
       break;
     }
   }
   if (averageFrequencyIsZero == false){
     newArray.sort(compareFreqForSort);
   }
   return newArray;

 };


 makeFrequencyText = function(rowObject){
  var allText;
      var frequency = rowObject.averageFrequency;
      if (frequency > 1.0) allText = "frequent";
      else if (frequency > .1) allText = "infrequent";
      else if (frequency > 0.0) allText = "rare";
      else allText = "";
      return allText;
 };

  addSideEffectRow = function(rowObject, persist, className) {
    var frequency = makeFrequencyText(rowObject);
    //Filter out rare ones
    if (frequency.indexOf("rare") != -1)
      return;

    var rowLabelText = rowObject.sideEffectName;
    if (frequency && frequency != null && frequency != "") {
      rowLabelText += ": " + frequency;
    }

    addAListItem(rowLabelText, "medication-side-effects-list", "tab medication-side-effects-list-item");

  };
//TODO Side effect list is the same for every medication

createSideEffectRows = function(jsonResult){
   //alert("In createSideEffectRows");

   var sideEffectsInfo = JSON.parse(jsonResult);
   //Eliminate duplicate rows here
   sideEffectsInfo = addFrequencyField(sideEffectsInfo);
   //alert("In createRows, after addFrequencyField");

   sideEffectsInfo = this.collapseRows(sideEffectsInfo);
   //alert("In createRows, after collapseRows");
   $("ul.medication-side-effects-list").empty();
   $("ul.medication-side-effects-list").css("visibility", "hidden");

   var numSideEffects = sideEffectsInfo.length;
   for (var i = 0; i < numSideEffects; i++) {
     if (!sideEffectsInfo[i])
       continue;
     addSideEffectRow(sideEffectsInfo[i], false, i);
   }
   //alert("In createRows, after adding rows");

   hideProgressIndicator();
   //alert("In createRows, after hideProgressIndicator");

}
