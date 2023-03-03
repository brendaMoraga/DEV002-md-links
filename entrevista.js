const Palin = (str) =>  {
 let arr = str.split("");
 let r = arr.reverse();   // atsa
 let p = r.join("")
    if (p === str){
    return true

    } else {
        return false
    }
 }
console.log(Palin("ANA"));
console.log(Palin("ANI"));


// ciclo for para leer 
// if para candicionar si es o no 