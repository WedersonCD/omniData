currentDataProduct = sessionStorage.getItem('selectedDataProduct')
currentDataProduct=JSON.parse(currentDataProduct)




elemento = document.getElementsByClassName('product-description-container-resume-title')
elemento=elemento[0]

emptyStar = document.createElement('img')
emptyStar.src='emptyStar.png'

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
    {class:'.product-description-container-resume-responsavel-nome', valor: currentDataProduct.responsavel},
    {class:'.product-description-container-resume-description-text', valor: currentDataProduct.descricao},


]

tags.forEach((item)=>{
    elemento = document.querySelector(item.class);
    elemento.textContent=item.valor
})


document.getElementById('product-description-container-taste').addEventListener('click', function() {
        testDataInQlik(currentDataProduct)
});


