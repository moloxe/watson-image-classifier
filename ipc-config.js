const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const {
    IamAuthenticator
} = require('ibm-watson/auth');

require('dotenv').config()

module.exports = function (ipcMain) {

    const visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        authenticator: new IamAuthenticator({
            apikey: process.env.apikey,
        }),
        url: process.env.url,
    });

    ipcMain.handle('get-visual-recognition-results-by-url', async (event, url) => {
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