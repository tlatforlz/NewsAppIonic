import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsService } from '../../app/services/news.service';
import { NewsPage } from '../news/news';
import { HomePage } from '../home/home';
import { CategoriesPage } from '../categories/categories';
import { HotPage } from '../hot/hot';
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
    selector: 'search',
    templateUrl: 'search.html',
    styles: ['news.scss']
})
export class SearchPage {
    public searchKey: string = '';
    public toggled: boolean = false;
    public showIs: boolean = false;
    public Top: any[] = [];
    public Length: any = 0;
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
        this.toggled = false;
        this.showIs = false;
    }

    search() {
        this.NewsService.getListSearch(this.searchKey, 0).subscribe(
            res => {
                var list = res.news;
                console.log(list.length)
                if (list.length == 0) {
                    this.showIs = true;
                }
                list.forEach(w => {
                    this.parseJsonToObject(w).then(s => {
                        if (s != undefined) {
                            this.Top.push(s);
                        }
                    })
                });
            }, err => {
                this.showIs = true;
            })

        //getListSearchAll
        this.NewsService.getListSearchAll(this.searchKey).subscribe(res => {
            this.Length = res.news;
            console.log(this.Top.length);
            console.log(this.Length);
            if (this.Top.length < this.Length) {
                console.log(this.Top.length);
                this.toggled = true;
            }
        });


    }
    cancel() {
        this.Top = [];
        this.searchKey = '';
        this.showIs = false;
        this.toggled = false;
    }

    loadSearch() {
        // window.location.reload();
    }

    loadHot() {
        this.navCtrl.push(HotPage);
    }

    loadNew() {
        this.navCtrl.push(CategoriesPage);
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
        this.NewsService.getListSearch(this.searchKey, length).subscribe(res => {
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
            console.log(list.length);
            if (list.length == this.Length) {
                this.toggled = false;
            }
        });
    }

}
