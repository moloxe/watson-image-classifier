const {
    ipcRenderer
} = require('electron');
const JSONFormatter = require('json-formatter-js')

async function getVRresultsByUrl(ev) {

    const url = document.getElementById('input-url').value
    document.getElementById('loading').style.display = 'block'

    await ipcRenderer.invoke('get-visual-recognition-results-by-url', url).then(async (result) => {
        const formatter = new JSONFormatter(result);

        let best = [0, ""]
        await result.forEach(ele => {
            if(ele.score > best[0])
                best = [best.score, ele.class]
        });
        const className = document.createElement('h1')
        className.className = "text-center m-3"
        className.innerText = best[1].toUpperCase()

        const img = document.createElement('img')
        img.src = url
        img.className = "rounded mx-auto d-block w-50"

        document.getElementById('result').innerHTML = "";
        document.getElementById('result').appendChild(className)
        document.getElementById('result').appendChild(img)
        document.getElementById('result').appendChild(formatter.render())
    })

    document.getElementById('loading').style.display = 'none'
}