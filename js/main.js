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

const convertPeriod = millisecond => {
    const min = Math.floor(millisecond / 60000);
    const sec = Math.floor(millisecond % 60000 / 1000);

    return `${min}m e ${sec}s`;
};

const checkout = license => {
    const car = getGarage().filter(car => car.license === license);
    let period = new Date() - new Date(car[0].time);
    period = convertPeriod(period);
    const msg = `O veículo ${car[0].model} de placa ${license} 
    permanceu estacionado por ${period}. Deseja encerrar?`;

    if(!confirm(msg)) {
        return;
    }

    removeCar(license);
};

const removeCar = license => {
    const garage = getGarage().filter(car => car.license !== license);

    localStorage.garage = JSON.stringify(garage);

    renderGarage();
};

const addCarToGarage = car => {
    const tr = document.createElement("tr");

    const tdModel = document.createElement("td");
    tdModel.innerHTML = `${car.model}`;
    tr.appendChild(tdModel);

    const tdLicense = document.createElement("td");
    tdLicense.innerHTML = `${car.license}`;
    tr.appendChild(tdLicense);

    const tdTime = document.createElement("td");
    tdTime.innerHTML = `${formatDate(car.time)}`;
    tr.appendChild(tdTime);

    const tdFinish = document.createElement('td');
    const btnFinish = document.createElement('button');
    btnFinish.innerHTML = "X";
    btnFinish.className = "btn btn-danger delete";
    btnFinish.setAttribute("onclick",  `checkout('${car.license}')`);
    tdFinish.appendChild(btnFinish);
    tr.appendChild(tdFinish);

    $("#garage").appendChild(tr);
};

const renderGarage = () => {
    const garage = getGarage();
    $("#garage").innerHTML = "";
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

