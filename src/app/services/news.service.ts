import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx'

@Injectable()
export class NewsService {
    http: any;
    baseUrl: String;
    Top: any;
    TopCategories: any;
    TinTucNews: any;
    ListNewsCategories: any;
    ListSearch: any;

    constructor(http: Http) {
        this.http = http;
        this.baseUrl = "http://localhost:8001/api/";
    }

    getTop() {
        return this.http.get(this.baseUrl + "news/getNews/getNewsHomePageTop")
            .map(res => res.json());
    }

    getTop1() {
        return this.http.get(this.baseUrl + "news/getNews/getNewsHomePageIonic")
            .map(res => res.json());
    }
    getTop4() {
        return this.http.get(this.baseUrl + "news/getNews/getNewsHomePageTop4")
            .map(res => res.json());
    }


    getTopCategories(catename, limit) {

    }

    getListNewsCategories(catename) {

    }

    getListSearch(seach) {

    }
}