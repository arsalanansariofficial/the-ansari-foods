const todaysVegetable = () => {
    sessionStorage.setItem("fetch-type", "get-todays-vegetable");
    window.location.href = "../animator/animator.html";
}

const addVegetable = () => {
    window.location.href = "add-vegetable.html";
}

const updateVegetable = () => {
    window.location.href = "update-vegetable.html";
}

const deleteVegetable = () => {
    window.location.href = "delete-vegetable.html";
}