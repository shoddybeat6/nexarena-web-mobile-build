/* NexArena view switcher: toggles between the desktop (/website/) and mobile (/mobile/) versions,
   keeping the same page and query string, and remembers the choice for the site root. */
(function () {
    var path = location.pathname;
    var isMobile = /^\/mobile(\/|$)/.test(path);
    var current = isMobile ? 'mobile' : 'website';
    var target = isMobile ? 'website' : 'mobile';

    // Same page in the other version (e.g. /website/fees.html -> /mobile/fees.html)
    var page = path.replace(/^\/(website|mobile)\/?/, '') || 'index.html';
    var href = '/' + target + '/' + page + location.search;

    try { localStorage.setItem('nexarena-view', current); } catch (e) {}

    var css = document.createElement('style');
    css.textContent =
        '.nx-switch{position:fixed;right:18px;bottom:' + (isMobile ? '84px' : '20px') + ';z-index:9999;' +
        'display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;' +
        'background:linear-gradient(90deg,#00E5FF,#B026FF);color:#0B0E1A;font:800 13px/1 Arial,Helvetica,sans-serif;' +
        'text-decoration:none;box-shadow:0 6px 24px #0008,0 0 18px #B026FF55;transition:transform .15s ease,box-shadow .15s ease}' +
        '.nx-switch:hover,.nx-switch:focus-visible{transform:translateY(-2px);box-shadow:0 10px 28px #000a,0 0 24px #00E5FF77;outline:none}' +
        '.nx-switch svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}';
    document.head.appendChild(css);

    var desktopIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>';
    var mobileIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>';

    var a = document.createElement('a');
    a.className = 'nx-switch';
    a.href = href;
    a.innerHTML = (isMobile ? desktopIcon : mobileIcon) + '<span>' + (isMobile ? 'Desktop view' : 'Mobile view') + '</span>';
    a.setAttribute('aria-label', 'Switch to ' + (isMobile ? 'desktop' : 'mobile') + ' version of this page');
    a.addEventListener('click', function () {
        try { localStorage.setItem('nexarena-view', target); } catch (e) {}
    });
    document.body.appendChild(a);
})();
