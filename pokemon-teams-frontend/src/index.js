document.addEventListener("DOMContentLoaded", ()=>{
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers` 
    const POKEMONS_URL = `${BASE_URL}/pokemons`

    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainer => {
        console.log(trainer)
        for(let i = 0; i<trainer.length; i++){
            // console.log(trainer[i])
            addTrainer(trainer[i])
        }
    })

    const addTrainer =(trainer) =>{
        const main = document.querySelector('#main')
        const div = document.createElement('div')
        const ul = document.createElement('ul')
        const p = document.createElement('p')
        const button = document.createElement('button')

        main.append(div)
        div.append(p, button, ul)

        p.innerText = trainer.name
        div.className = "card"
        button.id ="trainer-"+ trainer.id
        button.innerText = "Add Pokemon"
        button.addEventListener("click",(e)=>addPokemon(e,trainer))
        const pokemon =trainer.pokemons
        for(let i =0; i<pokemon.length; i++){
            const li = document.createElement('li')
            const button = document.createElement('button')
            button.className = "release"
            button.id = pokemon[i].id
            button.innerText = "Release"
            button.addEventListener("click", (e)=>deletePokemon(e, pokemon[i]))
            li.innerText = pokemon[i].nickname+" ("+pokemon[i].species+") "
            ul.append(li)
            li.append(button)
        }

    }

    const addPokemon = (e, trainer) =>{
        e.preventDefault();
        console.log(e.target.nextSibling)
        fetch("http://localhost:3000/pokemons", {
            method: "POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({trainer_id: trainer.id})
        })
        .then(resp=>resp.json())
        .then(pokemon=>{
        
            if(trainer.pokemons.length < 6){
                const li = document.createElement('li')
                const button = document.createElement('button')
                button.className = "release"
                button.id = pokemon.id
                button.innerText = "Release"
                button.addEventListener("click", (e)=>deletePokemon(e, pokemon))
                li.innerText = pokemon.nickname+" ("+pokemon.species+") "
                e.target.nextSibling.append(li)
                li.append(button)
            }
        })
    }

    const deletePokemon = (e, pokemon) => {
        e.preventDefault();
        
        fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
            method: "Delete",
            headers:{'Content-Type': 'application/json'}
            
        })
        .then(resp=>e.target.parentElement.remove())
        
    }
})




