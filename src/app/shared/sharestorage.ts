export class SharedStorage {
    private Obj: any = {}

    /*
      *Key
    */
    getStorage(key) {
        if (key)
            return this.Obj[key]
        else
            return null
    }

    /*
      *Key
      *value
    */

    setStorage(key, value) {
        if (key && value)
            this.Obj[key] = value
        else if (key)
            this.Obj[key] = null
        else
            console.error('Empty key not allowed');


    }
}