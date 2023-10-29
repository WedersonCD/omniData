let cardIndex = 0;

document.querySelector('.next').addEventListener('click', function () {
    moveCards(1);
});

document.querySelector('.prev').addEventListener('click', function () {
    moveCards(-1);
});



function moveCards(n) {

    const cardContainer = document.querySelector('.card-container');


    cardContainer.scrollBy(300 * n, 690 * n)
}

function dataProductClick(dataProduct){
    alert(dataProduct.name)
} 

function getDataProductCard(dataProduct) {

    // Criar o container principal do card
    const card = document.createElement('div');
    card.className = 'card';

    // Crie o link
    card.addEventListener('click', ()=>{
        sessionStorage.setItem('selectedDataProduct', JSON.stringify(dataProduct));
        document.location = './dataProductDetail/index.html'
    });

    // Criar e adicionar o título do produto (nome)
    const h2 = document.createElement('h2');
    h2.textContent = dataProduct.nome;
    card.appendChild(h2);

    // Criar e adicionar o domínio
    const domainPara = document.createElement('p');
    domainPara.textContent = "Domínio: " + dataProduct.dominio;
    card.appendChild(domainPara);

    // Criar e adicionar o nome do responsavel
    const ownerPara = document.createElement('p');
    ownerPara.textContent = "Responsavel: " + dataProduct.responsavel;
    card.appendChild(ownerPara);

    return card;
}


function setDataProductCARD(dataProduct) {
    const cardElement = getDataProductCard(dataProduct)
    document.querySelector('.card-container').appendChild(cardElement);

}



async function createCards() {
    const dataProducts = await getDataProducts()

    dataProducts.forEach((dataProduct) => {
        setDataProductCARD(dataProduct)

    })
}

