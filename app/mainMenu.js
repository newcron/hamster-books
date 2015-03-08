define(["jquery"], function ($) {
    const $root = $("#main-navigation");
    const $menu = $root.find(".main-navigation-menu");


    function removeCurrentSelection() {
        $root.find(".is-selected").removeClass("is-selected");
        $root.removeClass("is-on-new");
        $root.removeClass("is-on-unread");
        $root.removeClass("is-on-read");
        $menu.find(".is-main-menu-item").removeClass("is-hidden");

    }

    return {
        "notifyChange": function (path) {
            removeCurrentSelection();

            if (path.indexOf("/dialog/") == 0) {
                // this listener is called after the controller - so if the controller sets up a menu item, do not delete it
                $root.addClass("is-in-dialog");
                $root.find(".is-main-menu-item").addClass("is-hidden");
                return;
            }


            $menu.find(".is-dialog-menu-item").remove();

            if (path == "/read") {
                $root.addClass("is-on-read");
                $root.find("#read-books-action").addClass("is-selected");
            } else if (path == "/unread") {
                $root.addClass("is-on-unread");
                $root.find("#unread-books-action").addClass("is-selected");
            } else {
                $root.addClass("is-on-new");
                $root.find("#new-book-action").addClass("is-selected");
            }
        }
    }
});