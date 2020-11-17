




// /Vue component
Vue.component('countycomponent', {
    props: {
        aqielement: {},
        isstar: {
            type: Boolean,
            defalut: false,
        }
    },
    template: '#countycomponent',
    computed: {
        status() {
            if (this.aqielement.AQI <= 50) {
                return
            } else if (this.aqielement.AQI <= 100) {
                return 'status-aqi2';
            } else if (this.aqielement.AQI <= 150) {
                return 'status-aqi3';
            } else if (this.aqielement.AQI <= 200) {
                return 'status-aqi4';
            } else if (this.aqielement.AQI <= 300) {
                return 'status-aqi5';
            } else {
                return 'status-aqi6';
            }
        },
    },
    methods: {
        addStar: function () {
            this.$emit('addstarmark', this.item); //內部元件觸發
        },
        removeStar: function () {
            this.$emit('removestarmark', this.item); //內部元件觸發
        }
    }
})









var app = new Vue({
    el: '#app',
    data: {
        data: [], //物件陣列
        location: [], //縣市
        region:[], //區域
        box:[],
        area:'全部區域',
        currentPage: 0,
        stared: [], //關注
        filter: '臺東縣', //過濾縣市
        isstar: {
            type: Boolean,
            defalut: false,
        } 
    },
    // 請在此撰寫 JavaScript
    methods: {
        getData() {
            const vm = this;
            //使用JavaScript下載資料
            const xhr = new XMLHttpRequest();
            //放在github需透過第三方解譯才能夠拉資料
            const corsUrl = 'https://cors-anywhere.herokuapp.com/';
            const api = 'http://opendata2.epa.gov.tw/AQI.json';
            xhr.open('get', corsUrl + api);
            xhr.send(null);
            xhr.onload = function () {
                //獲取全部城市&排序 
                 vm.data = JSON.parse(xhr.responseText);
                 vm.data =  vm.data.sort(function(a,b){
                 return a.County < b.County ? 1 : -1;
                 });
                 let county  ="";
                for (let i = 0; i < vm.data.length; i++) {
                  if(vm.data[i].County !== county ){
                    vm.location.push(vm.data[i].County);
                    county =vm.data[i].County;
                  }
                    
                };
                
                //獲取上一次關注的資料
                const newStared = JSON.parse(localStorage.getItem('stared')) || [];
                vm.data.forEach(function (item) {
                    newStared.forEach(function (item2) {
                        if (item.SiteName == item2.SiteName) {
                            vm.stared.push(item);
                        }
                    })
                })
            };
        },
    
        //內層addstarmark觸發外層事件
        addStar: function (Staritem) {
            let vm = this;
            let data = vm.stared.find(function (item, index, array) {
                return item['SiteName'] == Staritem['SiteName'];
            });
            if (data == undefined) {
                vm.stared.push(Staritem);
                localStorage.setItem("stared", JSON.stringify(vm.stared));
            } else {
                return
            }
        },
        //內層removestarmark觸發外層事件 
        removeStar: function (Staritem) {
            this.stared.splice(this.stared.indexOf(Staritem),1)
            localStorage.setItem('stared', JSON.stringify(this.stared));
        }
    },
    // //生命週期，指定甚麼時候再執行function() 
    created() {
        this.getData();
    },computed:{
        filterArray:function(){
                let vm = this;
                vm.region =[];
                vm.box=[];
                vm.area ='全部區域';
                for(let t = 0; t < vm.data.length; t++){
                    if(vm.filter == vm.data[t].County ){
                      vm.region.push(vm.data[t]);
                      vm.box.push(vm.data[t].SiteName)
                    };  
                } 
            return  vm.region 
        }
    },
    filtertape(){
        let vm = this
        if(vm.data.filter == '全部縣市'){
            return vm.data
        };

    },
});