import { roles } from "../../middleware/auth.js"


export const endpoint={
    add:[roles.Admin,roles.User],
    remove:[roles.Admin,roles.User],
    

}