


initAllDrugsAutocomplete = function(){
//changeListener
$( "#search" ).keyup(function() {
  processReturnString( $(this).val() );
});}



processReturnString = function(s){
		getAllDrugNamesThatStartWithString(s);
}

addAListItem = function(textToAdd, classOfList){
   if(text.length){
        $('<li />', {html: textToAdd}).appendTo('ul.' + classOfList);
    }
}

getAllDrugNamesThatStartWithString = function(search_term){
    if (search_term.length <= 2) return;
    search_term = search_term.toLowerCase(); 
    var urlx = Const.localHost + Const.autocompletecombo;
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
    $("ul.medication-list").empty();
    //add new rows
    for (i=0; i<medArray.length; i++){
    	$("ul.medication-list").append('<li><a href="#"><span class="tab">' + medArray[i] + '</span></a></li>');

    }


}