import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx'

@Injectable()
export class NewsService {
    http: any;
    baseUrl: String;

    constructor(http: Http) {
        this.http = http;
        this.baseUrl = "http://192.168.4.108:8002/api/";
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

    getNews(Id) {
        return this.http.get(this.baseUrl + "news/" + Id)
            .map(res => res.json());
    }

    getFriendly(Id) {
        return this.http.get(this.baseUrl + "news/getNews/getNewsFriendly/" + Id)
            .map(res => res.json());
    }

    getReadMore(limit) {
        return this.http.get(this.baseUrl + "news/getNews/getNewsHomePageTop/" + limit)
            .map(res => res.json());
    }

    getCategories(limit) {
        return this.http.get(this.baseUrl + "news/getNews/getNewsHot/" + limit)
            .map(res => res.json());
    }

    getListNews(limit) {
        return this.http.get(this.baseUrl + "news/getNews/getNewsNew/" + limit)
            .map(res => res.json());
    }

    getListSearch(seach, limit) {
        return this.http.get(this.baseUrl + "news/getNews/getSearch/" + seach + "/" + limit)
            .map(res => res.json());
    }

    getListSearchAll(seach) {
        return this.http.get(this.baseUrl + "news/getNews/getSearchAll/" + seach)
            .map(res => res.json());
    }
}