import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users/users.service';
import { UserData } from '../../shared/interfaces/userData/user-data';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-userinfo',
  imports: [DatePipe  ],
  templateUrl: './userinfo.component.html',
  styleUrl: './userinfo.component.scss'
})
export class UserinfoComponent implements OnInit {
  private readonly usersService=inject(UsersService)



    file!:File

    userData:UserData[]=[]
    userPhoto:string=''


  ngOnInit(): void {
      this.getUserData()
  }

  getUserData():void{
    this.usersService.getLoggedUserData().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message==="success"){
          this.userData = [res.user]
          this.userPhoto=res.user.photo
          this.usersService.userPic.next(res.user.photo)
        }
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }

  onFileSelected(event: Event): void {
    console.log(event);
    
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.changeProfilePhoto();
    }
  }



  
  changeProfilePhoto():void{
    this.usersService.uploadProfilePhoto(this.file).subscribe({
      next:(res)=>{
        console.log(res);
        this.getUserData()
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }


}
