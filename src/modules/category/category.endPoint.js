import { roles } from "../../middleware/auth.js"


export const endpoint={
    createcategory:[roles.Admin],
    updatecategory:[roles.Admin],
   

}