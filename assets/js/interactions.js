var Interactions = function(){
  $('#interactions-button').click(function() {
    var medicationArray = getMedicationArray();
    var medicationString = getMedicationString(medicationArray);
    if (medicationString === ""){
      alert("Please enter medications to get interactions");
      return;
    }
    getMedicationInteractions(medicationString);
  });

  var getInteractions = function(){
    alert("In getInteractions");
  }

  var getMedicationArray = function(){
    var medicationArray = [];
    $('.medication-list-item').each(function() { medicationArray.push($(this).text()) });
    return medicationArray;
  }

  var getMedicationString = function(medicationArray){
    var numMedications = medicationArray.length;
    var medicationString = "";
    for (i = 0; i < numMedications; i++){
      medicationString += medicationArray[i];
      if (i != numMedications-1) medicationString += ","
    }
    return medicationString;
  }

  var getMedicationInteractions = function(medicationString){
    var urlBase = Const.localHost + Const.getInteractionsUrl;
    urlx = urlBase + "?medNames=" + medicationString;
    showProgressIndicator();
    $.ajax({url: urlx, success: function(result){  //make medArray from string
      hideProgressIndicator();
      alert("result is " + result);
      /*
      if (result.indexOf("no side effects found") != -1 || result.indexOf("not found") != -1 || result.indexOf("no match") != -1) {
        alert("No side effects found for " + medName);
        hideProgressIndicator();
        return;
      }
      addAListItem(result, "symptom-search-results-list", "symptom-search-results-list-item");
      $('.symptom-search-results-list').css('visibility','visible');
      $('#symptom-search').css('visibility','visible');
      $('#symptom-search').click(new SymptomSearch());
      */
    },
    failure: function(result){
      hideProgressIndicator();
      alert("failed to get symptoms for medications");
    }});
    }


  }
