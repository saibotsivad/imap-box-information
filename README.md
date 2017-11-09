# imap-open-box

Return a promise that resolves when the IMAP account box has opened.

This module takes an instance of the
[imap](https://github.com/mscdex/node-imap) module, and
returns a promise which resolves when the box (folder)
information is retrieved, or rejects if an error occurs.

## general use

```js
const Imap = require('imap')
const openBox = require('imap-open-box')

const imap = new Imap({
	user: 'me@gmail.com',
	password: 'abc123',
	host: 'imap.gmail.com',
	port: 993,
	tls: true
})

imap.once('ready', () => {
	openBox({ imap, box: 'INBOX' })
		.then(details => {
			// information about the box
		})
})

imap.on('error', error => {
	console.log(error)
})

imap.once('end', () => {
	console.log('connection ended!')
})

imap.connect()
```

## `openBox(Object) => Promise`

The module takes an object with the following properties:

### `imap`

The instance of `imap` provided must be instantiated and
have already emitted the `ready` event.

### `box` *(string)*

The name of the box to open, e.g. `INBOX` or `INBOX.archive`.

### `openAsReadOnly` *(boolean, default `true`)*

Whether to open the box as read-only or not.

## `Promise`

* The promise resolves with an object of the box information.
* The promise rejects with an error as given by the 
	[imap](https://www.npmjs.com/package/imap) module.

## license

Published and released under the [VOL](http://veryopenlicense.com).

