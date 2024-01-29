import dayjs from 'dayjs'

export function dateFormat(date) {
	return dayjs(date / 1).format('MMM DD, YYYY')
}

export function pluralize(name, count) {
	if (count === 1) {
		return name
	}
	return name + 's'
}

export function idbPromise(storeName, method, object) {
	return new Promise((resolve) => {
		const request = window.indexedDB.open('shop-shop', 1)
		let db, tx, store
		request.onupgradeneeded = function () {
			const db = request.result
			db.createObjectStore('products', { keyPath: '_id' })
			db.createObjectStore('categories', { keyPath: '_id' })
			db.createObjectStore('cart', { keyPath: '_id' })
		}

		request.onerror = function () {
			console.log('There was an error')
		}

		request.onsuccess = function () {
			db = request.result
			tx = db.transaction(storeName, 'readwrite')
			store = tx.objectStore(storeName)

			db.onerror = function (e) {
				console.log('error', e)
			}

			switch (method) {
				case 'put':
					store.put(object)
					resolve(object)
					break
				case 'get':
					// eslint-disable-next-line no-case-declarations
					const all = store.getAll()
					all.onsuccess = function () {
						resolve(all.result)
					}
					break
				case 'delete':
					store.delete(object._id)
					break
				default:
					console.log('No valid method')
					break
			}

			tx.oncomplete = function () {
				db.close()
			}
		}
	})
}
