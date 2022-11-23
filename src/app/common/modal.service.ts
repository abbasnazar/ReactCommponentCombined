import { Injectable } from "@angular/core";
declare var $ :any


@Injectable()

export class ModalHelper{

    close(modalId){
     $("#"+modalId).modal("hide");
    }

    show(modalId){
        $("#"+modalId).modal("show");
    }
}