// Cloudflare tries to detect if we're on the Tor Browser before it
// sends us the right .onion alt-svc.

// IDK what the heuristics are for that detection but it seems to get
// really pissy when our Accept header isn't right. So we just
// override this here.

// This is the same Accept header that the Tor Browser would send.

// On Chrome you also have to change the UA string to be a Firefox
// UA string but that would take some work keeping it up-to-date here.
// (And it might be bad for fingerprinting for a Chromium browser to
// have a Firefox UA string.)


const isAcceptHeader = ({ name }) => name.toLowerCase() === "accept"

browser.webRequest.onBeforeSendHeaders.addListener(
	({ requestHeaders }) => {
		const acceptHeader = requestHeaders.find(isAcceptHeader)
		const patchAcceptHeader =
			acceptHeader != null &&
			acceptHeader.value.includes("text/html,") &&
			acceptHeader.value.includes("image/webp,")

		if(acceptHeader != null)
			console.log(patchAcceptHeader, "\t", acceptHeader.value)
		
		if(patchAcceptHeader) {
			const patchedAcceptHeader = {
				name: "Accept",
				value: acceptHeader.value.replace("image/webp,", ""),
			}
			console.log("\t", patchedAcceptHeader.value)

			return {
				requestHeaders: [
					...requestHeaders.filter(header => !isAcceptHeader(header)),
					patchedAcceptHeader,
				]
			}
		}
	},
	{ urls: ["<all_urls>"] },
	["blocking", "requestHeaders"],
)
