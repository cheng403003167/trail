const puppeteer = require('puppeteer');
const base = 'https://movie.douban.com/subject/';
const doubanId = '26387939'
const videoBase = `href="https://movie.douban.com/trailer/228429/#content"`
const sleep = time=> new Promise(resolve =>{
    setTimeout(resolve,time)
});


console.log('Start visit the target page');
(async ()=>{
     const browser = await puppeteer.launch();
     const page = await browser.newPage();
     await page.goto(base+doubanId,{
         waitUntil:'networkidle2'
     })
     await sleep(1000)
    const result = await page.evaluate(()=>{
        var $ = window.$;
        var it = $('.related-pic-video');
        if(it && it.length>0){
            var link = it.attr('href');
            var cover = it.find('img').attr('src');
            return {
                link,
                cover
            }
        }
        return {};
    })

    let video;

    if(result.link){
        await page.goto(result.link,{
            waitUntil:'networkidle2'
        })
        await sleep(200);
        video = await page.evaluate(()=>{
            var $ = window.$;
            var it = $('source');
            if(it && it.length>0){
                return it.attr('src');
            }
            return '';
        })
    }

    const data = {
        video,
        doubanId,
        cover: result.cover
    }

    await browser.close();
    process.send({data})
    process.exit(0);
    
})();