import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./common/apiSeivice";


@Injectable()

export class AppService {
    private apiHelper = new ApiService()
    constructor(
        private http: HttpClient,
    ) { }

    emailOptions: any = [{ label: 'Skill', value: 'keyskills' }, { label: 'Agency Name/ Vendor name', value: 'vender' }, { label: 'Candidate Name', value: 'name' }, { label: 'Email ID', value: 'email' }, { label: 'Mobile', value: 'mobile' }, { label: 'Notice Period', value: 'noticeperiod' },
    { label: 'Current Location', value: 'currentcity' }, { label: 'Preferred Location', value: 'preferredlocation' }, { label: 'Total Yr of Work Exp', value: 'totalexperienceyear' }, { label: 'Relevant work Exp.', value: 'totalexperienceyear' }, { label: 'Current Payroll Company', value: 'payroll' },
    { label: 'Highest Education', value: 'highestdegree' }, { label: 'Pancard Number', value: 'panno' }, { label: 'Internal POC', value: 'poc' }, { label: 'Panels', value: 'pannel' }, { label: 'Current CTC', value: 'ctc' },
    { label: 'Expected CTC', value: 'expctc' }, { label: 'Rate', value: 'rate' }];

    upload: any = [{ label: 'title', value: 'title' },{ label: 'Candidate Name', value: 'name' }, { label: 'Email ID', value: 'email' }, { label: 'Mobile', value: 'mobile' }, { label: 'Notice Period', value: 'notice_period' },
    { label: 'Current Location', value: 'currentcity' },{ label: 'Total Yr of Work Exp', value: 'totalexperienceyear' }, { label: 'Relevant work Exp.', value: 'relevant_experience' }, { label: 'Current Payroll Company', value: 'payroll' },
    { label: 'buyrate', value: 'buyrate' }, { label: 'Pancard Number', value: 'pan_number' },{ label: 'dateofbirth', value: 'dateofbirth' }];

    getFile(path) {
        return this.apiHelper.path('/api/file/' + path)
    }

    getSettings = () => {
        return this.http.get(this.apiHelper.path('/api/common/getsettings'), this.apiHelper.getAccessToken())
    }

    updateSettings = (obj) => {
        return this.http.post(this.apiHelper.path('/api/common/updatesetting'), obj, this.apiHelper.getAccessToken())
    }

    insertSettings = (obj) => {
        return this.http.post(this.apiHelper.path('/api/common/insertsetting'), obj, this.apiHelper.getAccessToken())
    }

    updateRpaSettings = (obj) => {
        return this.http.post(this.apiHelper.path('/api/common/updaterpasetting'), obj, this.apiHelper.getAccessToken())
    }

    deleteRpaSettings = (id) => {
        return this.http.get(this.apiHelper.path('/api/common/deleterpasetting?id=' + id), this.apiHelper.getAccessToken())
    }

    insertRpaSettings = (obj) => {
        return this.http.post(this.apiHelper.path('/api/common/insertrpasetting'), obj, this.apiHelper.getAccessToken())
    }

    getViewMetadata(name) {
        return this.http.get(this.apiHelper.path('/api/viewmetadata/get?name=' + name), this.apiHelper.getAccessToken())
    }

    updateViewMetadata(obj) {
        return this.http.post(this.apiHelper.path('/api/viewmetadata/update'), obj, this.apiHelper.getAccessToken())
    }

    getSignUrl = (bucket, filename) => {
        return this.http.get(this.apiHelper.path(`/api/common/signurl?bucket=${bucket}&filename=${filename}`))
    }

}