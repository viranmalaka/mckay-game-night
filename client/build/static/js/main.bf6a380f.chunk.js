(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{194:function(e,t,n){},195:function(e,t,n){},290:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n.n(s),c=n(29),r=n.n(c),i=(n(194),n(27)),o=n.n(i),l=n(39),u=n(19),j=(n(195),n(79)),b=n.n(j);function d(e,t){var n,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if("string"===typeof t&&(t=t.split(".")),!e)return s;for(n=0;n<t.length&&(e=e[t[n]]);n++);return n===t.length?void 0===e?s:e:s}var h=function(e){return e.then((function(e){return[null,e]})).catch((function(e){return[e,null]}))},O="/api/",m=function(e){return function(t){return e?t.data:t}},g=function(e){return function(t){throw 401===d(t,["response","data","code"])&&d(t,"/api/user/validate"!==["response","config","url"])&&(window.location.href="/",localStorage.setItem("rms_token","")),e?t.response.data:t}},f=function(e){return{headers:e}},p=function(e,t){return{get:function(n){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return h(b.a.get("".concat(t).concat(n),f(s)).then(m(e)).catch(g(e)))},post:function(n,s){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return h(b.a.post("".concat(t).concat(n),s,f(a)).then(m(e)).catch(g(e)))},put:function(n,s){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return h(b.a.put("".concat(t).concat(n),s,f(a)).then(m(e)).catch(g(e)))},patch:function(n,s){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return h(b.a.patch("".concat(t).concat(n),s,f(a)).then(m(e)).catch(g(e)))},del:function(n){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return h(b.a.delete("".concat(t).concat(n),f(s)).then(m(e)).catch(g(e)))},head:function(e,n){return h(b.a.head("".concat(t).concat(e),f(n)).then(m(!1)).catch(g(!1)))}}},x=p(!0,O),v=(p(!1,O),p(!0,""),n(63)),k=n(28),y=n(22),w=n(182),S=n(297),C=n(299),I=n(292),N=n(293),A=n(40),E=n(5),H=function(e){var t=e.children,n=e.title;return Object(E.jsxs)(I.a,{children:[Object(E.jsxs)(N.a,{span:6,offset:9,style:{paddingTop:150},children:[Object(E.jsx)("h1",{style:{textAlign:"center"},children:n}),t]}),Object(E.jsx)(N.a,{span:12,offset:6,children:Object(E.jsx)("img",{src:"/background.jpg",style:{width:"100%"}})})]})},T={labelCol:{span:8},wrapperCol:{span:24}},P={wrapperCol:{span:24}},_=function(){var e=Object(l.a)(o.a.mark((function e(t,n,s){var a,c,r,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post("users/login/",t);case 2:if(a=e.sent,c=Object(u.a)(a,2),r=c[0],i=c[1],!r){e.next=8;break}return e.abrupt("return",w.b.error(r.msg||r.error.msg||"Something went wrong"));case 8:w.b.success("User ".concat(i.user.username," has logged in successfully")),localStorage.setItem("auth-token",i.token),s(i.user),i.user.isAdmin?n.push("/admin"):n.push("/user-dashboard");case 12:case"end":return e.stop()}}),e)})));return function(t,n,s){return e.apply(this,arguments)}}(),U=function(e){var t=e.setUser,n=Object(k.g)();return Object(E.jsx)(H,{title:"Welcome",children:Object(E.jsxs)(S.a,Object(y.a)(Object(y.a)({},T),{},{name:"basic",initialValues:{remember:!0},onFinish:function(e){return _(e,n,t)},layout:"vertical",children:[Object(E.jsx)(S.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your username!"}],children:Object(E.jsx)(C.a,{placeholder:"enter the username"})}),Object(E.jsx)(S.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:Object(E.jsx)(C.a.Password,{placeholder:"enter the password"})}),Object(E.jsx)(S.a.Item,Object(y.a)(Object(y.a)({},P),{},{children:Object(E.jsxs)(I.a,{children:[Object(E.jsx)(N.a,{span:12,children:Object(E.jsx)(A.a,{type:"primary",htmlType:"submit",block:!0,children:"Login"})}),Object(E.jsx)(N.a,{span:12,children:Object(E.jsx)(v.b,{to:"/signup",children:Object(E.jsx)(A.a,{block:!0,children:"Register"})})})]})}))]}))})},D={labelCol:{span:8},wrapperCol:{span:24}},L={wrapperCol:{span:24}},M=function(){var e=Object(l.a)(o.a.mark((function e(t){var n,s,a,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post("users/",t);case 2:if(n=e.sent,s=Object(u.a)(n,2),a=s[0],c=s[1],!a){e.next=8;break}return e.abrupt("return",w.b.error(a.msg||a.error.msg||"Something went wrong"));case 8:w.b.success("User ".concat(c.newUser.username," has created successfully. please log in"));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),W=function(){return Object(E.jsx)(H,{title:"Create Account",children:Object(E.jsxs)(S.a,Object(y.a)(Object(y.a)({},D),{},{name:"basic",initialValues:{remember:!0},onFinish:M,layout:"vertical",children:[Object(E.jsx)(S.a.Item,{label:"Username",name:"username",rules:[{required:!0,message:"Please input your username!"}],children:Object(E.jsx)(C.a,{placeholder:"enter a username"})}),Object(E.jsx)(S.a.Item,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}],children:Object(E.jsx)(C.a.Password,{placeholder:"enter a password"})}),Object(E.jsx)(S.a.Item,Object(y.a)(Object(y.a)({},L),{},{children:Object(E.jsxs)(I.a,{children:[Object(E.jsx)(N.a,{span:12,children:Object(E.jsx)(A.a,{type:"primary",htmlType:"submit",block:!0,children:"Register"})}),Object(E.jsx)(N.a,{span:12,children:Object(E.jsx)(v.b,{to:"/login",children:Object(E.jsx)(A.a,{block:!0,children:"Login"})})})]})}))]}))})},F=n(130),G=n(175),q=n(296),B=n(173),R=n(174),Y=function(){function e(){Object(B.a)(this,e),this.socket=null,this.hooks={}}return Object(R.a)(e,[{key:"connect",value:function(e,t){var n=this;if(this.socket)return!1;this.socket=new WebSocket("ws://"+window.location.host),this.socket.addEventListener("open",(function(s){console.log("Connected to WS Server");var a=e.isAdmin,c=e.username,r=e._id;n.emitMessage("set_user",{isAdmin:a,username:c,_id:r}),t()})),this.socket.addEventListener("message",(function(e){try{var t=JSON.parse(e.data);n.hooks[t.type]&&n.hooks[t.type](t.payload)}catch(s){console.log("invalid data",s,e.data)}})),this.socket.addEventListener("close",(function(s){console.log("Socket is closed. Reconnect will be attempted in 1 second.",s.reason),n.socket=null,setTimeout((function(){n.connect(e,t)}),1e3)}))}},{key:"emitMessage",value:function(e,t){var n=this;this.socket&&this.socket.readyState===WebSocket.OPEN?this.socket.send(JSON.stringify({type:e,payload:t})):setTimeout((function(){n.emitMessage(e,t)}),500)}},{key:"sendMessage",value:function(e,t,n){this.emitMessage("user_message",{sessionId:t,username:e.username,isAdmin:e.isAdmin,message:n})}},{key:"updatePoints",value:function(e,t){this.emitMessage("update_points",{sessionId:e,points:t})}},{key:"addHook",value:function(e,t){this.hooks[e]=t}}],[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}]),e}(),z=n(300),J=function(e){var t=e.setSession,n=Object(s.useState)(!0),a=Object(u.a)(n,2),c=a[0],r=a[1],i=localStorage.getItem("auth-token"),j=Object(s.useState)(""),b=Object(u.a)(j,2),d=b[0],h=b[1];return Object(E.jsx)(E.Fragment,{children:Object(E.jsx)(z.a,{title:"Enter a Session Code",visible:c,maskClosable:!1,onOk:Object(l.a)(o.a.mark((function e(){var n,s,a,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.get("session/"+d,{token:i});case 2:n=e.sent,s=Object(u.a)(n,2),a=s[0],c=s[1],a?w.b.error("Something went wrong"):c.session?(t(c.session),r(!1)):w.b.info("No found the Session. Please check and retry");case 7:case"end":return e.stop()}}),e)}))),onCancel:function(){return r(!0)},children:Object(E.jsx)(C.a,{value:d,onChange:function(e){return h(e.target.value)}})})})},K=n(71),V=n.n(K),X=null,Q=function(e){var t=e.user,n=e.setUser,a=Object(s.useState)(0),c=Object(u.a)(a,2),r=c[0],i=c[1],o=Object(s.useState)(""),l=Object(u.a)(o,2),j=l[0],b=l[1],h=Object(s.useState)(null),O=Object(u.a)(h,2),m=O[0],g=O[1],f=Object(k.g)();return Object(s.useEffect)((function(){t&&((X=Y.getInstance()).connect(t,(function(){console.log("websocket connected")})),X.addHook("user_message",(function(e){g(Object(y.a)(Object(y.a)({},m),{},{messages:[].concat(Object(F.a)(m.messages),[e])}))})),X.addHook("changed_points",(function(e){g(Object(y.a)(Object(y.a)({},m),{},{points:e})),i(e[t._id])})))}),[t,m]),Object(s.useEffect)((function(){m&&i(d(m,["points",t._id]))}),[m]),Object(s.useEffect)((function(){var e=document.getElementById("message-list");e&&(e.scrollTop=e.scrollHeight)}),[m]),t?m?Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)(I.a,{style:{marginTop:100},children:Object(E.jsx)(N.a,{span:4,offset:20,children:Object(E.jsx)(A.a,{onClick:function(){f.push("/"),localStorage.setItem("auth-token",""),n(null)},children:"Logout"})})}),Object(E.jsxs)(I.a,{children:[Object(E.jsx)(N.a,{span:6,offset:9,children:Object(E.jsxs)("p",{style:{textAlign:"center"},children:["Session ID: ",m.id]})}),Object(E.jsx)(N.a,{span:6,offset:9,children:Object(E.jsx)(C.a,{value:t.username,style:{textAlign:"center"}})})]}),Object(E.jsx)(I.a,{style:{marginTop:20},children:Object(E.jsx)(N.a,{span:6,offset:9,children:Object(E.jsx)(C.a,{value:r,style:{textAlign:"center"}})})}),Object(E.jsx)(I.a,{style:{marginTop:20},children:Object(E.jsx)(N.a,{span:12,offset:6,children:Object(E.jsx)("div",{style:{minHeight:200,maxHeight:"70vh",overflow:"auto"},id:"message-list",children:m.messages.filter((function(e){var n=e.username;return e.isAdmin||n===t.username})).map((function(e){var t,n,s=e.message,a=e.time;return Object(E.jsx)("div",{style:{border:"1px solid #dddddd",margin:3,padding:5,background:"#f6f6f6"},children:s.startsWith("code-image")?Object(E.jsx)(q.a,{width:300,src:(t=s,n=a,"/questions/image-".concat(t.substring(11),".jpeg?t=").concat(n))}):s},a)}))})})}),Object(E.jsxs)(I.a,{style:{marginTop:20},children:[Object(E.jsx)(N.a,{span:10,offset:6,children:Object(E.jsx)(C.a,{value:j,onChange:function(e){return b(e.target.value)}})}),Object(E.jsx)(N.a,{span:2,children:Object(E.jsx)(A.a,{style:{marginLeft:5},type:"primary",block:!0,disabled:""===j,onClick:function(){X.sendMessage(t,m.id,j),b("")},children:"SEND"})})]})]}):Object(E.jsxs)(E.Fragment,{children:[Object(E.jsx)("div",{children:"Select a Session"}),Object(E.jsx)(J,{setSession:g})]}):Object(E.jsx)(G.a,{})},Z=n(294),$=n(78),ee=n(298),te=n(129),ne=n(303),se=n(186),ae=n(82),ce=n(301),re=(n(302),n(304)),ie=n(305),oe=n(295),le=function(e){var t=e.setSession,n=Object(s.useState)(!0),a=Object(u.a)(n,2),c=a[0],r=a[1],i=localStorage.getItem("auth-token"),j=Object(s.useState)([]),b=Object(u.a)(j,2),d=b[0],h=b[1];return Object(s.useEffect)((function(){Object(l.a)(o.a.mark((function e(){var t,n,s,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.get("session",{token:i});case 2:if(t=e.sent,n=Object(u.a)(t,2),s=n[0],a=n[1],!s){e.next=8;break}return e.abrupt("return",w.b.error(s.msg||s.error.msg||"Something Went Wrong"));case 8:h(a.sessions);case 9:case"end":return e.stop()}}),e)})))()}),[]),Object(E.jsx)(E.Fragment,{children:Object(E.jsx)(z.a,{title:"Select a Session",visible:c,onOk:function(){return r(!0)},onCancel:function(){return r(!0)},maskClosable:!1,children:Object(E.jsx)(oe.a,{dataSource:d,columns:[{title:"Started At",dataIndex:"createdAt",render:function(e){return V()(e).format("YYYY-MM-DD  HH:mm")}},{title:"ID",dataIndex:"id"}],pagination:{position:["none","none"]},rowKey:"_id",onRow:function(e){return{onClick:function(){var n=Object(l.a)(o.a.mark((function n(){var s,a,c,l;return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,x.get("session/"+e._id,{token:i});case 2:if(s=n.sent,a=Object(u.a)(s,2),c=a[0],l=a[1],!c){n.next=8;break}return n.abrupt("return",w.b.error("Something went wrong"));case 8:t(l.session),r(!1);case 10:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}()}}})})})},ue=function(e){var t=e.isOnline,n=e.name,a=e.messages,c=e.total,r=e.setSession,i=e.session,o=e.userId,l=e.globalNumber,j=e.triggerGlobalNumber,b=Object(s.useState)({a:!1,b:!1,c:!1}),d=Object(u.a)(b,2),h=d[0],O=d[1],m=Object(s.useState)(0),g=Object(u.a)(m,2),f=g[0],p=g[1];Object(s.useEffect)((function(){p(l)}),[j]);var x=function(e,t){r(Object(y.a)(Object(y.a)({},i),{},{points:Object(y.a)(Object(y.a)({},i.points),{},Object(ae.a)({},t,e))}))};return Object(E.jsx)(N.a,{span:12,children:Object(E.jsxs)("div",{className:"user-area d-flex",children:[Object(E.jsxs)("div",{className:"names",children:[Object(E.jsxs)("div",{className:"name",children:[Object(E.jsx)(ce.a,{status:t?"success":"warning"}),n]}),Object(E.jsxs)("div",{className:"points",children:[Object(E.jsx)(ee.a,{value:f,onChange:p,controls:!0,style:{maxWidth:50,marginRight:5},min:0}),Object(E.jsx)(A.a,{icon:Object(E.jsx)(re.a,{}),size:"small",onClick:function(){return x((c||0)+f,o)}}),Object(E.jsx)(A.a,{icon:Object(E.jsx)(ie.a,{}),size:"small",onClick:function(){return x((c||0)-f,o)}})]})]}),Object(E.jsx)("div",{className:"total",children:c}),Object(E.jsx)("div",{className:"message msg-list-to-scroll",children:a.map((function(e){var t=e.message,n=e.time;return Object(E.jsxs)("div",{className:"message-box",children:["(",V()(n).format("HH:mm:ss"),") ",t]},n)}))}),Object(E.jsxs)("div",{className:"d-flex f-col btns",children:[Object(E.jsx)("div",{className:h.a?"selected":"",onClick:function(){return O(Object(y.a)(Object(y.a)({},h),{},{a:!h.a}))},children:"2X"}),Object(E.jsx)("div",{className:h.b?"selected":"",onClick:function(){return O(Object(y.a)(Object(y.a)({},h),{},{b:!h.b}))},children:"SWAP"}),Object(E.jsx)("div",{className:h.c?"selected":"",onClick:function(){return O(Object(y.a)(Object(y.a)({},h),{},{c:!h.c}))},children:"DECOY"})]})]})})},je=Z.a.Header,be=Z.a.Content,de=Z.a.Footer,he=null,Oe=function(e){var t=e.session,n=e.setSession,a=e.onLogout,c=Object(s.useState)(!1),r=Object(u.a)(c,2),i=r[0],j=r[1],b=Object(s.useState)(Object(se.a)(6)),d=Object(u.a)(b,2),h=d[0],O=d[1],m=localStorage.getItem("auth-token"),g=function(){var e=Object(l.a)(o.a.mark((function e(){var t,s,a,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post("session",{id:h},{token:m});case 2:if(t=e.sent,s=Object(u.a)(t,2),a=s[0],c=s[1],!a){e.next=8;break}return e.abrupt("return",w.b.error(a.msg||a.error.msg||"Something Went Wrong"));case 8:w.b.success("Game Create with Game ID: ".concat(h)),w.b.info("Please share this game ID with others to join"),n(c.newSession),j(!1);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(E.jsxs)($.a,{theme:"dark",mode:"horizontal",selectedKeys:[],selectable:!1,children:[Object(E.jsx)($.a.Item,{onClick:function(){return j(!0)},children:"Create A New Game"},1),Object(E.jsx)($.a.Item,{style:{float:"right"},onClick:a,children:"Logout"},3),Object(E.jsxs)($.a.Item,{style:{float:"right"},children:["key: ",t&&t.id||"N/A"]},2),Object(E.jsx)(z.a,{title:"Create A New Game",visible:i,onOk:g,onCancel:function(){return j(!1)},children:Object(E.jsx)(C.a,{value:h,onChange:function(e){return O(e.target.value)}})})]})},me=function(e){var t=e.user,n=e.setUser,a=localStorage.getItem("auth-token"),c=Object(k.g)(),r=Object(s.useState)(null),i=Object(u.a)(r,2),j=i[0],b=i[1],h=Object(s.useState)("none"),O=Object(u.a)(h,2),m=O[0],g=O[1],f=Object(s.useState)([]),p=Object(u.a)(f,2),v=p[0],S=p[1],H=Object(s.useState)([]),T=Object(u.a)(H,2),P=T[0],_=T[1],U=Object(s.useState)(0),D=Object(u.a)(U,2),L=D[0],M=D[1],W=Object(s.useState)(!1),G=Object(u.a)(W,2),q=G[0],B=G[1];t&&!t.isAdmin&&(c.push("/"),w.b.error("Access Denied"),n(null)),Object(s.useEffect)((function(){t&&((he=Y.getInstance()).connect(t,(function(){console.log("websocket connected")})),he.addHook("user_message",(function(e){b(Object(y.a)(Object(y.a)({},j),{},{messages:[].concat(Object(F.a)(j.messages),[e])}))})),he.addHook("user_changed",(function(e){S(e)})))}),[t,j]),Object(s.useEffect)((function(){Object(l.a)(o.a.mark((function e(){var t,n,s,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.get("users/all-users",{token:a});case 2:if(t=e.sent,n=Object(u.a)(t,2),s=n[0],c=n[1],!s){e.next=8;break}return e.abrupt("return",w.b.error("Something went wrong, please refresh the page"));case 8:_(c.users);case 9:case"end":return e.stop()}}),e)})))()}),[]),Object(s.useEffect)((function(){for(var e=document.getElementById("message-list"),t=document.getElementsByClassName("msg-list-to-scroll"),n=0;n<t.length;n++){var s=t[n];s.scrollTop=s.scrollHeight}e&&(e.scrollTop=e.scrollHeight)}),[j]);var R=Object(s.useState)(""),z=Object(u.a)(R,2),J=z[0],K=z[1],X={},Q=[];j&&j.messages.forEach((function(e){var t={message:e.message,time:e.time};if(e.isAdmin)Q.push(t);else{var n=X[e.isAdmin?"admin":e.username];n?n.push(t):X[e.isAdmin?"admin":e.username]=[t]}}));var $=v.reduce((function(e,t){return e[t.username]=!0,e}),{}),se=P.reduce((function(e,t){return e[t.username]=t,e}),{});return Object(E.jsxs)(Z.a,{style:{height:"100vh"},children:[Object(E.jsxs)(je,{style:{position:"fixed",zIndex:1,width:"100%"},children:[Object(E.jsx)("div",{className:"logo"}),Object(E.jsx)(Oe,{setSession:b,session:j,onLogout:function(){c.push("/"),localStorage.setItem("auth-token",""),n(null)}})]}),Object(E.jsx)(be,{className:"site-layout",style:{padding:"0 50px",marginTop:64},children:Object(E.jsx)("div",{className:"site-layout-background",style:{padding:24,minHeight:380},children:j&&Object(E.jsxs)("div",{children:[Object(E.jsx)(I.a,{children:Object.keys(X).map((function(e){return Object(E.jsx)(ue,{total:d(j,["points",d(se,[e,"_id"])]),userId:d(se,[e,"_id"]),name:e,isOnline:$[e],messages:X[e],session:j,setSession:b,triggerGlobalNumber:q,globalNumber:L},e)}))}),Object(E.jsxs)(I.a,{children:[Object(E.jsxs)(N.a,{span:6,children:[Object(E.jsx)(ee.a,{value:L,onChange:M}),Object(E.jsx)(A.a,{onClick:function(){B(!q)},children:"SET"})]}),Object(E.jsxs)(N.a,{span:18,align:"end",children:[Object(E.jsxs)(te.a.Group,{onChange:function(e){g(e.target.value)},value:m,children:[Object(E.jsx)(te.a,{value:"none",children:"None"}),Array(10).fill({}).map((function(e,t){return Object(E.jsx)(ne.a,{destroyTooltipOnHide:!0,content:function(){return Object(E.jsx)("img",{width:300,src:"/questions/image-".concat(t+1,".jpeg?t=").concat(Date.now())})},children:Object(E.jsx)(te.a,{value:t+1,children:t+1})},t)}))]}),Object(E.jsx)(A.a,{onClick:function(){he.sendMessage(t,j.id,"code-image-".concat(m))},children:"SEND IMAGE"})]})]}),Object(E.jsx)(N.a,{span:24,justify:"space-between",children:Object(E.jsxs)(I.a,{style:{marginTop:20},children:[Object(E.jsx)(N.a,{span:20,style:{height:50,overflow:"auto"},className:"msg-list msg-list-to-scroll",children:Q.map((function(e){return Object(E.jsxs)("div",{className:"message-box",children:["(",V()(e.time).format("HH:mm:ss"),")"," ",e.message.startsWith("code-image")?"[IMAGE]":e.message]},e.time)}))}),Object(E.jsx)(N.a,{span:20,children:Object(E.jsx)(C.a,{value:J,onChange:function(e){return K(e.target.value)}})}),Object(E.jsx)(N.a,{span:4,children:Object(E.jsxs)(I.a,{children:[Object(E.jsx)(N.a,{span:12,children:Object(E.jsx)(A.a,{style:{marginLeft:5},block:!0,type:"primary",disabled:""===J,onClick:function(){he.sendMessage(t,j.id,J),K("")},children:"SEND"})}),Object(E.jsx)(N.a,{span:12,children:Object(E.jsx)(A.a,{style:{marginLeft:5},block:!0,onClick:function(){he.updatePoints(j.id,j.points)},children:"UPDATE"})})]})})]})})]})})}),Object(E.jsx)(de,{style:{textAlign:"center"}}),!j&&Object(E.jsx)(le,{setSession:b})]})},ge=function(e){var t=e.user,n=e.setUser;return Object(E.jsx)(v.a,{children:Object(E.jsxs)(k.d,{children:[Object(E.jsx)(k.b,{path:"/home",children:Object(E.jsx)(U,{user:t,setUser:n})}),Object(E.jsx)(k.b,{path:"/signup",children:Object(E.jsx)(W,{user:t,setUser:n})}),Object(E.jsx)(k.b,{path:"/admin",children:Object(E.jsx)(me,{user:t,setUser:n})}),Object(E.jsx)(k.b,{path:"/user-dashboard",children:Object(E.jsx)(Q,{user:t,setUser:n})}),Object(E.jsx)(k.b,{path:"/",children:Object(E.jsx)(k.a,{to:"/home"})})]})})};var fe=function(){var e=Object(s.useState)(!1),t=Object(u.a)(e,2),n=(t[0],t[1]),a=Object(s.useState)(null),c=Object(u.a)(a,2),r=c[0],i=c[1],j=localStorage.getItem("auth-token")||"";return Object(s.useEffect)((function(){Object(l.a)(o.a.mark((function e(){var t,s,a,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(!0),e.next=3,x.get("users/validate",{token:j});case 3:t=e.sent,s=Object(u.a)(t,2),a=s[0],c=s[1],i(a?null:c.user),n(!1);case 9:case"end":return e.stop()}}),e)})))()}),[]),Object(E.jsx)("div",{className:"App",children:Object(E.jsx)(ge,{user:r,setUser:i})})},pe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,306)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),s(e),a(e),c(e),r(e)}))};r.a.render(Object(E.jsx)(a.a.StrictMode,{children:Object(E.jsx)(fe,{})}),document.getElementById("root")),pe()}},[[290,1,2]]]);