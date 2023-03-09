const addAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.add("alert-validate");
}

const removeAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.remove("alert-validate");
}

const addVegetable = async () => {
    const url = 'https://the-ansari-foods-default-rtdb.firebaseio.com/vegetables.json';
    let vegetableName = document.getElementById("vegetable-name").value.toString().toUpperCase();
    let regularExpression = /^[a-zA-Z ]*$/;

    if (vegetableName === "" || regularExpression.test(vegetableName) === false)
        addAlert();
    else {
        try {
            const requestBody = {
                name: vegetableName
            }
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                return alert('An error occurred');
            }

            alert('Vegetable added to the database');
            return await response.json();
        } catch (error) {
            alert('Network error occurred');
        }
    }
}
