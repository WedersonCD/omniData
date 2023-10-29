var GLOBAL_QLIK;
var GLOBAL_QLIK_APP;
var GLOBAL_APP_OPENED = false;

const setQlikGlobal = async () => {

    var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
    var config = {
        host: window.location.hostname,
        prefix: prefix,
        port: window.location.port,
        isSecure: window.location.protocol === "https:"
    };

    await require.config({
        baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
    });

    await require(["js/qlik"], function async(qlik) {
        qlik.setOnError(function (error) {
            $('#popupText').append(error.message + "<br>");
            $('#popup').fadeIn(1000);
        });
        $("#closePopup").click(function () {
            $('#popup').hide();
        });

        GLOBAL_QLIK = qlik;
        GLOBAL_QLIK_APP = qlik.openApp('DataCatalog.qvf', config);

    });
    GLOBAL_APP_OPENED = true;
}

setQlikGlobal()


function getQlikObjectLayout() {

}


async function getDataProducts() {

    const obj = await GLOBAL_QLIK_APP.getObject('CDmxp');

    const hyperCube = obj.layout.qHyperCube;
    let page = {
        qTop: 0,
        qLeft: 0,
        qWidth: hyperCube.qSize.qcx,
        qHeight: 1000
    };

    const qDataPages = await obj.getHyperCubeData('/qHyperCubeDef', [page]);

    const dataProducts = []
    for (const item of qDataPages[0].qMatrix) {
        let dataProduct = {}
        dataProduct.dominio = item[0].qText
        dataProduct.nome = item[1].qText
        dataProduct.responsavel = item[2].qText
        dataProduct.formato = item[3].qText
        dataProduct.score = item[4].qText
        dataProduct.descricao = item[5].qText
        dataProduct.objectID = item[6].qText

        //* 
        const objSamples = await GLOBAL_QLIK_APP.getObject(dataProduct.objectID);


        dataProduct.dimensionArray = objSamples.layout.qHyperCube.qDimensionInfo.map((item) => {
            return item.qFallbackTitle
        })

        const qDataPagesSample = await objSamples.getHyperCubeData('/qHyperCubeDef', [page]);
        dataProduct.sample = []

        qDataPagesSample[0].qMatrix.forEach((itemSample) => {

            dataProduct.sample.push({})
            currentX = dataProduct.sample.length - 1

            for (x = 0; x < itemSample.length; x++) {
                dataProduct.sample[currentX][dataProduct.dimensionArray[x]] = itemSample[x].qText

            }

        });
        //*/
        dataProducts.push(dataProduct)

    }

    return dataProducts;

}
