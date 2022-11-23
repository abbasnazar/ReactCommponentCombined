import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "app/common/apiSeivice";


@Injectable()

export class TalentService {
    private apiHelper = new ApiService()
    constructor(
        private http: HttpClient
    ) { }

    get(pageno, type, sdate = 'all', edate = 'all') {
        return this.http.get(this.apiHelper.path(`/api/talents/get?pageno=${pageno}&type=${type}&sdate=${sdate}&edate=${edate}`), this.apiHelper.getAccessToken())
    }

    // post_resume(obj) {
    //     console.log('fileresume---------', obj)
    //     return this.http.post(this.apiHelper.path('/api/talents/post_resume'), obj, this.apiHelper.getAccessToken())
    // }
    upldParse(obj) {
        console.log('upldParse---------', obj)
        return this.http.post(this.apiHelper.path('/api/talents/requestinsert'), obj, this.apiHelper.getAccessToken())
    }
    apiParse(obj) {
        console.log('apiParse---------', obj)
        return this.http.post(this.apiHelper.path('/api/talents/post_resume'), obj, this.apiHelper.getAccessToken())
    }

    insert(obj) {
        console.log('insert---------', obj)
        return this.http.post(this.apiHelper.path('/api/talents/insert'), obj, this.apiHelper.getAccessToken())
    }

    update(obj) {
        return this.http.post(this.apiHelper.path('/api/talents/update'), obj, this.apiHelper.getAccessToken())
    }

    getTelentSource() {
        return this.http.get(this.apiHelper.path('/api/common/'), this.apiHelper.getAccessToken())
    }

    talentRequest(obj, type) {
        console.log('talentRequest',obj)
        return this.http.post(this.apiHelper.path(`/api/talents/requesttalent?type=${type}`), obj, this.apiHelper.getAccessToken())
    }

    submitTalents(list) {
        return this.http.post(this.apiHelper.path(`/api/talents/submitTalents`), list, this.apiHelper.getAccessToken())
    }

    talentRequestSummary(sdate, edate, pageno, jobstatus) {
        return this.http.get(this.apiHelper.path(`/api/talents/requesttalentsummary/${jobstatus}?sdate=${sdate}&edate=${edate}&pageno=${pageno}`), this.apiHelper.getAccessToken())
    }

    getTalentByTelantRequestId(trid, pageno = 'all', talentid = 'all',) {
        console.log('nazarfinding for mindtree',trid)
        return this.http.get(this.apiHelper.path(`/api/talents/telentbytalentrequestid/${trid}?pageno=${pageno}&talentid=${talentid}`), this.apiHelper.getAccessToken())
    }

    GetTalentDetailByTalentStatus(status, sdate = 'all', edate = 'all') {
        return this.http.get(this.apiHelper.path(`/api/talents/Talentsdetailbytalents/${status}?sdate=${sdate}&edate=${edate}`), this.apiHelper.getAccessToken())
    }

    getTalentByJobId(jobid) {
        return this.http.get(this.apiHelper.path(`/api/talents/byjobid/${jobid}`), this.apiHelper.getAccessToken())
    }

    talentDashboard(type) {
        return this.http.get(this.apiHelper.path('/api/talents/talentdashboard?type=' + type), this.apiHelper.getAccessToken())
    }

    deleteTalentRequest(trid, type) {
        return this.http.get(this.apiHelper.path(`/api/talents/deletetalentrequest/${trid}?type=${type}`), this.apiHelper.getAccessToken())
    }
    
    gettalentjobmapping(token) {
        return this.http.get(this.apiHelper.path(`/api/talents/talentjobmapping?token=${token}`))
    }

    submittalsTalents(list) {
        return this.http.post(this.apiHelper.path(`/api/talents/submittals`), list, this.apiHelper.getAccessToken())
    }

    screentoqualified(list) {
        return this.http.post(this.apiHelper.path(`/api/talents/makequalified`), list, this.apiHelper.getAccessToken())
    }

    videotoqualified(list) {
        return this.http.post(this.apiHelper.path(`/api/talents/makevideoqualified`), list, this.apiHelper.getAccessToken())
    }

    talentRequestSummaryByJobId(jobid) {
        return this.http.get(this.apiHelper.path(`/api/talents/talentrequestsummary/byjobid?jobid=${jobid}`), this.apiHelper.getAccessToken())
    }

    share(obj) {
        return this.http.post(this.apiHelper.path(`/api/talents/sharechatlink`), obj, this.apiHelper.getAccessToken())
    }

    shareCallDetails(obj) {
        return this.http.post(this.apiHelper.path(`/api/robotics/clickToCall`), obj, this.apiHelper.getAccessToken())
    }

    submissionEmail(obj) {
        return this.http.post(this.apiHelper.path(`/api/talents/submissionemail`), obj, this.apiHelper.getAccessToken())
    }
    // uploadPortal(printList, type) {
    //     console.log("printlist",printList)
    //     return this.http.post(this.apiHelper.path(`/api/talents/uploadtalent?type=${type}`), printList, this.apiHelper.getAccessToken())
        
    //     // return this.http.post(this.apiHelper.path(`/api/talents/uploadtalent?type=${type}`), {name:"nazar"}, this.apiHelper.getAccessToken())
    // }
    // uploadPortal(finalObj, type) {
    //         console.log("finalOb",finalObj)
    //         return this.http.post(this.apiHelper.path(`/api/talents/uploadtalent?type=${type}`), finalObj, this.apiHelper.getAccessToken())
            
            // return this.http.post(this.apiHelper.path(`/api/talents/uploadtalent?type=${type}`), {name:"nazar"}, this.apiHelper.getAccessToken())
        // }

    emailReply(obj) {
        return this.http.post(this.apiHelper.path('/api/talents/emailreply'), obj, this.apiHelper.getAccessToken())
    }

    getJobAppliedByTalent(talentid) {
        return this.http.get(this.apiHelper.path('/api/talents/jobsbytalent?talentid=' + talentid), this.apiHelper.getAccessToken())
    }

    getTalentByToken(token) {
        return this.http.get(this.apiHelper.path(`/api/talents/getsubmittedtalentbytoken?token=${token}`))
    }

}