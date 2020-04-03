const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const {
    IamAuthenticator
} = require('ibm-watson/auth');


module.exports = function (ipcMain) {

    let visualRecognition = null
    let apikey = null
    let serviceUrl = null

    ipcMain.handle('load-credentials', async (event, obj) => {

        if (apikey == obj.apikey && serviceUrl == obj.serviceUrl)
            return
        apikey = obj.apikey
        serviceUrl = obj.serviceUrl
        visualRecognition = await new VisualRecognitionV3({
            version: '2018-03-19',
            authenticator: new IamAuthenticator({
                apikey,
            }),
            url: serviceUrl,
        });
    })

    ipcMain.handle('get-visual-recognition-results-by-url', async (event, url) => {

        if (!visualRecognition) return {}
        const classifyParams = {
            url
        };
        let result = ""
        await visualRecognition.classify(classifyParams)
            .then(response => {
                result = response.result.images[0].classifiers[0].classes
            })
            .catch(err => {
                result = err
            });
        return result
    })


    console.log("ipc-configured!")
}