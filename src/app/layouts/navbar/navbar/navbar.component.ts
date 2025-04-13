import { UserData } from './../../../shared/interfaces/userData/user-data';
import { AfterViewInit, Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../../core/services/users/users.service';
import { unsubscribe } from 'diagnostics_channel';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink , RouterLinkActive ,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit ,AfterViewInit {

  private readonly flowbiteService=inject(FlowbiteService)
  private readonly usersService=inject(UsersService)

  userData:UserData[]=[]
  
  isLogin=input<boolean>(true)
  sub!:Subscription;
  userPic:string=''

  ngOnInit(): void {
    
      this.getUserData()
      
      this.usersService.userPic.subscribe({
        next:(data)=>{
          this.userPic=data;
         }
      })
      
     
  }

  ngAfterViewInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      
    });
  }
  

  getUserData():void{
    this.sub= this.usersService.getLoggedUserData().subscribe({
      next:(res)=>{
        
        if(res.message==="success"){
          this.userData = [res.user]
          this.usersService.userPic.next(res.user.photo)
        }
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }




}
