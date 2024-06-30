import { roles } from "../../middleware/auth.js"


export const endpoint={
    createsubcategory:[roles.Admin],
    updatecsubategory:[roles.Admin],
    subcategoryById:[roles.Admin,roles.User]
   

}