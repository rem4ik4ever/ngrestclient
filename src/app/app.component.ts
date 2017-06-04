import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'Get Names from Server';
  names: Array<String> = [];
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  getNames() {
    var url = "http://localhost:8080/names/";

    this.http.get(url)
    .map(resp => resp.json())
    .subscribe(
      (names) => {
        this.names = names;
      },
      (err) => {
        console.debug(err);
      }
    )
  }
}
