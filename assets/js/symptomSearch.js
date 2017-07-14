
// SymptomSearch is a base class
var SymptomSearch = function(){

      $( "#symptom-search" ).keyup(function() {
        getAllSymptomsThatStartWithString( $(this).val() );
      });

    //Dropdown for finding symptoms
    getAllSymptomsThatStartWithString = function(search_term){
      if (search_term.length <= 2) return;
      search_term = search_term.toLowerCase();
      var urlx = Const.localHost + Const.autocompleteSymptoms;
      urlx += "?searchValue=" + search_term;
      $.ajax({url: urlx, success: function(result){
      //alert("ajax result of symptom search is: " + result);
      //make medArray from string
      createSearchSymptomRows(result);
      },
      failure: function(result){
        alert("ajax failure");
      }});

  }


  //Delete all list items -- then make new ones
  createSearchSymptomRows = function(result){
      var symptomArray = result.split(",");
      //delete all list items
      $("ul.symptom-dropdown").empty();
      $("ul.symptom-dropdown").css("visibility", "hidden")
      //add new rows
      for (i=0; i<symptomArray.length; i++){
      	var id = "symptom-dropdown" + i;
      	$("ul.symptom-dropdown").append('<li id=' + id + '><a href="#"><span class="tab">' + symptomArray[i] + '</span></a></li>');
  		$('#' + id).click(function(){
  			   symptomClicked($(this).text());
  		  } );
      }
      $("ul.symptom-dropdown").css("visibility", "visible");

  }
 /*
 Get array of medications from medication dropdown, and get symptom frequency
 for each of them
 */
  symptomClicked = function(symptom) {
  	//Empty dropdown
  	$("ul.symptom-dropdown").empty();
    //This gets rid of the line that is displays when the ul is empty
    $("ul.symptom-dropdown").css("visibility", "hidden");
  	//var id = "medication-list" + i;
  	//$("ul.medication-list").append('<li id=' + id + '><a href="#"><span class="tab medication-list-item">' + medication + '</span></a></li>');
    //$("ul.medication-list").css("visibility", "visible");
    //Change list item color to yellow when it is clicked
    //$('.medication-list-item').click(function(){
    //     $('.medication-list-item').css('color','white');
    //     $(this).css('color', 'yellow');
         //alert("text is: " + $(this).text());
     //});
     $("ul.symptom-search-results-list").empty();

     var medications = getMedicationArray();

     var urlBase = Const.localHost + Const.searchSideEffectsVerbalUrl;
     for (i = 0; i<medications.length; i++){
       urlx = urlBase + "?symptom=" + symptom + "&medication=" + medications[i];
       showProgressIndicator();
       $.ajax({url: urlx, success: function(result){  //make medArray from string
         //alert("result is " + result);
         if (result.indexOf("no side effects found") != -1 || result.indexOf("not found") != -1 || result.indexOf("no match") != -1) {
           alert("No side effects found for " + medName);
           hideProgressIndicator();
           return;
         }
         addAListItem(result, "symptom-search-results-list", "symptom-search-results-list-item");
         $('.symptom-search-results-list').css('visibility','visible');
         $('#symptom-search').css('visibility','visible');
         $('#symptom-search').click(new SymptomSearch());
       },
       failure: function(result){
         hideProgressIndicator();
         alert("failed to get symptoms for medications");
       }});
       }
   }
     getMedicationArray = function(){
       var medicationArray = [];
       $('.medication-list-item').each(function() { medicationArray.push($(this).text()) });
       return medicationArray;
     }

}
