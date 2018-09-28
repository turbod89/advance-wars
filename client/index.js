const blessed = require('blessed');
const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:8000");

const ErrorLine = require('./components/error-line');
const MainMenu = require('./components/main-menu');

// Create a screen object.
const screen = blessed.screen({
    smartCSR: true
});

screen.title = 'Client';

const mainMenu = MainMenu(ioClient);
screen.append(ErrorLine(ioClient));
screen.append(mainMenu);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    this.destroy();
    return process.exit(0);
});

mainMenu.focus();

screen.render();