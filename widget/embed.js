// TV-CHECKPROGRAMM Embed Script
// Usage: <div id="tvcheck-widget" data-channel="1" data-theme="dark"></div>
// <script src="widget/embed.js"></script>
(function() {
  var el = document.getElementById('tvcheck-widget');
  if (!el) return;
  var ch = el.getAttribute('data-channel') || '1';
  var theme = el.getAttribute('data-theme') || 'dark';
  var limit = el.getAttribute('data-limit') || '8';
  var iframe = document.createElement('iframe');
  iframe.src = 'https://tv-checkprogramm.ru/widget/widget.html?channel=' + ch + '&theme=' + theme + '&limit=' + limit;
  iframe.style.cssText = 'width:100%;height:520px;border:none;border-radius:12px;display:block';
  iframe.title = 'TV-CHECKPROGRAMM Widget';
  iframe.loading = 'lazy';
  el.appendChild(iframe);
})();
