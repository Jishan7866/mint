(function ($) {
    Drupal.behaviors.comparsionTabsModule = {
        attach: function (context, settings) {
    var startItemIndex = 0;
    var tabItemContainer = ".resp-tabs-container";
    var tabItemList = $(".resp-tabs-list");
    var tabInterval;
    var tabIntervalTime = 3000; //In milliseconds
    var stopOnHover = true;
    
    tabItemList.find(".resp-tab-item").each(function (index, val) {
      var itemHeading = $(this).html();
      $(tabItemContainer).find(".resp-tabs-container-item").eq(index).before('<h3 class="resp-accordion" data-listindex="' + index + '"><span class="resp-arrow"></span>' + itemHeading + '</h3>');
    });
    
    $(tabItemContainer).find(".resp-tabs-container-item h3.resp-accordion").on("click", function () {
      var itemIndex = $(this).index();
      changeIndex(itemIndex);
      clearInterval(tabInterval);
      startAutoTab();
    });
    
    function changeIndex(itemIndex) {
      tabItemList.find(".resp-tab-item").removeClass("resp-tab-active");
      tabItemList.find(".resp-tab-item:eq(" + itemIndex + ")").addClass("resp-tab-active");
    
      if ($(window).width() < 980) {
        $(tabItemContainer).find(".resp-tabs-container-item").slideUp();
        $(tabItemContainer).find(".resp-tabs-container-item:eq(" + itemIndex + ")").stop().slideDown();
      } else {
        $(tabItemContainer).find(".resp-tabs-container-item").hide();
        $(tabItemContainer).find(".resp-tabs-container-item:eq(" + itemIndex + ")").stop().fadeIn();
      }
    
      $(tabItemContainer).find("h3.resp-accordion").removeClass("resp-tab-active");
      $(tabItemContainer).find("h3.resp-accordion").eq(itemIndex).addClass("resp-tab-active");
    
    }
    changeIndex(startItemIndex);
    tabItemList.find(".resp-tab-item").on("click", function () {
      var itemIndex = $(this).index();
      changeIndex(itemIndex);
      clearInterval(tabInterval);
      
    });
    
    $(document).find(tabItemContainer).find("h3.resp-accordion").on("click", function () {
      var itemIndex = $(this).attr("data-listindex");
      changeIndex(itemIndex);
      clearInterval(tabInterval);
      startAutoTab();
    });
    }
};
}(jQuery));
    