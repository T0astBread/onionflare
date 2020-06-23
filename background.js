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


const isHeader = (...keys) => ({ name }) => keys.includes(name.toLowerCase())

browser.webRequest.onBeforeSendHeaders.addListener(
	({ requestHeaders }) => {
		let acceptHeader = requestHeaders.find(isHeader("accept"))
		if(acceptHeader != null) {
			const patchAcceptHeader =
				acceptHeader.value.includes("text/html,") &&
				acceptHeader.value.includes("image/webp,")

			console.log(patchAcceptHeader, "\t", acceptHeader.value)

			if(patchAcceptHeader) {
				const patchedAcceptHeader = {
					name: "Accept",
					value: acceptHeader.value.replace("image/webp,", ""),
				}
				console.log("\t", patchedAcceptHeader.value)
				acceptHeader = patchedAcceptHeader
			}
		}

		let uaHeader = requestHeaders.find(isHeader("user-agent"))
		if(uaHeader != null) {
			if(uaHeader.value.includes("Android")) {
				const patchedUAHeader = {
					name: "User-Agent",
					value: "Mozilla/5.0 (Android 6.0; Mobile; rv:68.0) Gecko/20100101 Firefox/68.0",
				}
				console.log("Patched UA header")
				uaHeader = patchedUAHeader
			}
		}

		return {
			requestHeaders: [
				...requestHeaders.filter(header => !isHeader("accept", "user-agent")(header)),
				acceptHeader,
				uaHeader,
			]
		}
	},
	{ urls: ["<all_urls>"] },
	["blocking", "requestHeaders"],
)
