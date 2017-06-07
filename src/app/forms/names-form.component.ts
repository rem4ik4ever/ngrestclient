import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Http, RequestOptions, Headers} from '@angular/http';
import { NameDetail} from '../entities/name-detail';

/** input form child component */
@Component({
    selector: './names-form',
    templateUrl: './namesform.html',
    styles: ['./namesform.css']
})
export class NamesFormComponent {

    /**
     * variable bound to input fileds of form
     */
    model: NameDetail = new NameDetail();
    /**
     * variable creates an output event that can be used by the parant form 
     */
    @Output() nameDetail: EventEmitter<string> = new EventEmitter();

    constructor(private http: Http) {}

    /**
     * saveName posts input to the server and then clears input and 
     * sends new name to the output event
     */
    public saveName() {
        let url = "http://localhost:8080/names/create"
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.info(`submitted: ${this.model.name}, ${this.model.about}, ${this.model.imageUrl}`)
        this.http.post(url, JSON.stringify(this.model),  options)
        .subscribe(
            (response) => {
                let name = this.model.name
                console.info(`response: ${response}`);
                this.nameDetail.emit(name);
                // clear the form model
                this.model = new NameDetail()
            }
        )
    }
// TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
    
}