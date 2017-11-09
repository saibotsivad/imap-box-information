const test = require('tape')
const open = require('./index.js')

test('when there is an error opening the box', t => {
	const imap = {
		openBox(name, readOnly, callable) {
			t.equal(name, 'INBOX', 'name of box is passed in')
			t.equal(readOnly, true, 'default is read-only')
			callable('something went wrong')
		}
	}
	open({ imap, box: 'INBOX' })
		.catch(error => {
			t.equal(error, 'something went wrong', 'the error is whatever came from the imap module')
			t.end()
		})
})

test('when the box is opened', t => {
	const imap = {
		openBox(name, readOnly, callable) {
			t.equal(name, 'INBOX', 'name of box is passed in')
			t.equal(readOnly, true, 'default is read-only')
			callable(false, 'box info')
		}
	}
	open({ imap, box: 'INBOX' })
		.then(details => {
			t.equal(details, 'box info', 'the info is whatever came from the imap module')
			t.end()
		})
})

test('you can set the read-only status', t => {
	const imap = {
		openBox(name, readOnly, callable) {
			t.equal(name, 'INBOX', 'name of box is passed in')
			t.equal(readOnly, false, 'read-only is overridden')
			t.end()
		}
	}
	open({ imap, box: 'INBOX', openAsReadOnly: false })
})
