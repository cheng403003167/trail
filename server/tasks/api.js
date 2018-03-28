

const rp = require('request-promise-native');

async function fetchMovie(item){
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url);
    return res;
}

(async ()=>{
    let movies = [
        { doubanId: 1485260,
            title: '本杰明·巴顿奇事',
            rate: 8.8,
            poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2192535722.jpg' 
        },
        { doubanId: 26387939,
            title: '摔跤吧！爸爸',
            rate: 9.1,
            poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2457983084.jpg'
         }
    ];
    movies.map(async movie =>{
        let movieData = await fetchMovie(movie);
        try{
            movieData = JSON.parse(movieData);
            console.log(movieData.tag);
            
        }catch(err){
            console.log(err);
            
        }
        
    })
})()