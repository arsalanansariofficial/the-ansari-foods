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

const getNonVegetableId = async (nonVegetableName) => {
    const url = 'https://the-ansari-foods-default-rtdb.firebaseio.com/non-vegetables.json';
    try {
        const response = await fetch(url);

        if (!response.ok)
            return alert('An Error Occurred');

        const nonVegetableList = await response.json();

        if (nonVegetableList) {
            const nonVegetables = [];
            for (const key in nonVegetableList) {
                nonVegetables.push({
                    id: key,
                    name: nonVegetableList[key].name
                });
            }
            const nonVegetable = nonVegetables.find(nonVegetable => nonVegetable.name.toLowerCase() === nonVegetableName.toLowerCase());
            return nonVegetable.id;
        }
    } catch (error) {
        return alert(`Non-Vegetable with name ${nonVegetableName} not found!`);
    }
}

const updateNonVegetable = async () => {
    let oldNonVegetableName = document.getElementById("old-non-vegetable-name").value.toString().toUpperCase();
    let newNonVegetableName = document.getElementById("new-non-vegetable-name").value.toString().toUpperCase();
    let regularExpression = /^[a-zA-Z ]*$/;

    if (oldNonVegetableName === "" || regularExpression.test(oldNonVegetableName) === false)
        addAlertOne();
    if (newNonVegetableName === "" || regularExpression.test(newNonVegetableName) === false)
        addAlertTwo();
    if (oldNonVegetableName !== "" && regularExpression.test(oldNonVegetableName) === true && newNonVegetableName !== "" && regularExpression.test(newNonVegetableName) === true) {
        const nonVegetableId = await getNonVegetableId(oldNonVegetableName);

        if (nonVegetableId) {
            const url = `https://the-ansari-foods-default-rtdb.firebaseio.com/non-vegetables/${nonVegetableId}.json`;

            try {
                const response = await fetch(url, {
                    method: "PATCH",
                    body: JSON.stringify({name: newNonVegetableName})
                });

                if (!response.ok)
                    return alert('An Error Occurred');

                const newVegetable = await response.json();
                if (newVegetable) {
                    alert(`${newVegetable.name} updated in the database!`);
                    return newVegetable;
                }
            } catch (error) {
                return alert('Network Error Occurred!');
            }
        }
    }
}
