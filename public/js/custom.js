$( document ).ready(function() {
  window.initMap =function() {
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

  $(document).on('click', '#plus', function(e){
    e.preventDefault();
    var TotalPrice = parseFloat($('#TotalPrice').val());
    var quantity = parseInt($('#quantity').val());

    TotalPrice += parseFloat($('#UnitaryPrice').val());
    quantity ++;

    $('#quantity').val(quantity);
    $('#TotalPrice').val(TotalPrice.toFixed(2));
    $('#total').html(quantity);
  });

  $(document).on('click', '#minus', function(e){
    e.preventDefault();
    var TotalPrice = parseFloat($('#TotalPrice').val());
    var quantity = parseInt($('#quantity').val());

    if (quantity == 1) {
      TotalPrice = parseFloat($('#TotalPrice').val());
      quantity = 1;
    }else{
      TotalPrice -= parseFloat($('#UnitaryPrice').val());
      quantity -= 1;
    }

    $('#quantity').val(quantity);
    $('#TotalPrice').val(TotalPrice.toFixed(2));
    $('#total').html(quantity);
  });

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.8&appId=122795888178850";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  var client = algoliasearch('MEZ3TXMHN8', '89b9a2a470865ef255679c64161dcb34')
    var index = client.initIndex('Trich_Products');
    autocomplete('#search-input', { hint: false }, [
      {
        source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
        displayKey: 'name', 
        templates: {
          suggestion: function(suggestion) { 
            return suggestion._highlightResult.name.value;
          }
        }
      }
    ]).on('autocomplete:selected', function(event, suggestion, dataset) {
      window.location.href = '/product/'+suggestion._id.$oid;
    });
  var client = algoliasearch('MEZ3TXMHN8', '89b9a2a470865ef255679c64161dcb34')
    var index = client.initIndex('Trich_Products');
    autocomplete('#search2-input', { hint: false }, [
      {
        source: autocomplete.sources.hits(index, { hitsPerPage: 5 }),
        displayKey: 'name',
        templates: {
          suggestion: function(suggestion) {
            return suggestion._highlightResult.name.value;
          }
        }
      }
    ]).on('autocomplete:selected', function(event, suggestion, dataset) {
      window.location.href = '/product/'+suggestion._id.$oid;
    });
});