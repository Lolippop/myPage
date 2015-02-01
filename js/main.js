/**
 * Created by zb on 2015/1/24.
 */
require.config({
    baseUrl:"../js/projectjs",
    paths:{
        jQuery:'../libjs/jquery-1.8.3'
    }
});

require(['jQuery','contentFactory'], function($, contentFactory){

    var data = [{"item":"DIV代码大全 DIV代码使用说明", "url":"xx", "date":"01/31", "category":{"name":"博客","url":"xx"}},
        {"item":"CSS编码转换 CSS编码设置篇utf-8与gb2314 我来说说说看", "url":"xx", "date":"12/09", "category":{"name":"博客","url":"xx"}},
        {"item":"怎么确定要对DIV设置什么CSS属性样式？", "url":"xx", "date":"12/31", "category":{"name":"博客","url":"xx"}},
        {"item":"为什么要设置这些CSS样式属性？", "url":"xx", "date":"08/09", "category":{"name":"博客","url":"xx"}},
        {"item":"div id与div class什么意思用法讲解", "url":"xx", "date":"07/09", "category":{"name":"博客","url":"xx"}},
        {"item":"DIV CSS margin-right认识与用法", "url":"xx", "date":"08/09", "category":{"name":"博客","url":"xx"}},
        {"item":"div浮动层与div层有何不同css中有什么关系", "url":"xx", "date":"06/13", "category":{"name":"博客","url":"xx"}},
        {"item":"div css p段落行高行距怎么设置篇", "url":"xx", "date":"03/11", "category":{"name":"博客","url":"xx"}},
        {"item":"DIV代码大全 DIV代码使用说明", "url":"xx", "date":"01/31", "category":{"name":"博客","url":"xx"}},
        {"item":"CSS编码转换 CSS编码设置篇utf-8与gb2312", "url":"xx", "date":"12/09", "category":{"name":"博客","url":"xx"}},
        {"item":"怎么确定要对DIV设置什么CSS属性样式？", "url":"xx", "date":"12/31", "category":{"name":"博客","url":"xx"}},
        {"item":"为什么要设置这些CSS样式属性？", "url":"xx", "date":"08/09", "category":{"name":"博客","url":"xx"}},
        {"item":"div id与div class什么意思用法讲解", "url":"xx", "date":"07/09", "category":{"name":"博客","url":"xx"}},
        {"item":"DIV CSS margin-right认识与用法", "url":"xx", "date":"08/09", "category":{"name":"博客","url":"xx"}},
        {"item":"div浮动层与div层有何不同css中有什么关系", "url":"xx", "date":"06/13", "category":{"name":"博客","url":"xx"}},
        {"item":"div css p段落行高行距怎么设置篇", "url":"xx", "date":"03/11", "category":{"name":"博客","url":"xx"}}];

    contentFactory.globalInit();
    contentFactory.createArticleListWindow({
        selector:"#content1",
        head: "图片新闻",
        type: "image",
        imageUrl: "../image/36-140F40UI2364.jpg"
    });

    contentFactory.createArticleListWindow({
        selector:"#content2",
        style: "articleList",
        head: "DIV的问题",
        data: data
    });

    contentFactory.createArticleListWindow({
        selector:"#content3",
        style: "articleList",
        head: "DIV的问题",
        data: data
    });

    contentFactory.createArticleListWindow({
        selector:"#content4",
        style: "articleList",
        head: "DIV的问题",
        data: data
    });

    contentFactory.createArticleListWindow({
        selector:"#content5",
        style: "articleList",
        head: "DIV的问题",
        data: data
    });

    contentFactory.createArticleListWindow({
        selector:"#content6",
        style: "articleList",
        head: "DIV的问题",
        data: data
    });

    contentFactory.createArticleListWindow({
        selector:"#content7",
        style: "articleList",
        head: "DIV的问题",
        data: data
    });

    contentFactory.createArticleListWindow({
        selector:"#content8",
        style: "articleList",
        head: "DIV的问题",
        data: data
    });

    contentFactory.createHeadBar({
        selector:"#headBar",
        style:"headBar",
        head:"Nowamagic",
        searchBar: "true",
        data:[{"item":"home","url":"xxx"},
                 {"item":"forumbee","url":"xxx"},
                 {"item":"gamepad","url":"xxx"},
                 {"item":"comments","url":"xxx"},
                 {"item":"book","url":"xxx"}]
    });

    contentFactory.createHeadBar({
        selector:"#updateHead",
        style:"contentBar",
        head:"最新"
    });

    contentFactory.createHeadBar({
        selector:"#blogHead",
        style:"contentBar",
        head:"博客"
    });

    contentFactory.helpGirl({
       selector:"#girl",
       data:[{"item":"看看主人的一些想法？","url":"xxxx"},
           {"item":"今天有什么新鲜事儿发生呢？","url":"xxxx"},
           {"item":"我想静静的思考下人生......","url":"xxxx"},
           {"item":"我有问题，想和大家讨论一下","url":"xxxx"},
           {"item":"我想潜心修炼技术","url":"xxxx"},
           {"item":"hello","url":"xxxx"}]
    });
});