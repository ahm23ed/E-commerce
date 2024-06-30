import { roles } from "../../middleware/auth.js"


export const endpoint={
    updatePassword:[roles.Admin,roles.User],
    getUserById:[roles.Admin,roles.User],
    softDeleteProfile:[roles.Admin,,roles.User],
    blockAccount:[roles.Admin]

}