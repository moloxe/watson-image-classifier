const {
    app,
    BrowserWindow,
    globalShortcut,
    ipcMain,
    dialog
} = require('electron')
require("./ipc-config")(ipcMain)

let win

function closeWindow() {
    win = null
    app.quit()
}

function createWindow() {

    win = new BrowserWindow({
        width: 1000,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.setMenu(null)
    win.loadFile('./public/index.html')
    // win.webContents.openDevTools()
    // win.maximize();
    win.show();
}

app.whenReady().then(createWindow)

app.on('ready', () => {
    const printCommand = globalShortcut.register('CommandOrControl+P', () => {
        console.log("CommandOrControl+P")
        win.webContents.print({
            silent: false
        })
    })
    const devtoolsCommand = globalShortcut.register('CommandOrControl+u', () => {
        console.log("CommandOrControl+u")
        win.webContents.openDevTools()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        closeWindow()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})