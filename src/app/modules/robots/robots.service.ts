import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "app/common/apiSeivice";


@Injectable()

export class RobotsService {
    private apiHelper = new ApiService()
    constructor(
        private http: HttpClient
    ) { }
    vacancyType = ['Open', 'Inprocess', 'Close']
    priority = ['Low', 'Medium', 'High']
    positionType = ['Web Developer', 'Android Developer']

    InsertUpload = (finalList) => {
        return this.http.post(this.apiHelper.path('/api/upload/insert'), finalList, this.apiHelper.getAccessToken())
    }

    UpdateUpload = (finalList) => {
        return this.http.post(this.apiHelper.path('/api/upload/update'), finalList, this.apiHelper.getAccessToken())
    }

    getUpload = (pageno, type, sdate = 'all', edate = 'all', status = 'all') => {
        return this.http.get(this.apiHelper.path(`/api/upload/get?pageno=${pageno}&type=${type}&sdate=${sdate}&edate=${edate}&status=${status}`), this.apiHelper.getAccessToken())
    }

    getUploadForFilter = () => {
        return this.http.get(this.apiHelper.path('/api/upload/forfilter/'), this.apiHelper.getAccessToken())
    }

    getUploadForDashboard = () => {
        return this.http.get(this.apiHelper.path('/api/upload/jobdashboard'), this.apiHelper.getAccessToken())
    }

    getCountryStateCityFilter = () => {
        return this.http.get(this.apiHelper.path('/api/common/citystatecountryfilter'), this.apiHelper.getAccessToken())
    }

    getSkills = () => {
        return this.http.get(this.apiHelper.path('/api/common/getskills'), this.apiHelper.getAccessToken())
    }

    deleteUploadRequest(trid, type) {
        return this.http.get(this.apiHelper.path(`/api/talents/deleteuploadrequest/${trid}?type=${type}`), this.apiHelper.getAccessToken())
    }

    // uploadPortal(finalObj, type) {
        //   uploadPortal(Obj, type) {
            uploadPortal(Obj, type) {
              console.log("return check", Obj,type)
        return this.http.post(this.apiHelper.path(`/api/talents/uploadtalent?type=${type}`), Obj, this.apiHelper.getAccessToken())
    }

}