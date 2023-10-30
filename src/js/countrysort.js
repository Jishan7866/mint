(function ($) {
  Drupal.behaviors.countrySortModule = {
    attach: function (context, settings) {
      if ($(document).has('.field__item--country')) {
        var items = $('.node--type-popup .field__item--country').get();
        items.sort(function (a, b) {
          var keyA = $(a).text();
          var keyB = $(b).text();
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });

        var collumnOne = [],
          collumnTwo = [],
          collumnThree = [],
          arraysize = 8;
        if (items.length < 16) {
          collumnOne = items.slice(0, arraysize);
          collumnTwo = items.slice(arraysize);
        } else {
          arraysize = items.length / 3;
          var rem = items.length % 3;
          if (rem > 0)
            collumnOne = items.slice(0, arraysize + 1);
          else
            collumnOne = items.slice(0, arraysize);
          if (rem > 0)
            collumnTwo = items.slice(arraysize + 1, (2 * arraysize) + rem);
          else
            collumnTwo = items.slice(arraysize, 2 * arraysize);
          collumnThree = items.slice((2 * arraysize) + rem);
        }

        for (var i = 0; i <= arraysize; i++) {
          items.push(collumnOne[i]);
          items.push(collumnTwo[i]);
          if (collumnThree[i])
            items.push(collumnThree[i]);

        }
        var ul = $('.node--type-popup .field--name-field-content');
        $('.node--type-popup .field--name-field-content .field__item--country').remove();
        $.each(items, function (i, li) {
          ul.append(li); /* This removes li from the old spot and moves it */
        });
      }
    }
  };
}(jQuery));
