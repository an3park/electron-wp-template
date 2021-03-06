// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')

global.$ = {
  ls: () => {
    const dir = fs.readdirSync(__dirname)
    return [__dirname, ...dir]
  }
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  // and load the index.html of the app.
  if (process.env.NODE_ENV === 'development') {
    const PORT = process.env.PORT || 3030
    mainWindow.loadURL('http://127.0.0.1:' + PORT)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile('./build/renderer/index.html')
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
