(function(e){function t(t){for(var r,n,i=t[0],s=t[1],c=t[2],p=0,f=[];p<i.length;p++)n=i[p],Object.prototype.hasOwnProperty.call(l,n)&&l[n]&&f.push(l[n][0]),l[n]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);u&&u(t);while(f.length)f.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],r=!0,i=1;i<a.length;i++){var s=a[i];0!==l[s]&&(r=!1)}r&&(o.splice(t--,1),e=n(n.s=a[0]))}return e}var r={},l={app:0},o=[];function n(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=r,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var u=s;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),l=a("5c96"),o=a.n(l),n=a("bc3a"),i=a.n(n),s=(a("0fae"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{align:"center"}},[a("h1",[e._v("全球新型冠状病毒确诊数统计")]),a("div",{staticStyle:{width:"1000px",height:"400px"},attrs:{id:"main"}}),a("br"),a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.search}},[a("el-form-item",{attrs:{label:""}},[a("el-input",{attrs:{placeholder:"国家/地区"},model:{value:e.search.country,callback:function(t){e.$set(e.search,"country",t)},expression:"search.country"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSearch}},[e._v("查询")])],1)],1),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.covidData,"default-sort":{prop:"total",order:"descending"}}},[a("el-table-column",{attrs:{prop:"country",label:"国家/地区",width:"200",align:"center"}}),a("el-table-column",{attrs:{prop:"province",label:"省/州",width:"200",align:"center"}}),a("el-table-column",{attrs:{prop:"diffFromPreDay",label:"昨日对比",sortable:"",width:"200",align:"center"}}),a("el-table-column",{attrs:{prop:"total",label:"总确诊数",sortable:"",width:"200",align:"center"}})],1)],1)}),c=[],u=(a("fb6a"),a("ac1f"),a("841c"),{data:function(){return{search:{country:""},covidData:null,mapData:[]}},mounted:function(){var e=this;this.$axios.get("http://localhost:8080/getData").then((function(t){e.covidData=t.data;for(var a=0;a<e.covidData.length;a++){var r=[];r.push(e.covidData[a].longitude),r.push(e.covidData[a].latitude),r.push(e.covidData[a].total),""!==e.covidData[a].province?e.mapData.push({name:e.covidData[a].province,value:r}):e.mapData.push({name:e.covidData[a].country,value:r})}var l=e.$echarts.init(document.getElementById("main")),o={title:{text:"全球新型冠状病毒确诊数统计",subtext:"ComfirmedCase of COVID",sublink:"https://gitee.com/dgut-sai/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",left:"center"},tooltip:{trigger:"item"},bmap:{center:[104.114129,37.550339],zoom:3,roam:!0,mapStyle:{styleJson:[{featureType:"water",elementType:"all",stylers:{color:"#d1d1d1"}},{featureType:"land",elementType:"all",stylers:{color:"#f3f3f3"}},{featureType:"railway",elementType:"all",stylers:{visibility:"off"}},{featureType:"highway",elementType:"all",stylers:{color:"#fdfdfd"}},{featureType:"highway",elementType:"labels",stylers:{visibility:"off"}},{featureType:"arterial",elementType:"geometry",stylers:{color:"#fefefe"}},{featureType:"arterial",elementType:"geometry.fill",stylers:{color:"#fefefe"}},{featureType:"poi",elementType:"all",stylers:{visibility:"off"}},{featureType:"green",elementType:"all",stylers:{visibility:"off"}},{featureType:"subway",elementType:"all",stylers:{visibility:"off"}},{featureType:"manmade",elementType:"all",stylers:{color:"#d1d1d1"}},{featureType:"local",elementType:"all",stylers:{color:"#d1d1d1"}},{featureType:"arterial",elementType:"labels",stylers:{visibility:"off"}},{featureType:"boundary",elementType:"all",stylers:{color:"#fefefe"}},{featureType:"building",elementType:"all",stylers:{color:"#d1d1d1"}},{featureType:"label",elementType:"labels.text.fill",stylers:{color:"#999999"}}]}},series:[{name:"ComfirmedCase",type:"scatter",coordinateSystem:"bmap",data:e.mapData,symbolSize:function(e){return e[2]/6e3},encode:{value:2},label:{formatter:"{b}",position:"right",show:!1},itemStyle:{color:"red"},emphasis:{label:{show:!0}}},{name:"Top 5",type:"effectScatter",coordinateSystem:"bmap",data:e.mapData.slice(0,6),symbolSize:function(e){return e[2]/6e3},encode:{value:2},showEffectOn:"render",rippleEffect:{brushType:"stroke"},hoverAnimation:!0,label:{formatter:"{b}",position:"right",show:!0},itemStyle:{color:"red",shadowBlur:10,shadowColor:"#333"},zlevel:1}]};l.setOption(o)})).catch((function(e){console.log(e)}))},methods:{onSearch:function(){var e=this;this.$axios.get("http://localhost:8080/search",{params:{country:this.search.country}}).then((function(t){return e.covidData=t.data})).catch((function(e){console.log(e)}))}}}),p=u,f=a("2877"),d=Object(f["a"])(p,s,c,!1,null,null,null),y=d.exports,m=a("313e"),h=a.n(m);a("a00a");r["default"].use(o.a),r["default"].prototype.$axios=i.a,r["default"].prototype.$echarts=h.a,new r["default"]({el:"#app",render:function(e){return e(y)}})}});
//# sourceMappingURL=app.4411db14.js.map