const formatString = (str)=>{
    str = str.split('\n')[0]
    let temp = str.split(',')
     str = ''
     temp.forEach((strChunk,index) => {
        str += strChunk
        // if(index ! = temp.length-1)
        //     str += ' '
     });
     return str
}
export class ExportCSV {
    private dataArray:any[]

    constructor(data:any[]){
        this.dataArray = data;
    }

    private convertToCSV(){
        let array = typeof this.dataArray != 'object'? JSON.parse(this.dataArray):this.dataArray;

        let str = '';
        let row = '';

        for(let key in this.dataArray[0]){
            str += key + ',';
        }
        row = row.slice(0,-1);
        str += row + '\r\n';

        for(let i=0;i<array.length;i++){
            let line = ''

            for(let key in array[i]){
                //if(line != '') line += ''
                line +=  formatString(String(array[i][key])) + ','
            }
            str+=line + '\r\n';
        }
        return str
    }

    download(filename:string){
        if(this.dataArray.length == 0 ) return false;
        let data = this.convertToCSV()
        
        let a  = document.createElement("a");
        a.setAttribute('style','display:none;');
        document.body.appendChild(a);
        let blob = new Blob([data],{type:'text/csv'});
        let url = window.URL.createObjectURL(blob);
        a.href = url
        a.download = filename + '.csv'
        a.click();
        return true;
    }
}