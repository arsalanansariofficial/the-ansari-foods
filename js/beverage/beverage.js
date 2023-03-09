const todaysBeverage = () => {
    sessionStorage.setItem("fetch-type", "get-todays-beverage");
    window.location.href = "../animator/animator.html";
}

const addBeverage = () => {
    window.location.href = "add-beverage.html";
}

const updateBeverage = () => {
    window.location.href = "update-beverage.html";
}

const deleteBeverage = () => {
    window.location.href = "delete-beverage.html";
}