initAllDrugsAutocomplete = function(){
//changeListener
$( "#search" ).keyup(function() {
  processReturnString( $(this).val() );
});}



processReturnString = function(s){
		alert("letters typed = " + s);
}