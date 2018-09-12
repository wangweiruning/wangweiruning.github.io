import server from './server';
import url from './serviceAPI.config';


export function getNews(data){
    return server({
        url: url.test,
        method: 'GET',
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        dataType: "jsonp",
        data:data
    })
}