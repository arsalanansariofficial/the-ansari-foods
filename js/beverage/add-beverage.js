const addAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.add("alert-validate");
}

const removeAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.remove("alert-validate");
}

const addBeverage = async () => {
    const url = 'https://the-ansari-foods-default-rtdb.firebaseio.com/beverages.json';
    let beverageName = document.getElementById("beverage-name").value.toString().toUpperCase();
    let regularExpression = /^[a-zA-Z ]*$/;

    if (beverageName === "" || regularExpression.test(beverageName) === false)
        addAlert();
    else {
        try {
            const requestBody = {
                name: beverageName
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                return alert('An error occurred');
            }

            alert('Beverage added to the database');
            return await response.json();
        } catch (error) {
            alert('Network error occurred');
        }
    }
}
