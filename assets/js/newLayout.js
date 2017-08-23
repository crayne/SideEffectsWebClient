function NewLayout(){

  this.addClickHandlersToNavbarItems = function(){
    $('#side-effects-nav').click(function(e){
      e.preventDefault();
      globalThis.activateClickedButton($(this));
      $("#symptom-search-column").css("display", "none");
      $("#side-effects-column").css("display", "block");
      $("#interactions-column").css("display", "none");
      if (breakpoint.value != 'desktop') {
        $("#medication-column").css("display", "none");
      }
      lastRightPanel = "#side-effects-column";


    });
    var globalThis = this;

    $('#medications-nav').click(function(e){
      e.preventDefault();
      globalThis.activateClickedButton($(this));
      $("#interactions-column").css("display", "none");
      $("#side-effects-column").css("display", "none");
      $("#symptom-search-column").css("display", "none");
      $("#medication-column").css("display", "block");
      if (breakpoint.value == desktop) {
        $("#side-effects-column").css("display", "block");
      }
    });

    $('#symptoms-nav').click(function(e){
      e.preventDefault();
      globalThis.activateClickedButton($(this));
      $("#interactions-column").css("display", "none");
      $("#side-effects-column").css("display", "none");
      $("#symptom-search-column").css("display", "block");
      if (breakpoint.value != 'desktop') {
        $("#medication-column").css("display", "none");
      }
      lastRightPanel = "#symptom-search-column";
    });

    $('#interactions-nav').click(function(e){
      e.preventDefault();
      globalThis.activateClickedButton($(this));
      $("#symptom-search-column").css("display", "none");
      $("#side-effects-column").css("display", "none");
      $("#interactions-column").css("display", "block");
      if (breakpoint.value != 'desktop') {
        $("#medication-column").css("display", "none");
      }
      lastRightPanel = "#interactions-column";

    });
  }

  this.activateClickedButton = function($that){
    $that.parent().find('li').removeClass('active');
    $that.addClass('active');
  }

}
