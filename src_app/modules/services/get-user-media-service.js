/*
 GET-USER-MEDIA-SERVICE.JS
 */
function initGetUserMediaService(){
  navigator.getUserMedia = navigator.getUserMedia || 
    navigator.webkitGetUserMedia || 
    navigator.mozGetUserMedia || //omit? 
    navigator.msGetUserMedia || 
    navigator.oGetUserMedia; //omit?
}
initGetUserMediaService();

/*
 END GET-USER-MEDIA-SERVICE.JS
 */

