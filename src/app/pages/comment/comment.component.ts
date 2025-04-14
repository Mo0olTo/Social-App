import { ToastrService } from 'ngx-toastr';
import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { CommentsService } from '../../core/services/comments/comments.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule , } from '@angular/forms';
import { Icomment } from '../../shared/interfaces/icomment';
import { ActivatedRoute } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnChanges {

  private readonly commentsService=inject(CommentsService)
  private readonly formBuilder=inject(FormBuilder)
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly toastrService=inject(ToastrService)

  @Input() postId!:string;
  content:string=''
  post:string=""
  
 

  commentData:Icomment={}as Icomment;
  commentForm!:FormGroup




  ngOnChanges(): void {
  
    
    this.commentForm=this.formBuilder.group({
      content:[null],
      post:[this.postId]
    })

    console.log(this.commentForm);
    
    this.commentsService.getPostComments(this.postId).subscribe({
      next:(res)=>{
        console.log(res);

        
      },error:(err)=>{
        console.log(err);
        
      }
    })

     
  }


  submitForm():void{
   this.commentsService.creatComment(this.commentForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.message==="success"){

        this.toastrService.success(res.message ,'Comment Added')
        this.content=''
        
      }
      
    },error:(err)=>{
      console.log(err);
      
    }
      
   })
   
  }


 


  
  
   




}
