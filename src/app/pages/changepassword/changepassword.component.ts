import { UsersService } from './../../core/services/users/users.service';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule , FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-changepassword',
  imports: [ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
  private readonly usersService=inject(UsersService)
  private readonly formBuilder=inject(FormBuilder)
  private readonly toaster=inject(ToastrService)




  isLoading:boolean=false;


  changePasswordForm:FormGroup= this.formBuilder.group({
    password:[null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    newPassword:[null , [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]]
  })



  



  submitForm():void{
    this.isLoading=true
    this.usersService.changePassword(this.changePasswordForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.isLoading=false
        this.toaster.success(res.message , "Success")
      },error:(err)=>{
        this.isLoading=true
        console.log(err);
        this.toaster.error(err.error.error , 'Error')
        this.isLoading=false
        
      }
    })
  }



}
