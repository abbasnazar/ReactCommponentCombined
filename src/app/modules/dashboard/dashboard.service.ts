import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "app/common/apiSeivice";
import { Root } from "app/common/root";


@Injectable()

export class DashboardService {
    private apiHelper = new ApiService()
    constructor(
        private http: HttpClient,
        private root: Root
    ) { }

    getStats = () => {
        return this.http.get(this.apiHelper.path('/api/dashboard/stats'), this.apiHelper.getAccessToken())
    }

    getTalentChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/chart`), obj, this.apiHelper.getAccessToken())
    }

    getJobChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/jobchart`), obj, this.apiHelper.getAccessToken())
    }

    getJobsByStatus = (pageno) => {
        let type = this.root.getUser('type') == 'admin' ? 'all' : null
        return this.http.get(this.apiHelper.path(`/api/jobs/jobsbystatus?pageno=${pageno}&type=${type}&status=Open`), this.apiHelper.getAccessToken())
    }

    getAdminStats = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminstat`), obj, this.apiHelper.getAccessToken())
    }

    getAdminSubmissionChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminsubmissionchart`), obj, this.apiHelper.getAccessToken())
    }

    getAdminTalentChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/admintalentchart`), obj, this.apiHelper.getAccessToken())
    }

    getAdminAddedJobChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminaddedjobchart`), obj , this.apiHelper.getAccessToken())
    }

    getAdminJobAddedVsSubmissionChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminjobaddedvssubmissionchart`), obj , this.apiHelper.getAccessToken())
    }

    getAdminTeamWiseJobChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminteamwisejobchart`), obj , this.apiHelper.getAccessToken())
    }

    getAdminTeamWiseTalentExtractedVsClickToCall = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminteamwisetalentextractedvsclicktocall`), obj, this.apiHelper.getAccessToken())
    }
    
    getAdminTeamWiseTalentExtractedVsRightToRepresent = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminteamwisetalentextractedvsrighttorepresent`), obj, this.apiHelper.getAccessToken())
    }

    getAdminTeamWiseTalentExtractedVsVideoUploaded = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminteamwisetalentextractedvsvideouploaded`), obj, this.apiHelper.getAccessToken())
    }

    getAdminTeamWiseTalentExtractedVsTalentsQualified = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminteamwisetalentextractedvstalentqualified`), obj , this.apiHelper.getAccessToken())
    }

    getAdminClientWiseJobChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminclientwisejobchart`), obj , this.apiHelper.getAccessToken())
    }

    getAdminClientWiseTalentExtractedVsClickToCall= (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminclientwisetalentextractedvsclicktocall`), obj , this.apiHelper.getAccessToken())
    }

    getAdminClientWiseTalentExtractedVsRightToRepresent= (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminclientwisetalentextractedvsrighttorepresent`), obj , this.apiHelper.getAccessToken())
    }

    getAdminClientWiseTalentExtractedVsVideoUploaded= (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminclientwisetalentextractedvsvideouploaded`), obj, this.apiHelper.getAccessToken())
    }

    getAdminClientWiseTalentExtractedVsTalentsQualified= (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminclientwisetalentextractedvstalentqualified`), obj , this.apiHelper.getAccessToken())
    }

    getAdminLocationWiseJobChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminlocationwisejobchart`), obj, this.apiHelper.getAccessToken())
    }

    getAdminExperienceWiseJobChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminexperiencewisejobchart`), obj , this.apiHelper.getAccessToken())
    }
    getAdminIndustryWiseJobChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminindustrywisejobchart`), obj , this.apiHelper.getAccessToken())
    }
    getAdminLocationWiseTalentChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminlocationwisetalentchart`), obj , this.apiHelper.getAccessToken())
    }
    getAdminExperienceWiseTalentChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminexperiencewisetalentchart`), obj, this.apiHelper.getAccessToken())
    }
    getAdminIndustryWiseTalentChart = (obj) => {
        return this.http.post(this.apiHelper.path(`/api/dashboard/adminindustrywisetalentchart`), obj , this.apiHelper.getAccessToken())
    }
}