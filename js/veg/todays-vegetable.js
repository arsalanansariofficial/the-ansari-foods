let vegetableList = JSON.parse(sessionStorage.getItem("vegetable-list"));
let count = 0;

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const setTodaysVegetable = () => {

    let index = getRandomNumber(0, vegetableList.length - 1);
    document.getElementById("title").innerText = vegetableList[index]["name"];

    let temp = vegetableList[index];
    vegetableList[index] = vegetableList[vegetableList.length - 1];
    vegetableList[vegetableList.length - 1] = temp;
}

setTodaysVegetable();

const newVegetable = () => {
    if (count === vegetableList.length)
        count = 0;
    document.getElementById("title").innerText = vegetableList[count]["name"];
    count++;
}
