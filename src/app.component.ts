import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: require('./app.html'),
    styles: [require("./scss/global.scss").toString()]
})
export class AppComponent {}
