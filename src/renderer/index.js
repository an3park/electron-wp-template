// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { remote } = require('electron')

let text = '<div style="text-align: center;"><h3>'

for (const type of ['electron', 'node', 'chrome']) {
  text += `${type}\t\t${remote.process.versions[type]}<br />`
}

text += '<hr>'

const {ls} = remote.getGlobal('$')

const lss = ls().join('<br>')

text += `<div>${lss}</div>`

document.body.innerHTML = text + '</h3></div>'
