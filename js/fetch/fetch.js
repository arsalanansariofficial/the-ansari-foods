const vegetableList = async () => {
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
            return vegetables;
        }
    } catch (error) {
        return alert('Network Error Occurred!');
    }
}

const nonVegetableList = async () => {
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
            return nonVegetables;
        }
    } catch (error) {
        return alert('Network Error Occurred!');
    }
}

const snackList = async () => {
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
            return snacks;
        }
    } catch (error) {
        return alert('Network Error Occurred!');
    }
}

const beverageList = async () => {
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
            return beverages;
        }
    } catch (error) {
        return alert('Network Error Occurred!');
    }
}

const Fetch = (fetchType) => {

    switch (fetchType) {
        case "get-todays-vegetable":
            vegetableList().then(vegetableList => {
                if (vegetableList !== undefined) {
                    sessionStorage.setItem("vegetable-list", JSON.stringify(vegetableList));
                    setTimeout(() => {
                        window.location.replace("../veg/todays-vegetable.html")
                    }, 2000);
                } else {
                    setTimeout(() => {
                        window.history.back();
                    }, 1000);
                }
            });
            break;
        case "get-todays-non-vegetable":
            nonVegetableList().then(nonVegetableList => {
                if (nonVegetableList !== undefined) {
                    sessionStorage.setItem("non-vegetable-list", JSON.stringify(nonVegetableList));
                    setTimeout(() => {
                        window.location.replace("../non-veg/todays-non-vegetable.html")
                    }, 2000);
                } else {
                    setTimeout(() => {
                        window.history.back();
                    }, 1000);
                }
            });
            break;
        case "get-todays-snack":
            snackList().then(snackList => {
                if (snackList !== undefined) {
                    sessionStorage.setItem("snack-list", JSON.stringify(snackList));
                    setTimeout(() => {
                        window.location.replace("../snack/todays-snack.html")
                    }, 2000);
                } else {
                    setTimeout(() => {
                        window.history.back();
                    }, 1000);
                }
            });
            break
        case "get-todays-beverage":
            beverageList().then(beverageList => {
                if (beverageList !== undefined) {
                    sessionStorage.setItem("beverage-list", JSON.stringify(beverageList));
                    setTimeout(() => {
                        window.location.replace("../beverage/todays-beverage.html")
                    }, 2000);
                } else {
                    setTimeout(() => {
                        window.history.back();
                    }, 1000);
                }
            });
    }
}

Fetch(sessionStorage.getItem("fetch-type"));
