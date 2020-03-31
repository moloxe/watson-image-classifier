const {
    ipcRenderer
} = require('electron');

async function getVRresultsByUrl(ev) {

    const url = document.getElementById('input-url').value
    document.getElementById('loading').style.display = 'block'
    document.getElementById('result').style.display = 'none'

    await ipcRenderer.invoke('get-visual-recognition-results-by-url', url).then(async (result) => {


        const ul = document.getElementById('predictions')
        let best = [0, ""]
        await result.forEach(ele => {

            if (ele.score > best[0])
                best = [best.score, ele.class]

            const li = document.createElement('li')
            li.className = "list-group-item"
            const txt = `${ele.class}: ${ele.score}`
            li.appendChild(document.createTextNode(txt))
            ul.appendChild(li)
        });

        document.getElementById('img').src = url
        document.getElementById('title').innerText = (best[1].toUpperCase())
    })

    document.getElementById('loading').style.display = 'none'
    document.getElementById('result').style.display = 'block'
}