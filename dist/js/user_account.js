/**
 * @file
 * User account JS.
 */

(function($, Drupal, drupalSettings) {
    Drupal.behaviors.userAccount = {
        attach: function(context, settings) {

            function renderSelectizeNumberItem(item, type, mobileCaption) {
                if (typeof type === 'undefined') {
                    type = 'item';
                }
                if (typeof mobileCaption === 'undefined') {
                    mobileCaption = 'Info for';
                }
                let attributes = 'class="item" data-value="' + item.value + '"';
                if (type === 'option') {
                    attributes = 'class="option" data-selectable="" data-value="' + item.value + '"';
                }
                const desktopText = '<span class="show-desktop">Show information for</span>';
                const mobileText = '<span class="show-mobile">' + mobileCaption + '</span>';
                return '<div ' + attributes + '>' + desktopText + mobileText + ' ' + item.text + '</div>';
            }

            $('select.no-selectize.select-mobile-number[data-type="refer-code"]').selectize({
                onInitialize: function() {
                    this.$control_input.attr('readonly', true);
                },
                onChange: function(octaneId) {
                    const originalSelect = $(this.$wrapper).prev();
                    if (!originalSelect.length || !originalSelect.hasClass('select-mobile-number')) {
                        return;
                    }
                    const type = originalSelect.data('type');
                    if (typeof type === undefined) {
                        return;
                    }
                    switch (type) {
                        case 'refer-code':
                            {
                                const url = '/my-account-phone-select?element=refer-code&number=' + octaneId;
                                Drupal.ajax({
                                    url: url
                                }).execute();
                                $(this.$wrapper).addClass('clicked');
                                break;
                            }
                    }
                },
                render: {
                    item: function(item) {
                        return renderSelectizeNumberItem(item, 'item', 'Code for');
                    },
                    option: function(item) {
                        return renderSelectizeNumberItem(item, 'option', 'Code for');
                    }
                },
            });
            if ($(context).attr('id') === 'plan-addons-form-wrapper' || $(context).hasClass('mint-plan-addons-form')) {
                $('select.no-selectize.select-mobile-number[data-type=plan-addons]').selectize({
                    onInitialize: function() {
                        this.$control_input.attr('readonly', true);
                        var number = jQuery('.wrap-number-index span').data("number");
                        var mapped_phone_1 = jQuery('.plan-and-addons.phone-plan.histroy-blocks').data('element-phone');
                        if (number == mapped_phone_1) {
                            jQuery('.plan-and-addons.phone-plan.histroy-blocks').removeClass('hidden');
                        }
                    },
                    onChange: function(id) {
                        var $select = $("#plan-addons-form-wrapper .mobile-phone-numbers").selectize();
                        $select[0].selectize.setValue(id);
                        $(this.$wrapper).addClass('clicked');
                        var mapped_phone_1 = jQuery(this).data('element-phone');
                        if (!!mapped_phone_1) {
                            var index1 = jQuery('.wrap-number-index .item[data-number="' + mapped_phone_1 + '"]').data('number');
                            jQuery('.plan-and-addons.phone-plan.histroy-blocks[data-element-phone="' + index1 + '"]').show();
                        }
                    },
                    render: {
                        item: function(item) {
                            return renderSelectizeNumberItem(item);
                        },
                        option: function(item) {
                            return renderSelectizeNumberItem(item, 'option');
                        }
                    },
                });
            }
            if ($(context).attr('id') === 'usage-history-form-wrapper' || $(context).hasClass('mint-usage-history-form')) {
                $('select.no-selectize.select-mobile-number[data-type=data-usage]').selectize({
                    onInitialize: function() {
                        this.$control_input.attr('readonly', true);
                    },
                    onChange: function(id) {
                        var $select = $("#usage-history-form-wrapper .mobile-phone-numbers").selectize();
                        $select[0].selectize.setValue(id);
                        $(this.$wrapper).addClass('clicked');
                    },
                    render: {
                        item: function(item) {
                            return renderSelectizeNumberItem(item);
                        },
                        option: function(item) {
                            return renderSelectizeNumberItem(item, 'option');
                        }
                    },
                });
            }

            // Selectize form phones numbers
            $('select.no-selectize.mobile-phone-numbers.form-select').selectize({
                onInitialize: function() {
                    this.$control_input.attr('readonly', true);
                },
                render: {
                    item: function(item) {
                        return renderSelectizeNumberItem(item);
                    },
                    option: function(item) {
                        return renderSelectizeNumberItem(item, 'option');
                    }
                },
            });

            if (context !== document) {
                return;
            }
            // User account bundle selection
            bundleName = drupalSettings.bundleType;
            if (bundleName) {
                bundleSelection(bundleName);
            }
            $('.user-accout-page').on('click', '.bundle-options .bundle', function() {
                const element = $(this);
                if (!element.hasClass('active')) {
                    let bundleName = element.data('bundle-name');
                    bundleSelection(bundleName);
                }
            });

            function bundleSelection(bundleName) {
                $('.user-accout-page').addClass('loader');
                $('.bundle-options .bundle').removeClass('active');
                $('.bundle-options').find('.bundle[data-bundle-name="' + bundleName + '"]').addClass('active');
                $('.footer-entities').removeClass('show');
                if (bundleName == 'subscription') {
                    target = $('.user-account-subheader');
                    $('.footer-entities-leasing').addClass('show');
                } else {
                    target = $('.user-account-body');
                    $('.footer-entities-bundle').addClass('show');
                }
                const url = '/my-account-summary-block?bundle=' + bundleName;
                Drupal.ajax({
                    url: url
                }).execute().done(function(comands, statusString, ajaxObject) {
                    $('.user-accout-page').removeClass('loader');
                    var position = target.offset().top - 30;
                    $("body, html").animate({
                        scrollTop: position
                    }, 1000);
                });
            }

            // User account subscription-options selection
            jQuery('.user-accout-page').on('click', '.subscription-options .soption', function(e) {
                jQuery('.whattips.tooltip-icon').removeClass('inlle-block');
                if ($('#subscription_upgrade_id').hasClass('subscriptoin-upgrage-date') || $('#subscription_upgrade_id').hasClass('total-subscription') || $('#subscription_upgrade_id').hasClass('next-payment')) {
                    if (e.target.id == 'subscription_upgrade_id') {
                        e.preventDefault();
                        var target = $(this).data('target');
                        if (!$(target).hasClass('open')) {
                            $(target).find('.title').trigger("click");
                        }
                        var position = $(target).offset().top;
                        $("body, html").animate({
                            scrollTop: position - 10
                        }, 500);
                    }
                }
            });
            //change plan according to phone selection on subscription type

            jQuery(document).on("click", ".plan-and-addons.phone-plan.histroy-blocks", function() {
                var mapped_phone_1 = jQuery(this).data('element-phone');
                if (!!mapped_phone_1) {
                    jQuery('.element.plan').addClass("open");
                    jQuery('.mint-plan-addons-form .selectize-input').mousedown();
                    setTimeout(function() {
                        var index1 = jQuery('.wrap-number-index .item[data-number="' + mapped_phone_1 + '"]').data('value');
                        jQuery('.mint-plan-addons-form .selectize-dropdown .option[data-value="' + index1 + '"]').trigger('click');
                    }, 500);
                } else {
                    jQuery('.element.plan').removeClass("open");
                }
            });

            // User account sections
            $('.user-accout-page').on('click', '.element .title', function() {
                const element = $(this).closest('.element');
                element.toggleClass('open');

                if (!element.hasClass('loaded')) {
                    let blockName = element.data('element-name');
                    let bundleName = $('.bundle-options .bundle.active').data('bundle-name') ? $('.bundle-options .bundle.active').data('bundle-name') : drupalSettings.bundleType;
                    if (bundleName) {
                        url = '/my-account-load-block?element=' + blockName + '&bundleType=' + bundleName;
                    } else {
                        url = '/my-account-load-block?element=' + blockName;
                    }

                    Drupal.ajax({
                        url: url
                    }).execute();
                }
            });

            // Update 100 min call addon body if they selected.
            $( document ).ajaxComplete(function() {
                let expDate = $("#need_information .hundred-min-call-btn").data('exp');
                if($("#need_information .hundred-min-call-btn").hasClass("disabled")) {
                    let hundredCallBodyText = "Expires on " + expDate + ". <b>Only add once you run out of minutes.</b>";
                    $("#need_information .hundred-min-call").html(hundredCallBodyText);
                }
            });

            // Open plan seciton on click of subscription.
            $('.user-accout-page').on('click', '.element.subscription .title', function() {
                $('.plan .title').click();
            });
            $('.user-accout-page').on('click', '.column--left #popup-variations-chnge-plan-sim', function() {
                $('#popup-variations .btn-green').trigger('click');
            });

            jQuery(document).on("click", ".subscription-plan-body .box .return-upgrade", function(e) {
                e.stopPropagation();
            });
            jQuery(document).on("click", ".subscription-plan-body .box .warranty-claim", function(e) {
                e.stopPropagation();
            });
            jQuery(document).on("click", ".subscription-plan-body .box .more-options", function(e) {
                e.stopPropagation();
                if (e.target.id == 'sub-more-option') {
                    jQuery(this).parents('.columns').find('.overlay').fadeIn("slow");
                }
            });
            jQuery(document).on("click", ".subscription-plan-body .overlay .close", function(e) {
                e.stopPropagation();
                if (e.target.id == 'sub-more-option') {
                    jQuery(this).parent('.overlay').fadeOut("slow");
                }
            });

            $(document).ajaxComplete(function() {
                jQuery(".ui-helper-hidden").css("display", "none");
                $(".tooltip-text").each(function() {
                    if ($(this).find('.tooltip-close').length == 0) {
                        $(this).append('<div class="tooltip-close"></div>');
                    }
                });
            });
            jQuery(document).on("click", ".histroy-blocks .more-options", function(e) {
                e.stopPropagation();
                if (e.target.id == 'sub-more-option') {
                    jQuery(this).parents('.columns').find('.overlay').fadeIn("slow");
                }
            });
            jQuery(document).on("click", ".histroy-blocks .columns", function(e) {
                jQuery('.histroy-blocks .columns').removeClass('active');
                jQuery(this).addClass('active');
            });
            jQuery(document).on("click", ".overlay .close", function(e) {
                e.preventDefault();
                jQuery(this).closest('.overlay').fadeOut("slow");
            });
            // Smooth Scroll to ID
            $('.user-accout-page').on('click', 'a[href^="#"]', function(e) {
                e.preventDefault();
                if (!$($(this).attr("href")).hasClass('open')) {
                    $($(this).attr("href")).find('.title').trigger("click");
                }
                var position = $($(this).attr("href")).offset().top;
                $("body, html").animate({
                    scrollTop: position
                }, 500);
            });
            // Smooth Scroll to ID from url
            jQuery(document).ready(function($) {
                var hash = window.location.hash;
                if (hash == '' || hash == '#' || hash == undefined) return false;
                var target = $(hash);
                if (target.length) {
                    if (!target.hasClass('open')) {
                        target.find('.title').trigger("click");
                    }
                    var position = target.offset().top;
                    $("body, html").animate({
                        scrollTop: position
                    }, 500);
                }

            });
        },
    };

})(jQuery, Drupal, drupalSettings);
