define(["jQuery", "utils", "topLine"], function ($, utils, topLine) {
    return {
        show: function (showEvt) {
            utils.updateCartBadges($, topLine);
        }
    };
});