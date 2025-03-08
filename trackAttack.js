import { Info } from './importable.js';

const info = new Info()

console.log(localStorage)

const form = document.querySelector('form')

form.addEventListener('submit',
    (event) => {
        event.preventDefault()
        let inputs = document.querySelectorAll('.form-g select, input')
        info.updateLocal(inputs)
    }
)

// dont forget
// Fantasy – Magical worlds, mythical creatures, and epic adventures (Harry Potter, Lord of the Rings).
// Science Fiction (Sci-Fi) – Futuristic settings, space exploration, and advanced tech (Dune, Star Wars).
// Mystery/Thriller – Suspenseful stories, crime-solving, and psychological tension (Gone Girl, Sherlock Holmes).
// Horror – Supernatural entities, eerie settings, and terrifying moments (It, The Conjuring).
// Romance – Love-driven plots with emotional depth (Pride and Prejudice, The Notebook).
// Adventure – High-stakes journeys, explorations, and survival tales (Indiana Jones, The Hobbit).
// Drama – Emotionally deep stories with strong character development (The Great Gatsby, The Shawshank Redemption).
// Historical Fiction – Stories set in the past, often based on real events (Bridgerton, Schindler’s List).
// Action – High-energy, intense battles, fights, and thrilling chases (James Bond, Jason Bourne).
// Young Adult (YA) – Coming-of-age themes, often with fantasy or dystopian elements (The Hunger Games, Twilight).
