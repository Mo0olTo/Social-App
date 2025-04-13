import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users/users.service';
import { Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly toaster=inject(ToastrService)
  private readonly formBuilder=inject(FormBuilder)
  private readonly usersService=inject(UsersService)
  private readonly router=inject(Router)

  isLoading:boolean=false


  registerForm:FormGroup=this.formBuilder.group({
    name:[null, [Validators.required]],
    email:[null, [Validators.required , Validators.email ]],
    password:[null, [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/) , Validators.min(8)]],
    rePassword:[null, [Validators.required ,]],
    dateOfBirth:[null, [Validators.required , ]],
    gender:[null, [Validators.required , ]]
  } ,{validators : this.rePassword} )


  submitForm():void{
    this.isLoading=true
    if(this.registerForm.valid){
      this.usersService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message==="success"){

            this.toaster.success('You have Registered')
            setTimeout(() => {

              this.router.navigate(['/login'])
              this.isLoading=false
            }, 700);
            
          }
          
          
        },error:(err)=>{
          console.log(err);
          this.isLoading=true
         this.toaster.error(err.error.error, "Error")
          this.isLoading=false
         
        }
      })
    }else{
      alert("Make sure you enter all register data")
      this.isLoading=false
    }
    

  }


  rePassword(group:AbstractControl){
    const password = group.get('password')?.value;
    const rePassword =group.get('rePassword')?.value;

    return password === rePassword ? null : {mismatch:true}
  }

}
