import { Component, OnInit } from '@angular/core';
import { ChatBotService } from '../chatbot/chatbot.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TalentService } from '../talents/talent.service';
import { FormGroup } from '@angular/forms';
declare var MediaRecorder: any;

@Component({
  selector: 'app-video-uploader',
  templateUrl: './video-uploader.component.html',
  styleUrls: ['./video-uploader.component.css']
})
export class VideoUploaderComponent implements OnInit {
  file: any
  videoInfoObj: any = []
  private token: string
  percentDone: string = '0%';
  isloader: boolean = false
  fileName: string = ''
  errMsg: string = null
  isButtonShow: boolean = false
  isVideoUploader: boolean = false
  uploadingType: string
  videoChunk: any = []
  blink: string
  videoButton: string = 'r'
  message: any;
  name: string;
  unlockSessionForm: any = {};

  private videoRecorderObj: any
  constructor(
    private _chat: ChatBotService,
    private route: ActivatedRoute,
    private tostr: ToastrManager,
    private _talent: TalentService
  ) {
    route.queryParams.subscribe(
      item => {
        this.token = item.token
      }
    )
  }

  ngOnInit() {
    this.load()
  }

  load() {
    if (!this.token)
      this.uploadingType = 'error'
    this._talent.gettalentjobmapping(this.token).subscribe(
      (resp: Response) => {
        this.videoInfoObj = resp
        if (this.videoInfoObj.length == 0)
          this.uploadingType = 'error'
        if (this.videoInfoObj.length > 0 && !this.videoInfoObj[0].video)
          this.uploadingType = 'file'
        if (this.videoInfoObj.length > 0 && this.videoInfoObj[0].video)
          this.uploadingType = 'submitted'
      }, (err: Response) => {
        console.log(err);
      }
    )
  }

  upload() {
    if (this.uploadingType == 'video') {
      let blobData = new Blob(this.videoChunk, {
        type: "video/mp4"
      })
      let fd = new FormData();
      fd.append('file', blobData, 'video.mp4')
      this.file = fd
    }
    this.uploadingType = 'file'
    if (!this.fileName)
      return this.tostr.errorToastr('Please select video', 'Oops')
    // if (this.errMsg)
    //   return //this.tostr.errorToastr('Please select video', 'Oops')

    this.isButtonShow = true
    this.isloader = true
    this._chat.uploadVideo(this.token, this.file)
      .subscribe(event => {
        if (event['loaded']) {
          this.percentDone = (Math.round(100 * event['loaded'] / event['total'])) + '%'
        }
        if (event['status'] == 200) {
          this.isloader = false
          this.isVideoUploader = true
          this.uploadingType = 'done'
        }
        if (event['ok'] == false) {
          this.isloader = false
          this.isButtonShow = false
          this.uploadingType = 'error'
          this.percentDone = '0%'
          this.errMsg = 'Something went wrong !!!'
        }
      }), (err: Response) => {
        this.percentDone = '0%'
        this.isloader = false
        this.uploadingType = 'error'
        this.errMsg = 'Something went wrong !!!'
      }
  }

  getVideo() {
    const video = document.getElementsByTagName('video')
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          this.videoRecorderObj = new MediaRecorder(stream);
          video[0].srcObject = stream
        }).catch((err) => {
          console.log(err);
        })
    }
  }

  mediaControl(action) {
    switch (action) {
      case 'startRecording': {
        this.videoRecorderObj.start()
        this.blink = 'blink'
        this.videoButton = 's'
        break;
      }
      case 'stopRecording': {
        this.blink = ''
        this.videoRecorderObj.stop()
        this.videoRecorderObj.ondataavailable = (ev) => {
          this.videoChunk.push(ev.data)
        }
        this.videoButton = 'u'
        break;
      }




    }


  }


  uploader(file) {
    // this.uploadImage=file[0]
    if (file && file[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = (event) => {
        // console.log(event.target['result']);
        // this.imageUrl = event.target['result'];
      }
    }
  }

  uploadAndProgress(files: File[]) {
    console.log(files);
    this.fileName = ""
    this.errMsg = ''
    if (files[0].type.indexOf('video') == -1) {
      this.tostr.errorToastr('Only video file allowed', 'Error')
      return
    }
    this.fileName = files[0]['name']
    let formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.file = formData
  }




}
