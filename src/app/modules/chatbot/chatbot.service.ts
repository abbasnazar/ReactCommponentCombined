import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ApiService } from "app/common/apiSeivice";


@Injectable()

export class ChatBotService {
   private apiHelper = new ApiService()
   constructor(private http: HttpClient) { }

   startChat(msg, token) {
      return this.http.get(this.apiHelper.path(`/api/chatbot/chat?msg=${msg}&token=${token}`))
   }
   insertChat(obj) {
      return this.http.post(this.apiHelper.path(`/api/chatbot/insert`), obj)
   }

   getChat(userid, jobid, type) {
      return this.http.get(this.apiHelper.path(`/api/chatbot/getchat/${userid}/${jobid}?type=${type}`))
   }

   getemailChat(userid, jobid, type) {
      return this.http.get(this.apiHelper.path(`/api/chatbot/getemailchat/${userid}/${jobid}?type=${type}`))
   }

   getChatByToken(token) {
      return this.http.get(this.apiHelper.path(`/api/chatbot/getchatbytoken?token=${token}`))
   }

   getJdByToken(token) {
      return this.http.get(this.apiHelper.path(`/api/chatbot/getjdbytoken?token=${token}`))
   }

   uploadVideo(token, file) {
      return this.http.post(this.apiHelper.path(`/api/chatbot/uploadvideo?token=${token}`), file, { reportProgress: true, observe: 'events', withCredentials: false })
   }

   getVideos(filepath) {
      return this.apiHelper.path(`/api/file/${filepath}`)
   }

   acceptMail(token) {
      return this.http.get(this.apiHelper.path(`/api/chatbot/acceptmail?token=${token}`))
   }

   getCallHistory(talentid, jobid) {
      return this.http.get(this.apiHelper.path(`/api/chatbot/callhistory?talentid=${talentid}&jobid=${jobid}`), this.apiHelper.getAccessToken())
   }
}