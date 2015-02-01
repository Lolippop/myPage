/**
 * Created by zb on 2015/1/24.
 */
define([], function(){

    var globalInit = function(){

    };

    var defConf = {
        selector: "",
        style: "",
        type:"",
        imageUrl:"",
        articleListHeight: 380,
        listNum: 16,
        headStyle: "listHead",
        infoStyle: "listInfo",
        dotStyle: "",
        dotShakeStyle: "fa-spin",
        head: "",
        moreUrl: "xx",
        searchBar: "false",
        data: [],
        item: "item",
        url: "url",
        category: "category",
        categoryName: "name",
        categoryUrl: "url",
        info: ["date"]
    };

    var conf={};

    /**
     * 设置属性
     * @param config
     */
    function setConf(config){
        var item;
        for(item in defConf){
            conf[item] = defConf[item];
        }
        for(item in conf) {
            if (null != config[item]) {
                conf[item] = config[item];
            }
        }

    }

    /**
     * 创建一个html标签，标签类型是tagType，标签内容是content，标签样式是style
     * 标签类型是className
     * @param tagType
     * @param content
     * @param style
     * @param className
     * @param attrValue
     * @returns {*|jQuery|HTMLElement}
     */
    function $T(tagType, content, style, className, attrValue){
        var $tag;
        if( tagType instanceof  jQuery){
            $tag = tagType;
        }else {
            $tag = $("<" + tagType + ">" + "</" + tagType + ">");
        }
        if(null != style){
            $tag.css(style);
        }
        if(null != className){
            $tag.addClass(className);
        }
        if(null != attrValue){
            $tag.attr(attrValue);
        }
        if(content != null){
            $tag.text(content);
        }
        return $tag;
    }

    /**
     * 创建一个右对齐的标签
     * @param tagType
     * @param content
     * @param style
     * @param className
     * @param attrValue
     * @returns {*|jQuery|HTMLElement}
     */
    function $TL(tagType, content, style, className, attrValue){
        var $tag = $T(tagType, content, style, className, attrValue);
        $tag.css("float", "right");
        return $tag;
    }

    /**
     * 获取图标，第一个参数为图标类型，第二个参数为图标是否为反色，第三个参数为图标大小
     * @param name
     * @param inverse
     * @param size
     * @returns {*|jQuery|HTMLElement}
     */
    function getIcon(name, inverse, size){
        var $icon;
        $icon = $T("i",null,null,"fa",null);

        var sizeClass = "fa-" + size;
        var typeClass = "fa-" + name;
        $icon.addClass(typeClass).addClass(sizeClass);
        if(inverse == "true"){
            $icon.addClass("fa-inverse");
        }

        return $icon;
    }

    var desObj = [];
    var data = [];
    var item = "";

    /**
     * 初始化，读取用户配置，获取需要创建内容的对象
     * @param config
     */
    function init(config){
        setConf(config);
        desObj = $(conf.selector).get();
        data = conf.data;
    }

    /**
     * 创建一个展示内容的小窗口
     * @param config
     */
    var createArticleListWindow = {
        /**
         * 创建一个文章窗口的文章信息行
         * @returns {*|jQuery|HTMLElement}
         */
        createDataItem: function(dataItem){
            var $item, attr;
            $item = $T("div", null, {
                "margin-left":"5%",
                "list-style-type":"none",
                "white-space":"nowrap",
                "width":"90%",
                "height":((conf.articleListHeight-50)/conf.listNum)+"px"
            }, null);

            //增加类型标记
            $item.append($T("a", "[" + dataItem[conf.category][conf.categoryName] + "]",null,null,
                {"href":dataItem[conf.category][conf.categoryUrl]}));
            $item.append($T("span", " "));
            //文章标题
            $item.append($T("a", dataItem[conf.item],null
                , null, {"href": dataItem[conf.url]}));

            //增加文章的其他信息，如创建日期等
            var l = conf.info.length, i = 0;
            for(i = 0; i < l; i++){
                attr = conf.info[i];
                if(attr != conf.item && attr != conf.url && dataItem[attr] != null){
                    $item.append(
                        $TL("span", dataItem[attr], null, conf.infoStyle));
                }
            }

            return $item;
        },

        /**
         * 创建窗口头
         * @returns {null}
         */
        createHead: function(){
            var $headDiv;
            $headDiv = $T("div", null, {
                "width" : "90%",
                "margin-left" : "5%",
                "padding-top" : "10px",
                "padding-bottom": "10px"
            }, conf.headStyle);

            $headDiv.append($T("a",conf.head,{"padding-right":"4%"}, null,{"href":conf.moreUrl}));
            return $headDiv;
        },

        /**
         * 创建一个图片展示窗口
         * @returns {*|jQuery|HTMLElement}
         */
        buildImage: function(){
            var $image = $T("img",null,{
                    "margin-left":"5%"
                },null,
                {
                    "src":conf.imageUrl,
                    "width": "90%",
                    "height": "100%"
                });
            return $image;
        },

        /**
         * 创建文章列表的窗口展示内容
         * @returns {*|jQuery|HTMLElement}
         */
        buildList: function(){
            var $dataList = $T("div", null, {
                "height":"100%",
                "padding-top":"10px"
            }, null, null);

            for(var item in data){
                var $dataItem = createArticleListWindow.createDataItem(data[item]);
                $dataList.append($dataItem);
            }

            return $dataList;
        },

        /**
         * 建立内容窗口，并根据窗口的类型添加不同的内容
         * @returns {*|jQuery|HTMLElement}
         */
        buildCont: function(){
            var $mainDiv, $dataDiv;

            $mainDiv = $T("div", null, {"height":conf.articleListHeight+"px"}, conf.style);
            $mainDiv.append(createArticleListWindow.createHead());

            $dataDiv = $T("div", null, {"height":"100%"});
            if(conf.type == "image"){
                $dataDiv.append(createArticleListWindow.buildImage());
            }else {
                $dataDiv.append(createArticleListWindow.buildList());
            }
            $mainDiv.append($dataDiv);
            return $mainDiv;
        },

        build: function(config){
            init(config);

            for (var i = 0; i < desObj.length; i++) {
                var cont = createArticleListWindow.buildCont();
                $(desObj[i]).append(cont);
            }
        }
    };

    /**
     * 创建导航栏，以及其他的类似导航栏的内容
     */
    var createHeadBar = {
        /**
         * 导航栏中内容span的属性，离top距离30%，内左边距30px，高70%
         */
        barStyle: {"top":"30%","position":"relative","padding-left":"30px","height":"70%"},

        /**
         * 创建导航栏，如果设置搜索框为true则导航栏中包行搜索框内容，同时方法会读取
         * conf中的data，如果存在数据，则读取数据，data中存放的是图标类型以及图标
         * 链接的数据，方法将会依次创建导航栏的图标
         * @returns {*|jQuery|HTMLElement}
         */
        buildHeadBar: function(){
            var barStyle = createHeadBar.barStyle;
            var $headBar, dataItem;
            $headBar = $T("div", null, {"width":"100%", "clear":"both"}, conf.style, null);
            $headBar.append($T("span", conf.head, barStyle));

            var length = data.length;
            for(var i = 0; i < length; i++){
                dataItem = data[i];
                $headBar.append($T("span", null, barStyle)
                    .append($T("a", null, null,null,{"href": dataItem[conf.url] })
                        .append(getIcon(dataItem[conf.item], "true", "1x"))));
            }

            if(conf.searchBar === "true") {
                $headBar.append($TL("span", null, barStyle).append($T("input", null,
                    {"border": "none", "margin-right": "70px", "height": "65%"}, null,
                    {"type": "text"})));
            }
            return $headBar;
        },

        build: function(config){
            init(config);
            for (var i = 0; i < desObj.length; i++) {
                var head = createHeadBar.buildHeadBar();
                $(desObj[i]).append(head);
            }
        }
    };

    var helpGirl = {
        girl:"",
        girlComment:(function(){
            return $T("div", "熊猫眼又加重了，注意休息下眼睛哦", {"margin":"5px 5px 0 5px"})
        })(),
        /**
         * 样式
         */
        personStyle:{
            "position":"absolute",
            "width":"85px",
            "height":"152px",
            "z-index":"999",
            "left":"760px",
            "top":"500px"
        },

        /**
         * 替换内容，用户菜单的选择和内容的切换
         * @param $j
         */
        replaceCont: function($j){
            helpGirl.girlComment.text("");
            helpGirl.girlComment.append($j);
        },
        /**
         * 创建人物形象
         * @returns {*|jQuery|HTMLElement}
         */
        createPerson: function(){
            var $person = $T("div", null, {"width":"100%","height":"100%",
            "-moz-user-select":"none",
            "-webkit-user-select": "none"});
            $person.css("background",
                    "url(../image/face1.gif)" +
                    " no-repeat scroll 50% 0% transparent")

            return $person;
        },

        /**
         * 帮助女孩的开始菜单
         * @returns {*|jQuery|HTMLElement}
         */
        helpMenu:function(){
            var $menu = $T("div");
            $menu.append($T("div", "欢迎来到魔法小站"));

            var $menuContent = $T("div",null);
            $menuContent
                .append($T("div")
                    .append(helpGirl.navSpan())
                    .append(helpGirl.chartSpan()))
                .append($T("div")
                    .append(helpGirl.searchSpan())
                    .append($T("span",null,{"padding-left":"20px","cursor":"pointer"}).append($T("a","弄点歌听"))))
                .append($T("div")
                    .append(helpGirl.closeGirlSpan()));

            $menu.append($menuContent);

            return $menu;
        },

        navSpan: function(){
            var $nav = $T("span",null,{"padding-left":"20px","cursor":"pointer"}).append($T("a","网站导航"));

            var $navCont = $T("div", null,{"line-height":"18px","padding":"10px"});

            var len = data.length;
            for(var i = 0; i < len; i++){
                $navCont.append($T("div").append(
                    $T("a", (i+1) + "." + data[i][conf.item], null, null, {
                        "href":data[i][conf.url]
                    })
                ));
            }

            $nav.click(function(){
               helpGirl.replaceCont($navCont);
            });

            return $nav;
        },

        /**
         * 对话消息按照的一定的形式封装主要增加时间及区分用户和正文格式
         * @param user
         * @param message
         * @returns {*|jQuery|HTMLElement}
         */
        messageWrap: function(user, message){
            var head = user + " [" + (new Date().toLocaleTimeString()) + "]";
            var $msg = $T("div", null, {"line-height":"15px"});
            $msg.append($T("div", head, {"color":"#3b536a"}))
                .append($T("div",message, {"color":"#333333"}));

            return $msg;
        },

        /**
         * 对话的菜单选项，单击后将内容替换为对话框，包括输入和展示区
         * @returns {*}
         */
        chartSpan: function(){
            var $chart = $T("span",null,{"padding-left":"20px","cursor":"pointer"}).append($T("a","我想聊天"));

            var $chartDialog = $T("div",null,{"overflow":"hidden"}),
                $panel = $T("div"),
                $input=$T("textarea",null, {"margin-bottom": "0"});

            $chartDialog.append($T($panel, null, {"height":"100px","background":"#ffffff"}));

            $chartDialog.append($T("div",null,{"height":"10px"}));

            $chartDialog.append($T($input, null,
                {"border":"none","width":"100%","height":"50px","resize":"none","font-size":"12px"}, null,
                {"type":"text","placeholder":"说点什么吧.."}));

            $chartDialog.append($T("div",null,
                {"position":"relative","top":"-10px"}).append(
                $TL("span","\"Ctrl+enter\"键发送")
            ));

            $chart.click(function(){
                helpGirl.replaceCont($chartDialog);
            });

            $input.keydown(function(evt){
                var e = evt ? evt: (window.event ? window.event : null);
                if(e && e.keyCode == 13 && e.ctrlKey){
                    $panel.append(helpGirl.messageWrap("我", $input.val()));
                    $input.val("");
                }
            });

            return $chart;
        },

        /**
         * 关闭帮助Girl
         * @returns {*}
         */
        closeGirlSpan: function(){
            var $span = $T("span",null,{"padding-left":"20px","cursor":"pointer"}).append($T("a","关闭小魔"));
            $span.click(function(){
               if(null != helpGirl.girl){
                   helpGirl.girl.css("display","none");
               }
            });
            return $span;
        },

        /**
         * 搜索
         * @returns {*}
         */
        searchSpan: function(){
            var $span = $T("span",null,{"padding-left":"20px","cursor":"pointer"}).append($T("a","技术搜索"));

            $span.click(function(){
                var $search = $T("div",null,{"margin-left":"5%"});
                var $searchSpan = $T("input", null, {"border":"none"}, null,
                    {"type":"text","placeholder":"搜点什么呢.."});

                $searchSpan.keydown(function(evt){
                    var e = evt ? evt: (window.event ? window.event : null)
                    if(e && e.keyCode == 13){
                        alert($searchSpan.val());
                    }
                });

                $search.append($searchSpan);
                $search.append("<br>");
                $search.append($T(getIcon("search", "true"),null,{"cursor":"pointer"}).click(
                    function(){
                        alert($searchSpan.val())
                    }
                ));
                helpGirl.replaceCont($search);
            });

            return $span;
        },

        /**
         * 对话面板
         * @returns {*|jQuery|HTMLElement}
         */
        createDialog: function(){
            var $dialog = $T("div", null, {
                "background":"#CE9871",
                "position": "absolute",
                "font-size":"12px",
                "top": "0px",
                "left": "-205px",
                "width": "200px",
                "line-height": "23px",
                "text-align": "left",
                "border-radius": "6px",
                "opacity":"0.9"
            });

            var $menuTag = $TL("span",null,
                {"margin-right":"10px","cursor":"pointer","height":"20px"})
                .append($T("a", "menu", {"font-size":"14px"}, null));

            $menuTag.click(function(){
                helpGirl.replaceCont(helpGirl.helpMenu());
            });

            $dialog.append(helpGirl.girlComment);
            $dialog.append($T("div").append($menuTag));

            return $dialog;
        },

        /**
         * 创建那个女孩
         * @param config
         */
        build: function(config){
            init(config);

            var $girl = $T("div",null,helpGirl.personStyle);
            helpGirl.girl = $girl;

            var $person = helpGirl.createPerson();

            $girl.append($person);
            $girl.append(helpGirl.createDialog());

            //鼠标拖拽功能
            $person.mousedown(function(evt){
                //与IE的兼容性
                var e = evt ? evt: (window.event ? window.event : null);
                var $this = $(this);
                var isMove = true;
                var abs_x = e.clientX - $this.offset().left;
                var abs_y = e.clientY - $this.offset().top;
                $(document).mousemove(function(evt){
                    var e = evt ? evt: (window.event ? window.event : null);
                    if(isMove) {
                        $girl.css({
                            'left':e.clientX - abs_x + "px",
                            'top':e.clientY - abs_y + "px"
                        });
                    }
                }).mouseup(function(){
                    isMove = false;
                });
            });

            for (var i = 0; i < desObj.length; i++) {
                $(desObj[i]).append($girl);
            }
        }
    };


    return {
        globalInit: globalInit,
        createArticleListWindow: createArticleListWindow.build,
        createHeadBar: createHeadBar.build,
        helpGirl: helpGirl.build
    }
});