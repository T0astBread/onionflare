const isHeader = (...keys) => ({ name }) => keys.includes(name.toLowerCase())

browser.webRequest.onBeforeSendHeaders.addListener(
	({ requestHeaders }) => {
		let uaHeader = requestHeaders.find(isHeader("user-agent"))
		if(uaHeader != null) {
			uaHeader = {
				name: "User-Agent",
				value: uaHeader.value.includes("Android")
					? "Mozilla/5.0 (Android 10; Mobile; rv:91.0) Gecko/91.0 Firefox/91.0"
					: "Mozilla/5.0 (Windows NT 10.0; rv:78.0) Gecko/20100101 Firefox/78.0",
			}
		}

		return {
			requestHeaders: [
				...requestHeaders.filter(header => !isHeader("user-agent")(header)),
				uaHeader,
			]
		}
	},
	{ urls: ["<all_urls>"] },
	["blocking", "requestHeaders"],
)
