var textCM =document.querySelector(".cm");
var textKG =document.querySelector(".kg");
var btn =document.querySelector(".Calculation");
var result =document.querySelector('.result');
var box =document.querySelector('.box');
var bmi =document.querySelector('.bmi');
var bmiresult =document.querySelector('.bmiresult');
var img = document.querySelector('.img');
var list =document.querySelector(".list");
var del =document.querySelector(".list");
var data =JSON.parse(localStorage.getItem('BIM')) || [];




Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}


var time2 = new Date().format("yyyy-MM-dd");

btn.addEventListener("click",function(e){
    if(textCM.value=="" && textKG.value==""){
        return
    }
    var txtcm =parseInt(textCM.value);
    var txtkg =parseInt(textKG.value);
    var tatal = (txtkg/(txtcm*txtcm/10000)).toFixed(2);
    var size ="";
    var colur="";
    if(tatal<25 && tatal>=18.5){
        size ="理想體重"
        colour="#89d640"
    } else if(tatal <18.5){
        size="體重不足"
        colour="#31bcf7"
    }else if(tatal<30 && tatal>=25){
        size="體重過重"
        colour="#ff962e"
    }else if(tatal <35 && tatal>=30){
        size="中等肥胖"
        colour="#ff6d05"
    }else if(tatal >35 ){
        size="嚴重肥胖"
        colour="#ff1100"
    }

    var txt={
        BMI:tatal
        ,bodyWeight:txtkg
        ,height:txtcm
        ,Date:time2
        ,status:size
        ,color:colour
    };
    data.push(txt);
    updatalist(data);
    localStorage.setItem("BIM",JSON.stringify(data));
    

    function trun(data){
        textCM.value ="";
        textKG.value ="";
        box.style.display="block";
        btn.style.display="none";
        result.value=tatal;
        result.style.color=colour;
        result.style.border="6px solid "+colour+"";
        bmi.style.color=colour;
        bmiresult.style.color=colour;
        bmiresult.textContent=size;
        img.style.background=colour;
    }
    trun(data);

    img.addEventListener('click',function(e){
        box.style.display="none";
        btn.style.display="block";
    })
})

function updatalist(items){
    str="";
    var len = items.length;
    for(var i=0 ; len>i ;i++){
        str +="<li style='border-left:7px solid "+items[i].color+";'><span>"+items[i].status+"</span><span class='text'>BMI</span><span>"+items[i].BMI+"</span><span><span class='text'>weight</span>"+items[i].bodyWeight+"</span><span><span class='text'>height</span>"+items[i].height+"</span><span><span class='text'>date</span>"+items[i].Date+"</span><a href=# data-index="+i+">刪除</a></li>";

    }
    list.innerHTML =str;

}






del.addEventListener('click',function(e){
    e.preventDefault();
    if(e.target.tagName !== "A"){return};
    var index =e.target.dataset.index;
    console.log(index);
    data.splice(index, 1);
    localStorage.setItem('BIM',JSON.stringify(data));
    updatalist(data);
})