


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
    	alert("ajax result is: " + result);
		//make medArray from string
		createSearchRows("a,b")
    }});

}

createSearchRows = function(medArray){
}