import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "app/common/apiSeivice";



@Injectable()

export class AdminService {
    private apiHelper = new ApiService()
    constructor(private http: HttpClient) { }

    // job type api 

    getJobType = (pageno = null) => {
        return this.http.get(this.apiHelper.path(`/api/jobtype/get`), this.apiHelper.getAccessToken())
    }

    insertJobType = (obj) => {
        return this.http.post(this.apiHelper.path('/api/jobtype/insert'), obj, this.apiHelper.getAccessToken())
    }

    updateJobType = (obj) => {
        return this.http.post(this.apiHelper.path('/api/jobtype/update'), obj, this.apiHelper.getAccessToken())
    }

    // company type api

    getCompanyType = (pageno = null) => {
        return this.http.get(this.apiHelper.path(`/api/companytype/get?pageno=${pageno}`), this.apiHelper.getAccessToken())
    }

    insertCompanyType = (obj) => {
        return this.http.post(this.apiHelper.path('/api/companytype/insert'), obj, this.apiHelper.getAccessToken())
    }

    updateCompanyType = (obj) => {
        return this.http.post(this.apiHelper.path('/api/companytype/update'), obj, this.apiHelper.getAccessToken())
    }

    //  position type apis

    getPositionType = (pageno = null) => {
        return this.http.get(this.apiHelper.path(`/api/common/getposition?pageno=${pageno}`), this.apiHelper.getAccessToken())
    }

    insertPositionType = (obj) => {
        return this.http.post(this.apiHelper.path('/api/common/insertposition'), obj, this.apiHelper.getAccessToken())
    }

    updatePositionType = (obj) => {
        return this.http.post(this.apiHelper.path('/api/common/updateposition'), obj, this.apiHelper.getAccessToken())
    }

    // experience lavel api

    getExperienceLevel = (pageno = null) => {
        return this.http.get(this.apiHelper.path(`/api/common/getexperiencelevel?pageno=${pageno}`), this.apiHelper.getAccessToken())
    }

    addExperienceLevel = (obj) => {
        return this.http.post(this.apiHelper.path('/api/common/addexperiencelevel'), obj, this.apiHelper.getAccessToken())
    }

    updateExperienceLevel = (obj) => {
        return this.http.post(this.apiHelper.path('/api/common/updateexperiencelevel'), obj, this.apiHelper.getAccessToken())
    }

    // 

    getDropdownCompanyPersonAndContact = () => {
        return this.http.get(this.apiHelper.path('/api/companies/dropdown/companypersonandcontact'), this.apiHelper.getAccessToken())
    }

    getDropdownIndustry = () => {
        return this.http.get(this.apiHelper.path('/api/industry/get'), this.apiHelper.getAccessToken())
    }

    // City apis 

    getCity = () => {
        return this.http.get(this.apiHelper.path('/api/cities/get'), this.apiHelper.getAccessToken())
    }

    addCity = (obj) => {
        return this.http.post(this.apiHelper.path('/api/cities/add'), obj, this.apiHelper.getAccessToken())
    }

    updateCity = (obj) => {
        return this.http.post(this.apiHelper.path('/api/cities/update'), obj, this.apiHelper.getAccessToken())
    }

    //   curriencies apis 

    getCurriencies = () => {
        return this.http.get(this.apiHelper.path('/api/common/getcurrencies'), this.apiHelper.getAccessToken())
    }
    addCurriencies = (obj) => {
        return this.http.post(this.apiHelper.path('/api/common/addcurrencies'), obj, this.apiHelper.getAccessToken())
    }
    updateCurriencies = (obj) => {
        return this.http.post(this.apiHelper.path('/api/common/updatecurrencies'), obj, this.apiHelper.getAccessToken())
    }

    // Roles apis ---------->

    getRoles = (pageno = null) => {
        return this.http.get(this.apiHelper.path(`/api/roles/get?pageno=${pageno}`), this.apiHelper.getAccessToken())
    }

    addRoles = (obj) => {
        return this.http.post(this.apiHelper.path('/api/roles/add'), obj, this.apiHelper.getAccessToken())
    }

    updateRoles = (obj) => {
        return this.http.post(this.apiHelper.path('/api/roles/update'), obj, this.apiHelper.getAccessToken())
    }

    assignRight = (obj) => {
        return this.http.post(this.apiHelper.path('/api/roles/assignright'), obj, this.apiHelper.getAccessToken())
    }

    getAssignRight = (roleid) => {
        return this.http.get(this.apiHelper.path('/api/roles/getright/' + roleid), this.apiHelper.getAccessToken())
    }

    // group Apis -------------------->

    getGroups = (pageno = null) => {
        return this.http.get(this.apiHelper.path(`/api/department/get/?pageno=${pageno}`), this.apiHelper.getAccessToken())
    }

    addGroup = (obj) => {
        return this.http.post(this.apiHelper.path('/api/department/add'), obj, this.apiHelper.getAccessToken())
    }

    updateGroup = (obj) => {
        return this.http.post(this.apiHelper.path('/api/department/update'), obj, this.apiHelper.getAccessToken())
    }


    assignRoles = (obj) => {
        return this.http.post(this.apiHelper.path('/api/employees/assign/role'), obj, this.apiHelper.getAccessToken())
    }

    assignGroup = (obj) => {
        return this.http.post(this.apiHelper.path('/api/employees/assign/department'), obj, this.apiHelper.getAccessToken())
    }

    // Employees Apis --------------------->

    getUsers = (pageno = null) => {
        return this.http.get(this.apiHelper.path(`/api/employees/get?pageno=${pageno}`), this.apiHelper.getAccessToken())
    }

    getUsersofclient = (id) => {
        return this.http.get(this.apiHelper.path(`/api/employees/getUsersofclient?accountid=${id}`), this.apiHelper.getAccessToken())
    }

    addUser = (obj) => {
        return this.http.post(this.apiHelper.path('/api/employees/add'), obj, this.apiHelper.getAccessToken())
    }

    updateUser = (obj) => {
        return this.http.post(this.apiHelper.path('/api/employees/update'), obj, this.apiHelper.getAccessToken())
    }

    // metadata

    getMetaData = (tablename = 'all', status = 'all') => {
        return this.http.get(this.apiHelper.path(`/api/common/getmetadata?tablename=${tablename}&status=${status}`), this.apiHelper.getAccessToken())
    }
    addMetaData = (obj) => {
        return this.http.post(this.apiHelper.path('/api/common/addmetadata'), obj, this.apiHelper.getAccessToken())
    }

    updateMetaData = (obj) => {
        return this.http.post(this.apiHelper.path('/api/common/updatemetadata'), obj, this.apiHelper.getAccessToken())
    }

    uploadEmailTemp = (obj) => {
        return this.http.post(this.apiHelper.path('/api/writefile/emailtemplate'), obj, this.apiHelper.getAccessToken())
    }

    getEmailTemp = (emailType) => {
        return this.http.get(this.apiHelper.path('/api/common/getemailtemplate?emailType=' + emailType), this.apiHelper.getAccessToken())
    }

    getAdminUser = () => {
        return this.http.get(this.apiHelper.path('/api/common/getusers'), this.apiHelper.getAccessToken())
    }

    //  state apis 

    getStates = () => {
        return this.http.get(this.apiHelper.path('/api/states/get'), this.apiHelper.getAccessToken())
    }

    addStates = (obj) => {
        // obj.createdby = this.root.getUser('id')
        return this.http.post(this.apiHelper.path('/api/states/add'), obj, this.apiHelper.getAccessToken())
    }

    updateStates = (obj) => {
        return this.http.post(this.apiHelper.path('/api/states/update'), obj, this.apiHelper.getAccessToken())
    }

    // countries apis 

    getCountries = () => {
        return this.http.get(this.apiHelper.path('/api/countries/get'), this.apiHelper.getAccessToken())
    }

    addCountries = (obj) => {
        return this.http.post(this.apiHelper.path('/api/countries/add'), obj, this.apiHelper.getAccessToken())
    }
    updateCountries = (obj) => {
        return this.http.post(this.apiHelper.path('/api/countries/update'), obj, this.apiHelper.getAccessToken())
    }



}