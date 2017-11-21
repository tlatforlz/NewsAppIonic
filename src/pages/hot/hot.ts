import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsService } from '../../app/services/news.service';
import { NewsPage } from '../news/news';
import { HomePage } from '../home/home';
import { CategoriesPage } from '../categories/categories';
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
    selector: 'hot',
    templateUrl: 'hot.html',
    styles: ['hot.scss']
})
export class HotPage {
    public Top: any[] = [];
    public search: any = true;
    public isLoadMore: any = true;
    public visibleState = 'visible';
    isOn = true;
    isDisabled = false;
    Categories: any[] = [];
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
        this.search = true;
        this.NewsService.getAllCategory().subscribe(res => {
            this.Categories = res.Archives;
        })
    }

    ngOnInit() {
        //getCategories
        this.NewsService.getListNews(15).subscribe(res => {
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

    loadMore() {
        this.isLoadMore = !this.isLoadMore;
        if (this.isLoadMore == true) {
            this.isDisabled = true;
            this.isOn = false;
        } else {
            this.isDisabled = false;
            this.isOn = true;
        }
    }

    loadCategory(id) {
        this.navCtrl.push(CategoriesPage, {
            "NewsId": id
        });
    }

    loadSearchBar() {
        this.isLoadMore = true;
        this.search = !this.search;
    }

    loadSearch() {
        this.navCtrl.push(SearchPage);
    }
    loadHot() {
        // window.location.reload();
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
        this.NewsService.getListNews(length).subscribe(res => {
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
