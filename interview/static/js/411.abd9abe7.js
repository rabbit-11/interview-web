"use strict";(self["webpackChunkinterview_web"]=self["webpackChunkinterview_web"]||[]).push([[411],{411:function(e,t,s){s.r(t),s.d(t,{default:function(){return U}});s(7658);var a=s(821),n=s(9821),l=s(1416),o=s(5713),r=function(e,t,s,a){var n,l=arguments.length,o=l<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,s,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(l<3?n(o):l>3?n(t,s,o):n(t,s))||o);return l>3&&o&&Object.defineProperty(t,s,o),o};class c extends o.Z{postMessage(e){return this._post("/chat",{message:e})}getMessage(){return this._get("/chat/query")}}r([(0,l.Z)("query",{title:"发送消息给ChatGPT",showErrorMsg:!1,showTip:!1})],c.prototype,"postMessage",null),r([(0,l.Z)("query",{title:"获取ChatGPT对话内容",showErrorMsg:!1,showTip:!1})],c.prototype,"getMessage",null);const i=n.g.get(c);var u=i,g=s(494),m=s(9902),v=s(1955);const d={class:"interview"},p={class:"code"},f={class:"coder"},w={class:"toolbar"},_={class:"tool-list"},h=["src"],b=["src"],y=["src"],x=["src"],M={class:"communicate"},P={class:"message-box"},T={class:"time"},k={class:"content"},Z=(0,a._)("div",{class:"avatar"},null,-1),C={class:"message"},G={class:"send-box"};var W=(0,a.aZ)({__name:"index",setup(e){const t=s(2717),n=s(1848),l=s(7080),o=s(5902),r=((0,g.L)(),(0,a.iH)("")),c=new webkitSpeechRecognition||new SpeechRecognition;c.continuous=!0,c.lang="en-GB";const i=(0,a.iH)(null),W=(0,a.iH)([]),S=e=>{e.preventDefault(),W.value.push({target:"user",message:r.value,time:"11:01 AM",name:"Andrew"}),u.postMessage(r.value).then((e=>{if(1===e.code){let e=setInterval((async()=>{let t=await u.getMessage();1===t.code&&""!==t.data&&null!==t.data&&(clearInterval(e),W.value.push({target:"GPT",message:t.data,time:"11:01 AM",name:"Chat GPT"}))}),1e3)}})),r.value=""};return c.onresult=function(e){r.value=e.results[0][0].transcript},(0,a.bv)((()=>{console.log(v.Z.get("username")),""!==v.Z.get("username")&&void 0!==v.Z.get("username")||m.Z.push({name:"login"}),c.start(),c.continuous=!0,setTimeout((()=>{c.stop(),c.continuous=!1}),5e3)})),(e,s)=>{const c=(0,a.up)("a-button"),u=(0,a.up)("a-textarea");return(0,a.wg)(),(0,a.iD)("article",d,[(0,a._)("section",p,[(0,a._)("div",f,[(0,a._)("textarea",{ref_key:"coder",ref:i,cols:"30",rows:"10"},null,512)]),(0,a._)("div",w,[(0,a._)("div",_,[(0,a.Wm)(c,{class:"tool-btn"},{default:(0,a.w5)((()=>[(0,a._)("img",{src:(0,a.SU)(t)},null,8,h)])),_:1}),(0,a.Wm)(c,{class:"tool-btn"},{default:(0,a.w5)((()=>[(0,a._)("img",{src:(0,a.SU)(n)},null,8,b)])),_:1}),(0,a.Wm)(c,{class:"tool-btn"},{default:(0,a.w5)((()=>[(0,a._)("img",{src:(0,a.SU)(l)},null,8,y)])),_:1}),(0,a.Wm)(c,{class:"tool-btn"},{default:(0,a.w5)((()=>[(0,a._)("img",{src:(0,a.SU)(o)},null,8,x)])),_:1})]),(0,a.Wm)(c,{class:"end-btn"},{default:(0,a.w5)((()=>[(0,a.Uk)(" End Call ")])),_:1})])]),(0,a._)("section",M,[(0,a._)("div",P,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(W.value,((e,t)=>((0,a.wg)(),(0,a.iD)("div",{key:t,class:(0,a.C_)(["message-item",{left:"GPT"===e.target},{right:"user"===e.target}])},[(0,a._)("div",T,(0,a.zw)("GPT"===e.target?e.name:"")+" "+(0,a.zw)(e.time),1),(0,a._)("div",k,[Z,(0,a._)("div",C,(0,a.zw)(e.message),1)])],2)))),128))]),(0,a._)("div",G,[(0,a.Wm)(u,{value:r.value,"onUpdate:value":s[0]||(s[0]=e=>r.value=e),placeholder:"Write your message....",onPressEnter:S},null,8,["value"])])])])}}});const S=W;var U=S},2717:function(e,t,s){e.exports=s.p+"static/img/audio.5a896a33.svg"},1848:function(e,t,s){e.exports=s.p+"static/img/camera.a4323c99.svg"},5902:function(e,t,s){e.exports=s.p+"static/img/comment.68d21b46.svg"},7080:function(e,t,s){e.exports=s.p+"static/img/sound.29f8914b.svg"}}]);