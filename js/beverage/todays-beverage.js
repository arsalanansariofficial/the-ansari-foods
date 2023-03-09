let beverageList = JSON.parse(sessionStorage.getItem("beverage-list"));
let count = 0;

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const setTodaysBeverage = () => {

    let index = getRandomNumber(0, beverageList.length - 1);
    document.getElementById("title").innerText = beverageList[index]["name"];

    let temp = beverageList[index];
    beverageList[index] = beverageList[beverageList.length - 1];
    beverageList[beverageList.length - 1] = temp;
}

setTodaysBeverage()

const newBeverage = () => {
    if (count === beverageList.length)
        count = 0;
    document.getElementById("title").innerText = beverageList[count]["name"];
    count++;
}
