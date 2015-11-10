(function(){


    define(["jquery", "bookViewModel"], function($, bookViewModel){



        return {
            sortAndCluster: function(listOfBooks, groupByStrategy) {
                var sortedBooks = listOfBooks.slice();
                sortedBooks.sort(groupByStrategy.sort);
                var clusters = [];
                var lastCluster = null;
                $.each(sortedBooks, function(){
                    var currentCluster = groupByStrategy.group(this);
                    if(lastCluster === null || currentCluster.title != lastCluster.title) {
                        lastCluster = currentCluster;
                        clusters.push(currentCluster);
                    }
                    var model = bookViewModel.forBook(this);
                    lastCluster.books.push(model);
                });


                return {clusters: clusters, count: sortedBooks.length };
            },
            groupByReadMonth: {sort: readDateComparator, group: readMonthClusterFinder},
            groupByAuthor: {sort: byAuthorComparator, group: byAuthorClusterFinder}
        }

        function readDateComparator(first, second) {
            if(first.read_date === null) {
                return -1;
            }
            if(second.read_date === null) {
                return 1;
            }
            if (first.read_date == second.read_date) {
                return first.title > second.title ? 1 : -1;
            }
            return first.read_date > second.read_date ? -1 : 1;
        };

        function readMonthClusterFinder(book){
            const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            var readDate = book.read_date;
            if(readDate === null) {
                return new Cluster("Wird Gelesen");
            }

            return new Cluster(monthNames[readDate.getMonth()]+ " "+readDate.getFullYear());
        }

        function byAuthorComparator(first, second) {
            var firstName = byAuthorClusterFinder(first).title.toLocaleLowerCase();
            var secondName = byAuthorClusterFinder(second).title.toLocaleLowerCase();

            return firstName > secondName ? 1 : -1;
        }

        function byAuthorClusterFinder(element){
            return new Cluster((element.last_name+", "+element.first_name+" "+(element.middle_name == null ? "" : element.middle_name)).trim());
        }

        function Cluster(title) {
            this.title = title;
            this.books = [];
        }
    });
})();