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
    $("#interactions-loader").css("visibility", "visible");
    $.ajax({url: urlx, success: function(result){  //make medArray from string
      $("#interactions-loader").css("visibility", "collapse");
      //alert("result is " + result);
      if(result == null) {
           alert("SideEffects has not found any interactions among your medications");
               return;
           }
      json = JSON.parse(result);

     //Compensate for error in php json_encode or JSON.parse here, that makes severity an object instead of a string
      for (i=0; i<json.length; i++) {
        json[i].severity = json[i].severity[0];
      }
      displayInteractions(json);

    },
    failure: function(result){
      $("#interactions-loader").css("visibility", "collapse");
      alert("failed to get interactions");
    }});
    }

    var displayInteractionsOld = function(interactionArray){
      var iLength = interactionArray.length;
     	var allText = "";
     	var criticalText = "";
     	var significantText = "";
     	for (var i=0; i<iLength; i++) {
        if (interactionArray[i].originalDrugName1 == null) continue;
        if (interactionArray[i].originalDrugName2 == null) continue;
     		var drug1 = interactionArray[i].originalDrugName1.toLowerCase();
     		var drug2 = interactionArray[i].originalDrugName2.toLowerCase();
     		var severity = interactionArray[i].severity.toUpperCase();

     		var text = drug1 + " and " + drug2 + "\n";
     		if (severity == "CRITICAL") criticalText += text;
     		else significantText += text;
     	}
     	if (criticalText != ""){
     		if (criticalText.substr(criticalText.length-1, 1) == "\n"){
     			criticalText = criticalText.substr(0, criticalText.length-1);
     		}
     		//criticalList.value = criticalText;
     		//criticalLabel.visible = true;
     		//criticalList.visible = true;
     	}

     	if (significantText != ""){
     		if (significantText.substr(significantText.length-1, 1) == "\n"){
     			significantText = significantText.substr(0, significantText.length-1);
     		}
     		//significantList.value = significantText;
     		//significantLabel.visible = true;
     		//significantList.visible = true;
      	}
      	if (criticalText != ""){
      		//interactionWin.add(criticalLabel);
        	//interactionWin.add(criticalList);
          alert("criticalText = " + criticalText);
        }
        if (significantText != ""){
     		  //interactionWin.add(significantLabel);
        	//interactionWin.add(significantList);
          alert("significantText = " + significantText);

        }

    }

    var displayInteractions= function(jsonArray){
      var iLength = jsonArray.length;
      for (i=0; i<iLength; i++) {
          var jItem = jsonArray[i];
          var severityObject1 = jItem.severity;
          severity1 = severityObject1[0];

          var listItem = "\nInteraction between ";
          //if (severity2.equals("N/A")) continue;
          var drugName1 = jItem.originalDrugName1;
          if (drugName1 == null) drugName1 = jItem.drug1;
          var drugName2 = jItem.originalDrugName2;
          if (drugName2 == null) drugName2 = jItem.drug2;

          listItem += drugName1 + " and " + drugName2 + ": ";
          var descriptionObject = jItem.descriptionText;
          var description =  descriptionObject[0];
          listItem += description + "\n";
          alert("Interaction listItem = " + listItem);
      }
    }

  }
