const upDate = require('../oss/oss.js');
const path = require('path');
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
function downData(url,fiel,movie){
    return upDate(url).then(res=>{
        movie[fiel] = res.name;
        console.log(res.name)
    }).catch(function(err){
        console.log(err);
    })
};
;(async () => {
    let movies = await Movie.find({
        $or:[
            {videoKey:{$exists:false}},
            {videoKey:null},
            {videoKey:''}
        ]
    });
    for(let i = 0;i< movies.length;i++){
        let movie = movies[i];
        if(movie.video && !movie.videoKey){
            await Promise.all([
                downData(movie.video,'videoKey',movie),
                downData(movie.cover,'coverKey',movie),
                downData(movie.poster,'posterKey',movie)
            ]).then(function(){
                movie.save();
            }).catch(err=>{
                console.log(err);
            })
        }
    };
})()