currentDataProduct = sessionStorage.getItem('selectedDataProduct')
currentDataProduct=JSON.parse(currentDataProduct)
tags=[
    {class:'.product-description-container-resume-domain', valor: currentDataProduct.dominio},
    {class:'.product-description-container-resume-title-name', valor: currentDataProduct.nome},
    {class:'.product-description-container-resume-responsavel-nome', valor: currentDataProduct.responsavel}

]

tags.forEach((item)=>{
    elemento = document.querySelector(item.class);
    elemento.textContent=item.valor
})

