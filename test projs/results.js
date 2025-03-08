
import { Info } from './importable.js';

const rInfo = new Info()

console.log(localStorage)

const updateHTML = function (type, infoArray = undefined) {

    const datas = `<td>${infoArray[0]}</td>
                  <td>${infoArray[1]}</td>
                  <td>${infoArray[2]}</td>
                  <td>${infoArray[3]}</td>
                  <td>${infoArray[4]}</td>`
    //<td>${infoArray[5]}</td>`
    const row = document.createElement('tr')

    row.innerHTML = datas

    document.querySelector(`.${type}-table .tbody`).appendChild(row)

}

const updateTable = function (l, type) {

    const array = rInfo.stringToArray(l)

    array.forEach((infoArray) => {
        updateHTML(type, infoArray)
    })
}

const lstB = localStorage.getItem('oldlstB')
const lstM = localStorage.getItem('oldlstM')

updateTable(lstB, 'book')
updateTable(lstM, 'movie')



