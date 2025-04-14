import { ICreatPost } from './../../shared/interfaces/icreat-post';
import { UserData } from './../../shared/interfaces/userData/user-data';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users/users.service';
import { PostsService } from '../../core/services/posts/posts.service';
import { Iposts } from '../../shared/interfaces/iposts';
import { DatePipe } from '@angular/common';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommentComponent } from "../comment/comment.component";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  imports: [DatePipe, FormsModule, ReactiveFormsModule, RouterLink, CommentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , AfterViewInit{
  private readonly usersService=inject(UsersService)
  private readonly postsService=inject(PostsService)
  private readonly flowbiteService=inject(FlowbiteService)
  private readonly formBuilder=inject(FormBuilder)
  private readonly toastrService=inject(ToastrService)
  



  userData:UserData={} as UserData;

  postsList:Iposts[]=[]


  content:string=''
  savedFile!:File

  isLoading:boolean=false
  pageNum:number=78
  currntPage:number=1
  totalPages:number=0




  postForm:FormGroup=this.formBuilder.group({
    body:[null],
    image:[null]
  })

 

  ngOnInit(): void {
    this.getPosts();
    this.getUserData();
    
  }

  ngAfterViewInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      
    });
  }

  getUserData():void{
    this.usersService.getLoggedUserData().subscribe({
      next:(res)=>{
        console.log(res);
        this.userData=res.user
        
      },error:(err)=>{
        console.log(err);}
    })
  }



  getPosts():void{
    this.postsService.getAllPosts(this.pageNum).subscribe({
      next:(res)=>{
        console.log(res);
        this.postsList=res.posts
        console.log('Post IDs:', this.postsList.map(p => p._id));
        this.currntPage = res.paginationInfo.currentPage;
        this.totalPages = res.paginationInfo.numberOfPages;
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }



  nextPage():void{
    
    if(this.currntPage<this.totalPages){
      this.isLoading=true
      this.pageNum=this.currntPage+1
     
      this.getPosts()
      setTimeout(() => {
        this.isLoading=false
      }, 600);
     
    }
     
   
   
  }
  prevPage():void{
    
    if(this.currntPage>1){
      this.isLoading=true
      this.pageNum=this.currntPage-1
      this.getPosts()
      setTimeout(() => {
        this.isLoading=false
      }, 600);
    }
    
  }





  uploadPhoto(e:Event): void{
    
    const input =e.target as HTMLInputElement;
    console.log(input.files);

    if(input.files && input.files?.length >0){
      console.log(input.files[0]);
      this.savedFile=input.files[0]
    }
    
  }





 


  newPost():void{
    const data= new FormData()

    data.append('body' , this.content)
    data.append('image' , this.savedFile)

    this.postsService.creatPost(data).subscribe({
      next:(res)=>{
        console.log(res);
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }



  getPostId():void{

  }





}
