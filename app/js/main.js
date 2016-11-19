// Last time updated: 2016-10-12 6:16:41 AM UTC

!function(){"use strict";function getBrowserInfo(){var nameOffset,verOffset,ix,nAgt=(navigator.appVersion,navigator.userAgent),browserName=navigator.appName,fullVersion=""+parseFloat(navigator.appVersion),majorVersion=parseInt(navigator.appVersion,10);if(isOpera){browserName="Opera";try{fullVersion=navigator.userAgent.split("OPR/")[1].split(" ")[0],majorVersion=fullVersion.split(".")[0]}catch(e){fullVersion="0.0.0.0",majorVersion=0}}else isIE?(verOffset=nAgt.indexOf("MSIE"),browserName="IE",fullVersion=nAgt.substring(verOffset+5)):isChrome?(verOffset=nAgt.indexOf("Chrome"),browserName="Chrome",fullVersion=nAgt.substring(verOffset+7)):isSafari?(verOffset=nAgt.indexOf("Safari"),browserName="Safari",fullVersion=nAgt.substring(verOffset+7),-1!==(verOffset=nAgt.indexOf("Version"))&&(fullVersion=nAgt.substring(verOffset+8))):isFirefox?(verOffset=nAgt.indexOf("Firefox"),browserName="Firefox",fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&(browserName=nAgt.substring(nameOffset,verOffset),fullVersion=nAgt.substring(verOffset+1),browserName.toLowerCase()===browserName.toUpperCase()&&(browserName=navigator.appName));return isEdge&&(browserName="Edge",fullVersion=parseInt(navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)[2],10).toString()),-1!==(ix=fullVersion.indexOf(";"))&&(fullVersion=fullVersion.substring(0,ix)),-1!==(ix=fullVersion.indexOf(" "))&&(fullVersion=fullVersion.substring(0,ix)),majorVersion=parseInt(""+fullVersion,10),isNaN(majorVersion)&&(fullVersion=""+parseFloat(navigator.appVersion),majorVersion=parseInt(navigator.appVersion,10)),{fullVersion:fullVersion,version:majorVersion,name:browserName,isPrivateBrowsing:!1}}function retry(isDone,next){var currentTrial=0,maxRetry=50,isTimeout=!1,id=window.setInterval(function(){isDone()&&(window.clearInterval(id),next(isTimeout)),currentTrial++>maxRetry&&(window.clearInterval(id),isTimeout=!0,next(isTimeout))},10)}function isIE10OrLater(userAgent){var ua=userAgent.toLowerCase();if(0===ua.indexOf("msie")&&0===ua.indexOf("trident"))return!1;var match=/(?:msie|rv:)\s?([\d\.]+)/.exec(ua);return match&&parseInt(match[1],10)>=10?!0:!1}function detectPrivateMode(callback){var isPrivate;if(window.webkitRequestFileSystem)window.webkitRequestFileSystem(window.TEMPORARY,1,function(){isPrivate=!1},function(e){isPrivate=!0});else if(window.indexedDB&&/Firefox/.test(window.navigator.userAgent)){var db;try{db=window.indexedDB.open("test"),db.onerror=function(){return!0}}catch(e){isPrivate=!0}"undefined"==typeof isPrivate&&retry(function(){return"done"===db.readyState?!0:!1},function(isTimeout){isTimeout||(isPrivate=db.result?!1:!0)})}else if(isIE10OrLater(window.navigator.userAgent)){isPrivate=!1;try{window.indexedDB||(isPrivate=!0)}catch(e){isPrivate=!0}}else if(window.localStorage&&/Safari/.test(window.navigator.userAgent)){try{window.localStorage.setItem("test",1)}catch(e){isPrivate=!0}"undefined"==typeof isPrivate&&(isPrivate=!1,window.localStorage.removeItem("test"))}retry(function(){return"undefined"!=typeof isPrivate?!0:!1},function(isTimeout){callback(isPrivate)})}function detectDesktopOS(){var unknown="-",nVer=navigator.appVersion,nAgt=navigator.userAgent,os=unknown,clientStrings=[{s:"Windows 10",r:/(Windows 10.0|Windows NT 10.0)/},{s:"Windows 8.1",r:/(Windows 8.1|Windows NT 6.3)/},{s:"Windows 8",r:/(Windows 8|Windows NT 6.2)/},{s:"Windows 7",r:/(Windows 7|Windows NT 6.1)/},{s:"Windows Vista",r:/Windows NT 6.0/},{s:"Windows Server 2003",r:/Windows NT 5.2/},{s:"Windows XP",r:/(Windows NT 5.1|Windows XP)/},{s:"Windows 2000",r:/(Windows NT 5.0|Windows 2000)/},{s:"Windows ME",r:/(Win 9x 4.90|Windows ME)/},{s:"Windows 98",r:/(Windows 98|Win98)/},{s:"Windows 95",r:/(Windows 95|Win95|Windows_95)/},{s:"Windows NT 4.0",r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},{s:"Windows CE",r:/Windows CE/},{s:"Windows 3.11",r:/Win16/},{s:"Android",r:/Android/},{s:"Open BSD",r:/OpenBSD/},{s:"Sun OS",r:/SunOS/},{s:"Linux",r:/(Linux|X11)/},{s:"iOS",r:/(iPhone|iPad|iPod)/},{s:"Mac OS X",r:/Mac OS X/},{s:"Mac OS",r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},{s:"QNX",r:/QNX/},{s:"UNIX",r:/UNIX/},{s:"BeOS",r:/BeOS/},{s:"OS/2",r:/OS\/2/},{s:"Search Bot",r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}];for(var id in clientStrings){var cs=clientStrings[id];if(cs.r.test(nAgt)){os=cs.s;break}}var osVersion=unknown;switch(/Windows/.test(os)&&(/Windows (.*)/.test(os)&&(osVersion=/Windows (.*)/.exec(os)[1]),os="Windows"),os){case"Mac OS X":/Mac OS X (10[\.\_\d]+)/.test(nAgt)&&(osVersion=/Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1]);break;case"Android":/Android ([\.\_\d]+)/.test(nAgt)&&(osVersion=/Android ([\.\_\d]+)/.exec(nAgt)[1]);break;case"iOS":/OS (\d+)_(\d+)_?(\d+)?/.test(nAgt)&&(osVersion=/OS (\d+)_(\d+)_?(\d+)?/.exec(nVer),osVersion=osVersion[1]+"."+osVersion[2]+"."+(0|osVersion[3]))}return{osName:os,osVersion:osVersion}}function DetectLocalIPAddress(callback){DetectRTC.isWebRTCSupported&&(DetectRTC.isORTCSupported||getIPs(function(ip){callback(ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)?"Local: "+ip:"Public: "+ip)}))}function getIPs(callback){function handleCandidate(candidate){var ipRegex=/([0-9]{1,3}(\.[0-9]{1,3}){3})/,match=ipRegex.exec(candidate);if(!match)return void console.warn("Could not match IP address in",candidate);var ipAddress=match[1];void 0===ipDuplicates[ipAddress]&&callback(ipAddress),ipDuplicates[ipAddress]=!0}var ipDuplicates={},RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection,useWebKit=!!window.webkitRTCPeerConnection;if(!RTCPeerConnection){var iframe=document.getElementById("iframe");if(!iframe)throw"NOTE: you need to have an iframe in the page right above the script tag.";var win=iframe.contentWindow;RTCPeerConnection=win.RTCPeerConnection||win.mozRTCPeerConnection||win.webkitRTCPeerConnection,useWebKit=!!win.webkitRTCPeerConnection}if(RTCPeerConnection){var servers,mediaConstraints={optional:[{RtpDataChannels:!0}]};useWebKit&&(servers={iceServers:[{urls:"stun:stun.services.mozilla.com"}]},"undefined"!=typeof DetectRTC&&DetectRTC.browser.isFirefox&&DetectRTC.browser.version<=38&&(servers[0]={url:servers[0].urls}));var pc=new RTCPeerConnection(servers,mediaConstraints);pc.onicecandidate=function(ice){ice.candidate&&handleCandidate(ice.candidate.candidate)},pc.createDataChannel(""),pc.createOffer(function(result){pc.setLocalDescription(result,function(){},function(){})},function(){}),setTimeout(function(){var lines=pc.localDescription.sdp.split("\n");lines.forEach(function(line){0===line.indexOf("a=candidate:")&&handleCandidate(line)})},1e3)}}function checkDeviceSupport(callback){return canEnumerate?(!navigator.enumerateDevices&&window.MediaStreamTrack&&window.MediaStreamTrack.getSources&&(navigator.enumerateDevices=window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack)),!navigator.enumerateDevices&&navigator.enumerateDevices&&(navigator.enumerateDevices=navigator.enumerateDevices.bind(navigator)),navigator.enumerateDevices?(MediaDevices=[],audioInputDevices=[],audioOutputDevices=[],videoInputDevices=[],void navigator.enumerateDevices(function(devices){devices.forEach(function(_device){var device={};for(var d in _device)device[d]=_device[d];"audio"===device.kind&&(device.kind="audioinput"),"video"===device.kind&&(device.kind="videoinput");var skip;MediaDevices.forEach(function(d){d.id===device.id&&d.kind===device.kind&&(skip=!0)}),skip||(device.deviceId||(device.deviceId=device.id),device.id||(device.id=device.deviceId),device.label?("videoinput"!==device.kind||isWebsiteHasWebcamPermissions||(isWebsiteHasWebcamPermissions=!0),"audioinput"!==device.kind||isWebsiteHasMicrophonePermissions||(isWebsiteHasMicrophonePermissions=!0)):(device.label="Please invoke getUserMedia once.","https:"!==location.protocol&&document.domain.search&&-1===document.domain.search(/localhost|127.0./g)&&(device.label="HTTPs is required to get label of this "+device.kind+" device.")),"audioinput"===device.kind&&(hasMicrophone=!0,-1===audioInputDevices.indexOf(device)&&audioInputDevices.push(device)),"audiooutput"===device.kind&&(hasSpeakers=!0,-1===audioOutputDevices.indexOf(device)&&audioOutputDevices.push(device)),"videoinput"===device.kind&&(hasWebcam=!0,-1===videoInputDevices.indexOf(device)&&videoInputDevices.push(device)),-1===MediaDevices.indexOf(device)&&MediaDevices.push(device))}),"undefined"!=typeof DetectRTC&&(DetectRTC.MediaDevices=MediaDevices,DetectRTC.hasMicrophone=hasMicrophone,DetectRTC.hasSpeakers=hasSpeakers,DetectRTC.hasWebcam=hasWebcam,DetectRTC.isWebsiteHasWebcamPermissions=isWebsiteHasWebcamPermissions,DetectRTC.isWebsiteHasMicrophonePermissions=isWebsiteHasMicrophonePermissions,DetectRTC.audioInputDevices=audioInputDevices,DetectRTC.audioOutputDevices=audioOutputDevices,DetectRTC.videoInputDevices=videoInputDevices),callback&&callback()})):void(callback&&callback())):void(callback&&callback())}var browserFakeUserAgent="Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45";!function(that){"undefined"==typeof window&&("undefined"==typeof window&&"undefined"!=typeof global?(global.navigator={userAgent:browserFakeUserAgent,getUserMedia:function(){}},that.window=global):"undefined"==typeof window,"undefined"==typeof document&&(that.document={},document.createElement=document.captureStream=document.mozCaptureStream=function(){return{}}),"undefined"==typeof location&&(that.location={protocol:"file:",href:"",hash:""}),"undefined"==typeof screen&&(that.screen={width:0,height:0}))}("undefined"!=typeof global?global:window);var navigator=window.navigator;"undefined"!=typeof navigator?("undefined"!=typeof navigator.webkitGetUserMedia&&(navigator.getUserMedia=navigator.webkitGetUserMedia),"undefined"!=typeof navigator.mozGetUserMedia&&(navigator.getUserMedia=navigator.mozGetUserMedia)):navigator={getUserMedia:function(){},userAgent:browserFakeUserAgent};var isMobileDevice=!!/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent||""),isEdge=!(-1===navigator.userAgent.indexOf("Edge")||!navigator.msSaveOrOpenBlob&&!navigator.msSaveBlob),isOpera=!!window.opera||navigator.userAgent.indexOf(" OPR/")>=0,isFirefox="undefined"!=typeof window.InstallTrigger,isSafari=Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")>0,isChrome=!!window.chrome&&!isOpera,isIE=!!document.documentMode&&!isEdge,isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry|BB10/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows()},getOsName:function(){var osName="Unknown OS";return isMobile.Android()&&(osName="Android"),isMobile.BlackBerry()&&(osName="BlackBerry"),isMobile.iOS()&&(osName="iOS"),isMobile.Opera()&&(osName="Opera Mini"),isMobile.Windows()&&(osName="Windows"),osName}},osName="Unknown OS",osVersion="Unknown OS Version";if(isMobile.any())osName=isMobile.getOsName();else{var osInfo=detectDesktopOS();osName=osInfo.osName,osVersion=osInfo.osVersion}var isCanvasSupportsStreamCapturing=!1,isVideoSupportsStreamCapturing=!1;["captureStream","mozCaptureStream","webkitCaptureStream"].forEach(function(item){!isCanvasSupportsStreamCapturing&&item in document.createElement("canvas")&&(isCanvasSupportsStreamCapturing=!0),!isVideoSupportsStreamCapturing&&item in document.createElement("video")&&(isVideoSupportsStreamCapturing=!0)});var MediaDevices=[],audioInputDevices=[],audioOutputDevices=[],videoInputDevices=[];navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices&&(navigator.enumerateDevices=function(callback){navigator.mediaDevices.enumerateDevices().then(callback)["catch"](function(){callback([])})});var canEnumerate=!1;"undefined"!=typeof MediaStreamTrack&&"getSources"in MediaStreamTrack?canEnumerate=!0:navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices&&(canEnumerate=!0);var hasMicrophone=!1,hasSpeakers=!1,hasWebcam=!1,isWebsiteHasMicrophonePermissions=!1,isWebsiteHasWebcamPermissions=!1;checkDeviceSupport();var DetectRTC=window.DetectRTC||{};DetectRTC.browser=getBrowserInfo(),detectPrivateMode(function(isPrivateBrowsing){DetectRTC.browser.isPrivateBrowsing=!!isPrivateBrowsing}),DetectRTC.browser["is"+DetectRTC.browser.name]=!0;var isWebRTCSupported=(!!(window.process&&"object"==typeof window.process&&window.process.versions&&window.process.versions["node-webkit"]),!1);["RTCPeerConnection","webkitRTCPeerConnection","mozRTCPeerConnection","RTCIceGatherer"].forEach(function(item){isWebRTCSupported||item in window&&(isWebRTCSupported=!0)}),DetectRTC.isWebRTCSupported=isWebRTCSupported,DetectRTC.isORTCSupported="undefined"!=typeof RTCIceGatherer;var isScreenCapturingSupported=!1;DetectRTC.browser.isChrome&&DetectRTC.browser.version>=35?isScreenCapturingSupported=!0:DetectRTC.browser.isFirefox&&DetectRTC.browser.version>=34&&(isScreenCapturingSupported=!0),"https:"!==location.protocol&&(isScreenCapturingSupported=!1),DetectRTC.isScreenCapturingSupported=isScreenCapturingSupported;var webAudio={isSupported:!1,isCreateMediaStreamSourceSupported:!1};["AudioContext","webkitAudioContext","mozAudioContext","msAudioContext"].forEach(function(item){webAudio.isSupported||item in window&&(webAudio.isSupported=!0,"createMediaStreamSource"in window[item].prototype&&(webAudio.isCreateMediaStreamSourceSupported=!0))}),DetectRTC.isAudioContextSupported=webAudio.isSupported,DetectRTC.isCreateMediaStreamSourceSupported=webAudio.isCreateMediaStreamSourceSupported;var isRtpDataChannelsSupported=!1;DetectRTC.browser.isChrome&&DetectRTC.browser.version>31&&(isRtpDataChannelsSupported=!0),DetectRTC.isRtpDataChannelsSupported=isRtpDataChannelsSupported;var isSCTPSupportd=!1;DetectRTC.browser.isFirefox&&DetectRTC.browser.version>28?isSCTPSupportd=!0:DetectRTC.browser.isChrome&&DetectRTC.browser.version>25?isSCTPSupportd=!0:DetectRTC.browser.isOpera&&DetectRTC.browser.version>=11&&(isSCTPSupportd=!0),DetectRTC.isSctpDataChannelsSupported=isSCTPSupportd,DetectRTC.isMobileDevice=isMobileDevice;var isGetUserMediaSupported=!1;navigator.getUserMedia?isGetUserMediaSupported=!0:navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&(isGetUserMediaSupported=!0),DetectRTC.browser.isChrome&&DetectRTC.browser.version>=46&&"https:"!==location.protocol&&(DetectRTC.isGetUserMediaSupported="Requires HTTPs"),DetectRTC.isGetUserMediaSupported=isGetUserMediaSupported,DetectRTC.osName=osName,DetectRTC.osVersion=osVersion;var displayResolution="";if(screen.width){var width=screen.width?screen.width:"",height=screen.height?screen.height:"";displayResolution+=""+width+" x "+height}DetectRTC.displayResolution=displayResolution,DetectRTC.isCanvasSupportsStreamCapturing=isCanvasSupportsStreamCapturing,DetectRTC.isVideoSupportsStreamCapturing=isVideoSupportsStreamCapturing,DetectRTC.DetectLocalIPAddress=DetectLocalIPAddress,DetectRTC.isWebSocketsSupported="WebSocket"in window&&2===window.WebSocket.CLOSING,DetectRTC.isWebSocketsBlocked=!DetectRTC.isWebSocketsSupported,DetectRTC.checkWebSocketsSupport=function(callback){callback=callback||function(){};try{var websocket=new WebSocket("wss://echo.websocket.org:443/");websocket.onopen=function(){DetectRTC.isWebSocketsBlocked=!1,callback(),websocket.close(),websocket=null},websocket.onerror=function(){DetectRTC.isWebSocketsBlocked=!0,callback()}}catch(e){DetectRTC.isWebSocketsBlocked=!0,callback()}},DetectRTC.load=function(callback){callback=callback||function(){},checkDeviceSupport(callback)},DetectRTC.MediaDevices=MediaDevices,DetectRTC.hasMicrophone=hasMicrophone,DetectRTC.hasSpeakers=hasSpeakers,DetectRTC.hasWebcam=hasWebcam,DetectRTC.isWebsiteHasWebcamPermissions=isWebsiteHasWebcamPermissions,DetectRTC.isWebsiteHasMicrophonePermissions=isWebsiteHasMicrophonePermissions,DetectRTC.audioInputDevices=audioInputDevices,DetectRTC.audioOutputDevices=audioOutputDevices,DetectRTC.videoInputDevices=videoInputDevices;var isSetSinkIdSupported=!1;"setSinkId"in document.createElement("video")&&(isSetSinkIdSupported=!0),DetectRTC.isSetSinkIdSupported=isSetSinkIdSupported;var isRTPSenderReplaceTracksSupported=!1;DetectRTC.browser.isFirefox&&"undefined"!=typeof mozRTCPeerConnection?"getSenders"in mozRTCPeerConnection.prototype&&(isRTPSenderReplaceTracksSupported=!0):DetectRTC.browser.isChrome&&"undefined"!=typeof webkitRTCPeerConnection&&"getSenders"in webkitRTCPeerConnection.prototype&&(isRTPSenderReplaceTracksSupported=!0),DetectRTC.isRTPSenderReplaceTracksSupported=isRTPSenderReplaceTracksSupported;var isRemoteStreamProcessingSupported=!1;DetectRTC.browser.isFirefox&&DetectRTC.browser.version>38&&(isRemoteStreamProcessingSupported=!0),DetectRTC.isRemoteStreamProcessingSupported=isRemoteStreamProcessingSupported;var isApplyConstraintsSupported=!1;"undefined"!=typeof MediaStreamTrack&&"applyConstraints"in MediaStreamTrack.prototype&&(isApplyConstraintsSupported=!0),DetectRTC.isApplyConstraintsSupported=isApplyConstraintsSupported;var isMultiMonitorScreenCapturingSupported=!1;DetectRTC.browser.isFirefox&&DetectRTC.browser.version>=43&&(isMultiMonitorScreenCapturingSupported=!0),DetectRTC.isMultiMonitorScreenCapturingSupported=isMultiMonitorScreenCapturingSupported,DetectRTC.isPromisesSupported=!!("Promise"in window),"undefined"==typeof DetectRTC&&(window.DetectRTC={});var MediaStream=window.MediaStream;"undefined"==typeof MediaStream&&"undefined"!=typeof webkitMediaStream&&(MediaStream=webkitMediaStream),"undefined"!=typeof MediaStream?DetectRTC.MediaStream=Object.keys(MediaStream.prototype):DetectRTC.MediaStream=!1,"undefined"!=typeof MediaStreamTrack?DetectRTC.MediaStreamTrack=Object.keys(MediaStreamTrack.prototype):DetectRTC.MediaStreamTrack=!1;var RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;"undefined"!=typeof RTCPeerConnection?DetectRTC.RTCPeerConnection=Object.keys(RTCPeerConnection.prototype):DetectRTC.RTCPeerConnection=!1,window.DetectRTC=DetectRTC,"undefined"!=typeof module&&(module.exports=DetectRTC),"function"==typeof define&&define.amd&&define("DetectRTC",[],function(){return DetectRTC})}();
/* Riot v2.6.7, @license MIT */
!function(e,t){"use strict";function n(e,t,n){var r={};return r[e.key]=t,e.pos&&(r[e.pos]=n),r}function r(e,t){for(var n,r=t.length,o=e.length;r>o;)n=t[--r],t.splice(r,1),n.unmount()}function o(e,t){Object.keys(e.tags).forEach(function(n){var r=e.tags[n];k(r)?h(r,function(e){T(e,n,t)}):T(r,n,t)})}function i(e,t,n){var r,o=e._root;for(e._virts=[];o;)r=o.nextSibling,n?t.insertBefore(o,n._root):t.appendChild(o),e._virts.push(o),o=r}function a(e,t,n,r){for(var o,i=e._root,a=0;a<r;a++)o=i.nextSibling,t.insertBefore(i,n._root),i=o}function u(e,t,n,r,o,i,a){D(t.root)||(e?i(t,r,n,a.childNodes.length):r.insertBefore(t.root,n.root))}function f(e,t,f){w(e,"each");var c,s=typeof N(e,"no-reorder")!==ne||w(e,"no-reorder"),p=j(e),d=X[p]||{tmpl:v(e)},g=fe.test(p),h=e.parentNode,m=document.createTextNode(""),y=O(e),b="option"===p.toLowerCase(),x=[],_=[],C="VIRTUAL"==e.tagName;f=ge.loopKeys(f),h.insertBefore(m,e),t.one("before-mount",function(){e.parentNode.removeChild(e),h.stub&&(h=t.root)}).on("update",function(){var v=ge(f.val,t),w=document.createDocumentFragment();k(v)||(c=v||!1,v=c?Object.keys(v).map(function(e){return n(f,e,v[e])}):[]);for(var N=0,O=v.length;N<O;N++){var L=v[N],T=s&&typeof L==re&&!c,E=_.indexOf(L),M=~E&&T?E:N,j=x[M];L=!c&&f.key?n(f,L,N):L,!T&&!j||T&&!~E||!j?(j=new l(d,{parent:t,isLoop:!0,hasImpl:!!X[p],root:g?h:e.cloneNode(),item:L},e.innerHTML),j.mount(),C&&(j._root=j.root.firstChild),N!=x.length&&x[N]?(u(C,j,x[N],h,x,i,e),_.splice(N,0,L)):C?i(j,w):w.appendChild(j.root),x.splice(N,0,j),M=N):j.update(L,!0),M!==N&&T&&x[N]&&(R(v,_[N])&&u(C,j,x[N],h,x,a,e),f.pos&&(j[f.pos]=N),x.splice(N,0,x.splice(M,1)[0]),_.splice(N,0,_.splice(M,1)[0]),!y&&j.tags&&o(j,N)),j._item=L,S(j,"_parent",t)}if(r(v,x),h.insertBefore(w,m),b&&pe&&!h.multiple)for(var A=0;A<h.length;A++)if(h[A].__riot1374){h.selectedIndex=A,delete h[A].__riot1374;break}y&&(t.tags[p]=x),_=v.slice()})}function c(e,t,n,r){P(e,function(e){if(1==e.nodeType){if(e.isLoop=e.isLoop||e.parentNode&&e.parentNode.isLoop||N(e,"each")?1:0,n){var o=O(e);o&&!e.isLoop&&n.push(E(o,{root:e,parent:t},e.innerHTML,t))}e.isLoop&&!r||U(e,t,[])}})}function s(e,t,n){function r(e,t,r){ge.hasExpr(t)&&n.push(A({dom:e,expr:t},r))}P(e,function(e){var n,o=e.nodeType;if(3==o&&"STYLE"!=e.parentNode.tagName&&r(e,e.nodeValue),1==o)return(n=N(e,"each"))?(f(e,t,n),!1):(h(e.attributes,function(t){var n=t.name,o=n.split("__")[1];if(r(e,t.value,{attr:o||n,bool:o}),o)return w(e,n),!1}),!O(e)&&void 0)})}function l(e,n,r){function o(){var e=b&&y?p:v||p;h(T.attributes,function(t){var n=t.value;d[_(t.name)]=ge.hasExpr(n)?ge(n,e):n}),h(Object.keys(j),function(t){d[_(t)]=ge(j[t],e)})}function i(e){for(var t in N)typeof p[t]!==oe&&$(p,t)&&(p[t]=e[t])}function a(e){h(Object.keys(e),function(t){var n=!ce.test(t)&&R(P,t);(typeof p[t]===oe||n)&&(n||P.push(t),p[t]=e[t])})}function u(e){p.update(e,!0)}function f(e){if(h(L,function(t){t[e?"mount":"unmount"]()}),v){var t=e?"on":"off";y?v[t]("unmount",p.unmount):v[t]("update",u)[t]("unmount",p.unmount)}}var l,p=Z.observable(this),d=q(n.opts)||{},v=n.parent,y=n.isLoop,b=n.hasImpl,N=I(n.item),O=[],L=[],T=n.root,E=T.tagName.toLowerCase(),j={},P=[];e.name&&T._tag&&T._tag.unmount(!0),this.isMounted=!1,T.isLoop=y,T._tag=this,S(this,"_riot_id",++Q),A(this,{parent:v,root:T,opts:d},N),S(this,"tags",{}),h(T.attributes,function(e){var t=e.value;ge.hasExpr(t)&&(j[e.name]=t)}),l=he(e.tmpl,r,y),S(this,"update",function(e,t){return e=I(e),y&&a(p.parent),e&&x(N)&&(i(e),N=e),A(p,e),o(),p.trigger("update",e),g(O,p),t&&p.parent?p.parent.one("updated",function(){p.trigger("updated")}):ve(function(){p.trigger("updated")}),this}),S(this,"mixin",function(){return h(arguments,function(e){var t,n,r=[];e=typeof e===ne?Z.mixin(e):e,t=m(e)?new e:e;var o=Object.getPrototypeOf(t);do r=r.concat(Object.getOwnPropertyNames(n||t));while(n=Object.getPrototypeOf(n||t));h(r,function(e){if("init"!=e){var n=Object.getOwnPropertyDescriptor(t,e)||Object.getOwnPropertyDescriptor(o,e),r=n&&(n.get||n.set);!p.hasOwnProperty(e)&&r?Object.defineProperty(p,e,n):p[e]=m(t[e])?t[e].bind(p):t[e]}}),t.init&&t.init.bind(p)()}),this}),S(this,"mount",function(){o();var t=Z.mixin(Y);if(t)for(var n in t)t.hasOwnProperty(n)&&p.mixin(t[n]);if(p._parent&&p._parent.root.isLoop&&a(p._parent),e.fn&&e.fn.call(p,d),s(l,p,O),f(!0),e.attrs&&H(e.attrs,function(e,t){C(T,e,t)}),(e.attrs||b)&&s(p.root,p,O),p.parent&&!y||p.update(N),p.trigger("before-mount"),y&&!b)T=l.firstChild;else{for(;l.firstChild;)T.appendChild(l.firstChild);T.stub&&(T=v.root)}S(p,"root",T),y&&c(p.root,p.parent,null,!0),!p.parent||p.parent.isMounted?(p.isMounted=!0,p.trigger("mount")):p.parent.one("mount",function(){D(p.root)||(p.parent.isMounted=p.isMounted=!0,p.trigger("mount"))})}),S(this,"unmount",function(e){var n,r=T,o=r.parentNode,i=W.indexOf(p);if(p.trigger("before-unmount"),~i&&W.splice(i,1),o){if(v)n=M(v),k(n.tags[E])?h(n.tags[E],function(e,t){e._riot_id==p._riot_id&&n.tags[E].splice(t,1)}):n.tags[E]=t;else for(;r.firstChild;)r.removeChild(r.firstChild);e?(w(o,te),w(o,ee)):o.removeChild(r)}this._virts&&h(this._virts,function(e){e.parentNode&&e.parentNode.removeChild(e)}),p.trigger("unmount"),f(),p.off("*"),p.isMounted=!1,delete T._tag}),c(l,this,L)}function p(t,n,r,o){r[t]=function(t){var i,a=o._parent,u=o._item;if(!u)for(;a&&!u;)u=a._item,a=a._parent;t=t||e.event,$(t,"currentTarget")&&(t.currentTarget=r),$(t,"target")&&(t.target=t.srcElement),$(t,"which")&&(t.which=t.charCode||t.keyCode),t.item=u,n.call(o,t)===!0||/radio|check/.test(r.type)||(t.preventDefault&&t.preventDefault(),t.returnValue=!1),t.preventUpdate||(i=u?M(a):o,i.update())}}function d(e,t,n){e&&(e.insertBefore(n,t),e.removeChild(t))}function g(e,t){h(e,function(e,n){var r=e.dom,o=e.attr,i=ge(e.expr,t),a=e.parent||e.dom.parentNode;if(e.bool?i=!!i:null==i&&(i=""),e.value!==i){if(e.value=i,!o)return i+="",void(a&&(e.parent=a,"TEXTAREA"===a.tagName?(a.value=i,le||(r.nodeValue=i)):r.nodeValue=i));if("value"===o)return void(r.value!==i&&(r.value=i,C(r,o,i)));if(w(r,o),m(i))p(o,i,r,t);else if("if"==o){var u=e.stub,f=function(){d(u.parentNode,u,r)},c=function(){d(r.parentNode,r,u)};i?u&&(f(),r.inStub=!1,D(r)||P(r,function(e){e._tag&&!e._tag.isMounted&&(e._tag.isMounted=!!e._tag.trigger("mount"))})):(u=e.stub=u||document.createTextNode(""),r.parentNode?c():(t.parent||t).one("updated",c),r.inStub=!0)}else"show"===o?r.style.display=i?"":"none":"hide"===o?r.style.display=i?"none":"":e.bool?(r[o]=i,i&&C(r,o,o),pe&&"selected"===o&&"OPTION"===r.tagName&&(r.__riot1374=i)):(0===i||i&&typeof i!==re)&&(V(o,J)&&o!=ee&&(o=o.slice(J.length)),C(r,o,i))}})}function h(e,t){for(var n,r=e?e.length:0,o=0;o<r;o++)n=e[o],null!=n&&t(n,o)===!1&&o--;return e}function m(e){return typeof e===ie||!1}function v(e){if(e.outerHTML)return e.outerHTML;var t=F("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}function y(e,t){if(typeof e.innerHTML!=oe)e.innerHTML=t;else{var n=(new DOMParser).parseFromString(t,"application/xml");e.appendChild(e.ownerDocument.importNode(n.documentElement,!0))}}function b(e){return~se.indexOf(e)}function x(e){return e&&typeof e===re}function w(e,t){e.removeAttribute(t)}function _(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})}function N(e,t){return e.getAttribute(t)}function C(e,t,n){var r=ue.exec(t);r&&r[1]?e.setAttributeNS(ae,r[1],n):e.setAttribute(t,n)}function O(e){return e.tagName&&X[N(e,te)||N(e,ee)||e.tagName.toLowerCase()]}function L(e,t,n){var r=n.tags[t];r?(k(r)||r!==e&&(n.tags[t]=[r]),R(n.tags[t],e)||n.tags[t].push(e)):n.tags[t]=e}function T(e,t,n){var r,o=e.parent;o&&(r=o.tags[t],k(r)?r.splice(n,0,r.splice(r.indexOf(e),1)[0]):L(e,t,o))}function E(e,t,n,r){var o=new l(e,t,n),i=j(t.root),a=M(r);return o.parent=a,o._parent=r,L(o,i,a),a!==r&&L(o,i,r),t.root.innerHTML="",o}function M(e){for(var t=e;!O(t.root)&&t.parent;)t=t.parent;return t}function S(e,t,n,r){return Object.defineProperty(e,t,A({value:n,enumerable:!1,writable:!1,configurable:!0},r)),e}function j(e){var t=O(e),n=N(e,"name"),r=n&&!ge.hasExpr(n)?n:t?t.name:e.tagName.toLowerCase();return r}function A(e){for(var t,n=arguments,r=1;r<n.length;++r)if(t=n[r])for(var o in t)$(e,o)&&(e[o]=t[o]);return e}function R(e,t){return~e.indexOf(t)}function k(e){return Array.isArray(e)||e instanceof Array}function $(e,t){var n=Object.getOwnPropertyDescriptor(e,t);return typeof e[t]===oe||n&&n.writable}function I(e){if(!(e instanceof l||e&&typeof e.trigger==ie))return e;var t={};for(var n in e)ce.test(n)||(t[n]=e[n]);return t}function P(e,t){if(e){if(t(e)===!1)return;for(e=e.firstChild;e;)P(e,t),e=e.nextSibling}}function H(e,t){for(var n,r=/([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;n=r.exec(e);)t(n[1].toLowerCase(),n[2]||n[3]||n[4])}function D(e){for(;e;){if(e.inStub)return!0;e=e.parentNode}return!1}function F(e,t){return t?document.createElementNS("http://www.w3.org/2000/svg","svg"):document.createElement(e)}function B(e,t){return(t||document).querySelectorAll(e)}function K(e,t){return(t||document).querySelector(e)}function q(e){return Object.create(e||null)}function G(e){return N(e,"id")||N(e,"name")}function U(e,t,n){var r,o=G(e),i=function(i){R(n,o)||(r=k(i),i?(!r||r&&!R(i,e))&&(r?i.push(e):t[o]=[i,e]):t[o]=e)};o&&(ge.hasExpr(o)?t.one("mount",function(){o=G(e),i(t[o])}):i(t[o]))}function V(e,t){return e.slice(0,t.length)===t}function z(e,t,n){var r=X[t],o=e._innerHTML=e._innerHTML||e.innerHTML;return e.innerHTML="",r&&e&&(r=new l(r,{root:e,opts:n},o)),r&&r.mount&&(r.mount(),R(W,r)||W.push(r)),r}var Z={version:"v2.6.7",settings:{}},Q=0,W=[],X={},Y="__global_mixin",J="riot-",ee=J+"tag",te="data-is",ne="string",re="object",oe="undefined",ie="function",ae="http://www.w3.org/1999/xlink",ue=/^xlink:(\w+)/,fe=/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,ce=/^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|parent|opts|trigger|o(?:n|ff|ne))$/,se=["altGlyph","animate","animateColor","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feFlood","feGaussianBlur","feImage","feMerge","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence","filter","font","foreignObject","g","glyph","glyphRef","image","line","linearGradient","marker","mask","missing-glyph","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tref","tspan","use"],le=0|(e&&e.document||{}).documentMode,pe=e&&!!e.InstallTrigger;Z.observable=function(e){function t(e,t){for(var n=e.split(" "),r=n.length,o=0;o<r;o++){var i=n[o];i&&t(i,o)}}e=e||{};var n={},r=Array.prototype.slice;return Object.defineProperties(e,{on:{value:function(r,o){return"function"!=typeof o?e:(t(r,function(e,t){(n[e]=n[e]||[]).push(o),o.typed=t>0}),e)},enumerable:!1,writable:!1,configurable:!1},off:{value:function(r,o){return"*"!=r||o?t(r,function(e,t){if(o)for(var r,i=n[e],a=0;r=i&&i[a];++a)r==o&&i.splice(a--,1);else delete n[e]}):n={},e},enumerable:!1,writable:!1,configurable:!1},one:{value:function(t,n){function r(){e.off(t,r),n.apply(e,arguments)}return e.on(t,r)},enumerable:!1,writable:!1,configurable:!1},trigger:{value:function(o){for(var i,a=arguments.length-1,u=new Array(a),f=0;f<a;f++)u[f]=arguments[f+1];return t(o,function(t,o){i=r.call(n[t]||[],0);for(var a,f=0;a=i[f];++f)a.busy||(a.busy=1,a.apply(e,a.typed?[t].concat(u):u),i[f]!==a&&f--,a.busy=0);n["*"]&&"*"!=t&&e.trigger.apply(e,["*",t].concat(u))}),e},enumerable:!1,writable:!1,configurable:!1}}),e},function(t){function n(e){return e.split(/[\/?#]/)}function r(e,t){var n=new RegExp("^"+t[C](/\*/g,"([^/?#]+?)")[C](/\.\./,".*")+"$"),r=e.match(n);if(r)return r.slice(1)}function o(e,t){var n;return function(){clearTimeout(n),n=setTimeout(e,t)}}function i(e){g=o(l,1),M[_](O,g),M[_](L,g),S[_](k,p),e&&l(!0)}function a(){this.$=[],t.observable(this),I.on("stop",this.s.bind(this)),I.on("emit",this.e.bind(this))}function u(e){return e[C](/^\/|\/$/,"")}function f(e){return"string"==typeof e}function c(e){return(e||A.href)[C](b,"")}function s(e){return"#"==h[0]?(e||A.href||"").split(h)[1]||"":(A?c(e):e||"")[C](h,"")}function l(e){var t,n=0==D;if(!(E<=D)&&(D++,H.push(function(){var t=s();(e||t!=m)&&(I[T]("emit",t),m=t)}),n)){for(;t=H.shift();)t();D=0}}function p(e){if(!(1!=e.which||e.metaKey||e.ctrlKey||e.shiftKey||e.defaultPrevented)){for(var t=e.target;t&&"A"!=t.nodeName;)t=t.parentNode;!t||"A"!=t.nodeName||t[N]("download")||!t[N]("href")||t.target&&"_self"!=t.target||t.href.indexOf(A.href.match(b)[0])==-1||t.href!=A.href&&(t.href.split("#")[0]==A.href.split("#")[0]||"#"!=h[0]&&0!==c(t.href).indexOf(h)||"#"==h[0]&&t.href.split(h)[0]!=A.href.split(h)[0]||!d(s(t.href),t.title||S.title))||e.preventDefault()}}function d(e,t,n){return j?(e=h+u(e),t=t||S.title,n?j.replaceState(null,t,e):j.pushState(null,t,e),S.title=t,P=!1,l(),P):I[T]("emit",s(e))}var g,h,m,v,y,b=/^.+?\/\/+[^\/]+/,x="EventListener",w="remove"+x,_="add"+x,N="hasAttribute",C="replace",O="popstate",L="hashchange",T="trigger",E=3,M="undefined"!=typeof e&&e,S="undefined"!=typeof document&&document,j=M&&history,A=M&&(j.location||M.location),R=a.prototype,k=S&&S.ontouchstart?"touchstart":"click",$=!1,I=t.observable(),P=!1,H=[],D=0;R.m=function(e,t,n){!f(e)||t&&!f(t)?t?this.r(e,t):this.r("@",e):d(e,t,n||!1)},R.s=function(){this.off("*"),this.$=[]},R.e=function(e){this.$.concat("@").some(function(t){var n=("@"==t?v:y)(u(e),u(t));if("undefined"!=typeof n)return this[T].apply(null,[t].concat(n)),P=!0},this)},R.r=function(e,t){"@"!=e&&(e="/"+u(e),this.$.push(e)),this.on(e,t)};var F=new a,B=F.m.bind(F);B.create=function(){var e=new a,t=e.m.bind(e);return t.stop=e.s.bind(e),t},B.base=function(e){h=e||"#",m=s()},B.exec=function(){l(!0)},B.parser=function(e,t){e||t||(v=n,y=r),e&&(v=e),t&&(y=t)},B.query=function(){var e={},t=A.href||m;return t[C](/[?&](.+?)=([^&]*)/g,function(t,n,r){e[n]=r}),e},B.stop=function(){$&&(M&&(M[w](O,g),M[w](L,g),S[w](k,p)),I[T]("stop"),$=!1)},B.start=function(e){$||(M&&("complete"==document.readyState?i(e):M[_]("load",function(){setTimeout(function(){i(e)},1)})),$=!0)},B.base(),B.parser(),t.route=B}(Z);var de=function(e){function t(e){return e}function n(e,t){return t||(t=b),new RegExp(e.source.replace(/{/g,t[2]).replace(/}/g,t[3]),e.global?c:"")}function r(e){if(e===m)return v;var t=e.split(" ");if(2!==t.length||d.test(e))throw new Error('Unsupported brackets "'+e+'"');return t=t.concat(e.replace(g,"\\").split(" ")),t[4]=n(t[1].length>1?/{[\S\s]*?}/:v[4],t),t[5]=n(e.length>3?/\\({|})/g:v[5],t),t[6]=n(v[6],t),t[7]=RegExp("\\\\("+t[3]+")|([[({])|("+t[3]+")|"+p,c),t[8]=e,t}function o(e){return e instanceof RegExp?u(e):b[e]}function i(e){(e||(e=m))!==b[8]&&(b=r(e),u=e===m?t:n,b[9]=u(v[9])),y=e}function a(e){var t;e=e||{},t=e.brackets,Object.defineProperty(e,"brackets",{set:i,get:function(){return y},enumerable:!0}),f=e,i(t)}var u,f,c="g",s=/\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,l=/"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,p=l.source+"|"+/(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source+"|"+/\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,d=RegExp("[\\x00-\\x1F<>a-zA-Z0-9'\",;\\\\]"),g=/(?=[[\]()*+?.^$|])/g,h={"(":RegExp("([()])|"+p,c),"[":RegExp("([[\\]])|"+p,c),"{":RegExp("([{}])|"+p,c)},m="{ }",v=["{","}","{","}",/{[^}]*}/,/\\([{}])/g,/\\({)|{/g,RegExp("\\\\(})|([[({])|(})|"+p,c),m,/^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,/(^|[^\\]){=[\S\s]*?}/],y=e,b=[];return o.split=function(e,t,n){function r(e){t||a?c.push(e&&e.replace(n[5],"$1")):c.push(e)}function o(e,t,n){var r,o=h[t];for(o.lastIndex=n,n=1;(r=o.exec(e))&&(!r[1]||(r[1]===t?++n:--n)););return n?e.length:o.lastIndex}n||(n=b);var i,a,u,f,c=[],s=n[6];for(a=u=s.lastIndex=0;i=s.exec(e);){if(f=i.index,a){if(i[2]){s.lastIndex=o(e,i[2],s.lastIndex);continue}if(!i[3])continue}i[1]||(r(e.slice(u,f)),u=s.lastIndex,s=n[6+(a^=1)],s.lastIndex=u)}return e&&u<e.length&&r(e.slice(u)),c},o.hasExpr=function(e){return b[4].test(e)},o.loopKeys=function(e){var t=e.match(b[9]);return t?{key:t[1],pos:t[2],val:b[0]+t[3].trim()+b[1]}:{val:e.trim()}},o.array=function(e){return e?r(e):b},Object.defineProperty(o,"settings",{set:a,get:function(){return f}}),o.settings="undefined"!=typeof Z&&Z.settings||{},o.set=i,o.R_STRINGS=l,o.R_MLCOMMS=s,o.S_QBLOCKS=p,o}(),ge=function(){function t(e,t){return e?(u[e]||(u[e]=r(e))).call(t,n):e}function n(e,n){t.errorHandler&&(e.riotData={tagName:n&&n.root&&n.root.tagName,_riot_id:n&&n._riot_id},t.errorHandler(e))}function r(e){var t=o(e);return"try{return "!==t.slice(0,11)&&(t="return "+t),new Function("E",t+";")}function o(e){var t,n=[],r=de.split(e.replace(l,'"'),1);if(r.length>2||r[0]){var o,a,u=[];for(o=a=0;o<r.length;++o)t=r[o],t&&(t=1&o?i(t,1,n):'"'+t.replace(/\\/g,"\\\\").replace(/\r\n?|\n/g,"\\n").replace(/"/g,'\\"')+'"')&&(u[a++]=t);t=a<2?u[0]:"["+u.join(",")+'].join("")'}else t=i(r[1],0,n);return n[0]&&(t=t.replace(p,function(e,t){return n[t].replace(/\r/g,"\\r").replace(/\n/g,"\\n")})),t}function i(e,t,n){function r(t,n){var r,o=1,i=d[t];for(i.lastIndex=n.lastIndex;r=i.exec(e);)if(r[0]===t)++o;else if(!--o)break;n.lastIndex=o?e.length:i.lastIndex}if(e=e.replace(s,function(e,t){return e.length>2&&!t?f+(n.push(e)-1)+"~":e}).replace(/\s+/g," ").trim().replace(/\ ?([[\({},?\.:])\ ?/g,"$1")){for(var o,i=[],u=0;e&&(o=e.match(c))&&!o.index;){var l,p,g=/,|([[{(])|$/g;for(e=RegExp.rightContext,l=o[2]?n[o[2]].slice(1,-1).trim().replace(/\s+/g," "):o[1];p=(o=g.exec(e))[1];)r(p,g);p=e.slice(0,o.index),e=RegExp.rightContext,i[u++]=a(p,1,l)}e=u?u>1?"["+i.join(",")+'].join(" ").trim()':i[0]:a(e,t)}return e}function a(e,t,n){var r;return e=e.replace(h,function(e,t,n,o,i){return n&&(o=r?0:o+e.length,"this"!==n&&"global"!==n&&"window"!==n?(e=t+'("'+n+g+n,o&&(r="."===(i=i[o])||"("===i||"["===i)):o&&(r=!m.test(i.slice(o)))),e}),r&&(e="try{return "+e+"}catch(e){E(e,this)}"),n?e=(r?"function(){"+e+"}.call(this)":"("+e+")")+'?"'+n+'":""':t&&(e="function(v){"+(r?e.replace("return ","v="):"v=("+e+")")+';return v||v===0?v:""}.call(this)'),e}var u={};t.haveRaw=de.hasRaw,t.hasExpr=de.hasExpr,t.loopKeys=de.loopKeys,t.clearCache=function(){u={}},t.errorHandler=null;var f=String.fromCharCode(8279),c=/^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,s=RegExp(de.S_QBLOCKS,"g"),l=/\u2057/g,p=/\u2057(\d+)~/g,d={"(":/[()]/g,"[":/[[\]]/g,"{":/[{}]/g},g='"in this?this:'+("object"!=typeof e?"global":"window")+").",h=/[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,m=/^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;return t.version=de.version="v2.4.2",t}(),he=function e(){function e(e,r,o){var i=e&&e.match(/^\s*<([-\w]+)/),a=i&&i[1].toLowerCase(),u=F("div",o&&b(a));return e=n(e,r),f.test(a)?u=t(u,e,a):y(u,e),u.stub=!0,u}function t(e,t,n){var r="o"===n[0],o=r?"select>":"table>";if(e.innerHTML="<"+o+t.trim()+"</"+o,o=e.firstChild,r)o.selectedIndex=-1;else{var i=u[n];i&&1===o.childElementCount&&(o=K(i,o))}return o}function n(e,t){if(!r.test(e))return e;var n={};return t=t&&t.replace(i,function(e,t,r){return n[t]=n[t]||r,""}).trim(),e.replace(a,function(e,t,r){return n[t]||r||""}).replace(o,function(e,n){return t||n||""})}var r=/<yield\b/i,o=/<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/gi,i=/<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/gi,a=/<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/gi,u={tr:"tbody",th:"tr",td:"tr",col:"colgroup"},f=le&&le<10?fe:/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;return e}(),me=function(t){if(!e)return{add:function(){},inject:function(){}};var n=function(){var e=F("style");C(e,"type","text/css");var t=K("style[type=riot]");return t?(t.id&&(e.id=t.id),t.parentNode.replaceChild(e,t)):document.getElementsByTagName("head")[0].appendChild(e),e}(),r=n.styleSheet,o="";return Object.defineProperty(t,"styleNode",{value:n,writable:!0}),{add:function(e){o+=e},inject:function(){o&&(r?r.cssText+=o:n.innerHTML+=o,o="")}}}(Z),ve=function(e){var t=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame;if(!t||/iP(ad|hone|od).*OS 6/.test(e.navigator.userAgent)){var n=0;t=function(e){var t=Date.now(),r=Math.max(16-(t-n),0);setTimeout(function(){e(n=t+r)},r)}}return t}(e||{});Z.util={brackets:de,tmpl:ge},Z.mixin=function(){var e={},t=e[Y]={},n=0;return function(r,o,i){if(x(r))return void Z.mixin("__unnamed_"+n++,r,!0);var a=i?t:e;if(!o){if(typeof a[r]===oe)throw new Error("Unregistered mixin: "+r);return a[r]}m(o)?(A(o.prototype,a[r]||{}),a[r]=o):a[r]=A(a[r]||{},o)}}(),Z.tag=function(e,t,n,r,o){return m(r)&&(o=r,/^[\w\-]+\s?=/.test(n)?(r=n,n=""):r=""),n&&(m(n)?o=n:me.add(n)),e=e.toLowerCase(),X[e]={name:e,tmpl:t,attrs:r,fn:o},e},Z.tag2=function(e,t,n,r,o){return n&&me.add(n),X[e]={name:e,tmpl:t,attrs:r,fn:o},e},Z.mount=function(e,t,n){function r(e){var t="";return h(e,function(e){/[^-\w]/.test(e)||(e=e.trim().toLowerCase(),t+=",["+te+'="'+e+'"],['+ee+'="'+e+'"]')}),t}function o(){var e=Object.keys(X);return e+r(e)}function i(e){if(e.tagName){var r=N(e,te)||N(e,ee);t&&r!==t&&(r=t,C(e,te,t),C(e,ee,t));var o=z(e,r||e.tagName.toLowerCase(),n);o&&f.push(o)}else e.length&&h(e,i)}var a,u,f=[];if(me.inject(),x(t)&&(n=t,t=0),typeof e===ne?("*"===e?e=u=o():e+=r(e.split(/, */)),a=e?B(e):[]):a=e,"*"===t){if(t=u||o(),a.tagName)a=B(t,a);else{var c=[];h(a,function(e){c.push(B(t,e))}),a=c}t=0}return i(a),f},Z.update=function(){return h(W,function(e){e.update()})},Z.vdom=W,Z.Tag=l,typeof exports===re?module.exports=Z:typeof define===ie&&typeof define.amd!==oe?define(function(){return Z}):e.riot=Z}("undefined"!=typeof window?window:void 0);

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.adapter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
 /* eslint-env node */
'use strict';

// SDP helpers.
var SDPUtils = {};

// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
SDPUtils.generateIdentifier = function() {
  return Math.random().toString(36).substr(2, 10);
};

// The RTCP CNAME used by all peerconnections from the same JS.
SDPUtils.localCName = SDPUtils.generateIdentifier();

// Splits SDP into lines, dealing with both CRLF and LF.
SDPUtils.splitLines = function(blob) {
  return blob.trim().split('\n').map(function(line) {
    return line.trim();
  });
};
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
SDPUtils.splitSections = function(blob) {
  var parts = blob.split('\nm=');
  return parts.map(function(part, index) {
    return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
  });
};

// Returns lines that start with a certain prefix.
SDPUtils.matchPrefix = function(blob, prefix) {
  return SDPUtils.splitLines(blob).filter(function(line) {
    return line.indexOf(prefix) === 0;
  });
};

// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
SDPUtils.parseCandidate = function(line) {
  var parts;
  // Parse both variants.
  if (line.indexOf('a=candidate:') === 0) {
    parts = line.substring(12).split(' ');
  } else {
    parts = line.substring(10).split(' ');
  }

  var candidate = {
    foundation: parts[0],
    component: parts[1],
    protocol: parts[2].toLowerCase(),
    priority: parseInt(parts[3], 10),
    ip: parts[4],
    port: parseInt(parts[5], 10),
    // skip parts[6] == 'typ'
    type: parts[7]
  };

  for (var i = 8; i < parts.length; i += 2) {
    switch (parts[i]) {
      case 'raddr':
        candidate.relatedAddress = parts[i + 1];
        break;
      case 'rport':
        candidate.relatedPort = parseInt(parts[i + 1], 10);
        break;
      case 'tcptype':
        candidate.tcpType = parts[i + 1];
        break;
      default: // Unknown extensions are silently ignored.
        break;
    }
  }
  return candidate;
};

// Translates a candidate object into SDP candidate attribute.
SDPUtils.writeCandidate = function(candidate) {
  var sdp = [];
  sdp.push(candidate.foundation);
  sdp.push(candidate.component);
  sdp.push(candidate.protocol.toUpperCase());
  sdp.push(candidate.priority);
  sdp.push(candidate.ip);
  sdp.push(candidate.port);

  var type = candidate.type;
  sdp.push('typ');
  sdp.push(type);
  if (type !== 'host' && candidate.relatedAddress &&
      candidate.relatedPort) {
    sdp.push('raddr');
    sdp.push(candidate.relatedAddress); // was: relAddr
    sdp.push('rport');
    sdp.push(candidate.relatedPort); // was: relPort
  }
  if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
    sdp.push('tcptype');
    sdp.push(candidate.tcpType);
  }
  return 'candidate:' + sdp.join(' ');
};

// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
SDPUtils.parseRtpMap = function(line) {
  var parts = line.substr(9).split(' ');
  var parsed = {
    payloadType: parseInt(parts.shift(), 10) // was: id
  };

  parts = parts[0].split('/');

  parsed.name = parts[0];
  parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
  // was: channels
  parsed.numChannels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
  return parsed;
};

// Generate an a=rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
SDPUtils.writeRtpMap = function(codec) {
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
      (codec.numChannels !== 1 ? '/' + codec.numChannels : '') + '\r\n';
};

// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
SDPUtils.parseExtmap = function(line) {
  var parts = line.substr(9).split(' ');
  return {
    id: parseInt(parts[0], 10),
    uri: parts[1]
  };
};

// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
SDPUtils.writeExtmap = function(headerExtension) {
  return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
       ' ' + headerExtension.uri + '\r\n';
};

// Parses an ftmp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
SDPUtils.parseFmtp = function(line) {
  var parsed = {};
  var kv;
  var parts = line.substr(line.indexOf(' ') + 1).split(';');
  for (var j = 0; j < parts.length; j++) {
    kv = parts[j].trim().split('=');
    parsed[kv[0].trim()] = kv[1];
  }
  return parsed;
};

// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeFmtp = function(codec) {
  var line = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.parameters && Object.keys(codec.parameters).length) {
    var params = [];
    Object.keys(codec.parameters).forEach(function(param) {
      params.push(param + '=' + codec.parameters[param]);
    });
    line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
  }
  return line;
};

// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
SDPUtils.parseRtcpFb = function(line) {
  var parts = line.substr(line.indexOf(' ') + 1).split(' ');
  return {
    type: parts.shift(),
    parameter: parts.join(' ')
  };
};
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
SDPUtils.writeRtcpFb = function(codec) {
  var lines = '';
  var pt = codec.payloadType;
  if (codec.preferredPayloadType !== undefined) {
    pt = codec.preferredPayloadType;
  }
  if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
    // FIXME: special handling for trr-int?
    codec.rtcpFeedback.forEach(function(fb) {
      lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
      (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
          '\r\n';
    });
  }
  return lines;
};

// Parses an RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
SDPUtils.parseSsrcMedia = function(line) {
  var sp = line.indexOf(' ');
  var parts = {
    ssrc: parseInt(line.substr(7, sp - 7), 10)
  };
  var colon = line.indexOf(':', sp);
  if (colon > -1) {
    parts.attribute = line.substr(sp + 1, colon - sp - 1);
    parts.value = line.substr(colon + 1);
  } else {
    parts.attribute = line.substr(sp + 1);
  }
  return parts;
};

// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
  var lines = SDPUtils.splitLines(mediaSection);
  // Search in session part, too.
  lines = lines.concat(SDPUtils.splitLines(sessionpart));
  var fpLine = lines.filter(function(line) {
    return line.indexOf('a=fingerprint:') === 0;
  })[0].substr(14);
  // Note: a=setup line is ignored since we use the 'auto' role.
  var dtlsParameters = {
    role: 'auto',
    fingerprints: [{
      algorithm: fpLine.split(' ')[0],
      value: fpLine.split(' ')[1]
    }]
  };
  return dtlsParameters;
};

// Serializes DTLS parameters to SDP.
SDPUtils.writeDtlsParameters = function(params, setupType) {
  var sdp = 'a=setup:' + setupType + '\r\n';
  params.fingerprints.forEach(function(fp) {
    sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
  });
  return sdp;
};
// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
  var lines = SDPUtils.splitLines(mediaSection);
  // Search in session part, too.
  lines = lines.concat(SDPUtils.splitLines(sessionpart));
  var iceParameters = {
    usernameFragment: lines.filter(function(line) {
      return line.indexOf('a=ice-ufrag:') === 0;
    })[0].substr(12),
    password: lines.filter(function(line) {
      return line.indexOf('a=ice-pwd:') === 0;
    })[0].substr(10)
  };
  return iceParameters;
};

// Serializes ICE parameters to SDP.
SDPUtils.writeIceParameters = function(params) {
  return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
      'a=ice-pwd:' + params.password + '\r\n';
};

// Parses the SDP media section and returns RTCRtpParameters.
SDPUtils.parseRtpParameters = function(mediaSection) {
  var description = {
    codecs: [],
    headerExtensions: [],
    fecMechanisms: [],
    rtcp: []
  };
  var lines = SDPUtils.splitLines(mediaSection);
  var mline = lines[0].split(' ');
  for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
    var pt = mline[i];
    var rtpmapline = SDPUtils.matchPrefix(
        mediaSection, 'a=rtpmap:' + pt + ' ')[0];
    if (rtpmapline) {
      var codec = SDPUtils.parseRtpMap(rtpmapline);
      var fmtps = SDPUtils.matchPrefix(
          mediaSection, 'a=fmtp:' + pt + ' ');
      // Only the first a=fmtp:<pt> is considered.
      codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
      codec.rtcpFeedback = SDPUtils.matchPrefix(
          mediaSection, 'a=rtcp-fb:' + pt + ' ')
        .map(SDPUtils.parseRtcpFb);
      description.codecs.push(codec);
      // parse FEC mechanisms from rtpmap lines.
      switch (codec.name.toUpperCase()) {
        case 'RED':
        case 'ULPFEC':
          description.fecMechanisms.push(codec.name.toUpperCase());
          break;
        default: // only RED and ULPFEC are recognized as FEC mechanisms.
          break;
      }
    }
  }
  SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
    description.headerExtensions.push(SDPUtils.parseExtmap(line));
  });
  // FIXME: parse rtcp.
  return description;
};

// Generates parts of the SDP media section describing the capabilities /
// parameters.
SDPUtils.writeRtpDescription = function(kind, caps) {
  var sdp = '';

  // Build the mline.
  sdp += 'm=' + kind + ' ';
  sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
  sdp += ' UDP/TLS/RTP/SAVPF ';
  sdp += caps.codecs.map(function(codec) {
    if (codec.preferredPayloadType !== undefined) {
      return codec.preferredPayloadType;
    }
    return codec.payloadType;
  }).join(' ') + '\r\n';

  sdp += 'c=IN IP4 0.0.0.0\r\n';
  sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

  // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
  caps.codecs.forEach(function(codec) {
    sdp += SDPUtils.writeRtpMap(codec);
    sdp += SDPUtils.writeFmtp(codec);
    sdp += SDPUtils.writeRtcpFb(codec);
  });
  // FIXME: add headerExtensions, fecMechanismş and rtcp.
  sdp += 'a=rtcp-mux\r\n';
  return sdp;
};

// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
  var encodingParameters = [];
  var description = SDPUtils.parseRtpParameters(mediaSection);
  var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
  var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

  // filter a=ssrc:... cname:, ignore PlanB-msid
  var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
  .map(function(line) {
    return SDPUtils.parseSsrcMedia(line);
  })
  .filter(function(parts) {
    return parts.attribute === 'cname';
  });
  var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
  var secondarySsrc;

  var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
  .map(function(line) {
    var parts = line.split(' ');
    parts.shift();
    return parts.map(function(part) {
      return parseInt(part, 10);
    });
  });
  if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
    secondarySsrc = flows[0][1];
  }

  description.codecs.forEach(function(codec) {
    if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
      var encParam = {
        ssrc: primarySsrc,
        codecPayloadType: parseInt(codec.parameters.apt, 10),
        rtx: {
          payloadType: codec.payloadType,
          ssrc: secondarySsrc
        }
      };
      encodingParameters.push(encParam);
      if (hasRed) {
        encParam = JSON.parse(JSON.stringify(encParam));
        encParam.fec = {
          ssrc: secondarySsrc,
          mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
        };
        encodingParameters.push(encParam);
      }
    }
  });
  if (encodingParameters.length === 0 && primarySsrc) {
    encodingParameters.push({
      ssrc: primarySsrc
    });
  }

  // we support both b=AS and b=TIAS but interpret AS as TIAS.
  var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
  if (bandwidth.length) {
    if (bandwidth[0].indexOf('b=TIAS:') === 0) {
      bandwidth = parseInt(bandwidth[0].substr(7), 10);
    } else if (bandwidth[0].indexOf('b=AS:') === 0) {
      bandwidth = parseInt(bandwidth[0].substr(5), 10);
    }
    encodingParameters.forEach(function(params) {
      params.maxBitrate = bandwidth;
    });
  }
  return encodingParameters;
};

SDPUtils.writeSessionBoilerplate = function() {
  // FIXME: sess-id should be an NTP timestamp.
  return 'v=0\r\n' +
      'o=thisisadapterortc 8169639915646943137 2 IN IP4 127.0.0.1\r\n' +
      's=-\r\n' +
      't=0 0\r\n';
};

SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
  var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

  // Map ICE parameters (ufrag, pwd) to SDP.
  sdp += SDPUtils.writeIceParameters(
      transceiver.iceGatherer.getLocalParameters());

  // Map DTLS parameters to SDP.
  sdp += SDPUtils.writeDtlsParameters(
      transceiver.dtlsTransport.getLocalParameters(),
      type === 'offer' ? 'actpass' : 'active');

  sdp += 'a=mid:' + transceiver.mid + '\r\n';

  if (transceiver.rtpSender && transceiver.rtpReceiver) {
    sdp += 'a=sendrecv\r\n';
  } else if (transceiver.rtpSender) {
    sdp += 'a=sendonly\r\n';
  } else if (transceiver.rtpReceiver) {
    sdp += 'a=recvonly\r\n';
  } else {
    sdp += 'a=inactive\r\n';
  }

  // FIXME: for RTX there might be multiple SSRCs. Not implemented in Edge yet.
  if (transceiver.rtpSender) {
    var msid = 'msid:' + stream.id + ' ' +
        transceiver.rtpSender.track.id + '\r\n';
    sdp += 'a=' + msid;
    sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
        ' ' + msid;
  }
  // FIXME: this should be written by writeRtpDescription.
  sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
      ' cname:' + SDPUtils.localCName + '\r\n';
  return sdp;
};

// Gets the direction from the mediaSection or the sessionpart.
SDPUtils.getDirection = function(mediaSection, sessionpart) {
  // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
  var lines = SDPUtils.splitLines(mediaSection);
  for (var i = 0; i < lines.length; i++) {
    switch (lines[i]) {
      case 'a=sendrecv':
      case 'a=sendonly':
      case 'a=recvonly':
      case 'a=inactive':
        return lines[i].substr(2);
      default:
        // FIXME: What should happen here?
    }
  }
  if (sessionpart) {
    return SDPUtils.getDirection(sessionpart);
  }
  return 'sendrecv';
};

// Expose public methods.
module.exports = SDPUtils;

},{}],2:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */

'use strict';

// Shimming starts here.
(function() {
  // Utils.
  var logging = require('./utils').log;
  var browserDetails = require('./utils').browserDetails;
  // Export to the adapter global object visible in the browser.
  module.exports.browserDetails = browserDetails;
  module.exports.extractVersion = require('./utils').extractVersion;
  module.exports.disableLog = require('./utils').disableLog;

  // Uncomment the line below if you want logging to occur, including logging
  // for the switch statement below. Can also be turned on in the browser via
  // adapter.disableLog(false), but then logging from the switch statement below
  // will not appear.
  // require('./utils').disableLog(false);

  // Browser shims.
  var chromeShim = require('./chrome/chrome_shim') || null;
  var edgeShim = require('./edge/edge_shim') || null;
  var firefoxShim = require('./firefox/firefox_shim') || null;
  var safariShim = require('./safari/safari_shim') || null;

  // Shim browser if found.
  switch (browserDetails.browser) {
    case 'opera': // fallthrough as it uses chrome shims
    case 'chrome':
      if (!chromeShim || !chromeShim.shimPeerConnection) {
        logging('Chrome shim is not included in this adapter release.');
        return;
      }
      logging('adapter.js shimming chrome.');
      // Export to the adapter global object visible in the browser.
      module.exports.browserShim = chromeShim;

      chromeShim.shimGetUserMedia();
      chromeShim.shimMediaStream();
      chromeShim.shimSourceObject();
      chromeShim.shimPeerConnection();
      chromeShim.shimOnTrack();
      break;
    case 'firefox':
      if (!firefoxShim || !firefoxShim.shimPeerConnection) {
        logging('Firefox shim is not included in this adapter release.');
        return;
      }
      logging('adapter.js shimming firefox.');
      // Export to the adapter global object visible in the browser.
      module.exports.browserShim = firefoxShim;

      firefoxShim.shimGetUserMedia();
      firefoxShim.shimSourceObject();
      firefoxShim.shimPeerConnection();
      firefoxShim.shimOnTrack();
      break;
    case 'edge':
      if (!edgeShim || !edgeShim.shimPeerConnection) {
        logging('MS edge shim is not included in this adapter release.');
        return;
      }
      logging('adapter.js shimming edge.');
      // Export to the adapter global object visible in the browser.
      module.exports.browserShim = edgeShim;

      edgeShim.shimGetUserMedia();
      edgeShim.shimPeerConnection();
      break;
    case 'safari':
      if (!safariShim) {
        logging('Safari shim is not included in this adapter release.');
        return;
      }
      logging('adapter.js shimming safari.');
      // Export to the adapter global object visible in the browser.
      module.exports.browserShim = safariShim;

      safariShim.shimGetUserMedia();
      break;
    default:
      logging('Unsupported browser!');
  }
})();

},{"./chrome/chrome_shim":3,"./edge/edge_shim":5,"./firefox/firefox_shim":7,"./safari/safari_shim":9,"./utils":10}],3:[function(require,module,exports){

/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';
var logging = require('../utils.js').log;
var browserDetails = require('../utils.js').browserDetails;

var chromeShim = {
  shimMediaStream: function() {
    window.MediaStream = window.MediaStream || window.webkitMediaStream;
  },

  shimOnTrack: function() {
    if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
        window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
        get: function() {
          return this._ontrack;
        },
        set: function(f) {
          var self = this;
          if (this._ontrack) {
            this.removeEventListener('track', this._ontrack);
            this.removeEventListener('addstream', this._ontrackpoly);
          }
          this.addEventListener('track', this._ontrack = f);
          this.addEventListener('addstream', this._ontrackpoly = function(e) {
            // onaddstream does not fire when a track is added to an existing
            // stream. But stream.onaddtrack is implemented so we use that.
            e.stream.addEventListener('addtrack', function(te) {
              var event = new Event('track');
              event.track = te.track;
              event.receiver = {track: te.track};
              event.streams = [e.stream];
              self.dispatchEvent(event);
            });
            e.stream.getTracks().forEach(function(track) {
              var event = new Event('track');
              event.track = track;
              event.receiver = {track: track};
              event.streams = [e.stream];
              this.dispatchEvent(event);
            }.bind(this));
          }.bind(this));
        }
      });
    }
  },

  shimSourceObject: function() {
    if (typeof window === 'object') {
      if (window.HTMLMediaElement &&
        !('srcObject' in window.HTMLMediaElement.prototype)) {
        // Shim the srcObject property, once, when HTMLMediaElement is found.
        Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
          get: function() {
            return this._srcObject;
          },
          set: function(stream) {
            var self = this;
            // Use _srcObject as a private property for this shim
            this._srcObject = stream;
            if (this.src) {
              URL.revokeObjectURL(this.src);
            }

            if (!stream) {
              this.src = '';
              return;
            }
            this.src = URL.createObjectURL(stream);
            // We need to recreate the blob url when a track is added or
            // removed. Doing it manually since we want to avoid a recursion.
            stream.addEventListener('addtrack', function() {
              if (self.src) {
                URL.revokeObjectURL(self.src);
              }
              self.src = URL.createObjectURL(stream);
            });
            stream.addEventListener('removetrack', function() {
              if (self.src) {
                URL.revokeObjectURL(self.src);
              }
              self.src = URL.createObjectURL(stream);
            });
          }
        });
      }
    }
  },

  shimPeerConnection: function() {
    // The RTCPeerConnection object.
    window.RTCPeerConnection = function(pcConfig, pcConstraints) {
      // Translate iceTransportPolicy to iceTransports,
      // see https://code.google.com/p/webrtc/issues/detail?id=4869
      logging('PeerConnection');
      if (pcConfig && pcConfig.iceTransportPolicy) {
        pcConfig.iceTransports = pcConfig.iceTransportPolicy;
      }

      var pc = new webkitRTCPeerConnection(pcConfig, pcConstraints);
      var origGetStats = pc.getStats.bind(pc);
      pc.getStats = function(selector, successCallback, errorCallback) {
        var self = this;
        var args = arguments;

        // If selector is a function then we are in the old style stats so just
        // pass back the original getStats format to avoid breaking old users.
        if (arguments.length > 0 && typeof selector === 'function') {
          return origGetStats(selector, successCallback);
        }

        var fixChromeStats_ = function(response) {
          var standardReport = {};
          var reports = response.result();
          reports.forEach(function(report) {
            var standardStats = {
              id: report.id,
              timestamp: report.timestamp,
              type: report.type
            };
            report.names().forEach(function(name) {
              standardStats[name] = report.stat(name);
            });
            standardReport[standardStats.id] = standardStats;
          });

          return standardReport;
        };

        // shim getStats with maplike support
        var makeMapStats = function(stats, legacyStats) {
          var map = new Map(Object.keys(stats).map(function(key) {
            return[key, stats[key]];
          }));
          legacyStats = legacyStats || stats;
          Object.keys(legacyStats).forEach(function(key) {
            map[key] = legacyStats[key];
          });
          return map;
        };

        if (arguments.length >= 2) {
          var successCallbackWrapper_ = function(response) {
            args[1](makeMapStats(fixChromeStats_(response)));
          };

          return origGetStats.apply(this, [successCallbackWrapper_,
              arguments[0]]);
        }

        // promise-support
        return new Promise(function(resolve, reject) {
          if (args.length === 1 && typeof selector === 'object') {
            origGetStats.apply(self, [
              function(response) {
                resolve(makeMapStats(fixChromeStats_(response)));
              }, reject]);
          } else {
            // Preserve legacy chrome stats only on legacy access of stats obj
            origGetStats.apply(self, [
              function(response) {
                resolve(makeMapStats(fixChromeStats_(response),
                    response.result()));
              }, reject]);
          }
        }).then(successCallback, errorCallback);
      };

      return pc;
    };
    window.RTCPeerConnection.prototype = webkitRTCPeerConnection.prototype;

    // wrap static methods. Currently just generateCertificate.
    if (webkitRTCPeerConnection.generateCertificate) {
      Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
        get: function() {
          return webkitRTCPeerConnection.generateCertificate;
        }
      });
    }

    ['createOffer', 'createAnswer'].forEach(function(method) {
      var nativeMethod = webkitRTCPeerConnection.prototype[method];
      webkitRTCPeerConnection.prototype[method] = function() {
        var self = this;
        if (arguments.length < 1 || (arguments.length === 1 &&
            typeof arguments[0] === 'object')) {
          var opts = arguments.length === 1 ? arguments[0] : undefined;
          return new Promise(function(resolve, reject) {
            nativeMethod.apply(self, [resolve, reject, opts]);
          });
        }
        return nativeMethod.apply(this, arguments);
      };
    });

    // add promise support -- natively available in Chrome 51
    if (browserDetails.version < 51) {
      ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
          .forEach(function(method) {
            var nativeMethod = webkitRTCPeerConnection.prototype[method];
            webkitRTCPeerConnection.prototype[method] = function() {
              var args = arguments;
              var self = this;
              var promise = new Promise(function(resolve, reject) {
                nativeMethod.apply(self, [args[0], resolve, reject]);
              });
              if (args.length < 2) {
                return promise;
              }
              return promise.then(function() {
                args[1].apply(null, []);
              },
              function(err) {
                if (args.length >= 3) {
                  args[2].apply(null, [err]);
                }
              });
            };
          });
    }

    // shim implicit creation of RTCSessionDescription/RTCIceCandidate
    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
        .forEach(function(method) {
          var nativeMethod = webkitRTCPeerConnection.prototype[method];
          webkitRTCPeerConnection.prototype[method] = function() {
            arguments[0] = new ((method === 'addIceCandidate') ?
                RTCIceCandidate : RTCSessionDescription)(arguments[0]);
            return nativeMethod.apply(this, arguments);
          };
        });

    // support for addIceCandidate(null)
    var nativeAddIceCandidate =
        RTCPeerConnection.prototype.addIceCandidate;
    RTCPeerConnection.prototype.addIceCandidate = function() {
      return arguments[0] === null ? Promise.resolve()
          : nativeAddIceCandidate.apply(this, arguments);
    };
  }
};


// Expose public methods.
module.exports = {
  shimMediaStream: chromeShim.shimMediaStream,
  shimOnTrack: chromeShim.shimOnTrack,
  shimSourceObject: chromeShim.shimSourceObject,
  shimPeerConnection: chromeShim.shimPeerConnection,
  shimGetUserMedia: require('./getusermedia')
};

},{"../utils.js":10,"./getusermedia":4}],4:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';
var logging = require('../utils.js').log;

// Expose public methods.
module.exports = function() {
  var constraintsToChrome_ = function(c) {
    if (typeof c !== 'object' || c.mandatory || c.optional) {
      return c;
    }
    var cc = {};
    Object.keys(c).forEach(function(key) {
      if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
        return;
      }
      var r = (typeof c[key] === 'object') ? c[key] : {ideal: c[key]};
      if (r.exact !== undefined && typeof r.exact === 'number') {
        r.min = r.max = r.exact;
      }
      var oldname_ = function(prefix, name) {
        if (prefix) {
          return prefix + name.charAt(0).toUpperCase() + name.slice(1);
        }
        return (name === 'deviceId') ? 'sourceId' : name;
      };
      if (r.ideal !== undefined) {
        cc.optional = cc.optional || [];
        var oc = {};
        if (typeof r.ideal === 'number') {
          oc[oldname_('min', key)] = r.ideal;
          cc.optional.push(oc);
          oc = {};
          oc[oldname_('max', key)] = r.ideal;
          cc.optional.push(oc);
        } else {
          oc[oldname_('', key)] = r.ideal;
          cc.optional.push(oc);
        }
      }
      if (r.exact !== undefined && typeof r.exact !== 'number') {
        cc.mandatory = cc.mandatory || {};
        cc.mandatory[oldname_('', key)] = r.exact;
      } else {
        ['min', 'max'].forEach(function(mix) {
          if (r[mix] !== undefined) {
            cc.mandatory = cc.mandatory || {};
            cc.mandatory[oldname_(mix, key)] = r[mix];
          }
        });
      }
    });
    if (c.advanced) {
      cc.optional = (cc.optional || []).concat(c.advanced);
    }
    return cc;
  };

  var shimConstraints_ = function(constraints, func) {
    constraints = JSON.parse(JSON.stringify(constraints));
    if (constraints && constraints.audio) {
      constraints.audio = constraintsToChrome_(constraints.audio);
    }
    if (constraints && typeof constraints.video === 'object') {
      // Shim facingMode for mobile, where it defaults to "user".
      var face = constraints.video.facingMode;
      face = face && ((typeof face === 'object') ? face : {ideal: face});

      if ((face && (face.exact === 'user' || face.exact === 'environment' ||
                    face.ideal === 'user' || face.ideal === 'environment')) &&
          !(navigator.mediaDevices.getSupportedConstraints &&
            navigator.mediaDevices.getSupportedConstraints().facingMode)) {
        delete constraints.video.facingMode;
        if (face.exact === 'environment' || face.ideal === 'environment') {
          // Look for "back" in label, or use last cam (typically back cam).
          return navigator.mediaDevices.enumerateDevices()
          .then(function(devices) {
            devices = devices.filter(function(d) {
              return d.kind === 'videoinput';
            });
            var back = devices.find(function(d) {
              return d.label.toLowerCase().indexOf('back') !== -1;
            }) || (devices.length && devices[devices.length - 1]);
            if (back) {
              constraints.video.deviceId = face.exact ? {exact: back.deviceId} :
                                                        {ideal: back.deviceId};
            }
            constraints.video = constraintsToChrome_(constraints.video);
            logging('chrome: ' + JSON.stringify(constraints));
            return func(constraints);
          });
        }
      }
      constraints.video = constraintsToChrome_(constraints.video);
    }
    logging('chrome: ' + JSON.stringify(constraints));
    return func(constraints);
  };

  var shimError_ = function(e) {
    return {
      name: {
        PermissionDeniedError: 'NotAllowedError',
        ConstraintNotSatisfiedError: 'OverconstrainedError'
      }[e.name] || e.name,
      message: e.message,
      constraint: e.constraintName,
      toString: function() {
        return this.name + (this.message && ': ') + this.message;
      }
    };
  };

  var getUserMedia_ = function(constraints, onSuccess, onError) {
    shimConstraints_(constraints, function(c) {
      navigator.webkitGetUserMedia(c, onSuccess, function(e) {
        onError(shimError_(e));
      });
    });
  };

  navigator.getUserMedia = getUserMedia_;

  // Returns the result of getUserMedia as a Promise.
  var getUserMediaPromise_ = function(constraints) {
    return new Promise(function(resolve, reject) {
      navigator.getUserMedia(constraints, resolve, reject);
    });
  };

  if (!navigator.mediaDevices) {
    navigator.mediaDevices = {
      getUserMedia: getUserMediaPromise_,
      enumerateDevices: function() {
        return new Promise(function(resolve) {
          var kinds = {audio: 'audioinput', video: 'videoinput'};
          return MediaStreamTrack.getSources(function(devices) {
            resolve(devices.map(function(device) {
              return {label: device.label,
                      kind: kinds[device.kind],
                      deviceId: device.id,
                      groupId: ''};
            }));
          });
        });
      }
    };
  }

  // A shim for getUserMedia method on the mediaDevices object.
  // TODO(KaptenJansson) remove once implemented in Chrome stable.
  if (!navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
      return getUserMediaPromise_(constraints);
    };
  } else {
    // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
    // function which returns a Promise, it does not accept spec-style
    // constraints.
    var origGetUserMedia = navigator.mediaDevices.getUserMedia.
        bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function(cs) {
      return shimConstraints_(cs, function(c) {
        return origGetUserMedia(c).catch(function(e) {
          return Promise.reject(shimError_(e));
        });
      });
    };
  }

  // Dummy devicechange event methods.
  // TODO(KaptenJansson) remove once implemented in Chrome stable.
  if (typeof navigator.mediaDevices.addEventListener === 'undefined') {
    navigator.mediaDevices.addEventListener = function() {
      logging('Dummy mediaDevices.addEventListener called.');
    };
  }
  if (typeof navigator.mediaDevices.removeEventListener === 'undefined') {
    navigator.mediaDevices.removeEventListener = function() {
      logging('Dummy mediaDevices.removeEventListener called.');
    };
  }
};

},{"../utils.js":10}],5:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';

var SDPUtils = require('sdp');
var browserDetails = require('../utils').browserDetails;

var edgeShim = {
  shimPeerConnection: function() {
    if (window.RTCIceGatherer) {
      // ORTC defines an RTCIceCandidate object but no constructor.
      // Not implemented in Edge.
      if (!window.RTCIceCandidate) {
        window.RTCIceCandidate = function(args) {
          return args;
        };
      }
      // ORTC does not have a session description object but
      // other browsers (i.e. Chrome) that will support both PC and ORTC
      // in the future might have this defined already.
      if (!window.RTCSessionDescription) {
        window.RTCSessionDescription = function(args) {
          return args;
        };
      }
    }

    window.RTCPeerConnection = function(config) {
      var self = this;

      var _eventTarget = document.createDocumentFragment();
      ['addEventListener', 'removeEventListener', 'dispatchEvent']
          .forEach(function(method) {
            self[method] = _eventTarget[method].bind(_eventTarget);
          });

      this.onicecandidate = null;
      this.onaddstream = null;
      this.ontrack = null;
      this.onremovestream = null;
      this.onsignalingstatechange = null;
      this.oniceconnectionstatechange = null;
      this.onnegotiationneeded = null;
      this.ondatachannel = null;

      this.localStreams = [];
      this.remoteStreams = [];
      this.getLocalStreams = function() {
        return self.localStreams;
      };
      this.getRemoteStreams = function() {
        return self.remoteStreams;
      };

      this.localDescription = new RTCSessionDescription({
        type: '',
        sdp: ''
      });
      this.remoteDescription = new RTCSessionDescription({
        type: '',
        sdp: ''
      });
      this.signalingState = 'stable';
      this.iceConnectionState = 'new';
      this.iceGatheringState = 'new';

      this.iceOptions = {
        gatherPolicy: 'all',
        iceServers: []
      };
      if (config && config.iceTransportPolicy) {
        switch (config.iceTransportPolicy) {
          case 'all':
          case 'relay':
            this.iceOptions.gatherPolicy = config.iceTransportPolicy;
            break;
          case 'none':
            // FIXME: remove once implementation and spec have added this.
            throw new TypeError('iceTransportPolicy "none" not supported');
          default:
            // don't set iceTransportPolicy.
            break;
        }
      }
      this.usingBundle = config && config.bundlePolicy === 'max-bundle';

      if (config && config.iceServers) {
        // Edge does not like
        // 1) stun:
        // 2) turn: that does not have all of turn:host:port?transport=udp
        // 3) turn: with ipv6 addresses
        var iceServers = JSON.parse(JSON.stringify(config.iceServers));
        this.iceOptions.iceServers = iceServers.filter(function(server) {
          if (server && server.urls) {
            var urls = server.urls;
            if (typeof urls === 'string') {
              urls = [urls];
            }
            urls = urls.filter(function(url) {
              return (url.indexOf('turn:') === 0 &&
                  url.indexOf('transport=udp') !== -1 &&
                  url.indexOf('turn:[') === -1) ||
                  (url.indexOf('stun:') === 0 &&
                    browserDetails.version >= 14393);
            })[0];
            return !!urls;
          }
          return false;
        });
      }

      // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
      // everything that is needed to describe a SDP m-line.
      this.transceivers = [];

      // since the iceGatherer is currently created in createOffer but we
      // must not emit candidates until after setLocalDescription we buffer
      // them in this array.
      this._localIceCandidatesBuffer = [];
    };

    window.RTCPeerConnection.prototype._emitBufferedCandidates = function() {
      var self = this;
      var sections = SDPUtils.splitSections(self.localDescription.sdp);
      // FIXME: need to apply ice candidates in a way which is async but
      // in-order
      this._localIceCandidatesBuffer.forEach(function(event) {
        var end = !event.candidate || Object.keys(event.candidate).length === 0;
        if (end) {
          for (var j = 1; j < sections.length; j++) {
            if (sections[j].indexOf('\r\na=end-of-candidates\r\n') === -1) {
              sections[j] += 'a=end-of-candidates\r\n';
            }
          }
        } else if (event.candidate.candidate.indexOf('typ endOfCandidates')
            === -1) {
          sections[event.candidate.sdpMLineIndex + 1] +=
              'a=' + event.candidate.candidate + '\r\n';
        }
        self.localDescription.sdp = sections.join('');
        self.dispatchEvent(event);
        if (self.onicecandidate !== null) {
          self.onicecandidate(event);
        }
        if (!event.candidate && self.iceGatheringState !== 'complete') {
          var complete = self.transceivers.every(function(transceiver) {
            return transceiver.iceGatherer &&
                transceiver.iceGatherer.state === 'completed';
          });
          if (complete) {
            self.iceGatheringState = 'complete';
          }
        }
      });
      this._localIceCandidatesBuffer = [];
    };

    window.RTCPeerConnection.prototype.addStream = function(stream) {
      // Clone is necessary for local demos mostly, attaching directly
      // to two different senders does not work (build 10547).
      this.localStreams.push(stream.clone());
      this._maybeFireNegotiationNeeded();
    };

    window.RTCPeerConnection.prototype.removeStream = function(stream) {
      var idx = this.localStreams.indexOf(stream);
      if (idx > -1) {
        this.localStreams.splice(idx, 1);
        this._maybeFireNegotiationNeeded();
      }
    };

    window.RTCPeerConnection.prototype.getSenders = function() {
      return this.transceivers.filter(function(transceiver) {
        return !!transceiver.rtpSender;
      })
      .map(function(transceiver) {
        return transceiver.rtpSender;
      });
    };

    window.RTCPeerConnection.prototype.getReceivers = function() {
      return this.transceivers.filter(function(transceiver) {
        return !!transceiver.rtpReceiver;
      })
      .map(function(transceiver) {
        return transceiver.rtpReceiver;
      });
    };

    // Determines the intersection of local and remote capabilities.
    window.RTCPeerConnection.prototype._getCommonCapabilities =
        function(localCapabilities, remoteCapabilities) {
          var commonCapabilities = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: []
          };
          localCapabilities.codecs.forEach(function(lCodec) {
            for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
              var rCodec = remoteCapabilities.codecs[i];
              if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
                  lCodec.clockRate === rCodec.clockRate &&
                  lCodec.numChannels === rCodec.numChannels) {
                // push rCodec so we reply with offerer payload type
                commonCapabilities.codecs.push(rCodec);

                // determine common feedback mechanisms
                rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
                  for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
                    if (lCodec.rtcpFeedback[j].type === fb.type &&
                        lCodec.rtcpFeedback[j].parameter === fb.parameter) {
                      return true;
                    }
                  }
                  return false;
                });
                // FIXME: also need to determine .parameters
                //  see https://github.com/openpeer/ortc/issues/569
                break;
              }
            }
          });

          localCapabilities.headerExtensions
              .forEach(function(lHeaderExtension) {
                for (var i = 0; i < remoteCapabilities.headerExtensions.length;
                     i++) {
                  var rHeaderExtension = remoteCapabilities.headerExtensions[i];
                  if (lHeaderExtension.uri === rHeaderExtension.uri) {
                    commonCapabilities.headerExtensions.push(rHeaderExtension);
                    break;
                  }
                }
              });

          // FIXME: fecMechanisms
          return commonCapabilities;
        };

    // Create ICE gatherer, ICE transport and DTLS transport.
    window.RTCPeerConnection.prototype._createIceAndDtlsTransports =
        function(mid, sdpMLineIndex) {
          var self = this;
          var iceGatherer = new RTCIceGatherer(self.iceOptions);
          var iceTransport = new RTCIceTransport(iceGatherer);
          iceGatherer.onlocalcandidate = function(evt) {
            var event = new Event('icecandidate');
            event.candidate = {sdpMid: mid, sdpMLineIndex: sdpMLineIndex};

            var cand = evt.candidate;
            var end = !cand || Object.keys(cand).length === 0;
            // Edge emits an empty object for RTCIceCandidateComplete‥
            if (end) {
              // polyfill since RTCIceGatherer.state is not implemented in
              // Edge 10547 yet.
              if (iceGatherer.state === undefined) {
                iceGatherer.state = 'completed';
              }

              // Emit a candidate with type endOfCandidates to make the samples
              // work. Edge requires addIceCandidate with this empty candidate
              // to start checking. The real solution is to signal
              // end-of-candidates to the other side when getting the null
              // candidate but some apps (like the samples) don't do that.
              event.candidate.candidate =
                  'candidate:1 1 udp 1 0.0.0.0 9 typ endOfCandidates';
            } else {
              // RTCIceCandidate doesn't have a component, needs to be added
              cand.component = iceTransport.component === 'RTCP' ? 2 : 1;
              event.candidate.candidate = SDPUtils.writeCandidate(cand);
            }

            // update local description.
            var sections = SDPUtils.splitSections(self.localDescription.sdp);
            if (event.candidate.candidate.indexOf('typ endOfCandidates')
                === -1) {
              sections[event.candidate.sdpMLineIndex + 1] +=
                  'a=' + event.candidate.candidate + '\r\n';
            } else {
              sections[event.candidate.sdpMLineIndex + 1] +=
                  'a=end-of-candidates\r\n';
            }
            self.localDescription.sdp = sections.join('');

            var complete = self.transceivers.every(function(transceiver) {
              return transceiver.iceGatherer &&
                  transceiver.iceGatherer.state === 'completed';
            });

            // Emit candidate if localDescription is set.
            // Also emits null candidate when all gatherers are complete.
            switch (self.iceGatheringState) {
              case 'new':
                self._localIceCandidatesBuffer.push(event);
                if (end && complete) {
                  self._localIceCandidatesBuffer.push(
                      new Event('icecandidate'));
                }
                break;
              case 'gathering':
                self._emitBufferedCandidates();
                self.dispatchEvent(event);
                if (self.onicecandidate !== null) {
                  self.onicecandidate(event);
                }
                if (complete) {
                  self.dispatchEvent(new Event('icecandidate'));
                  if (self.onicecandidate !== null) {
                    self.onicecandidate(new Event('icecandidate'));
                  }
                  self.iceGatheringState = 'complete';
                }
                break;
              case 'complete':
                // should not happen... currently!
                break;
              default: // no-op.
                break;
            }
          };
          iceTransport.onicestatechange = function() {
            self._updateConnectionState();
          };

          var dtlsTransport = new RTCDtlsTransport(iceTransport);
          dtlsTransport.ondtlsstatechange = function() {
            self._updateConnectionState();
          };
          dtlsTransport.onerror = function() {
            // onerror does not set state to failed by itself.
            dtlsTransport.state = 'failed';
            self._updateConnectionState();
          };

          return {
            iceGatherer: iceGatherer,
            iceTransport: iceTransport,
            dtlsTransport: dtlsTransport
          };
        };

    // Start the RTP Sender and Receiver for a transceiver.
    window.RTCPeerConnection.prototype._transceive = function(transceiver,
        send, recv) {
      var params = this._getCommonCapabilities(transceiver.localCapabilities,
          transceiver.remoteCapabilities);
      if (send && transceiver.rtpSender) {
        params.encodings = transceiver.sendEncodingParameters;
        params.rtcp = {
          cname: SDPUtils.localCName
        };
        if (transceiver.recvEncodingParameters.length) {
          params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
        }
        transceiver.rtpSender.send(params);
      }
      if (recv && transceiver.rtpReceiver) {
        params.encodings = transceiver.recvEncodingParameters;
        params.rtcp = {
          cname: transceiver.cname
        };
        if (transceiver.sendEncodingParameters.length) {
          params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
        }
        transceiver.rtpReceiver.receive(params);
      }
    };

    window.RTCPeerConnection.prototype.setLocalDescription =
        function(description) {
          var self = this;
          var sections;
          var sessionpart;
          if (description.type === 'offer') {
            // FIXME: What was the purpose of this empty if statement?
            // if (!this._pendingOffer) {
            // } else {
            if (this._pendingOffer) {
              // VERY limited support for SDP munging. Limited to:
              // * changing the order of codecs
              sections = SDPUtils.splitSections(description.sdp);
              sessionpart = sections.shift();
              sections.forEach(function(mediaSection, sdpMLineIndex) {
                var caps = SDPUtils.parseRtpParameters(mediaSection);
                self._pendingOffer[sdpMLineIndex].localCapabilities = caps;
              });
              this.transceivers = this._pendingOffer;
              delete this._pendingOffer;
            }
          } else if (description.type === 'answer') {
            sections = SDPUtils.splitSections(self.remoteDescription.sdp);
            sessionpart = sections.shift();
            var isIceLite = SDPUtils.matchPrefix(sessionpart,
                'a=ice-lite').length > 0;
            sections.forEach(function(mediaSection, sdpMLineIndex) {
              var transceiver = self.transceivers[sdpMLineIndex];
              var iceGatherer = transceiver.iceGatherer;
              var iceTransport = transceiver.iceTransport;
              var dtlsTransport = transceiver.dtlsTransport;
              var localCapabilities = transceiver.localCapabilities;
              var remoteCapabilities = transceiver.remoteCapabilities;

              var rejected = mediaSection.split('\n', 1)[0]
                  .split(' ', 2)[1] === '0';

              if (!rejected && !transceiver.isDatachannel) {
                var remoteIceParameters = SDPUtils.getIceParameters(
                    mediaSection, sessionpart);
                if (isIceLite) {
                  var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:')
                  .map(function(cand) {
                    return SDPUtils.parseCandidate(cand);
                  })
                  .filter(function(cand) {
                    return cand.component === '1';
                  });
                  // ice-lite only includes host candidates in the SDP so we can
                  // use setRemoteCandidates (which implies an
                  // RTCIceCandidateComplete)
                  if (cands.length) {
                    iceTransport.setRemoteCandidates(cands);
                  }
                }
                var remoteDtlsParameters = SDPUtils.getDtlsParameters(
                    mediaSection, sessionpart);
                if (isIceLite) {
                  remoteDtlsParameters.role = 'server';
                }

                if (!self.usingBundle || sdpMLineIndex === 0) {
                  iceTransport.start(iceGatherer, remoteIceParameters,
                      isIceLite ? 'controlling' : 'controlled');
                  dtlsTransport.start(remoteDtlsParameters);
                }

                // Calculate intersection of capabilities.
                var params = self._getCommonCapabilities(localCapabilities,
                    remoteCapabilities);

                // Start the RTCRtpSender. The RTCRtpReceiver for this
                // transceiver has already been started in setRemoteDescription.
                self._transceive(transceiver,
                    params.codecs.length > 0,
                    false);
              }
            });
          }

          this.localDescription = {
            type: description.type,
            sdp: description.sdp
          };
          switch (description.type) {
            case 'offer':
              this._updateSignalingState('have-local-offer');
              break;
            case 'answer':
              this._updateSignalingState('stable');
              break;
            default:
              throw new TypeError('unsupported type "' + description.type +
                  '"');
          }

          // If a success callback was provided, emit ICE candidates after it
          // has been executed. Otherwise, emit callback after the Promise is
          // resolved.
          var hasCallback = arguments.length > 1 &&
            typeof arguments[1] === 'function';
          if (hasCallback) {
            var cb = arguments[1];
            window.setTimeout(function() {
              cb();
              if (self.iceGatheringState === 'new') {
                self.iceGatheringState = 'gathering';
              }
              self._emitBufferedCandidates();
            }, 0);
          }
          var p = Promise.resolve();
          p.then(function() {
            if (!hasCallback) {
              if (self.iceGatheringState === 'new') {
                self.iceGatheringState = 'gathering';
              }
              // Usually candidates will be emitted earlier.
              window.setTimeout(self._emitBufferedCandidates.bind(self), 500);
            }
          });
          return p;
        };

    window.RTCPeerConnection.prototype.setRemoteDescription =
        function(description) {
          var self = this;
          var stream = new MediaStream();
          var receiverList = [];
          var sections = SDPUtils.splitSections(description.sdp);
          var sessionpart = sections.shift();
          var isIceLite = SDPUtils.matchPrefix(sessionpart,
              'a=ice-lite').length > 0;
          this.usingBundle = SDPUtils.matchPrefix(sessionpart,
              'a=group:BUNDLE ').length > 0;
          sections.forEach(function(mediaSection, sdpMLineIndex) {
            var lines = SDPUtils.splitLines(mediaSection);
            var mline = lines[0].substr(2).split(' ');
            var kind = mline[0];
            var rejected = mline[1] === '0';
            var direction = SDPUtils.getDirection(mediaSection, sessionpart);

            var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:');
            if (mid.length) {
              mid = mid[0].substr(6);
            } else {
              mid = SDPUtils.generateIdentifier();
            }

            // Reject datachannels which are not implemented yet.
            if (kind === 'application' && mline[2] === 'DTLS/SCTP') {
              self.transceivers[sdpMLineIndex] = {
                mid: mid,
                isDatachannel: true
              };
              return;
            }

            var transceiver;
            var iceGatherer;
            var iceTransport;
            var dtlsTransport;
            var rtpSender;
            var rtpReceiver;
            var sendEncodingParameters;
            var recvEncodingParameters;
            var localCapabilities;

            var track;
            // FIXME: ensure the mediaSection has rtcp-mux set.
            var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
            var remoteIceParameters;
            var remoteDtlsParameters;
            if (!rejected) {
              remoteIceParameters = SDPUtils.getIceParameters(mediaSection,
                  sessionpart);
              remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection,
                  sessionpart);
              remoteDtlsParameters.role = 'client';
            }
            recvEncodingParameters =
                SDPUtils.parseRtpEncodingParameters(mediaSection);

            var cname;
            // Gets the first SSRC. Note that with RTX there might be multiple
            // SSRCs.
            var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
                .map(function(line) {
                  return SDPUtils.parseSsrcMedia(line);
                })
                .filter(function(obj) {
                  return obj.attribute === 'cname';
                })[0];
            if (remoteSsrc) {
              cname = remoteSsrc.value;
            }

            var isComplete = SDPUtils.matchPrefix(mediaSection,
                'a=end-of-candidates', sessionpart).length > 0;
            var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:')
                .map(function(cand) {
                  return SDPUtils.parseCandidate(cand);
                })
                .filter(function(cand) {
                  return cand.component === '1';
                });
            if (description.type === 'offer' && !rejected) {
              var transports = self.usingBundle && sdpMLineIndex > 0 ? {
                iceGatherer: self.transceivers[0].iceGatherer,
                iceTransport: self.transceivers[0].iceTransport,
                dtlsTransport: self.transceivers[0].dtlsTransport
              } : self._createIceAndDtlsTransports(mid, sdpMLineIndex);

              if (isComplete) {
                transports.iceTransport.setRemoteCandidates(cands);
              }

              localCapabilities = RTCRtpReceiver.getCapabilities(kind);
              sendEncodingParameters = [{
                ssrc: (2 * sdpMLineIndex + 2) * 1001
              }];

              rtpReceiver = new RTCRtpReceiver(transports.dtlsTransport, kind);

              track = rtpReceiver.track;
              receiverList.push([track, rtpReceiver]);
              // FIXME: not correct when there are multiple streams but that is
              // not currently supported in this shim.
              stream.addTrack(track);

              // FIXME: look at direction.
              if (self.localStreams.length > 0 &&
                  self.localStreams[0].getTracks().length >= sdpMLineIndex) {
                var localTrack;
                if (kind === 'audio') {
                  localTrack = self.localStreams[0].getAudioTracks()[0];
                } else if (kind === 'video') {
                  localTrack = self.localStreams[0].getVideoTracks()[0];
                }
                if (localTrack) {
                  rtpSender = new RTCRtpSender(localTrack,
                      transports.dtlsTransport);
                }
              }

              self.transceivers[sdpMLineIndex] = {
                iceGatherer: transports.iceGatherer,
                iceTransport: transports.iceTransport,
                dtlsTransport: transports.dtlsTransport,
                localCapabilities: localCapabilities,
                remoteCapabilities: remoteCapabilities,
                rtpSender: rtpSender,
                rtpReceiver: rtpReceiver,
                kind: kind,
                mid: mid,
                cname: cname,
                sendEncodingParameters: sendEncodingParameters,
                recvEncodingParameters: recvEncodingParameters
              };
              // Start the RTCRtpReceiver now. The RTPSender is started in
              // setLocalDescription.
              self._transceive(self.transceivers[sdpMLineIndex],
                  false,
                  direction === 'sendrecv' || direction === 'sendonly');
            } else if (description.type === 'answer' && !rejected) {
              transceiver = self.transceivers[sdpMLineIndex];
              iceGatherer = transceiver.iceGatherer;
              iceTransport = transceiver.iceTransport;
              dtlsTransport = transceiver.dtlsTransport;
              rtpSender = transceiver.rtpSender;
              rtpReceiver = transceiver.rtpReceiver;
              sendEncodingParameters = transceiver.sendEncodingParameters;
              localCapabilities = transceiver.localCapabilities;

              self.transceivers[sdpMLineIndex].recvEncodingParameters =
                  recvEncodingParameters;
              self.transceivers[sdpMLineIndex].remoteCapabilities =
                  remoteCapabilities;
              self.transceivers[sdpMLineIndex].cname = cname;

              if ((isIceLite || isComplete) && cands.length) {
                iceTransport.setRemoteCandidates(cands);
              }
              if (!self.usingBundle || sdpMLineIndex === 0) {
                iceTransport.start(iceGatherer, remoteIceParameters,
                    'controlling');
                dtlsTransport.start(remoteDtlsParameters);
              }

              self._transceive(transceiver,
                  direction === 'sendrecv' || direction === 'recvonly',
                  direction === 'sendrecv' || direction === 'sendonly');

              if (rtpReceiver &&
                  (direction === 'sendrecv' || direction === 'sendonly')) {
                track = rtpReceiver.track;
                receiverList.push([track, rtpReceiver]);
                stream.addTrack(track);
              } else {
                // FIXME: actually the receiver should be created later.
                delete transceiver.rtpReceiver;
              }
            }
          });

          this.remoteDescription = {
            type: description.type,
            sdp: description.sdp
          };
          switch (description.type) {
            case 'offer':
              this._updateSignalingState('have-remote-offer');
              break;
            case 'answer':
              this._updateSignalingState('stable');
              break;
            default:
              throw new TypeError('unsupported type "' + description.type +
                  '"');
          }
          if (stream.getTracks().length) {
            self.remoteStreams.push(stream);
            window.setTimeout(function() {
              var event = new Event('addstream');
              event.stream = stream;
              self.dispatchEvent(event);
              if (self.onaddstream !== null) {
                window.setTimeout(function() {
                  self.onaddstream(event);
                }, 0);
              }

              receiverList.forEach(function(item) {
                var track = item[0];
                var receiver = item[1];
                var trackEvent = new Event('track');
                trackEvent.track = track;
                trackEvent.receiver = receiver;
                trackEvent.streams = [stream];
                self.dispatchEvent(event);
                if (self.ontrack !== null) {
                  window.setTimeout(function() {
                    self.ontrack(trackEvent);
                  }, 0);
                }
              });
            }, 0);
          }
          if (arguments.length > 1 && typeof arguments[1] === 'function') {
            window.setTimeout(arguments[1], 0);
          }
          return Promise.resolve();
        };

    window.RTCPeerConnection.prototype.close = function() {
      this.transceivers.forEach(function(transceiver) {
        /* not yet
        if (transceiver.iceGatherer) {
          transceiver.iceGatherer.close();
        }
        */
        if (transceiver.iceTransport) {
          transceiver.iceTransport.stop();
        }
        if (transceiver.dtlsTransport) {
          transceiver.dtlsTransport.stop();
        }
        if (transceiver.rtpSender) {
          transceiver.rtpSender.stop();
        }
        if (transceiver.rtpReceiver) {
          transceiver.rtpReceiver.stop();
        }
      });
      // FIXME: clean up tracks, local streams, remote streams, etc
      this._updateSignalingState('closed');
    };

    // Update the signaling state.
    window.RTCPeerConnection.prototype._updateSignalingState =
        function(newState) {
          this.signalingState = newState;
          var event = new Event('signalingstatechange');
          this.dispatchEvent(event);
          if (this.onsignalingstatechange !== null) {
            this.onsignalingstatechange(event);
          }
        };

    // Determine whether to fire the negotiationneeded event.
    window.RTCPeerConnection.prototype._maybeFireNegotiationNeeded =
        function() {
          // Fire away (for now).
          var event = new Event('negotiationneeded');
          this.dispatchEvent(event);
          if (this.onnegotiationneeded !== null) {
            this.onnegotiationneeded(event);
          }
        };

    // Update the connection state.
    window.RTCPeerConnection.prototype._updateConnectionState = function() {
      var self = this;
      var newState;
      var states = {
        'new': 0,
        closed: 0,
        connecting: 0,
        checking: 0,
        connected: 0,
        completed: 0,
        failed: 0
      };
      this.transceivers.forEach(function(transceiver) {
        states[transceiver.iceTransport.state]++;
        states[transceiver.dtlsTransport.state]++;
      });
      // ICETransport.completed and connected are the same for this purpose.
      states.connected += states.completed;

      newState = 'new';
      if (states.failed > 0) {
        newState = 'failed';
      } else if (states.connecting > 0 || states.checking > 0) {
        newState = 'connecting';
      } else if (states.disconnected > 0) {
        newState = 'disconnected';
      } else if (states.new > 0) {
        newState = 'new';
      } else if (states.connected > 0 || states.completed > 0) {
        newState = 'connected';
      }

      if (newState !== self.iceConnectionState) {
        self.iceConnectionState = newState;
        var event = new Event('iceconnectionstatechange');
        this.dispatchEvent(event);
        if (this.oniceconnectionstatechange !== null) {
          this.oniceconnectionstatechange(event);
        }
      }
    };

    window.RTCPeerConnection.prototype.createOffer = function() {
      var self = this;
      if (this._pendingOffer) {
        throw new Error('createOffer called while there is a pending offer.');
      }
      var offerOptions;
      if (arguments.length === 1 && typeof arguments[0] !== 'function') {
        offerOptions = arguments[0];
      } else if (arguments.length === 3) {
        offerOptions = arguments[2];
      }

      var tracks = [];
      var numAudioTracks = 0;
      var numVideoTracks = 0;
      // Default to sendrecv.
      if (this.localStreams.length) {
        numAudioTracks = this.localStreams[0].getAudioTracks().length;
        numVideoTracks = this.localStreams[0].getVideoTracks().length;
      }
      // Determine number of audio and video tracks we need to send/recv.
      if (offerOptions) {
        // Reject Chrome legacy constraints.
        if (offerOptions.mandatory || offerOptions.optional) {
          throw new TypeError(
              'Legacy mandatory/optional constraints not supported.');
        }
        if (offerOptions.offerToReceiveAudio !== undefined) {
          numAudioTracks = offerOptions.offerToReceiveAudio;
        }
        if (offerOptions.offerToReceiveVideo !== undefined) {
          numVideoTracks = offerOptions.offerToReceiveVideo;
        }
      }
      if (this.localStreams.length) {
        // Push local streams.
        this.localStreams[0].getTracks().forEach(function(track) {
          tracks.push({
            kind: track.kind,
            track: track,
            wantReceive: track.kind === 'audio' ?
                numAudioTracks > 0 : numVideoTracks > 0
          });
          if (track.kind === 'audio') {
            numAudioTracks--;
          } else if (track.kind === 'video') {
            numVideoTracks--;
          }
        });
      }
      // Create M-lines for recvonly streams.
      while (numAudioTracks > 0 || numVideoTracks > 0) {
        if (numAudioTracks > 0) {
          tracks.push({
            kind: 'audio',
            wantReceive: true
          });
          numAudioTracks--;
        }
        if (numVideoTracks > 0) {
          tracks.push({
            kind: 'video',
            wantReceive: true
          });
          numVideoTracks--;
        }
      }

      var sdp = SDPUtils.writeSessionBoilerplate();
      var transceivers = [];
      tracks.forEach(function(mline, sdpMLineIndex) {
        // For each track, create an ice gatherer, ice transport,
        // dtls transport, potentially rtpsender and rtpreceiver.
        var track = mline.track;
        var kind = mline.kind;
        var mid = SDPUtils.generateIdentifier();

        var transports = self.usingBundle && sdpMLineIndex > 0 ? {
          iceGatherer: transceivers[0].iceGatherer,
          iceTransport: transceivers[0].iceTransport,
          dtlsTransport: transceivers[0].dtlsTransport
        } : self._createIceAndDtlsTransports(mid, sdpMLineIndex);

        var localCapabilities = RTCRtpSender.getCapabilities(kind);
        var rtpSender;
        var rtpReceiver;

        // generate an ssrc now, to be used later in rtpSender.send
        var sendEncodingParameters = [{
          ssrc: (2 * sdpMLineIndex + 1) * 1001
        }];
        if (track) {
          rtpSender = new RTCRtpSender(track, transports.dtlsTransport);
        }

        if (mline.wantReceive) {
          rtpReceiver = new RTCRtpReceiver(transports.dtlsTransport, kind);
        }

        transceivers[sdpMLineIndex] = {
          iceGatherer: transports.iceGatherer,
          iceTransport: transports.iceTransport,
          dtlsTransport: transports.dtlsTransport,
          localCapabilities: localCapabilities,
          remoteCapabilities: null,
          rtpSender: rtpSender,
          rtpReceiver: rtpReceiver,
          kind: kind,
          mid: mid,
          sendEncodingParameters: sendEncodingParameters,
          recvEncodingParameters: null
        };
      });
      if (this.usingBundle) {
        sdp += 'a=group:BUNDLE ' + transceivers.map(function(t) {
          return t.mid;
        }).join(' ') + '\r\n';
      }
      tracks.forEach(function(mline, sdpMLineIndex) {
        var transceiver = transceivers[sdpMLineIndex];
        sdp += SDPUtils.writeMediaSection(transceiver,
            transceiver.localCapabilities, 'offer', self.localStreams[0]);
      });

      this._pendingOffer = transceivers;
      var desc = new RTCSessionDescription({
        type: 'offer',
        sdp: sdp
      });
      if (arguments.length && typeof arguments[0] === 'function') {
        window.setTimeout(arguments[0], 0, desc);
      }
      return Promise.resolve(desc);
    };

    window.RTCPeerConnection.prototype.createAnswer = function() {
      var self = this;

      var sdp = SDPUtils.writeSessionBoilerplate();
      if (this.usingBundle) {
        sdp += 'a=group:BUNDLE ' + this.transceivers.map(function(t) {
          return t.mid;
        }).join(' ') + '\r\n';
      }
      this.transceivers.forEach(function(transceiver) {
        if (transceiver.isDatachannel) {
          sdp += 'm=application 0 DTLS/SCTP 5000\r\n' +
              'c=IN IP4 0.0.0.0\r\n' +
              'a=mid:' + transceiver.mid + '\r\n';
          return;
        }
        // Calculate intersection of capabilities.
        var commonCapabilities = self._getCommonCapabilities(
            transceiver.localCapabilities,
            transceiver.remoteCapabilities);

        sdp += SDPUtils.writeMediaSection(transceiver, commonCapabilities,
            'answer', self.localStreams[0]);
      });

      var desc = new RTCSessionDescription({
        type: 'answer',
        sdp: sdp
      });
      if (arguments.length && typeof arguments[0] === 'function') {
        window.setTimeout(arguments[0], 0, desc);
      }
      return Promise.resolve(desc);
    };

    window.RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
      if (candidate === null) {
        this.transceivers.forEach(function(transceiver) {
          transceiver.iceTransport.addRemoteCandidate({});
        });
      } else {
        var mLineIndex = candidate.sdpMLineIndex;
        if (candidate.sdpMid) {
          for (var i = 0; i < this.transceivers.length; i++) {
            if (this.transceivers[i].mid === candidate.sdpMid) {
              mLineIndex = i;
              break;
            }
          }
        }
        var transceiver = this.transceivers[mLineIndex];
        if (transceiver) {
          var cand = Object.keys(candidate.candidate).length > 0 ?
              SDPUtils.parseCandidate(candidate.candidate) : {};
          // Ignore Chrome's invalid candidates since Edge does not like them.
          if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
            return;
          }
          // Ignore RTCP candidates, we assume RTCP-MUX.
          if (cand.component !== '1') {
            return;
          }
          // A dirty hack to make samples work.
          if (cand.type === 'endOfCandidates') {
            cand = {};
          }
          transceiver.iceTransport.addRemoteCandidate(cand);

          // update the remoteDescription.
          var sections = SDPUtils.splitSections(this.remoteDescription.sdp);
          sections[mLineIndex + 1] += (cand.type ? candidate.candidate.trim()
              : 'a=end-of-candidates') + '\r\n';
          this.remoteDescription.sdp = sections.join('');
        }
      }
      if (arguments.length > 1 && typeof arguments[1] === 'function') {
        window.setTimeout(arguments[1], 0);
      }
      return Promise.resolve();
    };

    window.RTCPeerConnection.prototype.getStats = function() {
      var promises = [];
      this.transceivers.forEach(function(transceiver) {
        ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
            'dtlsTransport'].forEach(function(method) {
              if (transceiver[method]) {
                promises.push(transceiver[method].getStats());
              }
            });
      });
      var cb = arguments.length > 1 && typeof arguments[1] === 'function' &&
          arguments[1];
      return new Promise(function(resolve) {
        // shim getStats with maplike support
        var results = new Map();
        Promise.all(promises).then(function(res) {
          res.forEach(function(result) {
            Object.keys(result).forEach(function(id) {
              results.set(id, result[id]);
              results[id] = result[id];
            });
          });
          if (cb) {
            window.setTimeout(cb, 0, results);
          }
          resolve(results);
        });
      });
    };
  }
};

// Expose public methods.
module.exports = {
  shimPeerConnection: edgeShim.shimPeerConnection,
  shimGetUserMedia: require('./getusermedia')
};

},{"../utils":10,"./getusermedia":6,"sdp":1}],6:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';

// Expose public methods.
module.exports = function() {
  var shimError_ = function(e) {
    return {
      name: {PermissionDeniedError: 'NotAllowedError'}[e.name] || e.name,
      message: e.message,
      constraint: e.constraint,
      toString: function() {
        return this.name;
      }
    };
  };

  // getUserMedia error shim.
  var origGetUserMedia = navigator.mediaDevices.getUserMedia.
      bind(navigator.mediaDevices);
  navigator.mediaDevices.getUserMedia = function(c) {
    return origGetUserMedia(c).catch(function(e) {
      return Promise.reject(shimError_(e));
    });
  };
};

},{}],7:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';

var browserDetails = require('../utils').browserDetails;

var firefoxShim = {
  shimOnTrack: function() {
    if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
        window.RTCPeerConnection.prototype)) {
      Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
        get: function() {
          return this._ontrack;
        },
        set: function(f) {
          if (this._ontrack) {
            this.removeEventListener('track', this._ontrack);
            this.removeEventListener('addstream', this._ontrackpoly);
          }
          this.addEventListener('track', this._ontrack = f);
          this.addEventListener('addstream', this._ontrackpoly = function(e) {
            e.stream.getTracks().forEach(function(track) {
              var event = new Event('track');
              event.track = track;
              event.receiver = {track: track};
              event.streams = [e.stream];
              this.dispatchEvent(event);
            }.bind(this));
          }.bind(this));
        }
      });
    }
  },

  shimSourceObject: function() {
    // Firefox has supported mozSrcObject since FF22, unprefixed in 42.
    if (typeof window === 'object') {
      if (window.HTMLMediaElement &&
        !('srcObject' in window.HTMLMediaElement.prototype)) {
        // Shim the srcObject property, once, when HTMLMediaElement is found.
        Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
          get: function() {
            return this.mozSrcObject;
          },
          set: function(stream) {
            this.mozSrcObject = stream;
          }
        });
      }
    }
  },

  shimPeerConnection: function() {
    if (typeof window !== 'object' || !(window.RTCPeerConnection ||
        window.mozRTCPeerConnection)) {
      return; // probably media.peerconnection.enabled=false in about:config
    }
    // The RTCPeerConnection object.
    if (!window.RTCPeerConnection) {
      window.RTCPeerConnection = function(pcConfig, pcConstraints) {
        if (browserDetails.version < 38) {
          // .urls is not supported in FF < 38.
          // create RTCIceServers with a single url.
          if (pcConfig && pcConfig.iceServers) {
            var newIceServers = [];
            for (var i = 0; i < pcConfig.iceServers.length; i++) {
              var server = pcConfig.iceServers[i];
              if (server.hasOwnProperty('urls')) {
                for (var j = 0; j < server.urls.length; j++) {
                  var newServer = {
                    url: server.urls[j]
                  };
                  if (server.urls[j].indexOf('turn') === 0) {
                    newServer.username = server.username;
                    newServer.credential = server.credential;
                  }
                  newIceServers.push(newServer);
                }
              } else {
                newIceServers.push(pcConfig.iceServers[i]);
              }
            }
            pcConfig.iceServers = newIceServers;
          }
        }
        return new mozRTCPeerConnection(pcConfig, pcConstraints);
      };
      window.RTCPeerConnection.prototype = mozRTCPeerConnection.prototype;

      // wrap static methods. Currently just generateCertificate.
      if (mozRTCPeerConnection.generateCertificate) {
        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
          get: function() {
            return mozRTCPeerConnection.generateCertificate;
          }
        });
      }

      window.RTCSessionDescription = mozRTCSessionDescription;
      window.RTCIceCandidate = mozRTCIceCandidate;
    }

    // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
    ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
        .forEach(function(method) {
          var nativeMethod = RTCPeerConnection.prototype[method];
          RTCPeerConnection.prototype[method] = function() {
            arguments[0] = new ((method === 'addIceCandidate') ?
                RTCIceCandidate : RTCSessionDescription)(arguments[0]);
            return nativeMethod.apply(this, arguments);
          };
        });

    // support for addIceCandidate(null)
    var nativeAddIceCandidate =
        RTCPeerConnection.prototype.addIceCandidate;
    RTCPeerConnection.prototype.addIceCandidate = function() {
      return arguments[0] === null ? Promise.resolve()
          : nativeAddIceCandidate.apply(this, arguments);
    };

    // shim getStats with maplike support
    var makeMapStats = function(stats) {
      var map = new Map();
      Object.keys(stats).forEach(function(key) {
        map.set(key, stats[key]);
        map[key] = stats[key];
      });
      return map;
    };

    var nativeGetStats = RTCPeerConnection.prototype.getStats;
    RTCPeerConnection.prototype.getStats = function(selector, onSucc, onErr) {
      return nativeGetStats.apply(this, [selector || null])
        .then(function(stats) {
          return makeMapStats(stats);
        })
        .then(onSucc, onErr);
    };
  }
};

// Expose public methods.
module.exports = {
  shimOnTrack: firefoxShim.shimOnTrack,
  shimSourceObject: firefoxShim.shimSourceObject,
  shimPeerConnection: firefoxShim.shimPeerConnection,
  shimGetUserMedia: require('./getusermedia')
};

},{"../utils":10,"./getusermedia":8}],8:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';

var logging = require('../utils').log;
var browserDetails = require('../utils').browserDetails;

// Expose public methods.
module.exports = function() {
  var shimError_ = function(e) {
    return {
      name: {
        SecurityError: 'NotAllowedError',
        PermissionDeniedError: 'NotAllowedError'
      }[e.name] || e.name,
      message: {
        'The operation is insecure.': 'The request is not allowed by the ' +
        'user agent or the platform in the current context.'
      }[e.message] || e.message,
      constraint: e.constraint,
      toString: function() {
        return this.name + (this.message && ': ') + this.message;
      }
    };
  };

  // getUserMedia constraints shim.
  var getUserMedia_ = function(constraints, onSuccess, onError) {
    var constraintsToFF37_ = function(c) {
      if (typeof c !== 'object' || c.require) {
        return c;
      }
      var require = [];
      Object.keys(c).forEach(function(key) {
        if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
          return;
        }
        var r = c[key] = (typeof c[key] === 'object') ?
            c[key] : {ideal: c[key]};
        if (r.min !== undefined ||
            r.max !== undefined || r.exact !== undefined) {
          require.push(key);
        }
        if (r.exact !== undefined) {
          if (typeof r.exact === 'number') {
            r. min = r.max = r.exact;
          } else {
            c[key] = r.exact;
          }
          delete r.exact;
        }
        if (r.ideal !== undefined) {
          c.advanced = c.advanced || [];
          var oc = {};
          if (typeof r.ideal === 'number') {
            oc[key] = {min: r.ideal, max: r.ideal};
          } else {
            oc[key] = r.ideal;
          }
          c.advanced.push(oc);
          delete r.ideal;
          if (!Object.keys(r).length) {
            delete c[key];
          }
        }
      });
      if (require.length) {
        c.require = require;
      }
      return c;
    };
    constraints = JSON.parse(JSON.stringify(constraints));
    if (browserDetails.version < 38) {
      logging('spec: ' + JSON.stringify(constraints));
      if (constraints.audio) {
        constraints.audio = constraintsToFF37_(constraints.audio);
      }
      if (constraints.video) {
        constraints.video = constraintsToFF37_(constraints.video);
      }
      logging('ff37: ' + JSON.stringify(constraints));
    }
    return navigator.mozGetUserMedia(constraints, onSuccess, function(e) {
      onError(shimError_(e));
    });
  };

  // Returns the result of getUserMedia as a Promise.
  var getUserMediaPromise_ = function(constraints) {
    return new Promise(function(resolve, reject) {
      getUserMedia_(constraints, resolve, reject);
    });
  };

  // Shim for mediaDevices on older versions.
  if (!navigator.mediaDevices) {
    navigator.mediaDevices = {getUserMedia: getUserMediaPromise_,
      addEventListener: function() { },
      removeEventListener: function() { }
    };
  }
  navigator.mediaDevices.enumerateDevices =
      navigator.mediaDevices.enumerateDevices || function() {
        return new Promise(function(resolve) {
          var infos = [
            {kind: 'audioinput', deviceId: 'default', label: '', groupId: ''},
            {kind: 'videoinput', deviceId: 'default', label: '', groupId: ''}
          ];
          resolve(infos);
        });
      };

  if (browserDetails.version < 41) {
    // Work around http://bugzil.la/1169665
    var orgEnumerateDevices =
        navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
    navigator.mediaDevices.enumerateDevices = function() {
      return orgEnumerateDevices().then(undefined, function(e) {
        if (e.name === 'NotFoundError') {
          return [];
        }
        throw e;
      });
    };
  }
  if (browserDetails.version < 49) {
    var origGetUserMedia = navigator.mediaDevices.getUserMedia.
        bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = function(c) {
      return origGetUserMedia(c).catch(function(e) {
        return Promise.reject(shimError_(e));
      });
    };
  }
  navigator.getUserMedia = function(constraints, onSuccess, onError) {
    if (browserDetails.version < 44) {
      return getUserMedia_(constraints, onSuccess, onError);
    }
    // Replace Firefox 44+'s deprecation warning with unprefixed version.
    console.warn('navigator.getUserMedia has been replaced by ' +
                 'navigator.mediaDevices.getUserMedia');
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
  };
};

},{"../utils":10}],9:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';
var safariShim = {
  // TODO: DrAlex, should be here, double check against LayoutTests
  // shimOnTrack: function() { },

  // TODO: once the back-end for the mac port is done, add.
  // TODO: check for webkitGTK+
  // shimPeerConnection: function() { },

  shimGetUserMedia: function() {
    navigator.getUserMedia = navigator.webkitGetUserMedia;
  }
};

// Expose public methods.
module.exports = {
  shimGetUserMedia: safariShim.shimGetUserMedia
  // TODO
  // shimOnTrack: safariShim.shimOnTrack,
  // shimPeerConnection: safariShim.shimPeerConnection
};

},{}],10:[function(require,module,exports){
/*
 *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
 /* eslint-env node */
'use strict';

var logDisabled_ = true;

// Utility methods.
var utils = {
  disableLog: function(bool) {
    if (typeof bool !== 'boolean') {
      return new Error('Argument type: ' + typeof bool +
          '. Please use a boolean.');
    }
    logDisabled_ = bool;
    return (bool) ? 'adapter.js logging disabled' :
        'adapter.js logging enabled';
  },

  log: function() {
    if (typeof window === 'object') {
      if (logDisabled_) {
        return;
      }
      if (typeof console !== 'undefined' && typeof console.log === 'function') {
        console.log.apply(console, arguments);
      }
    }
  },

  /**
   * Extract browser version out of the provided user agent string.
   *
   * @param {!string} uastring userAgent string.
   * @param {!string} expr Regular expression used as match criteria.
   * @param {!number} pos position in the version string to be returned.
   * @return {!number} browser version.
   */
  extractVersion: function(uastring, expr, pos) {
    var match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos], 10);
  },

  /**
   * Browser detector.
   *
   * @return {object} result containing browser and version
   *     properties.
   */
  detectBrowser: function() {
    // Returned result object.
    var result = {};
    result.browser = null;
    result.version = null;

    // Fail early if it's not a browser
    if (typeof window === 'undefined' || !window.navigator) {
      result.browser = 'Not a browser.';
      return result;
    }

    // Firefox.
    if (navigator.mozGetUserMedia) {
      result.browser = 'firefox';
      result.version = this.extractVersion(navigator.userAgent,
          /Firefox\/([0-9]+)\./, 1);

    // all webkit-based browsers
    } else if (navigator.webkitGetUserMedia) {
      // Chrome, Chromium, Webview, Opera, all use the chrome shim for now
      if (window.webkitRTCPeerConnection) {
        result.browser = 'chrome';
        result.version = this.extractVersion(navigator.userAgent,
          /Chrom(e|ium)\/([0-9]+)\./, 2);

      // Safari or unknown webkit-based
      // for the time being Safari has support for MediaStreams but not webRTC
      } else {
        // Safari UA substrings of interest for reference:
        // - webkit version:           AppleWebKit/602.1.25 (also used in Op,Cr)
        // - safari UI version:        Version/9.0.3 (unique to Safari)
        // - safari UI webkit version: Safari/601.4.4 (also used in Op,Cr)
        //
        // if the webkit version and safari UI webkit versions are equals,
        // ... this is a stable version.
        //
        // only the internal webkit version is important today to know if
        // media streams are supported
        //
        if (navigator.userAgent.match(/Version\/(\d+).(\d+)/)) {
          result.browser = 'safari';
          result.version = this.extractVersion(navigator.userAgent,
            /AppleWebKit\/([0-9]+)\./, 1);

        // unknown webkit-based browser
        } else {
          result.browser = 'Unsupported webkit-based browser ' +
              'with GUM support but no WebRTC support.';
          return result;
        }
      }

    // Edge.
    } else if (navigator.mediaDevices &&
        navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
      result.browser = 'edge';
      result.version = this.extractVersion(navigator.userAgent,
          /Edge\/(\d+).(\d+)$/, 2);

    // Default fallthrough: not supported.
    } else {
      result.browser = 'Not a supported browser.';
      return result;
    }

    return result;
  }
};

// Export.
module.exports = {
  log: utils.log,
  disableLog: utils.disableLog,
  browserDetails: utils.detectBrowser(),
  extractVersion: utils.extractVersion
};

},{}]},{},[2])(2)
});
/*! vex.combined.js: vex 3.0.0, vex-dialog 1.0.6 */
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.vex=a()}}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"document"in window.self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))?!function(){"use strict";var a=document.createElement("_");if(a.classList.add("c1","c2"),!a.classList.contains("c2")){var b=function(a){var b=DOMTokenList.prototype[a];DOMTokenList.prototype[a]=function(a){var c,d=arguments.length;for(c=0;c<d;c++)a=arguments[c],b.call(this,a)}};b("add"),b("remove")}if(a.classList.toggle("c3",!1),a.classList.contains("c3")){var c=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(a,b){return 1 in arguments&&!this.contains(a)==!b?b:c.call(this,a)}}a=null}():!function(a){"use strict";if("Element"in a){var b="classList",c="prototype",d=a.Element[c],e=Object,f=String[c].trim||function(){return this.replace(/^\s+|\s+$/g,"")},g=Array[c].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1},h=function(a,b){this.name=a,this.code=DOMException[a],this.message=b},i=function(a,b){if(""===b)throw new h("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(b))throw new h("INVALID_CHARACTER_ERR","String contains an invalid character");return g.call(a,b)},j=function(a){for(var b=f.call(a.getAttribute("class")||""),c=b?b.split(/\s+/):[],d=0,e=c.length;d<e;d++)this.push(c[d]);this._updateClassName=function(){a.setAttribute("class",this.toString())}},k=j[c]=[],l=function(){return new j(this)};if(h[c]=Error[c],k.item=function(a){return this[a]||null},k.contains=function(a){return a+="",i(this,a)!==-1},k.add=function(){var a,b=arguments,c=0,d=b.length,e=!1;do a=b[c]+"",i(this,a)===-1&&(this.push(a),e=!0);while(++c<d);e&&this._updateClassName()},k.remove=function(){var a,b,c=arguments,d=0,e=c.length,f=!1;do for(a=c[d]+"",b=i(this,a);b!==-1;)this.splice(b,1),f=!0,b=i(this,a);while(++d<e);f&&this._updateClassName()},k.toggle=function(a,b){a+="";var c=this.contains(a),d=c?b!==!0&&"remove":b!==!1&&"add";return d&&this[d](a),b===!0||b===!1?b:!c},k.toString=function(){return this.join(" ")},e.defineProperty){var m={get:l,enumerable:!0,configurable:!0};try{e.defineProperty(d,b,m)}catch(n){n.number===-2146823252&&(m.enumerable=!1,e.defineProperty(d,b,m))}}else e[c].__defineGetter__&&d.__defineGetter__(b,l)}}(window.self))},{}],2:[function(a,b,c){function d(a,b){if("string"!=typeof a)throw new TypeError("String expected");b||(b=document);var c=/<([\w:]+)/.exec(a);if(!c)return b.createTextNode(a);a=a.replace(/^\s+|\s+$/g,"");var d=c[1];if("body"==d){var e=b.createElement("html");return e.innerHTML=a,e.removeChild(e.lastChild)}var f=g[d]||g._default,h=f[0],i=f[1],j=f[2],e=b.createElement("div");for(e.innerHTML=i+a+j;h--;)e=e.lastChild;if(e.firstChild==e.lastChild)return e.removeChild(e.firstChild);for(var k=b.createDocumentFragment();e.firstChild;)k.appendChild(e.removeChild(e.firstChild));return k}b.exports=d;var e,f=!1;"undefined"!=typeof document&&(e=document.createElement("div"),e.innerHTML='  <link/><table></table><a href="/a">a</a><input type="checkbox"/>',f=!e.getElementsByTagName("link").length,e=void 0);var g={legend:[1,"<fieldset>","</fieldset>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],_default:f?[1,"X<div>","</div>"]:[0,"",""]};g.td=g.th=[3,"<table><tbody><tr>","</tr></tbody></table>"],g.option=g.optgroup=[1,'<select multiple="multiple">',"</select>"],g.thead=g.tbody=g.colgroup=g.caption=g.tfoot=[1,"<table>","</table>"],g.polyline=g.ellipse=g.polygon=g.circle=g.text=g.line=g.path=g.rect=g.g=[1,'<svg xmlns="http://www.w3.org/2000/svg" version="1.1">',"</svg>"]},{}],3:[function(a,b,c){"use strict";function d(a,b){if(void 0===a||null===a)throw new TypeError("Cannot convert first argument to object");for(var c=Object(a),d=1;d<arguments.length;d++){var e=arguments[d];if(void 0!==e&&null!==e)for(var f=Object.keys(Object(e)),g=0,h=f.length;g<h;g++){var i=f[g],j=Object.getOwnPropertyDescriptor(e,i);void 0!==j&&j.enumerable&&(c[i]=e[i])}}return c}function e(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:d})}b.exports={assign:d,polyfill:e}},{}],4:[function(a,b,c){function d(a,b){"object"!=typeof b?b={hash:!!b}:void 0===b.hash&&(b.hash=!0);for(var c=b.hash?{}:"",d=b.serializer||(b.hash?g:h),e=a&&a.elements?a.elements:[],f=Object.create(null),k=0;k<e.length;++k){var l=e[k];if((b.disabled||!l.disabled)&&l.name&&j.test(l.nodeName)&&!i.test(l.type)){var m=l.name,n=l.value;if("checkbox"!==l.type&&"radio"!==l.type||l.checked||(n=void 0),b.empty){if("checkbox"!==l.type||l.checked||(n=""),"radio"===l.type&&(f[l.name]||l.checked?l.checked&&(f[l.name]=!0):f[l.name]=!1),!n&&"radio"==l.type)continue}else if(!n)continue;if("select-multiple"!==l.type)c=d(c,m,n);else{n=[];for(var o=l.options,p=!1,q=0;q<o.length;++q){var r=o[q],s=b.empty&&!r.value,t=r.value||s;r.selected&&t&&(p=!0,c=b.hash&&"[]"!==m.slice(m.length-2)?d(c,m+"[]",r.value):d(c,m,r.value))}!p&&b.empty&&(c=d(c,m,""))}}}if(b.empty)for(var m in f)f[m]||(c=d(c,m,""));return c}function e(a){var b=[],c=/^([^\[\]]*)/,d=new RegExp(k),e=c.exec(a);for(e[1]&&b.push(e[1]);null!==(e=d.exec(a));)b.push(e[1]);return b}function f(a,b,c){if(0===b.length)return a=c;var d=b.shift(),e=d.match(/^\[(.+?)\]$/);if("[]"===d)return a=a||[],Array.isArray(a)?a.push(f(null,b,c)):(a._values=a._values||[],a._values.push(f(null,b,c))),a;if(e){var g=e[1],h=+g;isNaN(h)?(a=a||{},a[g]=f(a[g],b,c)):(a=a||[],a[h]=f(a[h],b,c))}else a[d]=f(a[d],b,c);return a}function g(a,b,c){var d=b.match(k);if(d){var g=e(b);f(a,g,c)}else{var h=a[b];h?(Array.isArray(h)||(a[b]=[h]),a[b].push(c)):a[b]=c}return a}function h(a,b,c){return c=c.replace(/(\r)?\n/g,"\r\n"),c=encodeURIComponent(c),c=c.replace(/%20/g,"+"),a+(a?"&":"")+encodeURIComponent(b)+"="+c}var i=/^(?:submit|button|image|reset|file)$/i,j=/^(?:input|select|textarea|keygen)/i,k=/(\[[^\[\]]*\])/g;b.exports=d},{}],5:[function(b,c,d){(function(e){!function(b){if("object"==typeof d&&"undefined"!=typeof c)c.exports=b();else if("function"==typeof a&&a.amd)a([],b);else{var f;f="undefined"!=typeof window?window:"undefined"!=typeof e?e:"undefined"!=typeof self?self:this,f.vexDialog=b()}}(function(){return function a(c,d,e){function f(h,i){if(!d[h]){if(!c[h]){var j="function"==typeof b&&b;if(!i&&j)return j(h,!0);if(g)return g(h,!0);var k=new Error("Cannot find module '"+h+"'");throw k.code="MODULE_NOT_FOUND",k}var l=d[h]={exports:{}};c[h][0].call(l.exports,function(a){var b=c[h][1][a];return f(b?b:a)},l,l.exports,a,c,d,e)}return d[h].exports}for(var g="function"==typeof b&&b,h=0;h<e.length;h++)f(e[h]);return f}({1:[function(a,b,c){function d(a,b){if("string"!=typeof a)throw new TypeError("String expected");b||(b=document);var c=/<([\w:]+)/.exec(a);if(!c)return b.createTextNode(a);a=a.replace(/^\s+|\s+$/g,"");var d=c[1];if("body"==d){var e=b.createElement("html");return e.innerHTML=a,e.removeChild(e.lastChild)}var f=g[d]||g._default,h=f[0],i=f[1],j=f[2],e=b.createElement("div");for(e.innerHTML=i+a+j;h--;)e=e.lastChild;if(e.firstChild==e.lastChild)return e.removeChild(e.firstChild);for(var k=b.createDocumentFragment();e.firstChild;)k.appendChild(e.removeChild(e.firstChild));return k}b.exports=d;var e,f=!1;"undefined"!=typeof document&&(e=document.createElement("div"),e.innerHTML='  <link/><table></table><a href="/a">a</a><input type="checkbox"/>',f=!e.getElementsByTagName("link").length,e=void 0);var g={legend:[1,"<fieldset>","</fieldset>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],_default:f?[1,"X<div>","</div>"]:[0,"",""]};g.td=g.th=[3,"<table><tbody><tr>","</tr></tbody></table>"],g.option=g.optgroup=[1,'<select multiple="multiple">',"</select>"],g.thead=g.tbody=g.colgroup=g.caption=g.tfoot=[1,"<table>","</table>"],g.polyline=g.ellipse=g.polygon=g.circle=g.text=g.line=g.path=g.rect=g.g=[1,'<svg xmlns="http://www.w3.org/2000/svg" version="1.1">',"</svg>"]},{}],2:[function(a,b,c){function d(a,b){"object"!=typeof b?b={hash:!!b}:void 0===b.hash&&(b.hash=!0);for(var c=b.hash?{}:"",d=b.serializer||(b.hash?g:h),e=a&&a.elements?a.elements:[],f=Object.create(null),k=0;k<e.length;++k){var l=e[k];if((b.disabled||!l.disabled)&&l.name&&j.test(l.nodeName)&&!i.test(l.type)){var m=l.name,n=l.value;if("checkbox"!==l.type&&"radio"!==l.type||l.checked||(n=void 0),b.empty){if("checkbox"!==l.type||l.checked||(n=""),"radio"===l.type&&(f[l.name]||l.checked?l.checked&&(f[l.name]=!0):f[l.name]=!1),!n&&"radio"==l.type)continue}else if(!n)continue;if("select-multiple"!==l.type)c=d(c,m,n);else{n=[];for(var o=l.options,p=!1,q=0;q<o.length;++q){var r=o[q],s=b.empty&&!r.value,t=r.value||s;r.selected&&t&&(p=!0,c=b.hash&&"[]"!==m.slice(m.length-2)?d(c,m+"[]",r.value):d(c,m,r.value))}!p&&b.empty&&(c=d(c,m,""))}}}if(b.empty)for(var m in f)f[m]||(c=d(c,m,""));return c}function e(a){var b=[],c=/^([^\[\]]*)/,d=new RegExp(k),e=c.exec(a);for(e[1]&&b.push(e[1]);null!==(e=d.exec(a));)b.push(e[1]);return b}function f(a,b,c){if(0===b.length)return a=c;var d=b.shift(),e=d.match(/^\[(.+?)\]$/);if("[]"===d)return a=a||[],Array.isArray(a)?a.push(f(null,b,c)):(a._values=a._values||[],a._values.push(f(null,b,c))),a;if(e){var g=e[1],h=+g;isNaN(h)?(a=a||{},a[g]=f(a[g],b,c)):(a=a||[],a[h]=f(a[h],b,c))}else a[d]=f(a[d],b,c);return a}function g(a,b,c){var d=b.match(k);if(d){var g=e(b);f(a,g,c)}else{var h=a[b];h?(Array.isArray(h)||(a[b]=[h]),a[b].push(c)):a[b]=c}return a}function h(a,b,c){return c=c.replace(/(\r)?\n/g,"\r\n"),c=encodeURIComponent(c),c=c.replace(/%20/g,"+"),a+(a?"&":"")+encodeURIComponent(b)+"="+c}var i=/^(?:submit|button|image|reset|file)$/i,j=/^(?:input|select|textarea|keygen)/i,k=/(\[[^\[\]]*\])/g;b.exports=d},{}],3:[function(a,b,c){var d=a("domify"),e=a("form-serialize"),f=function(a){var b=document.createElement("form");b.classList.add("vex-dialog-form");var c=document.createElement("div");c.classList.add("vex-dialog-message"),c.appendChild(a.message instanceof window.Node?a.message:d(a.message));var e=document.createElement("div");return e.classList.add("vex-dialog-input"),e.appendChild(a.input instanceof window.Node?a.input:d(a.input)),b.appendChild(c),b.appendChild(e),b},g=function(a){var b=document.createElement("div");b.classList.add("vex-dialog-buttons");for(var c=0;c<a.length;c++){var d=a[c],e=document.createElement("button");e.type=d.type,e.textContent=d.text,e.classList.add(d.className),e.classList.add("vex-dialog-button"),0===c?e.classList.add("vex-first"):c===a.length-1&&e.classList.add("vex-last"),function(a){e.addEventListener("click",function(b){a.click&&a.click.call(this,b)}.bind(this))}.bind(this)(d),b.appendChild(e)}return b},h=function(a){var b={name:"dialog",open:function(b){var c=Object.assign({},this.defaultOptions,b);c.unsafeMessage&&!c.message?c.message=c.unsafeMessage:c.message&&(c.message=a._escapeHtml(c.message));var d=c.unsafeContent=f(c),e=a.open(c),h=c.beforeClose&&c.beforeClose.bind(e);if(e.options.beforeClose=function(){var a=!h||h();return a&&c.callback(this.value||!1),a}.bind(e),d.appendChild(g.call(e,c.buttons)),e.form=d,d.addEventListener("submit",c.onSubmit.bind(e)),c.focusFirstInput){var i=e.contentEl.querySelector("button, input, textarea");i&&i.focus()}return e},alert:function(a){return"string"==typeof a&&(a={message:a}),a=Object.assign({},this.defaultOptions,this.defaultAlertOptions,a),this.open(a)},confirm:function(a){if("object"!=typeof a||"function"!=typeof a.callback)throw new Error("dialog.confirm(options) requires options.callback.");return a=Object.assign({},this.defaultOptions,this.defaultConfirmOptions,a),this.open(a)},prompt:function(b){if("object"!=typeof b||"function"!=typeof b.callback)throw new Error("dialog.prompt(options) requires options.callback.");var c=Object.assign({},this.defaultOptions,this.defaultPromptOptions),d={unsafeMessage:'<label for="vex">'+a._escapeHtml(b.label||c.label)+"</label>",input:'<input name="vex" type="text" class="vex-dialog-prompt-input" placeholder="'+a._escapeHtml(b.placeholder||c.placeholder)+'" value="'+a._escapeHtml(b.value||c.value)+'" />'};b=Object.assign(c,d,b);var e=b.callback;return b.callback=function(a){a=a[Object.keys(a)[0]],e(a)},this.open(b)}};return b.buttons={YES:{text:"OK",type:"submit",className:"vex-dialog-button-primary",click:function(){this.value=!0}},NO:{text:"Cancel",type:"button",className:"vex-dialog-button-secondary",click:function(){this.value=!1,this.close()}}},b.defaultOptions={callback:function(){},afterOpen:function(){},message:"",input:"",buttons:[b.buttons.YES,b.buttons.NO],showCloseButton:!1,onSubmit:function(a){return a.preventDefault(),this.options.input&&(this.value=e(this.form,{hash:!0})),this.close()},focusFirstInput:!0},b.defaultAlertOptions={buttons:[b.buttons.YES]},b.defaultPromptOptions={label:"Prompt:",placeholder:"",value:""},b.defaultConfirmOptions={},b};b.exports=h},{domify:1,"form-serialize":2}]},{},[3])(3)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{domify:2,"form-serialize":4}],6:[function(a,b,c){var d=a("./vex");d.registerPlugin(a("vex-dialog")),b.exports=d},{"./vex":7,"vex-dialog":5}],7:[function(a,b,c){a("classlist-polyfill"),a("es6-object-assign").polyfill();var d=a("domify"),e=function(a){if("undefined"!=typeof a){var b=document.createElement("div");return b.appendChild(document.createTextNode(a)),b.innerHTML}return""},f=function(a,b){if("string"==typeof b&&0!==b.length)for(var c=b.split(" "),d=0;d<c.length;d++){var e=c[d];e.length&&a.classList.add(e)}},g=function(){var a=document.createElement("div"),b={WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oanimationend",msAnimation:"MSAnimationEnd",animation:"animationend"};for(var c in b)if(void 0!==a.style[c])return b[c];return!1}(),h={vex:"vex",content:"vex-content",overlay:"vex-overlay",close:"vex-close",closing:"vex-closing",open:"vex-open"},i={},j=1,k=!1,l={open:function(a){var b=function(a){console.warn('The "'+a+'" property is deprecated in vex 3. Use CSS classes and the appropriate "ClassName" options, instead.'),console.warn("See http://github.hubspot.com/vex/api/advanced/#options")};a.css&&b("css"),a.overlayCSS&&b("overlayCSS"),a.contentCSS&&b("contentCSS"),a.closeCSS&&b("closeCSS");var c={};c.id=j++,i[c.id]=c,c.isOpen=!0,c.close=function(){function a(a){return"none"!==d.getPropertyValue(a+"animation-name")&&"0s"!==d.getPropertyValue(a+"animation-duration")}if(!this.isOpen)return!0;var b=this.options;if(k&&!b.escapeButtonCloses)return!1;var c=function(){return!b.beforeClose||b.beforeClose.call(this)}.bind(this)();if(c===!1)return!1;this.isOpen=!1;var d=window.getComputedStyle(this.contentEl),e=a("")||a("-webkit-")||a("-moz-")||a("-o-"),f=function j(){this.rootEl.parentNode&&(this.rootEl.removeEventListener(g,j),delete i[this.id],this.rootEl.parentNode.removeChild(this.rootEl),b.afterClose&&b.afterClose.call(this),0===Object.keys(i).length&&document.body.classList.remove(h.open))}.bind(this);return g&&e?(this.rootEl.addEventListener(g,f),this.rootEl.classList.add(h.closing)):f(),!0},"string"==typeof a&&(a={content:a}),a.unsafeContent&&!a.content?a.content=a.unsafeContent:a.content&&(a.content=e(a.content));var m=c.options=Object.assign({},l.defaultOptions,a),n=c.rootEl=document.createElement("div");n.classList.add(h.vex),f(n,m.className);var o=c.overlayEl=document.createElement("div");o.classList.add(h.overlay),f(o,m.overlayClassName),m.overlayClosesOnClick&&o.addEventListener("click",function(a){a.target===o&&c.close()}),n.appendChild(o);var p=c.contentEl=document.createElement("div");if(p.classList.add(h.content),f(p,m.contentClassName),p.appendChild(m.content instanceof window.Node?m.content:d(m.content)),n.appendChild(p),m.showCloseButton){var q=c.closeEl=document.createElement("div");q.classList.add(h.close),f(q,m.closeClassName),q.addEventListener("click",c.close.bind(c)),p.appendChild(q)}return document.querySelector(m.appendLocation).appendChild(n),m.afterOpen&&m.afterOpen.call(c),document.body.classList.add(h.open),c},close:function(a){var b;if(a.id)b=a.id;else{if("string"!=typeof a)throw new TypeError("close requires a vex object or id string");b=a}return!!i[b]&&i[b].close()},closeTop:function(){var a=Object.keys(i);return!!a.length&&i[a[a.length-1]].close()},closeAll:function(){for(var a in i)this.close(a);return!0},getAll:function(){return i},getById:function(a){return i[a]}};window.addEventListener("keyup",function(a){27===a.keyCode&&(k=!0,l.closeTop(),k=!1)}),window.addEventListener("popstate",l.closeAll),l.defaultOptions={content:"",showCloseButton:!0,escapeButtonCloses:!0,overlayClosesOnClick:!0,appendLocation:"body",className:"",overlayClassName:"",contentClassName:"",closeClassName:""},Object.defineProperty(l,"_escapeHtml",{configurable:!1,enumerable:!1,writable:!1,value:e}),l.registerPlugin=function(a,b){var c=a(l),d=b||c.name;if(l[d])throw new Error("Plugin "+b+" is already registered.");l[d]=c},b.exports=l},{"classlist-polyfill":1,domify:2,"es6-object-assign":3}]},{},[6])(6)});

!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.qrcode=t()}(this,function(){function e(e,t){this.count=e,this.dataCodewords=t,Object.defineProperties(this,{Count:{get:function(){return this.count}},DataCodewords:{get:function(){return this.dataCodewords}}})}function t(e,t,r){this.ecCodewordsPerBlock=e,this.ecBlocks=r?new Array(t,r):new Array(t),Object.defineProperties(this,{ECCodewordsPerBlock:{get:function(){return this.ecCodewordsPerBlock}},TotalECCodewords:{get:function(){return this.ecCodewordsPerBlock*this.NumBlocks}},NumBlocks:{get:function(){for(var e=0,t=0;t<this.ecBlocks.length;t++)e+=this.ecBlocks[t].length;return e}}}),this.getECBlocks=function(){return this.ecBlocks}}function r(e,t,r,n,i,o){this.versionNumber=e,this.alignmentPatternCenters=t,this.ecBlocks=new Array(r,n,i,o);for(var a=0,s=r.ECCodewordsPerBlock,h=r.getECBlocks(),w=0;w<h.length;w++){var c=h[w];a+=c.Count*(c.DataCodewords+s)}this.totalCodewords=a,Object.defineProperties(this,{VersionNumber:{get:function(){return this.versionNumber}},AlignmentPatternCenters:{get:function(){return this.alignmentPatternCenters}},TotalCodewords:{get:function(){return this.totalCodewords}},DimensionForVersion:{get:function(){return 17+4*this.versionNumber}}}),this.buildFunctionPattern=function(){var e=this.DimensionForVersion,t=new d(e);t.setRegion(0,0,9,9),t.setRegion(e-8,0,8,9),t.setRegion(0,e-8,9,8);for(var r=this.alignmentPatternCenters.length,n=0;r>n;n++)for(var i=this.alignmentPatternCenters[n]-2,o=0;r>o;o++)0==n&&(0==o||o==r-1)||n==r-1&&0==o||t.setRegion(this.alignmentPatternCenters[o]-2,i,5,5);return t.setRegion(6,9,1,e-17),t.setRegion(9,6,e-17,1),this.versionNumber>6&&(t.setRegion(e-11,0,3,6),t.setRegion(0,e-11,6,3)),t},this.getECBlocksForLevel=function(e){return this.ecBlocks[e.ordinal()]}}function n(){return new Array(new r(1,new Array,new t(7,new e(1,19)),new t(10,new e(1,16)),new t(13,new e(1,13)),new t(17,new e(1,9))),new r(2,new Array(6,18),new t(10,new e(1,34)),new t(16,new e(1,28)),new t(22,new e(1,22)),new t(28,new e(1,16))),new r(3,new Array(6,22),new t(15,new e(1,55)),new t(26,new e(1,44)),new t(18,new e(2,17)),new t(22,new e(2,13))),new r(4,new Array(6,26),new t(20,new e(1,80)),new t(18,new e(2,32)),new t(26,new e(2,24)),new t(16,new e(4,9))),new r(5,new Array(6,30),new t(26,new e(1,108)),new t(24,new e(2,43)),new t(18,new e(2,15),new e(2,16)),new t(22,new e(2,11),new e(2,12))),new r(6,new Array(6,34),new t(18,new e(2,68)),new t(16,new e(4,27)),new t(24,new e(4,19)),new t(28,new e(4,15))),new r(7,new Array(6,22,38),new t(20,new e(2,78)),new t(18,new e(4,31)),new t(18,new e(2,14),new e(4,15)),new t(26,new e(4,13),new e(1,14))),new r(8,new Array(6,24,42),new t(24,new e(2,97)),new t(22,new e(2,38),new e(2,39)),new t(22,new e(4,18),new e(2,19)),new t(26,new e(4,14),new e(2,15))),new r(9,new Array(6,26,46),new t(30,new e(2,116)),new t(22,new e(3,36),new e(2,37)),new t(20,new e(4,16),new e(4,17)),new t(24,new e(4,12),new e(4,13))),new r(10,new Array(6,28,50),new t(18,new e(2,68),new e(2,69)),new t(26,new e(4,43),new e(1,44)),new t(24,new e(6,19),new e(2,20)),new t(28,new e(6,15),new e(2,16))),new r(11,new Array(6,30,54),new t(20,new e(4,81)),new t(30,new e(1,50),new e(4,51)),new t(28,new e(4,22),new e(4,23)),new t(24,new e(3,12),new e(8,13))),new r(12,new Array(6,32,58),new t(24,new e(2,92),new e(2,93)),new t(22,new e(6,36),new e(2,37)),new t(26,new e(4,20),new e(6,21)),new t(28,new e(7,14),new e(4,15))),new r(13,new Array(6,34,62),new t(26,new e(4,107)),new t(22,new e(8,37),new e(1,38)),new t(24,new e(8,20),new e(4,21)),new t(22,new e(12,11),new e(4,12))),new r(14,new Array(6,26,46,66),new t(30,new e(3,115),new e(1,116)),new t(24,new e(4,40),new e(5,41)),new t(20,new e(11,16),new e(5,17)),new t(24,new e(11,12),new e(5,13))),new r(15,new Array(6,26,48,70),new t(22,new e(5,87),new e(1,88)),new t(24,new e(5,41),new e(5,42)),new t(30,new e(5,24),new e(7,25)),new t(24,new e(11,12),new e(7,13))),new r(16,new Array(6,26,50,74),new t(24,new e(5,98),new e(1,99)),new t(28,new e(7,45),new e(3,46)),new t(24,new e(15,19),new e(2,20)),new t(30,new e(3,15),new e(13,16))),new r(17,new Array(6,30,54,78),new t(28,new e(1,107),new e(5,108)),new t(28,new e(10,46),new e(1,47)),new t(28,new e(1,22),new e(15,23)),new t(28,new e(2,14),new e(17,15))),new r(18,new Array(6,30,56,82),new t(30,new e(5,120),new e(1,121)),new t(26,new e(9,43),new e(4,44)),new t(28,new e(17,22),new e(1,23)),new t(28,new e(2,14),new e(19,15))),new r(19,new Array(6,30,58,86),new t(28,new e(3,113),new e(4,114)),new t(26,new e(3,44),new e(11,45)),new t(26,new e(17,21),new e(4,22)),new t(26,new e(9,13),new e(16,14))),new r(20,new Array(6,34,62,90),new t(28,new e(3,107),new e(5,108)),new t(26,new e(3,41),new e(13,42)),new t(30,new e(15,24),new e(5,25)),new t(28,new e(15,15),new e(10,16))),new r(21,new Array(6,28,50,72,94),new t(28,new e(4,116),new e(4,117)),new t(26,new e(17,42)),new t(28,new e(17,22),new e(6,23)),new t(30,new e(19,16),new e(6,17))),new r(22,new Array(6,26,50,74,98),new t(28,new e(2,111),new e(7,112)),new t(28,new e(17,46)),new t(30,new e(7,24),new e(16,25)),new t(24,new e(34,13))),new r(23,new Array(6,30,54,74,102),new t(30,new e(4,121),new e(5,122)),new t(28,new e(4,47),new e(14,48)),new t(30,new e(11,24),new e(14,25)),new t(30,new e(16,15),new e(14,16))),new r(24,new Array(6,28,54,80,106),new t(30,new e(6,117),new e(4,118)),new t(28,new e(6,45),new e(14,46)),new t(30,new e(11,24),new e(16,25)),new t(30,new e(30,16),new e(2,17))),new r(25,new Array(6,32,58,84,110),new t(26,new e(8,106),new e(4,107)),new t(28,new e(8,47),new e(13,48)),new t(30,new e(7,24),new e(22,25)),new t(30,new e(22,15),new e(13,16))),new r(26,new Array(6,30,58,86,114),new t(28,new e(10,114),new e(2,115)),new t(28,new e(19,46),new e(4,47)),new t(28,new e(28,22),new e(6,23)),new t(30,new e(33,16),new e(4,17))),new r(27,new Array(6,34,62,90,118),new t(30,new e(8,122),new e(4,123)),new t(28,new e(22,45),new e(3,46)),new t(30,new e(8,23),new e(26,24)),new t(30,new e(12,15),new e(28,16))),new r(28,new Array(6,26,50,74,98,122),new t(30,new e(3,117),new e(10,118)),new t(28,new e(3,45),new e(23,46)),new t(30,new e(4,24),new e(31,25)),new t(30,new e(11,15),new e(31,16))),new r(29,new Array(6,30,54,78,102,126),new t(30,new e(7,116),new e(7,117)),new t(28,new e(21,45),new e(7,46)),new t(30,new e(1,23),new e(37,24)),new t(30,new e(19,15),new e(26,16))),new r(30,new Array(6,26,52,78,104,130),new t(30,new e(5,115),new e(10,116)),new t(28,new e(19,47),new e(10,48)),new t(30,new e(15,24),new e(25,25)),new t(30,new e(23,15),new e(25,16))),new r(31,new Array(6,30,56,82,108,134),new t(30,new e(13,115),new e(3,116)),new t(28,new e(2,46),new e(29,47)),new t(30,new e(42,24),new e(1,25)),new t(30,new e(23,15),new e(28,16))),new r(32,new Array(6,34,60,86,112,138),new t(30,new e(17,115)),new t(28,new e(10,46),new e(23,47)),new t(30,new e(10,24),new e(35,25)),new t(30,new e(19,15),new e(35,16))),new r(33,new Array(6,30,58,86,114,142),new t(30,new e(17,115),new e(1,116)),new t(28,new e(14,46),new e(21,47)),new t(30,new e(29,24),new e(19,25)),new t(30,new e(11,15),new e(46,16))),new r(34,new Array(6,34,62,90,118,146),new t(30,new e(13,115),new e(6,116)),new t(28,new e(14,46),new e(23,47)),new t(30,new e(44,24),new e(7,25)),new t(30,new e(59,16),new e(1,17))),new r(35,new Array(6,30,54,78,102,126,150),new t(30,new e(12,121),new e(7,122)),new t(28,new e(12,47),new e(26,48)),new t(30,new e(39,24),new e(14,25)),new t(30,new e(22,15),new e(41,16))),new r(36,new Array(6,24,50,76,102,128,154),new t(30,new e(6,121),new e(14,122)),new t(28,new e(6,47),new e(34,48)),new t(30,new e(46,24),new e(10,25)),new t(30,new e(2,15),new e(64,16))),new r(37,new Array(6,28,54,80,106,132,158),new t(30,new e(17,122),new e(4,123)),new t(28,new e(29,46),new e(14,47)),new t(30,new e(49,24),new e(10,25)),new t(30,new e(24,15),new e(46,16))),new r(38,new Array(6,32,58,84,110,136,162),new t(30,new e(4,122),new e(18,123)),new t(28,new e(13,46),new e(32,47)),new t(30,new e(48,24),new e(14,25)),new t(30,new e(42,15),new e(32,16))),new r(39,new Array(6,26,54,82,110,138,166),new t(30,new e(20,117),new e(4,118)),new t(28,new e(40,47),new e(7,48)),new t(30,new e(43,24),new e(22,25)),new t(30,new e(10,15),new e(67,16))),new r(40,new Array(6,30,58,86,114,142,170),new t(30,new e(19,118),new e(6,119)),new t(28,new e(18,47),new e(31,48)),new t(30,new e(34,24),new e(34,25)),new t(30,new e(20,15),new e(61,16))))}function i(e,t,r,n,o,a,s,h,d){this.a11=e,this.a12=n,this.a13=s,this.a21=t,this.a22=o,this.a23=h,this.a31=r,this.a32=a,this.a33=d,this.transformPoints1=function(e){for(var t=e.length,r=this.a11,n=this.a12,i=this.a13,o=this.a21,a=this.a22,s=this.a23,h=this.a31,d=this.a32,w=this.a33,c=0;t>c;c+=2){var f=e[c],u=e[c+1],l=i*f+s*u+w;e[c]=(r*f+o*u+h)/l,e[c+1]=(n*f+a*u+d)/l}},this.transformPoints2=function(e,t){for(var r=e.length,n=0;r>n;n++){var i=e[n],o=t[n],a=this.a13*i+this.a23*o+this.a33;e[n]=(this.a11*i+this.a21*o+this.a31)/a,t[n]=(this.a12*i+this.a22*o+this.a32)/a}},this.buildAdjoint=function(){return new i(this.a22*this.a33-this.a23*this.a32,this.a23*this.a31-this.a21*this.a33,this.a21*this.a32-this.a22*this.a31,this.a13*this.a32-this.a12*this.a33,this.a11*this.a33-this.a13*this.a31,this.a12*this.a31-this.a11*this.a32,this.a12*this.a23-this.a13*this.a22,this.a13*this.a21-this.a11*this.a23,this.a11*this.a22-this.a12*this.a21)},this.times=function(e){return new i(this.a11*e.a11+this.a21*e.a12+this.a31*e.a13,this.a11*e.a21+this.a21*e.a22+this.a31*e.a23,this.a11*e.a31+this.a21*e.a32+this.a31*e.a33,this.a12*e.a11+this.a22*e.a12+this.a32*e.a13,this.a12*e.a21+this.a22*e.a22+this.a32*e.a23,this.a12*e.a31+this.a22*e.a32+this.a32*e.a33,this.a13*e.a11+this.a23*e.a12+this.a33*e.a13,this.a13*e.a21+this.a23*e.a22+this.a33*e.a23,this.a13*e.a31+this.a23*e.a32+this.a33*e.a33)}}function o(e,t){this.bits=e,this.points=t}function a(e){this.image=e,this.resultPointCallback=null,this.sizeOfBlackWhiteBlackRun=function(e,t,r,n){var i=Math.abs(n-t)>Math.abs(r-e);if(i){var o=e;e=t,t=o,o=r,r=n,n=o}for(var a=Math.abs(r-e),s=Math.abs(n-t),h=-a>>1,d=n>t?1:-1,w=r>e?1:-1,c=0,f=e,u=t;f!=r;f+=w){var l=i?u:f,g=i?f:u;if(1==c?this.image[l+g*qrcode.width]&&c++:this.image[l+g*qrcode.width]||c++,3==c){var v=f-e,m=u-t;return Math.sqrt(v*v+m*m)}if(h+=s,h>0){if(u==n)break;u+=d,h-=a}}var p=r-e,y=n-t;return Math.sqrt(p*p+y*y)},this.sizeOfBlackWhiteBlackRunBothWays=function(e,t,r,n){var i=this.sizeOfBlackWhiteBlackRun(e,t,r,n),o=1,a=e-(r-e);0>a?(o=e/(e-a),a=0):a>=qrcode.width&&(o=(qrcode.width-1-e)/(a-e),a=qrcode.width-1);var s=Math.floor(t-(n-t)*o);return o=1,0>s?(o=t/(t-s),s=0):s>=qrcode.height&&(o=(qrcode.height-1-t)/(s-t),s=qrcode.height-1),a=Math.floor(e+(a-e)*o),i+=this.sizeOfBlackWhiteBlackRun(e,t,a,s),i-1},this.calculateModuleSizeOneWay=function(e,t){var r=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(e.X),Math.floor(e.Y),Math.floor(t.X),Math.floor(t.Y)),n=this.sizeOfBlackWhiteBlackRunBothWays(Math.floor(t.X),Math.floor(t.Y),Math.floor(e.X),Math.floor(e.Y));return isNaN(r)?n/7:isNaN(n)?r/7:(r+n)/14},this.calculateModuleSize=function(e,t,r){return(this.calculateModuleSizeOneWay(e,t)+this.calculateModuleSizeOneWay(e,r))/2},this.distance=function(e,t){return xDiff=e.X-t.X,yDiff=e.Y-t.Y,Math.sqrt(xDiff*xDiff+yDiff*yDiff)},this.computeDimension=function(e,t,r,n){var i=Math.round(this.distance(e,t)/n),o=Math.round(this.distance(e,r)/n),a=(i+o>>1)+7;switch(3&a){case 0:a++;break;case 2:a--;break;case 3:throw"Error"}return a},this.findAlignmentInRegion=function(e,t,r,n){var i=Math.floor(n*e),o=Math.max(0,t-i),a=Math.min(qrcode.width-1,t+i);if(3*e>a-o)throw"Error";var s=Math.max(0,r-i),h=Math.min(qrcode.height-1,r+i),d=new D(this.image,o,s,a-o,h-s,e,this.resultPointCallback);return d.find()},this.createTransform=function(e,t,r,n,o){var a,s,h,d,w=o-3.5;null!=n?(a=n.X,s=n.Y,h=d=w-3):(a=t.X-e.X+r.X,s=t.Y-e.Y+r.Y,h=d=w);var c=i.quadrilateralToQuadrilateral(3.5,3.5,w,3.5,h,d,3.5,w,e.X,e.Y,t.X,t.Y,a,s,r.X,r.Y);return c},this.sampleGrid=function(e,t,r){var n=GridSampler;return n.sampleGrid3(e,r,t)},this.processFinderPatternInfo=function(e){var t=e.TopLeft,n=e.TopRight,i=e.BottomLeft,a=this.calculateModuleSize(t,n,i);if(1>a)throw"Error";var s=this.computeDimension(t,n,i,a),h=r.getProvisionalVersionForDimension(s),d=h.DimensionForVersion-7,w=null;if(h.AlignmentPatternCenters.length>0)for(var c=n.X-t.X+i.X,f=n.Y-t.Y+i.Y,u=1-3/d,l=Math.floor(t.X+u*(c-t.X)),g=Math.floor(t.Y+u*(f-t.Y)),v=4;16>=v;v<<=1){w=this.findAlignmentInRegion(a,l,g,v);break}var m,p=this.createTransform(t,n,i,w,s),y=this.sampleGrid(this.image,p,s);return m=null==w?new Array(i,t,n):new Array(i,t,n,w),new o(y,m)},this.detect=function(){var e=(new E).findFinderPattern(this.image);return this.processFinderPatternInfo(e)}}function s(e){this.errorCorrectionLevel=h.forBits(e>>3&3),this.dataMask=7&e,Object.defineProperties(this,{ErrorCorrectionLevel:{get:function(){return this.errorCorrectionLevel}},DataMask:{get:function(){return this.dataMask}}}),this.GetHashCode=function(){return this.errorCorrectionLevel.ordinal()<<3|dataMask},this.Equals=function(e){var t=e;return this.errorCorrectionLevel==t.errorCorrectionLevel&&this.dataMask==t.dataMask}}function h(e,t,r){this.ordinal_Renamed_Field=e,this.bits=t,this.name=r,Object.defineProperties(this,{Bits:{get:function(){return this.bits}},Name:{get:function(){return this.name}}}),this.ordinal=function(){return this.ordinal_Renamed_Field}}function d(e,t){if(t||(t=e),1>e||1>t)throw"Both dimensions must be greater than 0";this.width=e,this.height=t;var r=e>>5;0!=(31&e)&&r++,this.rowSize=r,this.bits=new Array(r*t);for(var n=0;n<this.bits.length;n++)this.bits[n]=0;Object.defineProperties(this,{Width:{get:function(){return this.width}},Height:{get:function(){return this.height}},Dimension:{get:function(){if(this.width!=this.height)throw"Can't call getDimension() on a non-square matrix";return this.width}}}),this.get_Renamed=function(e,t){var r=t*this.rowSize+(e>>5);return 0!=(1&q(this.bits[r],31&e))},this.set_Renamed=function(e,t){var r=t*this.rowSize+(e>>5);this.bits[r]|=1<<(31&e)},this.flip=function(e,t){var r=t*this.rowSize+(e>>5);this.bits[r]^=1<<(31&e)},this.clear=function(){for(var e=this.bits.length,t=0;e>t;t++)this.bits[t]=0},this.setRegion=function(e,t,r,n){if(0>t||0>e)throw"Left and top must be nonnegative";if(1>n||1>r)throw"Height and width must be at least 1";var i=e+r,o=t+n;if(o>this.height||i>this.width)throw"The region must fit inside the matrix";for(var a=t;o>a;a++)for(var s=a*this.rowSize,h=e;i>h;h++)this.bits[s+(h>>5)]|=1<<(31&h)}}function w(e,t){this.numDataCodewords=e,this.codewords=t,Object.defineProperties(this,{NumDataCodewords:{get:function(){return this.numDataCodewords}},Codewords:{get:function(){return this.codewords}}})}function c(e){var t=e.Dimension;if(21>t||1!=(3&t))throw"Error BitMatrixParser";this.bitMatrix=e,this.parsedVersion=null,this.parsedFormatInfo=null,this.copyBit=function(e,t,r){return this.bitMatrix.get_Renamed(e,t)?r<<1|1:r<<1},this.readFormatInformation=function(){if(null!=this.parsedFormatInfo)return this.parsedFormatInfo;for(var e=0,t=0;6>t;t++)e=this.copyBit(t,8,e);e=this.copyBit(7,8,e),e=this.copyBit(8,8,e),e=this.copyBit(8,7,e);for(var r=5;r>=0;r--)e=this.copyBit(8,r,e);if(this.parsedFormatInfo=s.decodeFormatInformation(e),null!=this.parsedFormatInfo)return this.parsedFormatInfo;var n=this.bitMatrix.Dimension;e=0;for(var i=n-8,t=n-1;t>=i;t--)e=this.copyBit(t,8,e);for(var r=n-7;n>r;r++)e=this.copyBit(8,r,e);if(this.parsedFormatInfo=s.decodeFormatInformation(e),null!=this.parsedFormatInfo)return this.parsedFormatInfo;throw"Error readFormatInformation"},this.readVersion=function(){if(null!=this.parsedVersion)return this.parsedVersion;var e=this.bitMatrix.Dimension,t=e-17>>2;if(6>=t)return r.getVersionForNumber(t);for(var n=0,i=e-11,o=5;o>=0;o--)for(var a=e-9;a>=i;a--)n=this.copyBit(a,o,n);if(this.parsedVersion=r.decodeVersionInformation(n),null!=this.parsedVersion&&this.parsedVersion.DimensionForVersion==e)return this.parsedVersion;n=0;for(var a=5;a>=0;a--)for(var o=e-9;o>=i;o--)n=this.copyBit(a,o,n);if(this.parsedVersion=r.decodeVersionInformation(n),null!=this.parsedVersion&&this.parsedVersion.DimensionForVersion==e)return this.parsedVersion;throw"Error readVersion"},this.readCodewords=function(){var e=this.readFormatInformation(),t=this.readVersion(),r=DataMask.forReference(e.DataMask),n=this.bitMatrix.Dimension;r.unmaskBitMatrix(this.bitMatrix,n);for(var i=t.buildFunctionPattern(),o=!0,a=new Array(t.TotalCodewords),s=0,h=0,d=0,w=n-1;w>0;w-=2){6==w&&w--;for(var c=0;n>c;c++)for(var f=o?n-1-c:c,u=0;2>u;u++)i.get_Renamed(w-u,f)||(d++,h<<=1,this.bitMatrix.get_Renamed(w-u,f)&&(h|=1),8==d&&(a[s++]=h,d=0,h=0));o^=!0}if(s!=t.TotalCodewords)throw"Error readCodewords";return a}}function f(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){return 0==(e+t&1)}}function u(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e){return 0==(1&e)}}function l(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){return t%3==0}}function g(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){return(e+t)%3==0}}function v(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){return 0==(q(e,1)+t/3&1)}}function m(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){var r=e*t;return(1&r)+r%3==0}}function y(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){var r=e*t;return 0==((1&r)+r%3&1)}}function b(){this.unmaskBitMatrix=function(e,t){for(var r=0;t>r;r++)for(var n=0;t>n;n++)this.isMasked(r,n)&&e.flip(n,r)},this.isMasked=function(e,t){return 0==((e+t&1)+e*t%3&1)}}function C(e){this.field=e,this.decode=function(e,t){for(var r=new M(this.field,e),n=new Array(t),i=0;i<n.length;i++)n[i]=0;for(var o=!1,a=!0,i=0;t>i;i++){var s=r.evaluateAt(this.field.exp(o?i+1:i));n[n.length-1-i]=s,0!=s&&(a=!1)}if(!a)for(var h=new M(this.field,n),d=this.runEuclideanAlgorithm(this.field.buildMonomial(t,1),h,t),w=d[0],c=d[1],f=this.findErrorLocations(w),u=this.findErrorMagnitudes(c,f,o),i=0;i<f.length;i++){var l=e.length-1-this.field.log(f[i]);if(0>l)throw"ReedSolomonException Bad error location";e[l]=A.addOrSubtract(e[l],u[i])}},this.runEuclideanAlgorithm=function(e,t,r){if(e.Degree<t.Degree){var n=e;e=t,t=n}for(var i=e,o=t,a=this.field.One,s=this.field.Zero,h=this.field.Zero,d=this.field.One;o.Degree>=Math.floor(r/2);){var w=i,c=a,f=h;if(i=o,a=s,h=d,i.Zero)throw"r_{i-1} was zero";o=w;for(var u=this.field.Zero,l=i.getCoefficient(i.Degree),g=this.field.inverse(l);o.Degree>=i.Degree&&!o.Zero;){var v=o.Degree-i.Degree,m=this.field.multiply(o.getCoefficient(o.Degree),g);u=u.addOrSubtract(this.field.buildMonomial(v,m)),o=o.addOrSubtract(i.multiplyByMonomial(v,m))}s=u.multiply1(a).addOrSubtract(c),d=u.multiply1(h).addOrSubtract(f)}var p=d.getCoefficient(0);if(0==p)throw"ReedSolomonException sigmaTilde(0) was zero";var y=this.field.inverse(p),b=d.multiply2(y),C=o.multiply2(y);return new Array(b,C)},this.findErrorLocations=function(e){var t=e.Degree;if(1==t)return new Array(e.getCoefficient(1));for(var r=new Array(t),n=0,i=1;256>i&&t>n;i++)0==e.evaluateAt(i)&&(r[n]=this.field.inverse(i),n++);if(n!=t)throw"Error locator degree does not match number of roots";return r},this.findErrorMagnitudes=function(e,t,r){for(var n=t.length,i=new Array(n),o=0;n>o;o++){for(var a=this.field.inverse(t[o]),s=1,h=0;n>h;h++)o!=h&&(s=this.field.multiply(s,A.addOrSubtract(1,this.field.multiply(t[h],a))));i[o]=this.field.multiply(e.evaluateAt(a),this.field.inverse(s)),r&&(i[o]=this.field.multiply(i[o],a))}return i}}function M(e,t){if(null==t||0==t.length)throw"System.ArgumentException";this.field=e;var r=t.length;if(r>1&&0==t[0]){for(var n=1;r>n&&0==t[n];)n++;if(n==r)this.coefficients=e.Zero.coefficients;else{this.coefficients=new Array(r-n);for(var i=0;i<this.coefficients.length;i++)this.coefficients[i]=0;for(var o=0;o<this.coefficients.length;o++)this.coefficients[o]=t[n+o]}}else this.coefficients=t;Object.defineProperties(this,{Zero:{get:function(){return 0==this.coefficients[0]}},Degree:{get:function(){return this.coefficients.length-1}},Coefficients:{get:function(){return this.coefficients}}}),this.getCoefficient=function(e){return this.coefficients[this.coefficients.length-1-e]},this.evaluateAt=function(e){if(0==e)return this.getCoefficient(0);var t=this.coefficients.length;if(1==e){for(var r=0,n=0;t>n;n++)r=A.addOrSubtract(r,this.coefficients[n]);return r}for(var i=this.coefficients[0],n=1;t>n;n++)i=A.addOrSubtract(this.field.multiply(e,i),this.coefficients[n]);return i},this.addOrSubtract=function(t){if(this.field!=t.field)throw"GF256Polys do not have same GF256 field";if(this.Zero)return t;if(t.Zero)return this;var r=this.coefficients,n=t.coefficients;if(r.length>n.length){var i=r;r=n,n=i}for(var o=new Array(n.length),a=n.length-r.length,s=0;a>s;s++)o[s]=n[s];for(var h=a;h<n.length;h++)o[h]=A.addOrSubtract(r[h-a],n[h]);return new M(e,o)},this.multiply1=function(e){if(this.field!=e.field)throw"GF256Polys do not have same GF256 field";if(this.Zero||e.Zero)return this.field.Zero;for(var t=this.coefficients,r=t.length,n=e.coefficients,i=n.length,o=new Array(r+i-1),a=0;r>a;a++)for(var s=t[a],h=0;i>h;h++)o[a+h]=A.addOrSubtract(o[a+h],this.field.multiply(s,n[h]));return new M(this.field,o)},this.multiply2=function(e){if(0==e)return this.field.Zero;if(1==e)return this;for(var t=this.coefficients.length,r=new Array(t),n=0;t>n;n++)r[n]=this.field.multiply(this.coefficients[n],e);return new M(this.field,r)},this.multiplyByMonomial=function(e,t){if(0>e)throw"System.ArgumentException";if(0==t)return this.field.Zero;for(var r=this.coefficients.length,n=new Array(r+e),i=0;i<n.length;i++)n[i]=0;for(var i=0;r>i;i++)n[i]=this.field.multiply(this.coefficients[i],t);return new M(this.field,n)},this.divide=function(e){if(this.field!=e.field)throw"GF256Polys do not have same GF256 field";if(e.Zero)throw"Divide by 0";for(var t=this.field.Zero,r=this,n=e.getCoefficient(e.Degree),i=this.field.inverse(n);r.Degree>=e.Degree&&!r.Zero;){var o=r.Degree-e.Degree,a=this.field.multiply(r.getCoefficient(r.Degree),i),s=e.multiplyByMonomial(o,a),h=this.field.buildMonomial(o,a);t=t.addOrSubtract(h),r=r.addOrSubtract(s)}return new Array(t,r)}}function A(e){this.expTable=new Array(256),this.logTable=new Array(256);for(var t=1,r=0;256>r;r++)this.expTable[r]=t,t<<=1,t>=256&&(t^=e);for(var r=0;255>r;r++)this.logTable[this.expTable[r]]=r;var n=new Array(1);n[0]=0,this.zero=new M(this,new Array(n));var i=new Array(1);i[0]=1,this.one=new M(this,new Array(i)),Object.defineProperties(this,{Zero:{get:function(){return this.zero}},One:{get:function(){return this.one}}}),this.buildMonomial=function(e,t){if(0>e)throw"System.ArgumentException";if(0==t)return zero;for(var r=new Array(e+1),n=0;n<r.length;n++)r[n]=0;return r[0]=t,new M(this,r)},this.exp=function(e){return this.expTable[e]},this.log=function(e){if(0==e)throw"System.ArgumentException";return this.logTable[e]},this.inverse=function(e){if(0==e)throw"System.ArithmeticException";return this.expTable[255-this.logTable[e]]},this.multiply=function(e,t){return 0==e||0==t?0:1==e?t:1==t?e:this.expTable[(this.logTable[e]+this.logTable[t])%255]}}function q(e,t){return e>=0?e>>t:(e>>t)+(2<<~t)}function k(e,t,r){this.x=e,this.y=t,this.count=1,this.estimatedModuleSize=r,Object.defineProperties(this,{EstimatedModuleSize:{get:function(){return this.estimatedModuleSize}},Count:{get:function(){return this.count}},X:{get:function(){return this.x}},Y:{get:function(){return this.y}}}),this.incrementCount=function(){this.count++},this.aboutEquals=function(e,t,r){if(Math.abs(t-this.y)<=e&&Math.abs(r-this.x)<=e){var n=Math.abs(e-this.estimatedModuleSize);return 1>=n||n/this.estimatedModuleSize<=1}return!1}}function P(e){this.bottomLeft=e[0],this.topLeft=e[1],this.topRight=e[2],Object.defineProperties(this,{BottomLeft:{get:function(){return this.bottomLeft}},TopLeft:{get:function(){return this.topLeft}},TopRight:{get:function(){return this.topRight}}})}function E(){this.image=null,this.possibleCenters=[],this.hasSkipped=!1,this.crossCheckStateCount=new Array(0,0,0,0,0),this.resultPointCallback=null,Object.defineProperty(this,"CrossCheckStateCount",{get:function(){return this.crossCheckStateCount[0]=0,this.crossCheckStateCount[1]=0,this.crossCheckStateCount[2]=0,this.crossCheckStateCount[3]=0,this.crossCheckStateCount[4]=0,this.crossCheckStateCount}}),this.foundPatternCross=function(e){for(var t=0,r=0;5>r;r++){var n=e[r];if(0==n)return!1;t+=n}if(7>t)return!1;var i=Math.floor((t<<_)/7),o=Math.floor(i/2);return Math.abs(i-(e[0]<<_))<o&&Math.abs(i-(e[1]<<_))<o&&Math.abs(3*i-(e[2]<<_))<3*o&&Math.abs(i-(e[3]<<_))<o&&Math.abs(i-(e[4]<<_))<o},this.centerFromEnd=function(e,t){return t-e[4]-e[3]-e[2]/2},this.crossCheckVertical=function(e,t,r,n){for(var i=this.image,o=qrcode.height,a=this.CrossCheckStateCount,s=e;s>=0&&i[t+s*qrcode.width];)a[2]++,s--;if(0>s)return 0/0;for(;s>=0&&!i[t+s*qrcode.width]&&a[1]<=r;)a[1]++,s--;if(0>s||a[1]>r)return 0/0;for(;s>=0&&i[t+s*qrcode.width]&&a[0]<=r;)a[0]++,s--;if(a[0]>r)return 0/0;for(s=e+1;o>s&&i[t+s*qrcode.width];)a[2]++,s++;if(s==o)return 0/0;for(;o>s&&!i[t+s*qrcode.width]&&a[3]<r;)a[3]++,s++;if(s==o||a[3]>=r)return 0/0;for(;o>s&&i[t+s*qrcode.width]&&a[4]<r;)a[4]++,s++;if(a[4]>=r)return 0/0;var h=a[0]+a[1]+a[2]+a[3]+a[4];return 5*Math.abs(h-n)>=2*n?0/0:this.foundPatternCross(a)?this.centerFromEnd(a,s):0/0},this.crossCheckHorizontal=function(e,t,r,n){for(var i=this.image,o=qrcode.width,a=this.CrossCheckStateCount,s=e;s>=0&&i[s+t*qrcode.width];)a[2]++,s--;if(0>s)return 0/0;for(;s>=0&&!i[s+t*qrcode.width]&&a[1]<=r;)a[1]++,s--;if(0>s||a[1]>r)return 0/0;for(;s>=0&&i[s+t*qrcode.width]&&a[0]<=r;)a[0]++,s--;if(a[0]>r)return 0/0;for(s=e+1;o>s&&i[s+t*qrcode.width];)a[2]++,s++;if(s==o)return 0/0;for(;o>s&&!i[s+t*qrcode.width]&&a[3]<r;)a[3]++,s++;if(s==o||a[3]>=r)return 0/0;for(;o>s&&i[s+t*qrcode.width]&&a[4]<r;)a[4]++,s++;if(a[4]>=r)return 0/0;var h=a[0]+a[1]+a[2]+a[3]+a[4];return 5*Math.abs(h-n)>=n?0/0:this.foundPatternCross(a)?this.centerFromEnd(a,s):0/0},this.handlePossibleCenter=function(e,t,r){var n=e[0]+e[1]+e[2]+e[3]+e[4],i=this.centerFromEnd(e,r),o=this.crossCheckVertical(t,Math.floor(i),e[2],n);if(!isNaN(o)&&(i=this.crossCheckHorizontal(Math.floor(i),Math.floor(o),e[2],n),!isNaN(i))){for(var a=n/7,s=!1,h=this.possibleCenters.length,d=0;h>d;d++){var w=this.possibleCenters[d];if(w.aboutEquals(a,o,i)){w.incrementCount(),s=!0;break}}if(!s){var c=new k(i,o,a);this.possibleCenters.push(c),null!=this.resultPointCallback&&this.resultPointCallback.foundPossibleResultPoint(c)}return!0}return!1},this.selectBestPatterns=function(){var e=this.possibleCenters.length;if(3>e)throw"Couldn't find enough finder patterns";if(e>3){for(var t=0,r=0,n=0;e>n;n++){var i=this.possibleCenters[n].EstimatedModuleSize;t+=i,r+=i*i}var o=t/e;this.possibleCenters.sort(function(e,t){var r=Math.abs(t.EstimatedModuleSize-o),n=Math.abs(e.EstimatedModuleSize-o);return n>r?-1:r==n?0:1});for(var a=Math.sqrt(r/e-o*o),s=Math.max(.1*o,a),n=0;n<this.possibleCenters.length&&this.possibleCenters.length>3;n++){var h=this.possibleCenters[n];Math.abs(h.EstimatedModuleSize-o)>s&&(this.possibleCenters.remove(n),n--)}}return this.possibleCenters.length>3&&this.possibleCenters.sort(function(e,t){return e.count>t.count?-1:e.count<t.count?1:0}),new Array(this.possibleCenters[0],this.possibleCenters[1],this.possibleCenters[2])},this.findRowSkip=function(){var e=this.possibleCenters.length;if(1>=e)return 0;for(var t=null,r=0;e>r;r++){var n=this.possibleCenters[r];if(n.Count>=X){if(null!=t)return this.hasSkipped=!0,Math.floor((Math.abs(t.X-n.X)-Math.abs(t.Y-n.Y))/2);t=n}}return 0},this.haveMultiplyConfirmedCenters=function(){for(var e=0,t=0,r=this.possibleCenters.length,n=0;r>n;n++){var i=this.possibleCenters[n];i.Count>=X&&(e++,t+=i.EstimatedModuleSize)}if(3>e)return!1;for(var o=t/r,a=0,n=0;r>n;n++)i=this.possibleCenters[n],a+=Math.abs(i.EstimatedModuleSize-o);return.05*t>=a},this.findFinderPattern=function(e){var t=!1;this.image=e;var r=qrcode.height,n=qrcode.width,i=Math.floor(3*r/(4*L));(V>i||t)&&(i=V);for(var o=!1,a=new Array(5),s=i-1;r>s&&!o;s+=i){a[0]=0,a[1]=0,a[2]=0,a[3]=0,a[4]=0;for(var h=0,d=0;n>d;d++)if(e[d+s*qrcode.width])1==(1&h)&&h++,a[h]++;else if(0==(1&h))if(4==h)if(this.foundPatternCross(a)){var w=this.handlePossibleCenter(a,s,d);if(w)if(i=2,this.hasSkipped)o=this.haveMultiplyConfirmedCenters();else{var c=this.findRowSkip();c>a[2]&&(s+=c-a[2]-i,d=n-1)}else{do d++;while(n>d&&!e[d+s*qrcode.width]);d--}h=0,a[0]=0,a[1]=0,a[2]=0,a[3]=0,a[4]=0}else a[0]=a[2],a[1]=a[3],a[2]=a[4],a[3]=1,a[4]=0,h=3;else a[++h]++;else a[h]++;if(this.foundPatternCross(a)){var w=this.handlePossibleCenter(a,s,n);w&&(i=a[0],this.hasSkipped&&(o=haveMultiplyConfirmedCenters()))}}var f=this.selectBestPatterns();return qrcode.orderBestPatterns(f),new P(f)}}function S(e,t,r){this.x=e,this.y=t,this.count=1,this.estimatedModuleSize=r,Object.defineProperties(this,{EstimatedModuleSize:{get:function(){return this.estimatedModuleSize}},Count:{get:function(){return this.count}},X:{get:function(){return Math.floor(this.x)}},Y:{get:function(){return Math.floor(this.y)}}}),this.incrementCount=function(){this.count++},this.aboutEquals=function(e,t,r){if(Math.abs(t-this.y)<=e&&Math.abs(r-this.x)<=e){var n=Math.abs(e-this.estimatedModuleSize);return 1>=n||n/this.estimatedModuleSize<=1}return!1}}function D(e,t,r,n,i,o,a){this.image=e,this.possibleCenters=new Array,this.startX=t,this.startY=r,this.width=n,this.height=i,this.moduleSize=o,this.crossCheckStateCount=new Array(0,0,0),this.resultPointCallback=a,this.centerFromEnd=function(e,t){return t-e[2]-e[1]/2},this.foundPatternCross=function(e){for(var t=this.moduleSize,r=t/2,n=0;3>n;n++)if(Math.abs(t-e[n])>=r)return!1;return!0},this.crossCheckVertical=function(e,t,r,n){var i=this.image,o=qrcode.height,a=this.crossCheckStateCount;a[0]=0,a[1]=0,a[2]=0;for(var s=e;s>=0&&i[t+s*qrcode.width]&&a[1]<=r;)a[1]++,s--;if(0>s||a[1]>r)return 0/0;for(;s>=0&&!i[t+s*qrcode.width]&&a[0]<=r;)a[0]++,s--;if(a[0]>r)return 0/0;for(s=e+1;o>s&&i[t+s*qrcode.width]&&a[1]<=r;)a[1]++,s++;if(s==o||a[1]>r)return 0/0;for(;o>s&&!i[t+s*qrcode.width]&&a[2]<=r;)a[2]++,s++;if(a[2]>r)return 0/0;var h=a[0]+a[1]+a[2];return 5*Math.abs(h-n)>=2*n?0/0:this.foundPatternCross(a)?this.centerFromEnd(a,s):0/0},this.handlePossibleCenter=function(e,t,r){var n=e[0]+e[1]+e[2],i=this.centerFromEnd(e,r),o=this.crossCheckVertical(t,Math.floor(i),2*e[1],n);if(!isNaN(o)){for(var a=(e[0]+e[1]+e[2])/3,s=this.possibleCenters.length,h=0;s>h;h++){var d=this.possibleCenters[h];if(d.aboutEquals(a,o,i))return new S(i,o,a)}var w=new S(i,o,a);this.possibleCenters.push(w),null!=this.resultPointCallback&&this.resultPointCallback.foundPossibleResultPoint(w)}return null},this.find=function(){for(var t=this.startX,i=this.height,o=t+n,a=r+(i>>1),s=new Array(0,0,0),h=0;i>h;h++){var d=a+(0==(1&h)?h+1>>1:-(h+1>>1));s[0]=0,s[1]=0,s[2]=0;for(var w=t;o>w&&!e[w+qrcode.width*d];)w++;for(var c=0;o>w;){if(e[w+d*qrcode.width])if(1==c)s[c]++;else if(2==c){if(this.foundPatternCross(s)){var f=this.handlePossibleCenter(s,d,w);if(null!=f)return f}s[0]=s[2],s[1]=1,s[2]=0,c=1}else s[++c]++;else 1==c&&c++,s[c]++;w++}if(this.foundPatternCross(s)){var f=this.handlePossibleCenter(s,d,o);if(null!=f)return f}}if(0!=this.possibleCenters.length)return this.possibleCenters[0];throw"Couldn't find enough alignment patterns"}}function x(e,t,r){this.blockPointer=0,this.bitPointer=7,this.dataLength=0,this.blocks=e,this.numErrorCorrectionCode=r,9>=t?this.dataLengthMode=0:t>=10&&26>=t?this.dataLengthMode=1:t>=27&&40>=t&&(this.dataLengthMode=2),this.getNextBits=function(e){var t=0;
  if(e<this.bitPointer+1){for(var r=0,n=0;e>n;n++)r+=1<<n;return r<<=this.bitPointer-e+1,t=(this.blocks[this.blockPointer]&r)>>this.bitPointer-e+1,this.bitPointer-=e,t}if(e<this.bitPointer+1+8){for(var i=0,n=0;n<this.bitPointer+1;n++)i+=1<<n;return t=(this.blocks[this.blockPointer]&i)<<e-(this.bitPointer+1),this.blockPointer++,t+=this.blocks[this.blockPointer]>>8-(e-(this.bitPointer+1)),this.bitPointer=this.bitPointer-e%8,this.bitPointer<0&&(this.bitPointer=8+this.bitPointer),t}if(e<this.bitPointer+1+16){for(var i=0,o=0,n=0;n<this.bitPointer+1;n++)i+=1<<n;var a=(this.blocks[this.blockPointer]&i)<<e-(this.bitPointer+1);this.blockPointer++;var s=this.blocks[this.blockPointer]<<e-(this.bitPointer+1+8);this.blockPointer++;for(var n=0;n<e-(this.bitPointer+1+8);n++)o+=1<<n;o<<=8-(e-(this.bitPointer+1+8));var h=(this.blocks[this.blockPointer]&o)>>8-(e-(this.bitPointer+1+8));return t=a+s+h,this.bitPointer=this.bitPointer-(e-8)%8,this.bitPointer<0&&(this.bitPointer=8+this.bitPointer),t}return 0},this.NextMode=function(){return this.blockPointer>this.blocks.length-this.numErrorCorrectionCode-2?0:this.getNextBits(4)},this.getDataLength=function(e){for(var t=0;;){if(e>>t==1)break;t++}return this.getNextBits(qrcode.sizeOfDataLengthInfo[this.dataLengthMode][t])},this.getRomanAndFigureString=function(e){var t=e,r=0,n="",i=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":");do if(t>1){r=this.getNextBits(11);var o=Math.floor(r/45),a=r%45;n+=i[o],n+=i[a],t-=2}else 1==t&&(r=this.getNextBits(6),n+=i[r],t-=1);while(t>0);return n},this.getFigureString=function(e){var t=e,r=0,n="";do t>=3?(r=this.getNextBits(10),100>r&&(n+="0"),10>r&&(n+="0"),t-=3):2==t?(r=this.getNextBits(7),10>r&&(n+="0"),t-=2):1==t&&(r=this.getNextBits(4),t-=1),n+=r;while(t>0);return n},this.get8bitByteArray=function(e){var t=e,r=0,n=new Array;do r=this.getNextBits(8),n.push(r),t--;while(t>0);return n},this.getKanjiString=function(e){var t=e,r=0,n="";do{r=getNextBits(13);var i=r%192,o=r/192,a=(o<<8)+i,s=0;s=40956>=a+33088?a+33088:a+49472,n+=String.fromCharCode(s),t--}while(t>0);return n},Object.defineProperty(this,"DataByte",{get:function(){for(var e=new Array,t=1,r=2,n=4,i=8;;){var o=this.NextMode();if(0==o){if(e.length>0)break;throw"Empty data block"}if(o!=t&&o!=r&&o!=n&&o!=i)throw o=guessMode(o),"Invalid mode: "+o+" in (block:"+this.blockPointer+" bit:"+this.bitPointer+")";if(dataLength=this.getDataLength(o),1>dataLength)throw"Invalid data length: "+dataLength;switch(o){case t:for(var a=this.getFigureString(dataLength),s=new Array(a.length),h=0;h<a.length;h++)s[h]=a.charCodeAt(h);e.push(s);break;case r:for(var a=this.getRomanAndFigureString(dataLength),s=new Array(a.length),h=0;h<a.length;h++)s[h]=a.charCodeAt(h);e.push(s);break;case n:var d=this.get8bitByteArray(dataLength);e.push(d);break;case i:var a=this.getKanjiString(dataLength);e.push(a)}}return e}})}GridSampler={},GridSampler.checkAndNudgePoints=function(e,t){for(var r=qrcode.width,n=qrcode.height,i=!0,o=0;o<t.length&&i;o+=2){var a=Math.floor(t[o]),s=Math.floor(t[o+1]);if(-1>a||a>r||-1>s||s>n)throw"Error.checkAndNudgePoints ";i=!1,-1==a?(t[o]=0,i=!0):a==r&&(t[o]=r-1,i=!0),-1==s?(t[o+1]=0,i=!0):s==n&&(t[o+1]=n-1,i=!0)}i=!0;for(var o=t.length-2;o>=0&&i;o-=2){var a=Math.floor(t[o]),s=Math.floor(t[o+1]);if(-1>a||a>r||-1>s||s>n)throw"Error.checkAndNudgePoints ";i=!1,-1==a?(t[o]=0,i=!0):a==r&&(t[o]=r-1,i=!0),-1==s?(t[o+1]=0,i=!0):s==n&&(t[o+1]=n-1,i=!0)}},GridSampler.sampleGrid3=function(e,t,r){for(var n=new d(t),i=new Array(t<<1),o=0;t>o;o++){for(var a=i.length,s=o+.5,h=0;a>h;h+=2)i[h]=(h>>1)+.5,i[h+1]=s;r.transformPoints1(i),GridSampler.checkAndNudgePoints(e,i);try{for(var h=0;a>h;h+=2){var w=4*Math.floor(i[h])+Math.floor(i[h+1])*qrcode.width*4,c=e[Math.floor(i[h])+qrcode.width*Math.floor(i[h+1])];qrcode.imagedata.data[w]=c?255:0,qrcode.imagedata.data[w+1]=c?255:0,qrcode.imagedata.data[w+2]=0,qrcode.imagedata.data[w+3]=255,c&&n.set_Renamed(h>>1,o)}}catch(f){throw"Error.checkAndNudgePoints"}}return n},GridSampler.sampleGridx=function(e,t,r,n,o,a,s,h,d,w,c,f,u,l,g,v,m,p){var y=i.quadrilateralToQuadrilateral(r,n,o,a,s,h,d,w,c,f,u,l,g,v,m,p);return GridSampler.sampleGrid3(e,t,y)},r.VERSION_DECODE_INFO=new Array(31892,34236,39577,42195,48118,51042,55367,58893,63784,68472,70749,76311,79154,84390,87683,92361,96236,102084,102881,110507,110734,117786,119615,126325,127568,133589,136944,141498,145311,150283,152622,158308,161089,167017),r.VERSIONS=n(),r.getVersionForNumber=function(e){if(1>e||e>40)throw"ArgumentException";return r.VERSIONS[e-1]},r.getProvisionalVersionForDimension=function(e){if(e%4!=1)throw"Error getProvisionalVersionForDimension";try{return r.getVersionForNumber(e-17>>2)}catch(t){throw"Error getVersionForNumber"}},r.decodeVersionInformation=function(e){for(var t=4294967295,n=0,i=0;i<r.VERSION_DECODE_INFO.length;i++){var o=r.VERSION_DECODE_INFO[i];if(o==e)return this.getVersionForNumber(i+7);var a=s.numBitsDiffering(e,o);t>a&&(n=i+7,t=a)}return 3>=t?this.getVersionForNumber(n):null},i.quadrilateralToQuadrilateral=function(e,t,r,n,i,o,a,s,h,d,w,c,f,u,l,g){var v=this.quadrilateralToSquare(e,t,r,n,i,o,a,s),m=this.squareToQuadrilateral(h,d,w,c,f,u,l,g);return m.times(v)},i.squareToQuadrilateral=function(e,t,r,n,o,a,s,h){return dy2=h-a,dy3=t-n+a-h,0==dy2&&0==dy3?new i(r-e,o-r,e,n-t,a-n,t,0,0,1):(dx1=r-o,dx2=s-o,dx3=e-r+o-s,dy1=n-a,denominator=dx1*dy2-dx2*dy1,a13=(dx3*dy2-dx2*dy3)/denominator,a23=(dx1*dy3-dx3*dy1)/denominator,new i(r-e+a13*r,s-e+a23*s,e,n-t+a13*n,h-t+a23*h,t,a13,a23,1))},i.quadrilateralToSquare=function(e,t,r,n,i,o,a,s){return this.squareToQuadrilateral(e,t,r,n,i,o,a,s).buildAdjoint()};var B=21522,F=new Array(new Array(21522,0),new Array(20773,1),new Array(24188,2),new Array(23371,3),new Array(17913,4),new Array(16590,5),new Array(20375,6),new Array(19104,7),new Array(30660,8),new Array(29427,9),new Array(32170,10),new Array(30877,11),new Array(26159,12),new Array(25368,13),new Array(27713,14),new Array(26998,15),new Array(5769,16),new Array(5054,17),new Array(7399,18),new Array(6608,19),new Array(1890,20),new Array(597,21),new Array(3340,22),new Array(2107,23),new Array(13663,24),new Array(12392,25),new Array(16177,26),new Array(14854,27),new Array(9396,28),new Array(8579,29),new Array(11994,30),new Array(11245,31)),I=new Array(0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4);s.numBitsDiffering=function(e,t){return e^=t,I[15&e]+I[15&q(e,4)]+I[15&q(e,8)]+I[15&q(e,12)]+I[15&q(e,16)]+I[15&q(e,20)]+I[15&q(e,24)]+I[15&q(e,28)]},s.decodeFormatInformation=function(e){var t=s.doDecodeFormatInformation(e);return null!=t?t:s.doDecodeFormatInformation(e^B)},s.doDecodeFormatInformation=function(e){for(var t=4294967295,r=0,n=0;n<F.length;n++){var i=F[n],o=i[0];if(o==e)return new s(i[1]);var a=this.numBitsDiffering(e,o);t>a&&(r=i[1],t=a)}return 3>=t?new s(r):null},h.forBits=function(e){if(0>e||e>=z.length)throw"ArgumentException";return z[e]};var T=new h(0,1,"L"),O=new h(1,0,"M"),N=new h(2,3,"Q"),R=new h(3,2,"H"),z=new Array(O,T,R,N);w.getDataBlocks=function(e,t,r){if(e.length!=t.TotalCodewords)throw"ArgumentException";for(var n=t.getECBlocksForLevel(r),i=0,o=n.getECBlocks(),a=0;a<o.length;a++)i+=o[a].Count;for(var s=new Array(i),h=0,d=0;d<o.length;d++)for(var c=o[d],a=0;a<c.Count;a++){var f=c.DataCodewords,u=n.ECCodewordsPerBlock+f;s[h++]=new w(f,new Array(u))}for(var l=s[0].codewords.length,g=s.length-1;g>=0;){var v=s[g].codewords.length;if(v==l)break;g--}g++;for(var m=l-n.ECCodewordsPerBlock,p=0,a=0;m>a;a++)for(var d=0;h>d;d++)s[d].codewords[a]=e[p++];for(var d=g;h>d;d++)s[d].codewords[m]=e[p++];for(var y=s[0].codewords.length,a=m;y>a;a++)for(var d=0;h>d;d++){var b=g>d?a:a+1;s[d].codewords[b]=e[p++]}return s},DataMask={},DataMask.forReference=function(e){if(0>e||e>7)throw"System.ArgumentException";return DataMask.DATA_MASKS[e]},DataMask.DATA_MASKS=new Array(new f,new u,new l,new g,new v,new m,new y,new b),A.QR_CODE_FIELD=new A(285),A.DATA_MATRIX_FIELD=new A(301),A.addOrSubtract=function(e,t){return e^t},Decoder={},Decoder.rsDecoder=new C(A.QR_CODE_FIELD),Decoder.correctErrors=function(e,t){for(var r=e.length,n=new Array(r),i=0;r>i;i++)n[i]=255&e[i];var o=e.length-t;try{Decoder.rsDecoder.decode(n,o)}catch(a){throw a}for(var i=0;t>i;i++)e[i]=n[i]},Decoder.decode=function(e){for(var t=new c(e),r=t.readVersion(),n=t.readFormatInformation().ErrorCorrectionLevel,i=t.readCodewords(),o=w.getDataBlocks(i,r,n),a=0,s=0;s<o.length;s++)a+=o[s].NumDataCodewords;for(var h=new Array(a),d=0,f=0;f<o.length;f++){var u=o[f],l=u.Codewords,g=u.NumDataCodewords;Decoder.correctErrors(l,g);for(var s=0;g>s;s++)h[d++]=l[s]}var v=new x(h,r.VersionNumber,n.Bits);return v},qrcode={},qrcode.imagedata=null,qrcode.width=0,qrcode.height=0,qrcode.qrCodeSymbol=null,qrcode.debug=!1,qrcode.maxImgSize=1048576,qrcode.canvasElement=null,qrcode.sizeOfDataLengthInfo=[[10,9,8,8],[12,11,16,10],[14,13,16,12]],qrcode.callback=null,qrcode.setCanvasElement=function(e){qrcode.canvasElement=e},qrcode.decode=function(e,t){if(0==arguments.length){var r=qrcode.canvasElement,n=r.getContext("2d");return qrcode.width=r.width,qrcode.height=r.height,qrcode.imagedata=n.getImageData(0,0,qrcode.width,qrcode.height),qrcode.result=qrcode.process(n),null!=qrcode.callback&&qrcode.callback(qrcode.result),qrcode.result}var i=new Image;i.onload=function(){var e=document.createElement("canvas"),r=e.getContext("2d"),n=i.height,o=i.width;if(i.width*i.height>qrcode.maxImgSize){var a=i.width/i.height;n=Math.sqrt(qrcode.maxImgSize/a),o=a*n}e.width=o,e.height=n,r.drawImage(i,0,0,e.width,e.height),qrcode.width=e.width,qrcode.height=e.height;try{qrcode.imagedata=r.getImageData(0,0,e.width,e.height)}catch(s){return qrcode.result="Cross domain Error",null!=qrcode.callback&&qrcode.callback(qrcode.result),void 0}try{qrcode.result=qrcode.process(r),t(null,qrcode.result)}catch(s){qrcode.result="Error decoding QR Code from Image",t(new Error("Error decoding QR Code from Image"))}null!=qrcode.callback&&qrcode.callback(qrcode.result)},i.src=e},qrcode.isUrl=function(e){var t=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return t.test(e)},qrcode.decode_url=function(e){var t="";try{t=escape(e)}catch(r){t=e}var n="";try{n=decodeURIComponent(t)}catch(r){n=t}return n},qrcode.decode_utf8=function(e){return qrcode.isUrl(e)?qrcode.decode_url(e):e},qrcode.process=function(e){var t=((new Date).getTime(),qrcode.grayScaleToBitmap(qrcode.grayscale()));if(qrcode.debug){for(var r=0;r<qrcode.height;r++)for(var n=0;n<qrcode.width;n++){var i=4*n+r*qrcode.width*4;qrcode.imagedata.data[i]=t[n+r*qrcode.width]?0:0,qrcode.imagedata.data[i+1]=t[n+r*qrcode.width]?0:0,qrcode.imagedata.data[i+2]=t[n+r*qrcode.width]?255:0}e.putImageData(qrcode.imagedata,0,0)}var o=new a(t),s=o.detect();qrcode.debug&&e.putImageData(qrcode.imagedata,0,0);for(var h=Decoder.decode(s.bits),d=h.DataByte,w="",c=0;c<d.length;c++)for(var f=0;f<d[c].length;f++)w+=String.fromCharCode(d[c][f]);(new Date).getTime();return qrcode.decode_utf8(w)},qrcode.getPixel=function(e,t){if(qrcode.width<e)throw"point error";if(qrcode.height<t)throw"point error";return point=4*e+t*qrcode.width*4,p=(33*qrcode.imagedata.data[point]+34*qrcode.imagedata.data[point+1]+33*qrcode.imagedata.data[point+2])/100},qrcode.binarize=function(e){for(var t=new Array(qrcode.width*qrcode.height),r=0;r<qrcode.height;r++)for(var n=0;n<qrcode.width;n++){var i=qrcode.getPixel(n,r);t[n+r*qrcode.width]=e>=i?!0:!1}return t},qrcode.getMiddleBrightnessPerArea=function(e){for(var t=4,r=Math.floor(qrcode.width/t),n=Math.floor(qrcode.height/t),i=new Array(t),o=0;t>o;o++){i[o]=new Array(t);for(var a=0;t>a;a++)i[o][a]=new Array(0,0)}for(var s=0;t>s;s++)for(var h=0;t>h;h++){i[h][s][0]=255;for(var d=0;n>d;d++)for(var w=0;r>w;w++){var c=e[r*h+w+(n*s+d)*qrcode.width];c<i[h][s][0]&&(i[h][s][0]=c),c>i[h][s][1]&&(i[h][s][1]=c)}}for(var f=new Array(t),u=0;t>u;u++)f[u]=new Array(t);for(var s=0;t>s;s++)for(var h=0;t>h;h++)f[h][s]=Math.floor((i[h][s][0]+i[h][s][1])/2);return f},qrcode.grayScaleToBitmap=function(e){for(var t=qrcode.getMiddleBrightnessPerArea(e),r=t.length,n=Math.floor(qrcode.width/r),i=Math.floor(qrcode.height/r),o=new Array(qrcode.height*qrcode.width),a=0;r>a;a++)for(var s=0;r>s;s++)for(var h=0;i>h;h++)for(var d=0;n>d;d++)o[n*s+d+(i*a+h)*qrcode.width]=e[n*s+d+(i*a+h)*qrcode.width]<t[s][a]?!0:!1;return o},qrcode.grayscale=function(){for(var e=new Array(qrcode.width*qrcode.height),t=0;t<qrcode.height;t++)for(var r=0;r<qrcode.width;r++){var n=qrcode.getPixel(r,t);e[r+t*qrcode.width]=n}return e},Array.prototype.remove=function(e,t){var r=this.slice((t||e)+1||this.length);return this.length=0>e?this.length+e:e,this.push.apply(this,r)};var V=3,L=57,_=8,X=2;return qrcode.orderBestPatterns=function(e){function t(e,t){return xDiff=e.X-t.X,yDiff=e.Y-t.Y,Math.sqrt(xDiff*xDiff+yDiff*yDiff)}function r(e,t,r){var n=t.x,i=t.y;return(r.x-n)*(e.y-i)-(r.y-i)*(e.x-n)}var n,i,o,a=t(e[0],e[1]),s=t(e[1],e[2]),h=t(e[0],e[2]);if(s>=a&&s>=h?(i=e[0],n=e[1],o=e[2]):h>=s&&h>=a?(i=e[1],n=e[0],o=e[2]):(i=e[2],n=e[0],o=e[1]),r(n,i,o)<0){var d=n;n=o,o=d}e[0]=n,e[1]=i,e[2]=o},qrcode}),function(e,t){"function"==typeof define&&define.amd?define(["qrcode"],t):"object"==typeof exports?module.exports=t(require("../build/qrcode")):e.QCodeDecoder=t(qrcode)}(this,function(e){"use strict";function t(){return this instanceof t?(this.timerCapture=null,this.canvasElem=null,this.stream=null,this.videoConstraints={video:!0,audio:!1},void 0):new t}return t.prototype.isCanvasSupported=function(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))},t.prototype.hasGetUserMedia=function(){return navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia,!!navigator.getUserMedia},t.prototype._prepareCanvas=function(t){return this.canvasElem||(this.canvasElem=document.createElement("canvas"),this.canvasElem.style.width=t.videoWidth+"px",this.canvasElem.style.height=t.videoHeight+"px",this.canvasElem.width=t.videoWidth,this.canvasElem.height=t.videoHeight),e.setCanvasElement(this.canvasElem),this},t.prototype._captureToCanvas=function(t,r,n){if(this.timerCapture&&clearTimeout(this.timerCapture),t.videoWidth&&t.videoHeight){this.canvasElem||this._prepareCanvas(t);var i=this.canvasElem.getContext("2d");i.clearRect(0,0,t.videoWidth,t.videoHeight),i.drawImage(t,0,0,t.videoWidth,t.videoHeight);try{if(r(null,e.decode()),n)return}catch(o){"Couldn't find enough finder patterns"!==o&&r(new Error(o))}}this.timerCapture=setTimeout(function(){this._captureToCanvas.call(this,t,r,n)}.bind(this),500)},t.prototype.decodeFromCamera=function(e,t,r){var n=(this.stop(),this);return this.hasGetUserMedia()||t(new Error("Couldn't get video from camera")),navigator.getUserMedia(this.videoConstraints,function(i){e.src=window.URL.createObjectURL(i),n.videoElem=e,n.stream=i,n.videoDimensions=!1,setTimeout(function(){n._captureToCanvas.call(n,e,t,r)},500)},t),this},t.prototype.decodeFromVideo=function(e,t,r){return setTimeout(function(){this._captureToCanvas.call(this,e,t,r)}.bind(this),500),this},t.prototype.decodeFromImage=function(t,r){if(+t.nodeType>0&&!t.src)throw new Error("The ImageElement must contain a src");return t=t.src?t.src:t,e.decode(t,r),this},t.prototype.stop=function(){return this.stream&&(this.stream.getTracks().forEach(function(e){e.stop()}),this.stream=void 0),this.timerCapture&&(clearTimeout(this.timerCapture),this.timerCapture=void 0),this},t.prototype.setSourceId=function(e){return this.videoConstraints.video=e?{optional:[{sourceId:e}]}:!0,this},t.prototype.getVideoSources=function(e){var t=[];return MediaStreamTrack&&MediaStreamTrack.getSources?(MediaStreamTrack.getSources(function(r){r.forEach(function(e){"video"===e.kind&&t.push(e)}),e(null,t)}),this):e(new Error("Current browser doest not support MediaStreamTrack.getSources"))},t});
//# sourceMappingURL=qcode-decoder.min.js.map
/*
 APP.JS
 */
'use strict';

var app = {
  constants: {},
  settings: {},
  services: {},
  models: {}
};

window.onload = function () {
  // helper functions
  var constructInstances = function () {
    // make a new Inventory instance
    app.inventory = new app.models.Inventory();
    app.scanner = new app.models.Scanner();
    app.trigger('initInstances');
  };
  
  // start initialization
  riot.observable(app);
  app.services.utility.detectRTC();
  vex.defaultOptions.className = 'vex-theme-default';
  constructInstances();
  //app.inventory.trigger('loadItems');
  
  // mount all riot tags and start the router
  riot.mount('*');
  riot.route.start(true);
};
/*
 APP.JS END
 */

/*
 ROUTES.JS
 */
riot.route.stop(); //clear all route callbacks

app.currentPageTag = null;

app.goTo = function (pageName) {
  var nextPageTag = riot.vdom.find(function (tag) {
    return tag.root.localName === 'app-'+pageName;
  });
  
  if (app.currentPageTag) {
    app.currentPageTag.root.classList.remove('show');
    app.currentPageTag.trigger('hide');
  }
  
  app.currentPageTag = nextPageTag;
  
  app.currentPageTag.root.classList.add('show');
  app.currentPageTag.trigger('show');
};

riot.route(function () {
  // page is not defined. Redirecting
  riot.route('/inventory', 'Inventory');
});

riot.route('/', function () {
  // no page defined. Redirecting
  riot.route('/inventory', 'Inventory');
});

riot.route('/intro', function () {
  app.goTo('intro');
});

riot.route('/inventory', function () {
  app.goTo('inventory');
});

riot.route('/scanner', function () {
  app.goTo('scanner');
});
/*
 ROUTES.JS END
 */

/*
  ACTIONS SERVICE
 */
app.services.actions = {
  test: function () {
    app.stats.marbles += 1;
  }
};
/*
  CONSTANTS
 */
app.constants = {
  itemImageSmallPath: 'data/items/img/small/',
  virttruheCodePattern: /#[\da-fA-F]{8}\b/ //http://regexr.com/3ehu3
};
/*
  CONSTANTS END
 */
app.services.dialog = {
  newDialog: function (message, type, callback) {
    //validation
    type = type || '';
    if (!message || message === '') {
      throw new Error('please provide a message string. Got: '+ message);
    }
    if (typeof(type) !== 'string'){
      throw new Error('second argument "type" must be a string. Got: ' + typeof(type));
    }
    if (!callback) {
      callback = function () {};
    }

    switch (type) {
      case 'confirm':
        vex.dialog.confirm({
          message: message,
          callback: callback
        });
        break;
      case 'error':
        window.console.error(message);
        vex.dialog.alert({
          message: message,
          className: 'vex-theme-default error'
        });
        break;
      default:
        if (type) {
          window.console.info('No case for provided type: "', type, '". Using default');
        }
        vex.dialog.alert({
          message: message,
          callback: callback
        });
    }
  }
};

/*
  POLYFILLS
 */
if (
  !Array.prototype.find
) {
  Object.defineProperty(Array.prototype, "find", {
    value: function (predicate) {
      'use strict';
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;
      
      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    }
  });
}
/*
 POLYFILLS END
 */
/*
 SETTINGS MODEL
 */
app.models.Settings = function () {
  // Make instances observable
  riot.observable(this);
};
/*
 SETTINGS MODEL END
 */
app.services.utility = {
  isBB10: function () {
    var pos = 0;
    return window.navigator.userAgent.indexOf('BB10') >= pos;
  },
  detectRTC: function () {
    if (!this.isBB10()) {
      DetectRTC.load(function () {
        window.console.info('web-rtc detection finished loading');
      });
    } else {
      DetectRTC.hasWebcam = true;
    }
  },
  canVideoScan: function () {
    return DetectRTC.hasWebcam;
  }
}
;

app.services.items = {
  itemsData: [
    {
      'id':'pine_(closed)',
      'name':'Pine (closed)',
      'imageName':null,
      'description':'A Pine. They are often put into fires for their cracking sounds',
      'stackable':'false',
      'action':'combine',
      'type':'pine',
      'set':'garden'
    },
    {
      'id':'pine_(open)',
      'name':'Pine (open)',
      'imageName':null,
      'description':'It\'s cracked from the heat',
      'stackable':'false',
      'action':'take_seeds',
      'type':'pine',
      'set':'garden'
    },
    {
      'id':'pine_seed',
      'name':'Pine seed',
      'imageName':null,
      'description':'Can be planted',
      'stackable':'true',
      'action':'combine',
      'type':'seed',
      'set':'garden'
    },
    {
      'id':'pot',
      'name':'Flower pot',
      'imageName':null,
      'description':'Can grow something',
      'stackable':'false',
      'action':'combine',
      'type':'pot',
      'set':'garden'
    },
    {
      'id':'pot1',
      'name':'Pot with pineshine',
      'imageName':null,
      'description':'A light emitting flower',
      'stackable':'false',
      'action':null,
      'type':'pot',
      'set':'garden'
    },
    {
      'id':'flower01',
      'name':'Krokus',
      'imageName':null,
      'description':'...',
      'stackable':'true',
      'action':null,
      'type':'flower',
      'set':'garden'
    },
    {
      'id':'flower02',
      'name':'Tulpe',
      'imageName':null,
      'description':'...',
      'stackable':'true',
      'action':null,
      'type':'flower',
      'set':'garden'
    },
    {
      'id':'flower03',
      'name':'Rose',
      'imageName':null,
      'description':'...',
      'stackable':'true',
      'action':null,
      'type':'flower',
      'set':'garden'
    },
    {
      'id':'beer',
      'name':'Beer',
      'imageName':null,
      'description':'A bottle of cool beer',
      'stackable':'true',
      'action':'drink',
      'type':'alcohol',
      'set':'general'
    },
    {
      'id':'wine',
      'name':'Wine',
      'imageName':null,
      'description':'A bottle of cheap wine',
      'stackable':'true',
      'action':'drink',
      'type':'alcohol',
      'set':'general'
    },
    {
      'id':'knife',
      'name':'Knife',
      'imageName':null,
      'description':'Normal kitchen knife',
      'stackable':'false',
      'action':'cut',
      'type':'tools',
      'set':'general'
    },
    {
      'id':'intro',
      'name':'Introduction',
      'imageName':'memory_card.png',
      'description':'Short and long description about VIRTTRUHE',
      'stackable':'false',
      'action':'listen',
      'type':'message',
      'set':'general'
    },
    {
      'id':'24dtf_song1',
      'name':'Song: 24 days to fall - New Frontiers',
      'imageName':null,
      'description':'Song from the Album "A buggle wardshen"',
      'stackable':'false',
      'action':'listen',
      'type':'song',
      'set':'music'
    },
    {
      'id':'24dtf_album01',
      'name':'Album: A buggle wardshen',
      'imageName':null,
      'description':'Album from "24 days to fall"',
      'stackable':'false',
      'action':'show_songs',
      'type':'album',
      'set':'music'
    },
    {
      'id':'st_wheel',
      'name':'Steering Wheel',
      'imageName':null,
      'description':'Part of a car. It is used to steer the car',
      'stackable':'false',
      'action':'combine',
      'type':'element',
      'set':'museum'
    },
    {
      'id':'pedal',
      'name':'Gas pedal',
      'imageName':null,
      'description':'Part of a car. It is used to increase speed',
      'stackable':'false',
      'action':'combine',
      'type':'element',
      'set':'museum'
    },
    {
      'id':'frame',
      'name':'Car frame',
      'imageName':null,
      'description':'The skelleton of a car',
      'stackable':'false',
      'action':'combine',
      'type':'element',
      'set':'museum'
    },
    {
      'id':'car_parts1',
      'name':'Frame with steering wheel',
      'imageName':null,
      'description':'Combination of Frame and steering wheel',
      'stackable':'false',
      'action':'combine',
      'type':'element',
      'set':'museum'
    },
    {
      'id':'car_parts2',
      'name':'Frame with pedal',
      'imageName':null,
      'description':'Combination of Frame and gas pedal',
      'stackable':'false',
      'action':'combine',
      'type':'element',
      'set':'museum'
    },
    {
      'id':'car1',
      'name':'Mercedes 230 E',
      'imageName':null,
      'description':'The timeless Mercedes 230 E',
      'stackable':'false',
      'action':null,
      'type':'car',
      'set':'museum'
    },
    {
      'id':'note01',
      'name':'Crime Scene',
      'imageName':null,
      'description':'The body lies face down on the floor. Blood spilled everywhere...',
      'stackable':'false',
      'action':null,
      'type':'note',
      'set':'crime'
    },
    {
      'id':'note02',
      'name':'Clue "Hat"',
      'imageName':null,
      'description':'This hat looks like the one from the guy in the bar...',
      'stackable':'false',
      'action':null,
      'type':'note',
      'set':'crime'
    },
    {
      'id':'fingerp_scanner',
      'name':'Finger print scanner',
      'imageName':null,
      'description':'Search for finger prints on items',
      'stackable':'false',
      'action':'combine',
      'type':'tools',
      'set':'crime'
    },
    {
      'id':'pills',
      'name':'Sleeping Pills',
      'imageName':null,
      'description':'Super effective Sleeping pills. One is missing',
      'stackable':'false',
      'action':'filler',
      'type':'evidence',
      'set':'crime'
    },
    {
      'id':'fingerprint01',
      'name':'Wifes Finger print',
      'imageName':null,
      'description':'found on the package of sleeping pills. hmm... as far as I know she has no problem getting to sleep...',
      'stackable':'false',
      'action':null,
      'type':'evidence',
      'set':'crime'
    }
  ],
  getAllItems: function () {
    return this.itemsData;
  },
  getItem: function (itemId) {
    if (!itemId) {
      return null;
    }
    var item = this.itemsData.find(function (item) {
      return item.id === itemId;
    });
    if (!item) {
      window.console.error('no such item: ' + itemId);
      return null;
    }
    return item;
  },
  itemHasAction: function (itemId) {
    var item = this.getItem(itemId);
    return item && item.action;
  }
};


app.services.virttruhe = {
  currentLayer: '',
  map: {
    default: {
      '#00000000': 'pine_(closed)',
      '#00000001': 'pine_(open)',
      '#00000002': 'pine_seed',
      '#00000003': 'pot',
      '#00000004': 'pot1',
      '#00000005': 'flower01',
      '#00000006': 'flower02',
      '#00000007': 'flower03',
      '#00000008': 'beer',
      '#00000009': 'wine',
      '#0000000a': 'intro',
      '#0000000b': 'note01',
      '#0000000c': 'note02',
      '#0000000d': 'fingerp_scanner',
      '#0000000e': 'pills',
      '#0000000f': 'fingerprint01',
      '#a0000000': 'museum',
      '#a0000001': 'music'
    }
  },
  layerExists: function (layer) {
    if (!this.map[layer]) {
      var txt = 'invalid layer name: ' + layer;
      app.services.dialog.newDialog(txt, 'error');
      return false;
    }
    return true;
  },
  getCurrentLayer: function () {
    var currentLayer = this.currentLayer || 'default';
    window.console.info('current layer is ', currentLayer);
    return currentLayer;
  },
  setCurrentLayer: function (layer) {
    //validation
    if (!this.layerExists(layer)) {
      throw new Error('layer does not exist: '+layer);
    }
    
    this.currentLayer = layer;
    return this.currentLayer;
  },
  getLayerMap: function (layer) {
    //validation
    layer = layer || 'default';
    if (!this.layerExists(layer)) {
      return null;
    }
    
    return this.map[layer];
  },
  open: function (virttruheKey, layer) {
    //validation
    if (!layer || !this.layerExists(layer)) {
      window.console.info('Falling back to current layer');
      layer = this.getCurrentLayer();
    }
    var layerMap = this.getLayerMap(layer);
    if (!layerMap[virttruheKey]) {
      var txt = 'the virttruhe "'+virttruheKey+'" does not exist on layer "'+layer+'"';
      app.services.dialog.newDialog(txt, 'error');
      return null;
    }
    
    var itemId = layerMap[virttruheKey];
    return app.services.items.getItem(itemId);
  }
};

/*
 DEMO MODEL
 */
app.models.Demo = function () {
  // Make instances observable
  riot.observable(this);
  
  // private properties
  var greetingText = 'Servus';
  
  // private methods
  var greet = function (text) {
    //validation
    text = text || greetingText;
    if (typeof(text) !== 'string') {
      window.console.error('Expected string, instead got: '+typeof(text));
    }
    //console.log(text)
  };
  
  // public methods
  this.test = function () {
    window.console.log('this is a test. Have this app object:', app);
  };
  
  var init = function () {
    greet();
  };
  app.on('initInstances', init);
};
/*
 DEMO MODEL END
 */
/*
  INVENTORY MODEL
 */
app.models.Inventory = function () {
  // Make Inventory instances observable
  riot.observable(this);
  
  var itemsService = app.services.items;
  
  var data = {
    items: [],
    selected: null
  };
  
  // Private methods
  var use = function (itemId) {
    var item = itemsService.getItem(itemId);
    if (item && item.action) {
      //need to pass action name to the actions service
      item.action();
    }
  };
  
  var loadAllItems = function () {
    data.items = itemsService.getAllItems();
  };
  
  // public methods
  this.addItem = function (item) {
    //validation
    if (typeof(item) === 'string') {
      item = itemsService.getItem(item);
    }
    if (!item) {
      window.console.Error('No item passed. Please provide an item object to this function.');
      return;
    }
    
    data.items.push(item);
    this.trigger('change itemAdded', item.id);
    return data.items;
  };
  
  this.deleteItem = function (itemId) {
    data.items = data.items.filter(function (item) {
      return item.id !== itemId;
    });
    this.trigger('change itemDeleted', itemId);
    this.select(null);
    return data.items;
  };
  
  this.select = function (item) {
    if (!item) {
      data.selected = null;
    } else if (typeof(item) !== 'string') {
      throw new TypeError('expected "string". Instead got ' + typeof(item));
    } else {
      data.selected = item || null;
    }
    this.trigger('change');
    return data.selected;
  };
  
  this.getItems = function () {
    return data.items;
  };
  this.getSelected = function () {
    return data.selected;
  };
  this.getItemDescription = function (itemId) {
    var item = itemsService.getItem(itemId);
    if (!item) {
      return null;
    }
    return item.name + ':\n' + item.description;
  };
  
  
  var init = function () {
    // Listen to external events
    app.scanner.on('success', this.addItem);
  }.bind(this);
  
  // Listen to events
  this.on('loadItems', loadAllItems);
  this.on('use', use);
  app.on('initInstances', init);
  
};
/*
  INVENTORY MODEL END
 */
/*
  OPTIONS MODEL
 */
app.models.Options = function () {
  // Make instances observable
  riot.observable(this);
};
/*
  OPTIONS MODEL END
 */
/*
  SCANNER MODEL
 */
app.models.Scanner = function () {
  // Make Inventory instances observable
  riot.observable(this);
  
  // public methods
  this.scan = function (string) {
    //validation
    if (typeof(string) !== 'string') {
      var message = 'expected string, but got ' + typeof(string);
      return window.console.error(new TypeError(message));
    }
    
    var listOfMatchesInString;
    var virttruheKey;
    var item;
    
    //helper function
    var noSuccess = function () {
      this.trigger('noSuccess', virttruheKey);
      return null;
    }.bind(this);
    
    //logic
    listOfMatchesInString = string.match(app.constants.virttruheCodePattern);
    if (!listOfMatchesInString){
      return noSuccess();
    }
    virttruheKey = listOfMatchesInString[0];
    item = app.services.virttruhe.open(virttruheKey);
    if (!item) {
      return noSuccess();
    }
    
    this.trigger('success', item);
    return item;
  };
  
  
  var init = function () {
    
  };
  app.on('initInstances', init);
};
/*
  SCANNER MODEL END
 */
riot.tag2('vt-button-bar', '<div each="{buttons}" class="{button: true,           disabled: this.disabled}" onclick="{triggerAction}"> <div> <img if="{this.icon}" riot-src="{imagePathFor(this.icon)}" class="icon"> <label __disabled="{this.disabled}"> {this.label} </label> </div> </div>', '', '', function(opts) {
    var tag = this;

    var normalizeButtons = function () {
      var buttons = tag.opts.buttons;
      var buttonsAmount = buttons.length;
      var maxAmount = 5;
      if (buttonsAmount > maxAmount) {
        var message = 'too many buttons: '+buttonsAmount;
        window.console.error(message);
        buttons = buttons.slice(0,4);
      } else if (buttonsAmount < maxAmount) {
        var delta = maxAmount - buttonsAmount;
        while (delta > 0) {
          delta--;
          var placeholder = {
            label:     '',
            icon:      null,
            action:    null,
            disabled:  false
          };
          buttons.push(placeholder);
        }
      }
      return buttons;
    };

    tag.buttons = normalizeButtons();

    tag.imagePathFor = function (imageName) {
        return 'data/img/'+imageName+'.svg';
    };
    tag.triggerAction = function (event) {
      if (event.item.disabled) {
        event.stopPropagation();
        return;
      }
      tag.parent.trigger(event.item.action);
    };
});


riot.tag2('app-info-bar', '<header> <span name="infoText"> current layer: {getLayer()} </span> <span class="marbles"> <img src="data/img/marble-icon.png"> {this.marbles} </span> </header>', '', '', function(opts) {
      var tag = this;

      tag.marbles = tag.opts.marbles;

      tag.getLayer = app.services.virttruhe.getCurrentLayer;

      tag.updateLabel = function (){
        tag.marbles = tag.inputMarbles.value;
        tag.inputMarbles.value = "";
      };
});
riot.tag2('app-demo', '<div if="{demoMethod()}"> <input type="button" onclick="{clickFn}"> <span each="{demoProp2.length}" class="{focus: true,                   item: demoMethod(this)}"> {demoProp2} </span> </div>', '', '', function(opts) {
    var tag = this;

    var demoProp1;

    tag.demoProp2 = 'You are a nice person.';

    var showFn = function () {
      demoProp1 = true;
    };

    var hideFn = function () {
      demoProp1 = false;
    };

    tag.demoMethod = function (argument) {
      return demoProp1;
    };

    tag.clickFn = function (event) {

    };

    tag.on('show', showFn);
    tag.on('hide', hideFn);

    app.demo.on('event', demo);
});
riot.tag2('vt-template', '', '', '', function(opts) {
    var tag = this;

    var showFn = function () {

    };

    var hideFn = function () {

    };

    tag.on('show', showFn);
    tag.on('hide', hideFn);

});
riot.tag2('app-intro', '<div> scan the start card </div> <vt-button-bar buttons="{buttonList}"> </vt-button-bar>', '', '', function(opts) {
    var tag = this;

    tag.buttonList = [
      {
        label: 'scan',
        icon: 'qr-code',
        action: 'scan',
        disabled: false
      }
    ];

    var showFn = function () {

    };

    var hideFn = function () {

    };

    tag.on('show', showFn);
    tag.on('hide', hideFn);

});
riot.tag2('app-inventory', '<div if="{!hasItems()}" class="cover"> <h2> Your inventory is empty. </h2> <p> Use the scanner on VIRTTRUHE artefacts to find items. </p> <button onclick="{scan}" class="center-block"> <i class="icon scan"></i> </button> <p> <a href="data/img/cards_1_-_9.png" download>Get example VIRTTRUHE qr-codes here.</a> </p> </div> <ul class="items"> <li each="{items()}" class="{selected:isSelected(this)}" onclick="{select}"> <img riot-src="{getItemImageSrc(this)}"> </li> </ul> <vt-button-bar class="context-actions" buttons="{data.buttonList}"> </vt-button-bar>', '', '', function(opts) {
    var tag = this;

    var itemsService = app.services.items;
    var dialogService = app.services.dialog;
    var inventory = app.inventory;

    var update = function () {
      tag.update();
      tag.updateButtonStates();
    };

    tag.items = inventory.getItems;

    tag.hasItems = function () {
      return tag.items().length > 0;
    };

    tag.data = {
      buttonList: [
      {
        label: 'scan',
        icon: 'qr-code',
        action: 'scan',
        disabled: null
      },
      {
        label: 'info',
        icon: 'info',
        action: 'info',
        disabled: null
      },
      {
        label: 'use',
        icon: 'use',
        action: 'use',
        disabled: null
      },
      {
        label: 'share',
        icon: 'share',
        action: 'share',
        disabled: null
      },
      {
        label: 'delete',
        icon: 'delete',
        action: 'remove',
        disabled: null
      }
    ]
    };

    tag.getItemImageSrc = function (item) {
      var itemName;
      if (item.imageName && typeof(item.imageName) === 'string') {
        itemName = item.imageName;
      } else if (item.id && typeof(item.id) === 'string') {
        itemName = item.id + '.jpg';
      } else {
        throw new Error('Exception for itemName')
      }
      return app.constants.itemImageSmallPath + itemName;
    };

    tag.isSelected = function (item) {
      return item.id === inventory.getSelected();
    };

    tag.select = function (event) {
      var item = event.item;
      if (item.id === inventory.getSelected()) {
        return tag.resetSelection();
      }
      inventory.select(item.id);
    };

    tag.resetSelection = function () {
      inventory.select(null);
    };

    tag.updateButtonStates = function () {
      var selected = inventory.getSelected();
      tag.data.buttonList.forEach(function(button){
        switch (button.label) {
          case 'scan':
            button.disabled = false;
            break;
          case 'use':
            button.disabled = !itemsService.itemHasAction(selected);
            break;
          default:
            button.disabled = !selected;
        }
      })
    };

    tag.info = function (itemId) {
      var message = inventory.getItemDescription(itemId);
      dialogService.newDialog(message);
    };

    tag.use = function (itemId) {
      var item = itemsService.getItem(itemId);
      var message = '(Preview) Use ' + item.name + '?\n' + item.action;
      var callback = function (choice) {
        if (choice) {
          inventory.trigger('use', itemId);
        }
      };
      dialogService.newDialog(message, 'confirm', callback);
    };

    tag.share = function (itemId) {
        var message = '(preview) show QR Code for this item.';
        dialogService.newDialog(message);
    };

    tag.remove = function (itemId) {
      var item = itemsService.getItem(itemId);
      var message = 'Deleted "'+item.name+'" from the inventory. Undo?';
      var reAddItem = function (choice) {
        if (choice) {
          inventory.addItem(itemId);
        }
      };
      inventory.deleteItem(itemId);
      dialogService.newDialog(message, 'confirm', reAddItem)
    };

    tag.scan = function () {
      riot.route('scanner')
    };

    tag.on('show', update);
    tag.on('scan', tag.scan);
    tag.on('info use share remove', function(type){
      tag[type](inventory.getSelected());
    });

    inventory.on('change', update);

    tag.updateButtonStates();

});

riot.tag2('app-scanner', '<div if="{showVideoScanner}"> <video id="cameraOutput" autoplay> </video> <span if="{canVideoScan()}" style=" min-width: 1rem; height: 1rem; font-size: 7pt; padding: 0 0.2rem; background-color: green; border: 0 transparent; border-radius: 1rem; "> has webcam </span> <hr> </div> <div if={showImageScanner}"> <input type="file" accept="image"> <img src="./-data/img/10000000 - visit virttruhe.tumblr.com.png" id="img"> <hr> </div> <div if="{showTextScanner}"> <input title="scanText" type="text" placeholder="#0000FFFF" class="{invalid:isInvalid}" oninput="{scanInput}"> <hr> </div> <vt-button-bar class="context-actions" buttons="{data.buttonList}"> </vt-button-bar>', '', '', function(opts) {
    var tag = this;

    var Scanner = app.scanner;
    var Dialog = app.services.dialog;
    var qr = new QCodeDecoder();

    tag.showTextScanner = true;
    tag.showImageScanner = true;
    tag.showVideoScanner = true;

    tag.isInvalid = true;
    tag.data = {
      isScanning: null,
      buttonList: [
        {
          label: 'stop',
          icon: 'cancel',
          action: 'toInventory',
          disabled: false
        }
      ]
    };

    var normalizeInput = function (something) {
      if (typeof(something) === 'string') {
        return something;
      } else if (something.constructor === Event) {
        return something.srcElement.value;
      } else {
        throw new Error('Exception: Cannot normalize this: ' + something)
      }
    };

    var presentItem = function(item) {
      callback = function (choice) {
        console.log(choice, item.name);
        riot.route('inventory');
      };
      Dialog.newDialog('You have found: ' + item.name, '', callback);
    };

    var presentNoSuccess = function () {

    };

    var handleVideoError = function (e) {
      window.console.error(e);
    };

    tag.canVideoScan = function () {
      return app.services.utility.canVideoScan();
    };

    tag.reset = function () {
      var inputElement = this.root.querySelector("[title='scanText']");
      inputElement.value = '';
      tag.isInvalid = true;
    };

    tag.scanInput = function (input) {
      var text = normalizeInput(input);
      var result = Scanner.scan(text);
      if (result) {
        tag.isInvalid = false;
      }
    };

    tag.scanVideo = function (video) {
      qr.decodeFromCamera(video, function (error, text) {
        if (error) {
          handleVideoError(error);
          return
        }

        tag.stopScan();
        tag.scanInput(text);
      }, true);
    };

    tag.startScan = function () {
      if (!tag.showVideoScanner) {
        return;
      }
      if (!tag.canVideoScan()) {
        var message = 'this device cannot use the video scanner';
        Dialog.newDialog(message, 'error');
        return;
      }
      console.log('starting scan');
      tag.data.isScanning = true;
      tag.update();
      tag.scanVideo(tag.cameraOutput);
    };

    tag.stopScan = function () {
      if (!tag.data.isScanning){
        return;
      }
      console.log('stopping scan');
      tag.data.isScanning = false;
      qr.stop();
      tag.cameraOutput.pause();
      tag.cameraOutput.src = null;
    };

    tag.goToInventory = function () {
      riot.route('inventory')
    };

    tag.on('show', function() {
      tag.reset();
      tag.startScan();
    });
    tag.on('hide', tag.stopScan);
    tag.on('toInventory', tag.goToInventory);

    Scanner.on('success', presentItem);
    Scanner.on('noSucces', presentNoSuccess);
});