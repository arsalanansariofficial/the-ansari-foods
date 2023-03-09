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

const getBeverageId = async (beverageName) => {
    const url = 'https://the-ansari-foods-default-rtdb.firebaseio.com/beverages.json';
    try {
        const response = await fetch(url);

        if (!response.ok)
            return alert('An Error Occurred');

        const beverageList = await response.json();

        if (beverageList) {
            const beverages = [];
            for (const key in beverageList) {
                beverages.push({
                    id: key,
                    name: beverageList[key].name
                });
            }
            const beverage = beverages.find(beverage => beverage.name.toLowerCase() === beverageName.toLowerCase());
            return beverage.id;
        }
    } catch (error) {
        return alert(`beverage with name ${beverageName} not found!`);
    }
}

const updateBeverage = async () => {
    let oldBeverageName = document.getElementById("old-beverage-name").value.toString().toUpperCase();
    let newBeverageName = document.getElementById("new-beverage-name").value.toString().toUpperCase();
    let regularExpression = /^[a-zA-Z ]*$/;

    if (oldBeverageName === "" || regularExpression.test(oldBeverageName) === false)
        addAlertOne();
    if (newBeverageName === "" || regularExpression.test(newBeverageName) === false)
        addAlertTwo();
    if (oldBeverageName !== "" && regularExpression.test(oldBeverageName) === true && newBeverageName !== "" && regularExpression.test(newBeverageName) === true) {
        const beverageId = await getBeverageId(oldBeverageName);

        if (beverageId) {
            const url = `https://the-ansari-foods-default-rtdb.firebaseio.com/beverages/${beverageId}.json`;

            try {
                const response = await fetch(url, {
                    method: "PATCH",
                    body: JSON.stringify({name: newBeverageName})
                });

                if (!response.ok)
                    return alert('An Error Occurred');

                const newBeverage = await response.json();
                if (newBeverage) {
                    alert(`${newBeverage.name} updated in the database!`);
                    return newBeverage;
                }
            } catch (error) {
                return alert('Network Error Occurred!');
            }
        }
    }
}
