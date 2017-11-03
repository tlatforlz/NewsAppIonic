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

    getTop(limit) {
        return this.http.get("http://localhost:3000/api/news/getNews/getNewsMostPopular")
            .map(res => res.json())
            ;
    }

    getTopCategories(catename, limit) {

    }

    getListNewsCategories(catename) {

    }

    getListSearch(seach) {

    }
}