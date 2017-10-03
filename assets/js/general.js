function General(){

  this.initStuff = function(){
    console.log("Ready!");
    new Interactions();
    initAllDrugsAutocomplete();
    window.scrollTo(0,0);
    ( new NewLayout()).addClickHandlersToNavbarItems();
    /*
    When menu is collapsed an you expand it and click on an item,
    the menu should collapse again
    */
    $("nav").find("li").on("click", "a", function () {
         $('.navbar-collapse.in').collapse('hide');
     });
  }

  this.setupBreakpoints = function(breakpoint){
    breakpoint.refreshValue = function () {
      this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
    };
    $(window).resize(function () {
      breakpoint.refreshValue();
      if (breakpoint.value == 'tablet') {
        console.log('Tablet breakpoint');
        $("#side-effects-column").css("display", "none");
      }
      else if (breakpoint.value == 'desktop') {
        console.log("Desktop breakpoint');")
        $("#medication-column").css("display", "block");
        //TODO - if lastRightPanel is hidden, show it
        if ($(lastRightPanel).css("display") == "none"){
          $(lastRightPanel).css("display", "block");
        }
        $("#left-dummy-column").css("max-width", "9%");

        $("#medication-column").css("min-width", "40%");
        $("#side-effects-column").css("min-width", "40%");
        $("#symptom-search-column").css("min-width", "40%");
        $("#interactions-column").css("min-width", "40%");

      }
      else {
        console.log('Some other breakpoint');
        $("#side-effects-column").css("display", "none");
      }
      }).resize();
  }
}
