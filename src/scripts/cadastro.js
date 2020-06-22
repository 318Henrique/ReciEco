var password = document.getElementById("password"),
confirm_password = document.getElementById("confirm_password");

function validatePassword(){
    if(password.value != confirm_password.value) {
confirm_password.setCustomValidity("Senhas diferentes!");
} else {
confirm_password.setCustomValidity('');
}
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

function addValuesInputs (data){
    const {logradouro, bairro, localidade, uf, } = data;

    const inputAddress = document.querySelector("#inputEndereco");
    const inputBairro = document.querySelector("#inputBairro");
    const inputCidade = document.querySelector("#inputCidade");
    const inputUf = document.querySelector("#inputEst");

    inputAddress.value = logradouro;
    inputBairro.value = bairro;
    inputCidade.value = localidade;
    inputUf.value = uf;
}
function getCep(cep){
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const requisition = new XMLHttpRequest();
    requisition.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const content = requisition.responseText
            addValuesInputs(JSON.parse(content))
        }
    };
    requisition.open("GET", url, true);
    requisition.send();
}
const inputCep = document.querySelector('#inputCep');
inputCep.addEventListener('change', () => {
    if(inputCep.value.length === 8)
    {
        getCep(inputCep.value)
    }
})


const lat = document.getElementById("lat");
const long = document.getElementById("long");

window.addEventListener('load', getLocation())

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        lat.innerHTML = "O seu navegador não suporta Geolocalização.";
        long.innerHTML = "O seu navegador não suporta Geolocalização.";
    }
}
function showPosition(position) {
    lat.value = +position.coords.latitude;
    long.value = +position.coords.longitude;
}


const handleFieldDocument = document.querySelector('[handleFieldDocument]');
handleFieldDocument.addEventListener('change', event => {
    const numberDocumentIdentification = document.querySelector('[numberDocumentIdentification]');
    const handleTextDocumentIdentification = document.querySelector('[handleTextDocumentIdentification]')
    
    const valeuFieldDocument = handleFieldDocument.value;
    handleTextDocumentIdentification.innerHTML = valeuFieldDocument;
    if(valeuFieldDocument === 'cpf')
    numberDocumentIdentification.maxLength = 11

    else
    numberDocumentIdentification.maxLength = 14
})

const formData = document.querySelector('[formData]');
formData.addEventListener('submit', async (event) => {
    event.preventDefault();
    // const personName = event.srcElement[1].valeu;
    const formChildren = event.srcElement;
    for (const key in formChildren) {
        const childre = formChildren[key];
        console.log(childre.value, childre.name, childre.id)
    }

    const url = "https://recieco.herokuapp.com/signup/";
    const data = {
        person_name: registerType,
        registerType: "Gerador de Resíduos",
        cpf: "03698881110",
        whatsapp: "65992336042",
        mail: "brunoleansd@outlook.com",
        zipcode: "78310000",
        address: "rua angela prestes zanon",
        number_address: "406w",
        neghborhood: "cidade verde",
        city: "comodoro",
        state: "mt",
        coordLatitude: "123.23",
        coordLongitude: "123.3",
        password: "123"
    };
    // const registerPerson = await axios({
    //     method: 'post',
    //     url: url,
    //     data: data
    // })
})

const inputSelectResidues = document.querySelectorAll(".boxIcon");
inputSelectResidues.forEach(inputResidues => {
    inputResidues.addEventListener('click', () => {
        const isClick = inputResidues.classList.contains("handleSelect");
        console.log(inputResidues.getAttribute('class'))
        inputResidues.classList.toggle('handleSelect')
    })
})