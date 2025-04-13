import { UsersService } from './../../core/services/users/users.service';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly toaster=inject(ToastrService)
  private readonly formBuilder=inject(FormBuilder)
  private readonly usersService=inject(UsersService)
  private readonly router=inject(Router)

  isLoading:boolean=false




 loginForm:FormGroup=this.formBuilder.group({
   
    email:[null, [Validators.required , Validators.email ]],
    password:[null, [Validators.required ,  ]],
    
  }  )



  submitForm():void{
    this.isLoading=true
    this.usersService.signIn(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message==="success"){
          localStorage.setItem('socialToken', res.token)
          this.toaster.success('login Done')
          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 600);
          
          this.isLoading=false
        }
        
      }, error:(err)=>{
        this.isLoading=true
        console.log(err);
        this.toaster.error("invalid Email or Password",'Error')
        this.isLoading=false
      }
    })
  }

}
