const addAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.add("alert-validate");
}

const removeAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.remove("alert-validate");
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

const deleteNonVegetable = async () => {
    let nonVegetableName = document.getElementById("non-vegetable-name").value.toString().toUpperCase();
    let regularExpression = /^[a-zA-Z ]*$/;
    if (nonVegetableName === "" || regularExpression.test(nonVegetableName) === false)
        addAlert();
    else {
        const nonVegetableId = await getNonVegetableId(nonVegetableName);

        if (nonVegetableId) {
            const url = `https://the-ansari-foods-default-rtdb.firebaseio.com/non-vegetables/${nonVegetableId}.json`;

            try {
                const response = await fetch(url, {
                    method: "DELETE"
                });

                if (!response.ok)
                    return alert('An Error Occurred');
                alert(`${nonVegetableName} deleted from the database!`);
            } catch (error) {
                return alert('Network Error Occurred!');
            }
        }
    }
}
