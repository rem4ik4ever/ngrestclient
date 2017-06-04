import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { NameDetail} from '../entities/name-detail';

@Component({
  selector: 'names-root',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.css']
})
export class NamesComponent {
  title: String = 'Get Names from Server';
  names: Array<String> = [];
  nameDetail: NameDetail = new NameDetail;
  hideDetail: boolean = true;
  hurz: String = 'burz';
  private http: Http;
  private baseurl = "http://localhost:8080/names/"

  constructor(http: Http) {
    this.http = http;
  }

  getNames() {
    var url = this.baseurl;

    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(
      (names) => {
        this.names = names;
      },
      (err) => {
        console.debug(err);
      })
  }

  getDetails(name: any) {
    var idx;
    for (var index = 0; index < this.names.length; index++) {
      if (this.names[index] === name) {
        idx = index;
        break;
      }
    }
    var url = this.baseurl + idx;

    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(
      (detail) => {
        this.nameDetail = detail;
        this.nameDetail.imageUrl = this.adaptLink(this.nameDetail.imageUrl);
        this.hideDetail = false;
        console.info("(" + idx + "): " + name + " => " + url + " => " + this.nameDetail.imageUrl);
      },
      (err) => {
        console.debug(err);
      })
  }

  private adaptLink(link: string) : string {
    if(link.startsWith('http')) {
      return link;
    } else {
      return 'http://localhost:8080/' +link;
    }
  }
}
