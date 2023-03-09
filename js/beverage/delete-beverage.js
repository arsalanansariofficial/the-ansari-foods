const addAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.add("alert-validate");
}

const removeAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.remove("alert-validate");
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

const deleteBeverage = async () => {
    let beverageName = document.getElementById("beverage-name").value.toString().toUpperCase();
    let regularExpression = /^[a-zA-Z ]*$/;
    if (beverageName === "" || regularExpression.test(beverageName) === false)
        addAlert();
    else {
        const beverageId = await getBeverageId(beverageName);

        if (beverageId) {
            const url = `https://the-ansari-foods-default-rtdb.firebaseio.com/beverages/${beverageId}.json`;

            try {
                const response = await fetch(url, {
                    method: "DELETE"
                });

                if (!response.ok)
                    return alert('An Error Occurred');
                alert(`${beverageName} deleted from the database!`);
            } catch (error) {
                return alert('Network Error Occurred!');
            }
        }
    }
}
