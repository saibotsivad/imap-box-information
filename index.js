module.exports = function imapOpenBox({ imap, box, openAsReadOnly = true }) {
	return new Promise((resolve, reject) => {
		imap.openBox(box, openAsReadOnly, (error, details) => {
			if (error) {
				reject(error)
			} else {
				resolve(details)
			}
		})
	})
}
