currentDataProduct = sessionStorage.getItem('selectedDataProduct')
currentDataProduct=JSON.parse(currentDataProduct)


elemento = document.getElementsByClassName('product-description-container-resume-title')
elemento=elemento[0]

emptyStar = document.createElement('img')
emptyStar.src='emptyStar.png'
console.log(emptyStar)
console.log(elemento)
console.log(currentDataProduct.score)

for(x=0;x<currentDataProduct.score;x++){
    fillStar=document.createElement('img')
    fillStar.src='fillStar.png'
    elemento.appendChild(fillStar)
}

for(x=0;x<5-currentDataProduct.score;x++){
    emptyStar = document.createElement('img')
    emptyStar.src='emptyStar.png'
    elemento.appendChild(emptyStar)
}


htmlTable =arrayToTable(currentDataProduct.sample)

elemento = document.querySelector('.product-description-container-sample')
elemento.innerHTML =htmlTable



tags=[
    {class:'.product-description-container-resume-domain', valor: currentDataProduct.dominio},
    {class:'.product-description-container-resume-title-name', valor: currentDataProduct.nome},
    {class:'.product-description-container-resume-responsavel-nome', valor: currentDataProduct.responsavel}

]

tags.forEach((item)=>{
    elemento = document.querySelector(item.class);
    elemento.textContent=item.valor
})


const CLIENT_ID = '495354175342-p066dgpgfjl3th94kn7nm3ouepr3rsm2.apps.googleusercontent.com';  // Substitua pelo seu ID do cliente OAuth 2.0
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: SCOPES.join(' ')})
        .then(function() { console.log("Autenticado com sucesso"); },
              function(err) { console.error("Erro na autenticação", err); });
}

function loadClient() {
    return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
        .then(function() { console.log("API carregada com sucesso"); },
              function(err) { console.error("Erro ao carregar a API", err); });
}

function createSpreadsheet(dataObject) {
    return gapi.client.sheets.spreadsheets.create({}, {
        "properties": {
            "title": "Nova Planilha"
        },
        "sheets": [
            {
                "data": {
                    "startRow": 0,
                    "startColumn": 0,
                    "rowData": [
                        // Aqui, você transformará seu objeto de dados em um formato adequado
                    ]
                }
            }
        ]
    })
    .then(function(response) {
        console.log("Planilha criada com sucesso", response.result);
    }, function(reason) {
        console.error("Erro ao criar a planilha", reason);
    });
}

// Evento de clique no botão
document.getElementById("yourButtonId").addEventListener("click", function() {
    gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: CLIENT_ID, cookiepolicy: 'single_host_origin'})
        .then(() => {
            authenticate().then(loadClient).then(() => {
                createSpreadsheet(yourDataObject);  // Substitua por seu objeto de dados
            });
        });
    });
});
