const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
let test;
let filters = [];
const quotes = [`Puppy love.`,`Thanks fur the memories.`,`You can't buy happiness, but you can rescue it.`,`Dogs are my favorite people`,`I will always woof you.`,`My best friend has a fur and a tail.`,`Dogs are not our whole life, but they make our lives whole.`,`Love is a four-legged word.`,`Anything is paws-ible with a dog by your side.`,`Love is a wet nose and a wagging tail.`,`The road to my heart is filled with paw prints.`,`Don't stop retrievin'.`,`My dog's only flaw is not living forever.`,`Life would be ruff without you.`,`This friendship is fur real.`,`If there are no dogs in heaven, I don't want to go.`,`Sometimes, they call me 'Getbackhere.'`,`The more men I meet, the more I love my dog.`,`I'm mutts about my dog.`,`Not all dogs are good boys. Some are good girls!`,`Dog hair is my go-to accessory.`,`Can't escape the pup-arazzi.`,`First he stole my heart, then he stole my bed.`,`Crazy dog lady.`,`He's not fat, he's husky!`,`Dogs are the universe's way of apologizing for your relatives.`,`I love my pup furry much.`,`What the pug?`,`All dogs are good—some are just a little ruff around the edges.`,`What kind of dog doesn't bark? A hush puppy!`,`I shih tzu not.`,`My therapist has four legs and a tail.`,`Home is where the dog hair is stuck to everything.`,`Stop hounding me!`,`Cuteness overload, am I right?`,`I'm all about that pug life.`,`"Be the person your dog thinks you are." — C.J. Frick`,`"My fashion philosophy is, if you're not covered in dog hair, your life is empty." — Elayne Boosler`,`"Dogs’ lives are too short. Their only fault, really." — Agnes Sligh Turnbull`,`"No matter how little money and how few possessions you own, having a dog makes you rich." — Louis Sabin`,`"Happiness is a warm puppy." — Charles M. Schulz`,`"A dog is the only thing on earth that loves you more than he loves himself." — Josh Billings`,`"Dogs are great. Bad dogs, if you can really call them that, are perhaps the greatest of them all." — John Grogan`,`"Dogs do speak, but only to those who low how to listen." — Orhan Pamuk`,`"Everything I know, I learned from dogs." — Nora Roberts`]
//these quotes are kinda crap, but whatevs.

function getImages(){ //challenge 1 add each image from imgURL to the page
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => {printImgs(json.message);});
}

function getBreeds(){ //challenge 2 add all breeds from breedURL into an ul
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => {printBreeds(json.message); setFilters(json.message);}); //setFilters will not run until printBreeds has finished.


    //challenge 3 - change text colour of list item on click
    //challenge 4 - allow user to filter breeds with drop-down
        //note: not every letter of the alphabet will return results
}

function printImgs(dogs){
    const container = document.querySelector('#dog-image-container');
    for (const image of dogs) {
        const doggy = document.createElement('img');
        doggy.src = image;
        let slicer = image.slice(image.indexOf("/", image.indexOf("breeds"))+1); // a whole lot of code to extract the breed name from the url
        doggy.alt = slicer.slice(0, slicer.indexOf("/"));
        doggy.title = doggy.alt + `\n${quotes[Math.floor(Math.random()*quotes.length)]}`; // a random quote from the array for the mouse over title
        doggy.style.maxWidth = "400px"; //didn't ever see myself typing THAT in code...
        container.appendChild(doggy);
    }
}

function setFilters(filters){
    let box = document.querySelector("#breed-dropdown");
    for (let i = 0; i < 4; i++) { //deletes existing options (a, b, c, d) in option box
    box.removeChild(box[0]); //or I could just write this line 4 times? potato potahto
    }
    let previous = ""
    let option = document.createElement('option'); //these 4 lines
    option.value = "all";
    option.innerText = "All";
    box.appendChild(option); // add in an "all" option at the top
    for (element in filters) {
        let firstLetter = element.charAt(0).toUpperCase(); //gets first letter of each element of the array
        if (firstLetter != previous) { //ignores duplicates of the same first letter (no else statement)
            previous = firstLetter;
            let option1 = document.createElement('option'); //these 4 lines
            option1.value = firstLetter;
            option1.innerText = firstLetter;
            box.appendChild(option1); //create the new letter option into the option box.
        }
    }
    box.addEventListener('change', filter); //now that the options have been created, add a listener to the box for a change of option
}

function filter(){
    let lists = document.querySelectorAll("#dog-breeds > li"); //get all top level list items (sub-breeds will be shown and hidden with their parent breed)
    let box = document.querySelector("#breed-dropdown"); 
    for (const list of lists) {
        if (box.value === "all"){
            list.style.display = "list-item"; //show all list items
        }
        else{
            if (list.class === box.value){
                list.style.display = "list-item"; //show list items that match the selected option
            }
            else{
                list.style.display = "none"; //hide the rest
            }
        }
    }
}

function printBreeds(breeds){
    const container = document.querySelector("#dog-breeds");
    for (const [key,value] of Object.entries(breeds)) {
        if (value.length === 0) { //if breed has no sub-breed
            let li = document.createElement('li');
            li.id = key;
            li.class = key.charAt(0).toUpperCase(); //this is required for filter()
            li.innerText = key;
            li.addEventListener('click', colorChange)
            container.appendChild(li);
        } else { //if breed DOES have sub-breed
                let li = document.createElement('li'); //create li for breed
                li.id = key;
                li.class = key.charAt(0).toUpperCase();
                li.innerText = `${key}: `;
                li.addEventListener('click', colorChange) //click listener for colorChange()
                let ul = document.createElement('ul'); //and child ul for indentation
                container.appendChild(li);
                li.appendChild(ul);
            for (const subBreed of value) {
                let li1 = document.createElement('li'); //and li for every sub-breed
                li1.id = subBreed;
                li1.innerText = subBreed;
                li1.addEventListener('click', colorChange)
                ul.appendChild(li1)
            }
        }
    }
}

function colorChange(event){
    const randomColor = Math.floor(Math.random()*16777215).toString(16); //random hex color (256*256*256 = that +1 , then convert to hexadecimal)
    const children = event.target.children; //find children of target
    for (const child of children) {
        if(child.style.color === "") //stop them being affected by the color change (for some reason, if they already have a color set, it doesn't effect them anyway)
            child.style.color = "black";
    }
    event.target.style.color = `#${randomColor}`; //we need to put the # infront of the random hex number for the css to read it as a hex color
}

document.addEventListener('DOMContentLoaded', function() { //wait for content to load before fetching data... I really don't think this is necessary as the content is like, 5 empty html elements, but it also means it only adds about 20ms.
    getImages();
    getBreeds();
    });
  