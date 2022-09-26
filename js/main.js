(function () {
    //isso serve para chamar diretamente igual é feito no jquery $('query selector')
    const $ = querySelector => document.querySelector(querySelector);

    const getGarage = () => localStorage.garage
        ? JSON.parse(localStorage.garage)
        : [];


    const formatDate = time => {
        return new Date(time).toLocaleTimeString('pt-br', {
            hour: "numeric",
            minute: "numeric"
        })
    };

    const addCarToGarage = car => {
        const tr = document.createElement("tr");

        const tdModel = document.createElement("td");
        tdModel.innerHTML = `${car.model}`;
        tr.appendChild(tdModel);

        const tdLicense = document.createElement("td");
        tdLicense.innerHTML = `${car.license}`
        tr.appendChild(tdLicense);

        const tdTime = document.createElement("td");
        tdTime.innerHTML = `${formatDate(car.time)}`
        tr.appendChild(tdTime);

        const tdFinish = document.createElement('td');
        const btnFinish = document.createElement('button');
        btnFinish.innerHTML = "X";
        btnFinish.className = "btn btn-danger";
        btnFinish.setAttribute("onclick", `removeCar('${car.plate}')`);
        tdFinish.appendChild(btnFinish);
        tr.appendChild(tdFinish);

        $("#result").appendChild(tr);
    };

    const renderGarage = () => {
        const garage = getGarage();
        console.log(garage)
        garage.forEach(addCarToGarage);
    };

    renderGarage();

    $("#send")
        .addEventListener("click", event => {
            event.preventDefault();

            const carModel = $("#car-model").value;
            const license = $("#license-plate").value;

            if(!carModel || !license) {
                $("#error").classList.toggle("hidden");
                return;
            }

            $("#error").classList.add("hidden");

            const car = {
                model: carModel,
                license,
                time: new Date()
            };

            const garage = getGarage();

            garage.push(car);
            localStorage.garage = JSON.stringify(garage);

            addCarToGarage(car);

            $("#car-model").value = "";
            $("#license-plate").value = "";
        });
})();
