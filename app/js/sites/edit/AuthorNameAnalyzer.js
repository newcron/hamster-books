module.exports = class AuthorNameAnalyzer {
    analyzeCompleteNameFromString(authorString) {

        if (!authorString) {
            return null;
        }
        if(authorString instanceof Array) {
            authorString = authorString.shift();
        }
        var authorExploded = authorString.split(" ");
        var author = {first_name: "", last_name: "", middle_name: ""};
        if (authorExploded.length == 1) {
            author.last_name = authorExploded[0];
        } else if (authorExploded.length == 2) {
            author.last_name = authorExploded[1];
            author.first_name = authorExploded[0];
        } else {
            author.first_name = authorExploded[0];
            author.last_name = authorExploded[authorExploded.length - 1];
            author.middle_name = authorExploded.splice(0, 1).splice(-1, 1).join(" ");
        }

        return author;
    }
};