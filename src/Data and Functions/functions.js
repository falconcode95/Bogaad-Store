export const randos = (id)=> {
    let array = [];
    for(let i=0; i < 5; i++){
        let number = Math.floor(Math.random() * 8);
        while(array.some( element => element === number )){
            number = Math.floor(Math.random() * 8);
        }
        array.push(number);
    }
    return array.filter(element => element !== id)
}