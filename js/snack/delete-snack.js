const addAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.add("alert-validate");
}

const removeAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.remove("alert-validate");
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

const deleteSnack = async () => {
    let snackName = document.getElementById("snack-name").value.toString().toUpperCase();
    let regularExpression = /^[a-zA-Z ]*$/;
    if (snackName === "" || regularExpression.test(snackName) === false)
        addAlert();
    else {
        const snackId = await getSnackId(snackName);

        if (snackId) {
            const url = `https://the-ansari-foods-default-rtdb.firebaseio.com/snacks/${snackId}.json`;

            try {
                const response = await fetch(url, {
                    method: "DELETE",
                });

                if (!response.ok)
                    return alert('An Error Occurred');
                alert(`${snackName} deleted from the database!`);
            } catch (error) {
                return alert('Network Error Occurred!');
            }
        }
    }
}
