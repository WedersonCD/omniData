function arrayToTable(data,tableClassName) {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return '<p>No data available.</p>';
    }

    let table = `<table class ='${tableClassName}'>`;
    
    // Adicionando cabeçalhos
    let headers = Object.keys(data[0]);
    table += '<thead><tr>';
    for (let header of headers) {
        table += `<th>${header}</th>`;
    }
    table += '</tr></thead>';
    
    // Adicionando os dados
    table += '<tbody>';
    for (let item of data) {
        table += '<tr>';
        for (let header of headers) {
            table += `<td>${item[header]}</td>`;
        }
        table += '</tr>';
    }
    table += '</tbody>';

    table += '</table>';
    
    return table;
}