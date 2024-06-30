import { roles } from "../../middleware/auth.js"


export const endpoint={
    create:[roles.Admin,roles.User],
    update:[roles.Admin,roles.User],
    get:[roles.Admin,roles.User],

}