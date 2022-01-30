var mainMenu = require("./ui/components/mainmenu/mainMenu");
const { ReadBooksController } = require("./sites/read/ReadBooksController");
const { ErrorEventTarget, EventType } = require("./ErrorEventTarget");
const { UnreadBooksController } = require("./sites/unread/UnreadBooksController");
const { StatisticsController } = require("./sites/statistics/StatisticsController");
const {EditBookController} = require("./sites/edit/EditBookController");




module.exports = {
    "start": function () {

        if (location.hash == "#_=_") {
            // facebook appends this hash in the redirect URI. chrome transports this through all redirections.
            location.hash = "";
        }

        window.onhashchange = handleHashChange;
        if (!location.hash) {   
            location.hash = "#/read";
        } else {
            handleHashChange();
            mainMenu.notifyChange(location.hash.substr(1));
        }

        ErrorEventTarget.singleton().addEventListener(EventType.LOGIN_REQUIRED, (event)=>{
            window.location = event.detail
        })
        ErrorEventTarget.singleton().addEventListener(EventType.NET_ERROR, (event)=>{
            alert("Netzwerk Fehler:\n\n"+event.detail);
        })


        function handleHashChange() {
            var hash = window.location.hash.substr(1);

            var routes = [
                {
                    pattern: /^\/read$/,
                    handler: new ReadBooksController().handle
                },
                {
                    pattern: /^\/unread$/,
                    handler: new UnreadBooksController().handle
                },
                {
                    pattern: /^\/statistics/,
                    handler: new StatisticsController().handle
                },
                {
                    pattern: /^\/book\/([0-9]+)$/,
                    handler: new EditBookController().handleExisting
                },

                {
                    pattern: /^\/new$/,
                    handler: new EditBookController().handleCreateNew
                }

            ];

            for (var i = 0; i < routes.length; i++) {
                var handler = routes[i];
                var match = hash.match(handler.pattern);
                if (match !== null) {
                    var handlerArgs = match.splice(1);
                
                    handler.handler(...handlerArgs);
                    mainMenu.notifyChange(hash);
                }
            }

        }
    }, 

};
