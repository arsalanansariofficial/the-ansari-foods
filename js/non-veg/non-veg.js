const todaysNonVegetable = () => {
    sessionStorage.setItem("fetch-type", "get-todays-non-vegetable");
    window.location.href = "../animator/animator.html";
}

const addNonVegetable = () => {
    window.location.href = "add-non-vegetable.html";
}

const updateNonVegetable = () => {
    window.location.href = "update-non-vegetable.html";
}

const deleteNonVegetable = () => {
    window.location.href = "delete-non-vegetable.html";
}