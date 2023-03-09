const addAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.add("alert-validate");
}

const removeAlert = () => {
    document.getElementsByClassName("container-text-input")[0].classList.remove("alert-validate");
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

const deleteVegetable = async () => {
    let vegetableName = document.getElementById("vegetable-name").value.toString().toUpperCase();
    let regularExpression = /^[a-zA-Z ]*$/;

    if (vegetableName === "" || regularExpression.test(vegetableName) === false)
        addAlert();
    else {
        const vegetableId = await getVegetableId(vegetableName);
        if (vegetableId) {
            const url = `https://the-ansari-foods-default-rtdb.firebaseio.com/vegetables/${vegetableId}.json`;
            try {
                const response = await fetch(url, {
                    method: "DELETE"
                });

                if (!response.ok)
                    return alert('An Error Occurred');
                alert(`${vegetableName} deleted from the database!`);
            } catch (error) {
                return alert('Network Error Occurred!');
            }
        }
    }
}
