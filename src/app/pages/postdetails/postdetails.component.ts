import { AfterViewInit, Component, inject, Input, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Iposts } from '../../shared/interfaces/iposts';
import { DatePipe } from '@angular/common';
import { CommentsService } from '../../core/services/comments/comments.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Icomment } from '../../shared/interfaces/icomment';

@Component({
  selector: 'app-postdetails',
  imports: [DatePipe ,ReactiveFormsModule ,FormsModule],
  templateUrl: './postdetails.component.html',
  styleUrl: './postdetails.component.scss'
})
export class PostdetailsComponent implements OnInit {

  private readonly postsService=inject(PostsService)
  private readonly commentsService=inject(CommentsService)
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly formBuilder=inject(FormBuilder)

  postId:string=''
  postDetails:Iposts| null=null
  showComment!:boolean
  noComment!:boolean

  commentData:Icomment={} as Icomment 

   content:string=''
   post:string=''
   post_id:string=''



   commentForm:FormGroup=this.formBuilder.group({
    content:[null],
    post:[this.post_id]
   })






  ngOnInit(): void {
      this.getPostId()
      this.getSpeceficPost()
      this.showPostComments()
      
    
      
  }






  getPostId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
        
        this.postId=params.get('id')!
        this.post=params.get('id')!
        console.log(this.post);
        this.commentForm.patchValue({post: this.post})
        

        
      }
    })
  } 

  getSpeceficPost():void{
    this.postsService.getSinglePost(this.postId).subscribe({
      next:(res)=>{
        
        if(res.message==='success'){
          this.postDetails= res.post
         
         
          
        }
        
      }
    })
  }


  showPostComments():void{
    this.commentsService.getPostComments(this.postId).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.comments.length >0){
          this.showComment=true
          this.getSpeceficPost()
        }if (res.comments.length === 0) {
          this.noComment=true
        } else {
          
        }
       
        
      },error:(err)=>{
        
        console.log(err);
        
      }
    })
  }
   
  
  submitForm():void{
    this.commentData =this.commentForm.value
    this.showPostComments()
  }



  creatComment():void{

    this.commentsService.creatComment(this.commentData).subscribe({
      next:(res)=>{
        console.log(res);
        this.submitForm()

        
        
        
      }
      
    })
  }



 

}

// const data=new FormData;
//     data.append('content' , this.content)
//     data.append('post' , this.post)
//     console.log('Posting comment for post:', this.post);