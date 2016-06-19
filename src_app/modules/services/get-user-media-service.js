/*
 GET-USER-MEDIA-SERVICE.JS
 */

(function() {
  if(!navigator.webkitGetUserMedia && !navigator.msGetUserMedia){
    //expect firefox
    //navigator.getUserMedia = navigator.mediaDevices.getUserMedia;
  }
})();

/*
 END GET-USER-MEDIA-SERVICE.JS
 */

