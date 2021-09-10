## Who is this for?

People browsing the web over Tor but not with the Tor Browser

## What does this do?

### Less technical explanation

Cloudflare lets Tor Browser users in CAPTCHA-free while requiring a CAPTCHA for all other Tor connections. This extension emulates some of the Tor Browser's behavior (you won't notice this) to trick Cloudflare into thinking you use the Tor Browser.

__Note: It seems that newer versions of Firefox don't need this add-on anymore to pass CAPTCHA-free on websites behind Cloudflare. It is recommended to uninstall this extension and, unless edge cases are found, the extension will be removed from the store. If you still have a use-case for it, open an issue or download it from [the GitHub repository](https://github.com/t0astbread/onionflare).__

### Technical explanation

Cloudflare uses the "alt-svc" HTTP header to transparently redirect Tor users to its own hidden service (which it calls "Cloudflare Onion Services"). If accessed over this service, users are not required to complete a CAPTCHA to see a Cloudflare-protected website.

Unfortunately, Cloudflare only sends the alt-svc header if it thinks the request comes from the Tor Browser, even though other browsers are also capable of using Tor via a proxy. This extension adjusts Firefox's request behavior (in particular the headers) to look more like the Tor Browser, so that Cloudflare sends the alt-svc header and no one has to bother with CAPTCHAs anymore.

__Note that this extension can't prevent all CAPTCHAs. Website administrators can choose to disable the Cloudflare mechanism that enables this. You would also see a CAPTCHA over the Tor Browser in that case.__

## Links
  - __AMO:__ https://addons.mozilla.org/en-US/firefox/addon/onionflare
  - __GitHub:__ https://github.com/T0astBread/onionflare

## Attribution

The icon is made of several photos created by other people:

  - ["Bulb"](https://pixabay.com/photos/bulb-closeup-close-up-clove-color-1238338/) by [Shutterbug75](https://pixabay.com/users/Shutterbug75-2077322/)
  - ["Flare"](https://unsplash.com/photos/f5J-wk9EoUA) by [Jonathan Duran](https://unsplash.com/@jonathandu)
  - ["Onion"](https://pixabay.com/photos/onion-garlic-tomato-vegetables-5187140/) by [jmexclusives](https://pixabay.com/users/jmexclusives-10518280/)
