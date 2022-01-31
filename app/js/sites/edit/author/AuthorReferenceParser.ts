export class AuthorReferenceParser {
    public parse(input: string) : AuthorReference {
        if(input.indexOf(",")===-1) {
            return {
                lastName: input
            }
        } else { 
            
            const commaPos = input.indexOf(",");

            const lastName = input.substring(0, commaPos);
            const firstNames = input.substring(commaPos+1).trim();
            
            const firstNameSpacePos = firstNames.indexOf(" "); 
            if(firstNameSpacePos===-1) {
                return {
                    lastName: lastName,
                    firstName: firstNames
                }
            }
            
            return {
                lastName: lastName, 
                firstName: firstNames.substring(0, firstNameSpacePos).trim(), 
                middleName: firstNames.substring(firstNameSpacePos).trim()
            }

            
        }
    }
}

export interface AuthorReference { 
    lastName?: string; 
    firstName? : string;
    middleName?: string;
}