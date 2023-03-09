const addAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.add("alert-validate");
}

const removeAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.remove("alert-validate");
}

const addSnack = async () => {
    const url = 'https://the-ansari-foods-default-rtdb.firebaseio.com/snacks.json';
    let snackName = document.getElementById("snack-name").value.toString().toUpperCase();
    let regularExpression = /^[a-zA-Z ]*$/;

    if (snackName === "" || regularExpression.test(snackName) === false)
        addAlert();
    else {
        try {
            const requestBody = {
                name: snackName
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                return alert('An error occurred');
            }

            alert('Snack added to the database');
            return await response.json();
        } catch (error) {
            alert('Network error occurred');
        }
    }
}
