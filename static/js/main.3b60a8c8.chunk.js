(window.webpackJsonpmap=window.webpackJsonpmap||[]).push([[0],[,,,,,,,,,,,,,,,,function(t,e,n){t.exports=n.p+"static/media/tower0.eb9959ca.png"},function(t,e,n){t.exports=n.p+"static/media/tower1.ca74cfa9.png"},function(t,e,n){t.exports=n.p+"static/media/tower2.b6548075.png"},function(t,e,n){t.exports=n.p+"static/media/tower3.11445d06.png"},function(t,e,n){t.exports=n.p+"static/media/tower4.a893cd0d.png"},function(t,e,n){t.exports=n.p+"static/media/towerS.bfae78a4.png"},function(t,e,n){t.exports=n.p+"static/media/lab0.69af5b9d.png"},function(t,e,n){t.exports=n.p+"static/media/lab1.8b770617.png"},function(t,e,n){t.exports=n.p+"static/media/lab2.25d96492.png"},function(t,e,n){t.exports=n.p+"static/media/lab3.4bdef640.png"},function(t,e,n){t.exports=n.p+"static/media/lab4.e4221859.png"},function(t,e,n){t.exports=n.p+"static/media/labS.64ed1907.png"},,,,,function(t,e,n){t.exports=n(45)},,,,,,function(t,e,n){},function(t,e,n){},,,,,,function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(8),i=n.n(o),c=(n(37),n(38),n(1)),s=n(14),p=n(9),u=n(30),l=n(15),f=n(31),m=n(48),h=n(51),b=n(47),d=n(50),g=n(49),w=n(4),v=n.n(w),y=(n(39),n(16)),O=n.n(y),k=n(17),j=n.n(k),x=n(18),E=n.n(x),S=n(19),I=n.n(S),L=n(20),R=n.n(L),D=n(21),P=n.n(D),M=n(22),U=n.n(M),z=n(23),A=n.n(z),J=n(24),N=n.n(J),X=n(25),Z=n.n(X),B=n(26),C=n.n(B),V=n(27),W=n.n(V);function _(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,a)}return n}delete v.a.Icon.Default.prototype._getIconUrl,v.a.Icon.Default.mergeOptions({iconRetinaUrl:n(40),iconUrl:n(41),shadowUrl:n(42)}),console.log("https://76.121.250.209:5000/api/airports/allAirports");var G=function(t){function e(){var t,n;Object(s.a)(this,e);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(u.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(r)))).state={lat:45.25890377106636,lng:11.242709547379992,zoom:7,airports:[],lines:[]},n}return Object(f.a)(e,t),Object(p.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.tick(),this.interval=setInterval(function(){return t.tick()},12e4)}},{key:"componentDidUnmount",value:function(){clearInterval(this.interval)}},{key:"tick",value:function(){var t=this;fetch("https://76.121.250.209:5000/api/airports/allAirports").then(function(t){return t.json()}).catch(function(t){return console.error(t)}).then(function(e){t.setState({airports:e})}),fetch("https://76.121.250.209:5000/api/airports/getLines").then(function(t){return t.json()}).catch(function(t){return console.error(t)}).then(function(e){t.setState({lines:e})})}},{key:"render",value:function(){var t=this,e=[this.state.lat,this.state.lng];return r.a.createElement(m.a,{className:"map",center:e,zoom:this.state.zoom,ref:function(e){t.map=e},onZoomEnd:function(e){t.setState(function(t){return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?_(n,!0).forEach(function(e){Object(c.a)(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):_(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}({},t)})}},r.a.createElement(h.a,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Imagery \xa9 <a href="https://www.mapbox.com/">Mapbox</a>',url:"https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=".concat("pk.eyJ1IjoiMXJldmVuZ2VyMSIsImEiOiJjazBvbXR2NjMwNXR0M2pteGV3aG5taWsxIn0.RUgSeKpXf66ahA-_0uZthg"),opacity:.5}),this.state.airports.map(function(e){return r.a.createElement(b.a,{icon:(n=e.infectionLevel,n+=1,v.a.icon({iconUrl:function(t){switch(n){case 0:return O.a;case 1:return j.a;case 2:return E.a;case 3:return I.a;case 4:return R.a;case 5:return U.a;case 6:return A.a;case 7:return N.a;case 8:return Z.a;case 9:return C.a;case 10:return P.a;case 11:return W.a;default:return null}}(),iconSize:[30,30],iconAnchor:[15,15],popupAnchor:[0,0]})),key:e.icao,position:[e.latitude,e.longitude]},t.map.leafletElement.getZoom()>6?r.a.createElement(d.a,{offset:[0,15],permanent:!0,direction:"bottom"},r.a.createElement("b",null,e.icao,": "),function(t){return{0:"Cured",1:"No Risk",2:"Low Risk",3:"High Risk",4:"Outbreak",5:"Cured Lab",6:"No Risk Lab",7:"Low Risk Lab",8:"High Risk Lab",9:"Outbreak Lab",10:"Safe",11:"Safe Lab"}[t+=1]}(e.infectionLevel)):"");var n}),this.state.lines.map(function(t){return r.a.createElement(g.a,{positions:[t.from,t.to]})}))}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}],[[32,1,2]]]);
//# sourceMappingURL=main.3b60a8c8.chunk.js.map