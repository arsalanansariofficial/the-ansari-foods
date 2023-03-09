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

const getVegetableId = async (vegetableName) => {
    const url = 'https://the-ansari-foods-default-rtdb.firebaseio.com/vegetables.json';
    try {
        const response = await fetch(url);

        if (!response.ok)
            return alert('An Error Occurred');

        const vegetableList = await response.json();

        if (vegetableList) {
            const vegetables = [];
            for (const key in vegetableList) {
                vegetables.push({
                    id: key,
                    name: vegetableList[key].name
                });
            }
            const vegetable = vegetables.find(vegetable => vegetable.name.toLowerCase() === vegetableName.toLowerCase());
            return vegetable.id;
        }
    } catch (error) {
        return alert(`Vegetable with name ${vegetableName} not found!`);
    }
}

const updateVegetable = async () => {
    let oldVegetableName = document.getElementById("old-vegetable-name").value.toString().toUpperCase();
    let newVegetableName = document.getElementById("new-vegetable-name").value.toString().toUpperCase();
    let regularExpression = /^[a-zA-Z ]*$/;

    if (oldVegetableName === "" || regularExpression.test(oldVegetableName) === false)
        addAlertOne();
    if (newVegetableName === "" || regularExpression.test(newVegetableName) === false)
        addAlertTwo();
    if (oldVegetableName !== "" && regularExpression.test(oldVegetableName) === true && newVegetableName !== "" && regularExpression.test(newVegetableName) === true) {
        const vegetableId = await getVegetableId(oldVegetableName);

        if (vegetableId) {
            const url = `https://the-ansari-foods-default-rtdb.firebaseio.com/vegetables/${vegetableId}.json`;

            try {
                const response = await fetch(url, {
                    method: "PATCH",
                    body: JSON.stringify({name: newVegetableName})
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
