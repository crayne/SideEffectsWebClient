function NewLayout(){

  this.addClickHandlersToNavbarItems = function(){
    $('#side-effects-nav').click(function(e){
      e.preventDefault();
      globalThis.activateClickedButton($(this));
      $("#symptom-search-column").css("display", "none");
      $("#side-effects-column").css("display", "block");
      $("#interactions-column").css("display", "none");
      $("#side-effects-column")[0].scrollIntoView(true);

    });
    var globalThis = this;
    $('#symptoms-nav').click(function(e){
      e.preventDefault();
      globalThis.activateClickedButton($(this));
      $("#interactions-column").css("display", "none");
      $("#side-effects-column").css("display", "none");
      $("#symptom-search-column").css("display", "block");
      $("#symptom-search").css("visibility", "visible");
      $("#symptom-search-column")[0].scrollIntoView(true);
    });

    $('#interactions-nav').click(function(e){
      e.preventDefault();
      globalThis.activateClickedButton($(this));
      $("#symptom-search-column").css("display", "none");
      $("#side-effects-column").css("display", "none");
      $("#interactions-column").css("display", "block");
      $("#interactions-column")[0].scrollIntoView(true);

    });
  }

  this.activateClickedButton = function($that){
    $that.parent().find('li').removeClass('active');
    $that.addClass('active');
  }

}
