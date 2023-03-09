const addAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.add("alert-validate");
}

const removeAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.remove("alert-validate");
}

const addNonVegetable = async () => {
    const url = 'https://the-ansari-foods-default-rtdb.firebaseio.com/non-vegetables.json';
    let nonVegetableName = document.getElementById("non-vegetable-name").value.toString().toUpperCase();
    let regularExpression = /^[a-zA-Z ]*$/;

    if (nonVegetableName === "" || regularExpression.test(nonVegetableName) === false)
        addAlert();
    else {
        try {
            const requestBody = {
                name: nonVegetableName
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                return alert('An error occurred');
            }

            alert('Non-Vegetable added to the database');
            return await response.json();
        } catch (error) {
            alert('Network error occurred');
        }
    }
}
