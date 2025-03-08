import { Info } from './importable.js';

const sInfo = new Info()

let ls = []
let d = []

const gMap = sInfo.updateGenres()
gMap.forEach((value, key, map) => {
    ls.push(key)
    d.push(value)
})

document.addEventListener("DOMContentLoaded", function () {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ls,
            datasets: [{
                label: 'Monthly Sales',
                data: d,
                backgroundColor: ['#FFD700', '#00B2A9', '#C8A2C8', '#FF6F61', '#D3D3D3'],
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
});
