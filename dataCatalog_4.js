function showLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'flex';
}

function hideLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'none';
}


/*
document.getElementById("searchBtn").addEventListener("click", function() {
    let query = document.getElementById("searchInput").value;
    alert("Você pesquisou por: " + query); // Isso é apenas um exemplo. Aqui você pode integrar uma API de pesquisa ou qualquer outra funcionalidade.
});
*/

let checkInterval;

function checkAppStatus() {
    if (typeof GLOBAL_APP_OPENED !== "undefined") {
        if (GLOBAL_APP_OPENED === true) {
            console.log("O aplicativo foi aberto!");
			createCards()
			hideLoadingScreen()
            clearInterval(checkInterval); // Parar de checar após encontrar a condição desejada
        } else {
            console.log("O aplicativo ainda não foi aberto.");
        }
    } else {
        console.warn("A variável GLOBAL_APP_OPENED não está definida.");
    }
}

checkInterval = setInterval(checkAppStatus, 2000); // Verificar a cada 2 segundos