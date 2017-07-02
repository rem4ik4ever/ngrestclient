import { Component, OnInit } from '@angular/core';
import { PhoneLocker } from '../phone-locker/phone-locker';
import { Http, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-incharge-main',
  templateUrl: './incharge-main.component.html',
  styleUrls: ['./incharge-main.component.css']
})
export class InchargeMainComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
    this.loadLockers();
  }
  lockers: PhoneLocker[] = [];

  loadLockers() {
    let url = "http://localhost:8080/locker/"
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.get(url, options)
    .map(resp => resp.json())
    .subscribe(
        (response) => {
            this.lockers = this.lockers.concat(response);
            console.log(this.lockers);
        }
    )
  }
}
