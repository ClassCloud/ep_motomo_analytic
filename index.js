var eejs = require('ep_etherpad-lite/node/eejs/');
var settings = require('ep_etherpad-lite/node/utils/Settings');

if (settings.ep_google_analytics){ 
  var gaCode = settings.ep_google_analytics.gaCode;
}else{
  var gaCode = false;
}

exports.eejsBlock_scripts = function (hookName, context, cb) {
  if (gaCode) {
    var gaString = `
      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=${gaCode}"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${gaCode}');
      </script>
  `
    context.content = gaString + context.content;
  } else {
    console.log("Google Analytics code not set.")
  }
  
  return cb();
}