/**
 * Created by zb on 2015/1/26.
 */
define(function(){
    var getStyleValue = function(jQuery, attr){
        var ret = null,oj,css;
        if(null != jQuery && null != jQuery.get(0)) {
            oj = jQuery.get(0);
            css = (document.defaultView.getComputedStyle(oj, null));
            alert(css[attr]);
        }
        return ret;
    };

    return {
        getStyleValue : getStyleValue
    }
});