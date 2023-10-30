import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register';
import Login from '@/components/Login';
import Song from '@/components/Song';
import Songs from '@/components/Songs';
import Lyrics from '@/components/Lyrics';
import AddSong from '@/components/AddSong';

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Songs,
            redirect: '/lyrics'
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/songs/show/:id',
            name: 'song',
            component: Song
        },
        {
            path: '/songs',
            name: 'songs',
            component: Songs
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/songs/add',
            name: 'add',
            component: AddSong
        },
        {
            path: '/songs/edit/:id',
            name: 'edit',
            component: AddSong
        },
        {
            path: '/lyrics',
            name: 'lyrics',
            component: Lyrics
        },
    ]
})