let snackList = JSON.parse(sessionStorage.getItem("snack-list"));
let count = 0;

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const setTodaysSnack = () => {

    let index = getRandomNumber(0, snackList.length - 1);
    document.getElementById("title").innerText = snackList[index]["name"];

    let temp = snackList[index];
    snackList[index] = snackList[snackList.length - 1];
    snackList[snackList.length - 1] = temp;
}

setTodaysSnack();

const newSnack = () => {
    if (count === snackList.length)
        count = 0;
    document.getElementById("title").innerText = snackList[count]["name"];
    count++;
}
