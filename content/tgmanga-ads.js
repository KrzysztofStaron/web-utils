const AD_SELECTOR =
  ".mgbox:has(.mgline), .mgbox:has(a[href*='adskeeper.co.uk'])";

function removeAd(node) {
  if (!(node instanceof Element)) return;
  if (node.matches(AD_SELECTOR)) {
    node.remove();
    return;
  }
  node.querySelectorAll(AD_SELECTOR).forEach((element) => element.remove());
}

function watch(root) {
  removeAd(root);
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) removeAd(node);
    }
  });
  observer.observe(root, { childList: true, subtree: true });
}

if (document.documentElement) watch(document.documentElement);
else document.addEventListener("DOMContentLoaded", () => watch(document.documentElement), { once: true });
