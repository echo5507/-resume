



// 全域變數

var district =document.querySelector('.district');
var content =document.querySelector('.content')
var hit =document.querySelector('.hit')
var contentnext =document.querySelector('.contentnext')
var titel = document.querySelector('.titel')
var article =document.querySelector('.article')




// ajax匯入
var ajax = new XMLHttpRequest();
ajax.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
ajax.send(null);
ajax.onload = function(){
    ajaxstr = JSON.parse(ajax.responseText);
     len = ajaxstr.result.records.length
      title =ajaxstr.result.records
    //   資料排序
      title =  title.sort(function(a,b){
        return a.Zone > b.Zone ? 1 : -1;
    });
    
    // 加入行政區
    datelist()

}


// 加入行政區
function datelist(e){ 
    var Zone="";
    var str="<option value=請選擇所在城市>- - 請選擇行政區- -</option> ";
    for(var i=0;len>i;i++){
        if( Zone !==title[i].Zone){
            str += '<option value="'+title[i].Zone+'">- - '+title[i].Zone+'- -</option> ' 
            Zone = title[i].Zone
        }
    }
    district.innerHTML = str;
}












// 動態更新行政區
function changeTravel(e){
    select =e.target.value;
    str ="";
    var t=0
    for (var i=0; len>i ;i++){

        if(select == title[i].Zone  ){
        
        area =  '<h2>'+title[i].Zone+'</h2>'
        str += '<li><img src="'+title[i].Picture1+'" height="155px" width="464px" ><span class="name">'+title[i].Name+'</span><span class="region">'+title[i].Zone+'</span><ul class="text"><li><img src="https://upload.cc/i1/2019/02/04/XERAVO.png" style="padding-right :9px;">'+title[i].Opentime+'</li><li><img src="img/icons_pin.png" style="padding-right :10px;">'+title[i].Add+'</li><li><img src="https://upload.cc/i1/2019/02/04/YIygoh.png" style="padding-right :15px; padding-left: 2px;" >'+title[i].Tel+'<span><img src="https://upload.cc/i1/2019/02/04/CQ0E8M.png" style="padding-right:8px;">'+title[i].Ticketinfo+'</span></li></ul></li>'
            t=t+1
        }

    }
    titel.innerHTML =area;
    article.innerHTML=str;
    

}


// 熱門點擊區

function open(e){
    if(e.target.tagName !== "A"){return};
    e.preventDefault();
    var turn = e.target.text;
    e.target.value =turn
    changeTravel(e)
}





// 監聽事件

district.addEventListener('change',changeTravel,false)

hit.addEventListener("click",open,false)


