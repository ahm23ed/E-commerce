import { roles } from "../../middleware/auth.js"


export const endpoint={
    create:[roles.Admin],
    update:[roles.Admin],
    get:[roles.Admin,roles.User]

}