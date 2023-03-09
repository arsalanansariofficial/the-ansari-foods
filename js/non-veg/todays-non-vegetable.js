let nonVegetableList = JSON.parse(sessionStorage.getItem("non-vegetable-list"));
let count = 0;

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const setTodaysNonVegetable = () => {

    let index = getRandomNumber(0, nonVegetableList.length - 1);
    document.getElementById("title").innerText = nonVegetableList[index]["name"];

    let temp = nonVegetableList[index];
    nonVegetableList[index] = nonVegetableList[nonVegetableList.length - 1];
    nonVegetableList[nonVegetableList.length - 1] = temp;
}

setTodaysNonVegetable();

const newNonVegetable = () => {
    if (count === nonVegetableList.length)
        count = 0;
    document.getElementById("title").innerText = nonVegetableList[count]["name"];
    count++;
}
