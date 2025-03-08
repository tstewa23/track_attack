
export class Info {

	constructor() {
		this.entries = []
		this.genres = new Map()
		this.values = ['lstB', 'lstM', 'numB', 'numM', 'durB', 'durM', 'favB', 'favM', 'favCB', 'favCM', 'favLB', 'favLM', 'favLCB', 'favLCM']
	}

	stringToArray(l) {
		let arrayOfStrings = []
		arrayOfStrings = l.split(':')
		arrayOfStrings.pop()

		let array = []
		arrayOfStrings.forEach(element => {
			array.push(element.split(','))
		})

		return array
	}

	getLS(value) {                                  /////with old prefix
		return localStorage.getItem(`old${value}`)
	}

	setLS(value, data) {                            /////with old prefix
		localStorage.setItem(`old${value}`, data)
	}

	basicCalc(type, intial, operation) {

		let thing = intial

		this.entries.forEach((entry) => {
			if (entry[0] == type) {
				thing = operation(thing, entry)       ///// add entry argument
			}
		})

		return thing

	}

	countType(type) {
		const operation = (thing) => {
			return ++thing
		}
		return this.basicCalc(type, 0, operation)
	}

	listOfType(type) {
		const operation = (thing, entry) => {
			let fEntry = entry.slice(1)
			thing += `${fEntry.toString()}:`
			return thing
		}
		return this.basicCalc(type, '', operation)
	}

	getArray(letter) {
		if (letter === 'BM') {
			let bArray = this.getArray('B')
			if (bArray === false) { return false }
			else { return bArray.concat(this.getArray('M')) }
		} else {
			let arrayString = localStorage.getItem(`oldlst${letter}`)
			if (arrayString === null) { return false }
			else { return this.stringToArray(arrayString) }
		}
	}

	duration(type) {

		const operation = (thing, entry) => {
			return thing += Number(entry[2])
		}

		return this.basicCalc(type, 0, operation)

	}

	favorite(type, creator, flag) {

		let index = 1
		if (creator) { index = 3 }

		let initial = ['blank', 0]
		if (flag === '-') { initial = ['blank', 110] }

		const operation = (thing, entry) => {

			let rank = entry[5]
			let name = entry[index]
			let bool = null

			if (flag === '+') { bool = rank > thing[1] }
			if (flag === '-') { bool = rank < thing[1] }

			if (bool) {
				thing[0] = name
				thing[1] = rank
			}

			return thing
		}

		return this.basicCalc(type, initial, operation)
	}

	updateGenres() {

		let array = this.getArray('BM')

		if (array === false) {
			return new Map().set('genres', 0)
		}

		array.forEach((list) => {
			let oldCount = 0;
			if (this.genres.get(list[3]) !== undefined) {
				oldCount = this.genres.get(list[3])
			}
			this.genres.set(list[3], ++oldCount)
		})

		return this.genres
	}

	// genresToString() {
	// 	let str = ''

	// 	this.genres.forEach((value, key, map) => {
	// 		console.log(`value= ${value} + key= ${key}`)
	// 	})

	// 	return str
	// }

	update(val, type, recieved, flag) {

		let fourth = val[3]

		let initial = null
		if (flag === 'lst') { initial = '' }
		else if (flag === 'num' || flag === 'dur') { initial = 0 }
		else if (flag === 'fav') {
			if (fourth === 'L') {
				initial = ['blank', 110]
			} else {
				initial = ['blank', 0]
			}
		}

		if (this.getLS(val) === null) {
			this.setLS(val, initial)
		}

		let old = this.getLS(val)
		if (flag === 'lst') { old = old }
		else if (flag === 'num' || flag === 'dur') { old = Number(old) }
		else if (flag === 'fav') {
			old = old.split(',')
		}

		let operation = null
		if (flag === 'lst') { operation = (recieved, old) => { return recieved + old } }
		if (flag === 'num' || flag === 'dur') { operation = (recieved, old) => { return recieved + old } }
		if (flag === 'fav') {

			if (fourth === 'L') {
				operation = (recieved, old) => {
					if (Number(recieved[1]) <= Number(old[1])) { return recieved } else { return old }
				}
			} else {
				operation = (recieved, old) => {
					if (Number(recieved[1]) >= Number(old[1])) { return recieved } else { return old }
				}
			}

		}

		let fresh = operation(recieved, old)

		this.setLS(val, fresh)
	}

	updateValue(val) {
		let type = null
		let recieved = null
		let operation = null
		let creator = false
		let sign = '+'

		const last = val[val.length - 1]
		if (last === 'B') {
			type = 'book'
		} else if (last === 'M') {
			type = 'movie'
		}

		const sndToLast = val[val.length - 2]
		if (sndToLast === 'C') {
			creator = true
		}

		const fourth = val[3]

		if (fourth === 'L') {
			sign = '-'
		}

		const three = val.substring(0, 3)
		if (three === 'num') {
			recieved = this.countType(type)
		} else if (three === 'lst') {
			recieved = this.listOfType(type)
		} else if (three === 'dur') {
			recieved = this.duration(type)
		} else if (three === 'fav') {
			recieved = this.favorite(type, creator, sign)
		}

		this.update(val, type, recieved, three)
	}

	updateLocal(inputs) {

		const setEntries = function (inputs, entries) {
			let entry = []
			let doNothing = null
			inputs.forEach((input) => {
				if (input.getAttribute('type') === 'submit') { doNothing = true }
				else {
					entry.push(input.value)
					input.value = null
				}
			})

			let now = new Date()
			let monthDay = `${now.getMonth() + 1} / ${now.getDate()}`
			entry.push(monthDay)

			entries.push(entry)
		}
		setEntries(inputs, this.entries)

		this.values.forEach((value) => {
			this.updateValue(value)
		})

		console.log(localStorage)

		this.entries = []
	}
}