import React,{ Component } from 'react'
import Layout from '../../layouts/default'
import { request } from '../../lib'
import { Link } from 'react-router-dom'
import {
    Tabs,
    Badge
} from 'antd'
import moment from 'moment'
const TabPane = Tabs.TabPane
const DPlayer = window.DPlayer
const site = 'http://www.dnitu.top/'

import 'moment/locale/zh-cn'

moment.locale('zh-cn')

const callback = (key) =>{
    console.log(key)
}

export default class Detail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            movie: null,
            relativeMovies: [],
            _id: this.props.match.params.id
        }
    }
    componentDidMount () {
        this._getMovieDetail()
    }
    _getMovieDetail = () =>{
        request({
            method: 'get',
            url: `/api/v0/movies/${this.state._id}`
        }).then(res => {
            console.log('res',res)
            const movie = res.movie
            const relativeMovies = res.relativeMovies
            const video = site + movie.videoKey
            const pic = site + movie.coverKey
            console.log(movie.meta.createdAt)
            this.setState({
                movie,
                relativeMovies
            },()=>{
                this.player = new DPlayer({
                    container: document.getElementById('videoPlayer'),
                    screenshot:true,
                    video:{
                        url:video,
                        pic:pic,
                        thumbnails:pic
                    }
                })
            })
        }).catch(()=>{
            this.setState({
                movie: {}
            })
            this.props.history.goBack()
        })
    }
    render(){
        const { movie,relativeMovies } = this.state
        if(!movie) return null
        return (
            <div className='flex-row full'>
                <div className='page-shade'>
                    <div className="video-wrapper">
                        <div id="videoPlayer" src={site + movie.coverKey}
                            data-video={site + movie.videoKey} />
                        <div className='video-sidebar'>
                            <Link className='homeLink' to={'/'}>回到首页</Link>
                            <Tabs defaultActiveKey='1' onChange={callback}>
                                <TabPane tab='关于本篇' key='1'>
                                    <h1>{movie.title}</h1>
                                    <dl>
                                        <dt>评分: <Badge count={movie.rate} style={{backgroundColor:'#52c41a'}} />分</dt>
                                        <dt>电影分类：{movie.tags && movie.tags.join(' ')}</dt>
                                        <dt>更新时间：{movie.meta && movie.meta.createdAt && moment(movie.meta.createdAt).fromNow()}</dt>
                                        <dt>影片介绍：</dt>
                                        <dt>{movie.summary}</dt>
                                    </dl>
                                </TabPane>
                                <TabPane tab='同类电影' key='2'>
                                    { 
                                        relativeMovies.map(item => {
                                            return <Link key={item._id} className='media' to={`/detail/${item._id}`}>
                                                <img width='60' className='align-self-center mr-3' src={site + item.posterKey} />
                                                <div className='media-body'>
                                                    <h6 className='media-title'>{item.title}</h6>
                                                    <ul className='list-unstyled'>
                                                        {
                                                            item.pubdate && item.pubdate.map((it,i) => (
                                                                <li key={i}>{moment(it.date).fromNow('YYYY.MM')} {it.country}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </Link>
                                        })
                                    }
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}