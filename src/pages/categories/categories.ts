import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsService } from '../../app/services/news.service';
import { NewsPage } from '../news/news';
import { HomePage } from '../home/home';
import { HotPage } from '../hot/hot';
import { SearchPage } from '../search/search';

class News {
    Id: String;
    Title: String;
    Content: String;
    Views: Number;
    Author: String;
    Image: String;
    DateCreate: String;
}

@Component({
    selector: 'categories',
    templateUrl: 'categories.html',
    styles: ['categories.scss']
})
export class CategoriesPage {
    public Top: any[] = [];
    public parseJsonToObject(object) {
        return new Promise(function (resolve, reject) {
            var news = new News();
            news.Id = object._id;
            news.Image = object.image;
            news.Content = object.content;
            news.Author = object.author;
            news.Title = object.title;
            news.DateCreate = object.createDate;
            news.Views = object.views;
            if (news != undefined) {
                return resolve(news);
            }
            return reject(null);
        })
    }
    constructor(public navCtrl: NavController, private NewsService: NewsService) {

    }

    ngOnInit() {
        //getCategories
        this.NewsService.getCategories(15).subscribe(res => {
            var list = res.news;
            console.log(list);
            list.forEach(w => {
                this.parseJsonToObject(w).then(s => {
                    if (s != undefined) {
                        this.Top.push(s);
                    }
                })
            })
        });
    }
    loadSearch() {
        this.navCtrl.push(SearchPage);
    }
    loadNew() {
        // window.location.reload();
    }

    loadHot() {
        this.navCtrl.push(HotPage);
    }

    loadHomePage() {
        this.navCtrl.push(HomePage);
    }

    gotoNews(Id) {
        console.log(Id);
        this.navCtrl.push(NewsPage, {
            "NewsId": Id
        });
    }
    readMore(length) {
        this.NewsService.getCategories(length).subscribe(res => {
            var list = res.news;
            this.Top = [];
            console.log(list);
            list.forEach(w => {
                this.parseJsonToObject(w).then(s => {
                    if (s != undefined) {
                        this.Top.push(s);
                    }
                })
            })
        });
    }
}
