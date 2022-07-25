let objectArray = {a: [1,2,3,4],
                    b:[],
                    c:{a:1, b:{sup:"dog",nothing:"much",how:{about:"you?"}}, c:3},
                    d:[33, 4,5],
                    e:{}};
let arrayObject = ['please', 'tell', 'me', 'why',{a:1, b:2, c:3}, [1,2,3,4],[],{}]
let normalarray = ['a','b','c','d','e','f','g','h'];
let normalobject = {a:1,b:2,c:3,d:4,e:5}

// for (const key in array) {
//     console.log(key, array[key])        
//     }

// for (const key in object) {
//     console.log(key, object[key])        
//     }
    console.log(typeof(objectArray))
iterateAnything(arrayObject)
function iterateAnything(array, tabs = ""){
    if (typeof(array) !== "object")
    throw new Error ("Not an object or array!")
    if (Array.isArray(array)){
        for(const item of array){
            if(typeof(item) === "object"){
                console.log(`${tabs}${array.indexOf(item)}: `)
                iterateAnything(item, `${tabs}- `)
            }
            else{
                console.log(`${tabs}${array.indexOf(item)}: ${item}`)
            }
        }
    }
    else{
        for(const key in array){
            if(typeof array[key] === "object"){
                console.log(`${tabs}${key}: `)
                iterateAnything(array[key], `${tabs}- `)
            }
            else{
                console.log(`${tabs}${key}: ${array[key]}`)
            }
        }
    }
}