import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "app/common/apiSeivice";
import { Root } from "app/common/root";


@Injectable()

export class CrmService {
    private apiHelper = new ApiService()
    constructor(private http: HttpClient, private root: Root) { }

    // companies apis

    getCompanies = (pageno) => {
        return this.http.get(this.apiHelper.path(`/api/companies/get?pageno=${pageno}`), this.apiHelper.getAccessToken())
    }

    addCompanies = (obj) => {
        return this.http.post(this.apiHelper.path('/api/companies/add'), obj, this.apiHelper.getAccessToken())
    }

    updateCompanies = (obj) => {
        return this.http.post(this.apiHelper.path('/api/companies/update'), obj, this.apiHelper.getAccessToken())
    }


    // contact apis ------------>

    getContacts = (pageno = null) => {
        return this.http.get(this.apiHelper.path(`/api/contacts/get?pageno=${pageno}`), this.apiHelper.getAccessToken())
    }

    insertContacts = (obj) => {
        return this.http.post(this.apiHelper.path('/api/contacts/insert'), obj, this.apiHelper.getAccessToken())
    }

    updateContacts = (obj) => {
        return this.http.post(this.apiHelper.path('/api/contacts/update'), obj, this.apiHelper.getAccessToken())
    }
}