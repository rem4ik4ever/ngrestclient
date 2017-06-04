import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http, RequestOptions, Headers} from '@angular/http';
import { NameDetail} from '../entities/name-detail';

@Component({
    selector: './names-form',
    templateUrl: './namesform.html',
    styles: ['./namesform.css']
})
export class NamesFormComponent {

    model: NameDetail = new NameDetail();

    constructor(private http: Http) {}

    /**
     * saveName
     */
    public saveName() {
        let url = "http://localhost:8080/names/create"
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.info(`submitted: ${this.model.name}, ${this.model.about}, ${this.model.imageUrl}`)
        this.http.post(url, JSON.stringify(this.model),  options)
        .subscribe(
            (response) => {
                console.info(`response: ${response}`);
            }
        )
    }
// TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
    
}