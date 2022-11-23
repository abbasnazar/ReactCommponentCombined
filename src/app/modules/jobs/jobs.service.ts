import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "app/common/apiSeivice";


@Injectable()

export class JobsService {
    private apiHelper = new ApiService()
    constructor(
        private http: HttpClient
    ) { }

    vacancyType = ['Open', 'Inprocess', 'Close']
    priority = ['Low', 'Medium', 'High']
    positionType = ['Web Developer', 'Android Developer']

    InsertJob = (obj) => {
        return this.http.post(this.apiHelper.path('/api/jobs/insert'), obj, this.apiHelper.getAccessToken())
    }

    UpdateJob = (obj) => {
        return this.http.post(this.apiHelper.path('/api/jobs/update'), obj, this.apiHelper.getAccessToken())
    }

    getJob = (pageno, type, sdate = 'all', edate = 'all', status = 'all') => {
        return this.http.get(this.apiHelper.path(`/api/jobs/get?pageno=${pageno}&type=${type}&sdate=${sdate}&edate=${edate}&status=${status}`), this.apiHelper.getAccessToken())
    }

    getJobForFilter = () => {
        return this.http.get(this.apiHelper.path('/api/jobs/forfilter/'), this.apiHelper.getAccessToken())
    }

    getJobForDashboard = () => {
        return this.http.get(this.apiHelper.path('/api/jobs/jobdashboard'), this.apiHelper.getAccessToken())
    }

    getCountryStateCityFilter = () => {
        return this.http.get(this.apiHelper.path('/api/common/citystatecountryfilter'), this.apiHelper.getAccessToken())
    }

    getSkills = () => {
        return this.http.get(this.apiHelper.path('/api/common/getskills'), this.apiHelper.getAccessToken())
    }

    deteteJob = (jobid) => {
        return this.http.get(this.apiHelper.path('/api/jobs/delete/' + jobid), this.apiHelper.getAccessToken())
    }

    talentRequest(obj, type) {
        console.log("printlist",obj)
        return this.http.post(this.apiHelper.path(`/api/talents/requesttalent?type=${type}`), obj, this.apiHelper.getAccessToken())
    }


}
