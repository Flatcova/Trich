function initMap() {
        var point = {lat: 25.725257, lng: -100.313633};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: point
        });
        var marker = new google.maps.Marker({
          position: point,
          map: map
        });
      };

window.fbAsyncInit = function() {
    FB.init({
      appId      : '122795888178850',
      xfbml      : true,
      version    : 'v2.7'
    });
  };

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.8&appId=122795888178850";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));