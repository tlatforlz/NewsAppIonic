import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NewsService } from '../../app/services/news.service';
import { HotPage } from '../hot/hot';
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
    OriginalLink: String;
}
@Component({
    selector: 'news',
    templateUrl: 'news.html',
    styles: ['news.scss']

})
export class NewsPage {
    public NewsId: any;
    public NewsDetail: any;
    public NewsFriend: any[] = [];
    public search: any = false;
    public isLoadMore: any = true;
    public visibleState = 'visible';
    isOn = true;
    isDisabled = false;
    Categories: any[] = [];
    constructor(public navCtrl: NavController, public navParams: NavParams, private NewsService: NewsService) {
        this.search = false;
        this.NewsId = navParams.get("NewsId");
        this.NewsService.getAllCategory().subscribe(res => {
            this.Categories = res.Archives;
        })
    }

    ngOnInit() {
        this.NewsService.getNews(this.NewsId).subscribe(res => {
            parseJsonToObject(res.news).then(w => {
                this.NewsDetail = w;
            });
        });

        this.NewsService.getFriendly(this.NewsId).subscribe(res => {
            var list = res.news;
            list.forEach(k => {
                parseJsonToObject(k).then(w => {
                    this.NewsFriend.push(w);
                });
            });
        });
        function parseJsonToObject(object) {
            return new Promise(function (resolve, reject) {
                var news = new News();
                news.Id = object._id;
                news.Image = object.image;
                news.Content = object.content;
                news.Author = object.author;
                news.Title = object.title;
                news.DateCreate = object.createDate;
                news.Views = object.views;
                news.OriginalLink = object.originalLink;
                if (news != undefined) {
                    return resolve(news);
                }
                return reject(null);
            });
        }
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


    loadHomePage2() {
        this.navCtrl.push(HomePage);
    }

    gotoNews2(Id) {
        this.navCtrl.push(NewsPage, {
            "NewsId": Id
        });
    }

    loadNew() {
        this.navCtrl.push(HotPage);
    }

    loadSearch() {
        this.navCtrl.push(SearchPage);
    }
}
