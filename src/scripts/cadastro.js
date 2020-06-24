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


function checkPasswordEqual(password, password_confirm){
    return password === password_confirm ? password : false;
}

function handleDataSignUp(data){
    const {typeDocument, numberDocumentChoise, senha, confirma_senha, ...rest} = data;
    const newObject = {}
    newObject[typeDocument] = numberDocumentChoise;
    const checkPassword = checkPasswordEqual(senha, confirma_senha)
    if(!checkPassword)
    return {
        success: false,
        message: "Senhas não são iguais!"
    }

    newObject.password = senha
    return Object.assign(rest, newObject)
}

async function _storageSignUp(data){
    try {
        const url = "https://recieco.herokuapp.com/signup/";
        const responseSignUp = await axios({
            method: 'post',
            url: url,
            data: data
        })

        const {message, success, token} = responseSignUp.data;
        localStorage.setItem('token', token);

        return {
            success: success,
            message: message
        };
    } catch (error) {
        const {message, success} = error.response.data;
        return {
            success: success,
            message: message
        }
    }
}

async function _storageResidues(data){
    try {
        const token = localStorage.get("token");
        const url = "https://recieco.herokuapp.com/residues/person_residues/";
        const responseSignUp = await axios({
            method: 'post',
            url: url,
            headers: {
                auth: token
            },
            data: data
        })

        const {message, success} = responseSignUp.data; 
        return {success, message};
    } catch (error) {
        const {message, success} = error.response.data;
        return {success, message};
    }
}

function submitResidues(residues){
    const dataResidues = residues.split(",");
    console.log(dataResidues)
}

const dataForm = document.querySelectorAll('[formField]');
const submitForm = document.querySelector('[submitForm]');
submitForm.addEventListener('click', () => {
    getPerson()
    const _data = {};
    let errorFill = false;
    for (const key in dataForm) {
        const fieldForm = dataForm[key];
        const {name, value} = fieldForm;
        
        if(value === '' || value === undefined)
        {
            errorFill = true;
            fieldForm.classList.add("errorFieldForm")
            fieldForm.addEventListener('change', content => {
                if(content.value !== '' || content.value !== undefined)
                fieldForm.classList.remove('errorFieldForm')
            })
        }

        else
        _data[name] = value;

        // aqui vc vai colocar o nome do ultimo input para fazer parar o loop
        if(name === 'residues')
        break;
    }

    if(!errorFill){
        const contentDataSignUp = handleDataSignUp(_data)
        const {residues, ...dataSignup} = contentDataSignUp;
        const responseStorageSignUp = _storageSignUp(dataSignup)
        console.log(responseStorageSignUp)
        // submitResidues(residues)
    }
})

async function getPerson(){
    try {
        const token = localStorage.get("token");
        const url = "https://recieco.herokuapp.com/person/";
        const responseSignUp = await axios({
            method: 'get',
            url: url,
            headers: {
                auth: token
            }
        })

        console.log(responseSignUp.data)
    } catch (error) {
        console.log(error)
    }
}


function toStringForInput(arrayData){
    return arrayData.toString();
}

function removeValueInputResidues(data, valueSearch){
    const verifyIfExists = data.filter(value => value !== valueSearch)
    return verifyIfExists;
}

function addValueInputResidues(data, valueSearch){
    const verifyIfExists = data.filter(value => value === valueSearch)
    if(verifyIfExists.length)
    return data;

    else
    return [...data, valueSearch]
}

function splitValueTypeResidue(data){
    const splitData = data.split(",");
    return splitData
}

const inputSelectResidues = document.querySelectorAll(".boxIcon");
const inputTypeResidues = document.querySelector('[typeResidue]');
inputSelectResidues.forEach(inputResidues => {
    inputResidues.addEventListener('click', () => {
        const nameResidues = inputResidues.getAttribute('residues');
        const verifyIfChecked = inputResidues.classList.contains(nameResidues);
        const dataArray = splitValueTypeResidue(inputTypeResidues.value);

        if(verifyIfChecked){
            inputResidues.classList.remove(nameResidues)
            const arrayFinalRemoved = removeValueInputResidues(dataArray, nameResidues)
            inputTypeResidues.value = toStringForInput(arrayFinalRemoved);
        }
        else{
            inputResidues.classList.add(nameResidues)
            const arrayFinalAdd = addValueInputResidues(dataArray, nameResidues)
            inputTypeResidues.value = toStringForInput(arrayFinalAdd);
        }
    })
})