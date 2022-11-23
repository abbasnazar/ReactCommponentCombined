import { Injectable } from "@angular/core";


@Injectable()

export class Root {

    userInFo(user) {
        localStorage.setItem('auth', JSON.stringify(user))
    }

    getUser(key?) {
        let userObj = JSON.parse(localStorage.getItem('auth'))
        if (!key)
            return userObj
        else
            return userObj[key]
    }

    validate() {
        let userObj = JSON.parse(localStorage.getItem('auth'))
        if (!userObj || (Object.entries(userObj).length === 0 && userObj.constructor === Object))             
            return false
        else
            return true
    }

}