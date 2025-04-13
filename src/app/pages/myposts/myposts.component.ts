import { UsersService } from './../../core/services/users/users.service';
import { AfterViewInit, Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { PostsService } from '../../core/services/posts/posts.service';
import { Iposts } from '../../shared/interfaces/iposts';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-myposts',
  imports: [RouterLink,DatePipe],
  templateUrl: './myposts.component.html',
  styleUrl: './myposts.component.scss'
})
export class MypostsComponent implements OnInit  {

  private readonly postsService=inject(PostsService)
  private readonly usersService=inject(UsersService)
  private readonly flowbiteService=inject(FlowbiteService)
  private readonly formBuilder=inject(FormBuilder)



  userId!:string
  

  postsData:Iposts[]=[]




  ngOnInit(): void {
      this.getUserId()
    
      

  }

 



  getUserId():void{
    this.usersService.getLoggedUserData().subscribe({
      next:(res)=>{
        console.log(res);
        this.userId=res.user._id
        console.log(this.userId);
        this.getMyPosts();
        

        
      }
    })
  }


  getMyPosts():void{
    this.postsService.getUserPosts(this.userId).subscribe({
      next:(res)=>{
        console.log(res);
        this.postsData=res.posts

        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }








}
