## Less technical explanation

Cloudflare lets Tor Browser users in CAPTCHA-free while requiring a CAPTCHA for all other Tor connections. This extension emulates some of the Tor Browser's behavior (you won't notice this) to trick Cloudflare into thinking you use the Tor browser.

## Technical explanation

Cloudflare uses the "alt-svc" HTTP header to transparently redirect Tor users to its own hidden service (which it calls "Cloudflare Onion Services"). If accessed over this service, users are not required to complete a CAPTCHA to see a Cloudflare-protected website.

Unfortunately, Cloudflare only sends the alt-svc header if it thinks the request comes from the Tor Browser, even though other browsers are also capable of using Tor via a proxy. This extension adjusts Firefox's request behavior (in particular the headers) to look more like the Tor Browser, so that Cloudflare sends the alt-svc header and no one has to bother with CAPTCHAs anymore.

__Note that this extension can't prevent all CAPTCHAs. Website administrators can choose to disable the Cloudflare mechanism that enables this. You would also see a CAPTCHA over the Tor Browser in that case.__

## Links
  - __AMO:__ https://addons.mozilla.org/en-US/firefox/addon/onionflare
  - __GitHub:__ https://github.com/T0astBread/onionflare
