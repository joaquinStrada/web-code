const { app, BrowserWindow, Menu } = require('electron')
const url = require('url')
const path = require('path')

let mainWindow

if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname)
}

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false
        }
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(mainMenu)
})

const templateMenu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Salir',
                accelerator: process.platform === 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: 'Web Code'
    })
}

if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'Dev-Tools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                accelerator: process.platform === 'darwin' ? 'command+D' : 'Ctrl+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}