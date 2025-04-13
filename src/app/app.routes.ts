import { RenderMode } from '@angular/ssr';
import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth/auth.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './layouts/main/main/main.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { loginGuard } from './core/guards/login.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { PostdetailsComponent } from './pages/postdetails/postdetails.component';

export const routes: Routes = [
    {path:'' , redirectTo:'home' , pathMatch:'full'},

    {path:'' ,component:AuthComponent , canActivate:[(loggedGuard)], title:'Auth' , children:[
        {path:'register' ,component:RegisterComponent , title:'Register'},
        {path:'login' , component:LoginComponent , title:'Login'},
        
        
    ]},

    {path:'' , component:MainComponent , canActivate:[(loginGuard)] , children:[
        {path:'home' , loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent) , title:"Home"},
        {path:'changepassword' ,loadComponent:()=>import('./pages/changepassword/changepassword.component').then((c)=>c.ChangepasswordComponent) , title:'Change-Password'},
        {path:'myposts' ,loadComponent:()=>import('./pages/myposts/myposts.component').then((c)=>c.MypostsComponent) , title:'My Posts'},
        {path:'userinfo' ,loadComponent:()=>import('./pages/userinfo/userinfo.component').then((c)=>c.UserinfoComponent) , title:'User-Profile' ,children:[
            
        ]},
        {path:'post/:id' , component:PostdetailsComponent , data:{ rendermode: 'no-prerender' }},
        {path:'**' , loadComponent:()=>import('./pages/notfound/notfound.component').then((c)=>c.NotfoundComponent)}


        
    ]}
];
//  , loadComponent:()=>import('./pages/postdetails/postdetails.component').then((c)=>c.PostdetailsComponent