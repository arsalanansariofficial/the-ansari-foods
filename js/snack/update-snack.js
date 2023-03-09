const addAlertOne = () => {
    document.getElementsByClassName("container-text-input")[0].classList.add("alert-validate");
}

const addAlertTwo = () => {
    document.getElementsByClassName("container-text-input")[1].classList.add("alert-validate");
}

const removeAlertOne = () => {
    document.getElementsByClassName("container-text-input")[0].classList.remove("alert-validate");
}

const removeAlertTwo = () => {
    document.getElementsByClassName("container-text-input")[1].classList.remove("alert-validate");
}

const getSnackId = async (snackName) => {
    const url = 'https://the-ansari-foods-default-rtdb.firebaseio.com/snacks.json';
    try {
        const response = await fetch(url);

        if (!response.ok)
            return alert('An Error Occurred');

        const snackList = await response.json();

        if (snackList) {
            const snacks = [];
            for (const key in snackList) {
                snacks.push({
                    id: key,
                    name: snackList[key].name
                });
            }
            const snack = snacks.find(snack => snack.name.toLowerCase() === snackName.toLowerCase());
            return snack.id;
        }
    } catch (error) {
        return alert(`Snack with name ${snackName} not found!`);
    }
}

const updateSnack = async () => {
    let oldSnackName = document.getElementById("old-snack-name").value.toString().toUpperCase();
    let newSnackName = document.getElementById("new-snack-name").value.toString().toUpperCase();
    let regularExpression = /^[a-zA-Z ]*$/;

    if (oldSnackName === "" || regularExpression.test(oldSnackName) === false)
        addAlertOne();
    if (newSnackName === "" || regularExpression.test(newSnackName) === false)
        addAlertTwo();
    if (oldSnackName !== "" && regularExpression.test(oldSnackName) === true && newSnackName !== "" && regularExpression.test(newSnackName) === true) {
        const snackId = await getSnackId(oldSnackName);

        if (snackId) {
            const url = `https://the-ansari-foods-default-rtdb.firebaseio.com/snacks/${snackId}.json`;

            try {
                const response = await fetch(url, {
                    method: "PATCH",
                    body: JSON.stringify({name: newSnackName})
                });

                if (!response.ok)
                    return alert('An Error Occurred');

                const newSnack = await response.json();
                if (newSnack) {
                    alert(`${newSnack.name} updated in the database!`);
                    return newSnack;
                }
            } catch (error) {
                return alert('Network Error Occurred!');
            }
        }
    }
}
