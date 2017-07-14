var Interactions = function(){
  $('#interactions-button').click(function() {
    getMedicationArray();
  });

  var getInteractions = function(){
    alert("In getInteractions");
  }

  var getMedicationArray = function(){
    var medicationArray = [];
    $('.medication-list-item').each(function() { medicationArray.push($(this).text()) });
    return medicationArray;
  }

}
