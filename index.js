var eejs = require('ep_etherpad-lite/node/eejs/');
var settings = require('ep_etherpad-lite/node/utils/Settings');

if (settings.ep_matomo_analytics){ 
  var idCode = settings.ep_matomo_analytics.idCode;
}else{
  var idCode = false;
}

exports.eejsBlock_scripts = function (hookName, context, cb) {
  if (idCode) {
    var gaString = `
    <!-- Matomo -->
<script>
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="https://analytics.tangibility.ca/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '{idCode}']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Matomo Code -->
  `
    context.content = gaString + context.content;
  } else {
    console.log("MAtomo Analytics code not set.")
  }
  
  return cb();
}
