const todaysSnack = () => {
    sessionStorage.setItem("fetch-type", "get-todays-snack");
    window.location.href = "../animator/animator.html";
}

const addSnack = () => {
    window.location.href = "add-snack.html";
}

const updateSnack = () => {
    window.location.href = "update-snack.html";
}

const deleteSnack = () => {
    window.location.href = "delete-snack.html";
}