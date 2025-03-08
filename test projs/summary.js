import { Info } from './importable.js';

const sInfo = new Info()

console.log(localStorage)

// const gMap = sInfo.updateGenres()

const vals = sInfo.values.slice(2)

const showValue = function (val) {

    let insert = localStorage.getItem(`old${val}`)

    if (val[0] === 'f' && typeof insert == 'string') {
        insert = insert.split(',')
        insert = insert[0]
    }

    if (typeof insert == 'string') { document.querySelector(`#${val}`).innerText = insert }
}

vals.forEach((val) => {
    showValue(val)
})
