import { User } from './../Model/User';
import { AuthConfigService } from './../Service/auth-config.service';
import { UserAuthService } from './../Service/user-auth.service';
import { Component, Injector  } from '@angular/core';
import {  Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionPopupComponent } from '../inscription-popup/inscription-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userAuthService:UserAuthService,private authConfigService:AuthConfigService,private r:Router,private injector: Injector){}

  openPopup(): void {
    const dialog = this.injector.get(MatDialog);
    dialog.open(InscriptionPopupComponent, {
      width: '800px'
    });
  }
  

  user!:User;
  
  ngOnInit(){
    this.openPopup();
  }
  
  login(t7:NgForm){
   this.user=new User();
   this.user.email=t7.controls["email"].value;
   this.user.motDePasse=t7.controls["password"].value;
   this.userAuthService.login(this.user)
   .subscribe((data)=>{console.log(data);
   console.log(data.user);
   this.authConfigService.setToken(data.token)
   this.authConfigService.setType(data.user.type)
  this.authConfigService.setEmail(data.user.email)
  
  if(data.user.type=="Coach"){
    this.r.navigate(['/homeCoach']);
  }
  else if(data.user.type=="StaffMedical"){
    this.r.navigate(['/homeMedical']);
  }
  else if(data.user.type=="StaffPhysique"){
    this.r.navigate(['/homeprepphysique']);
  }
  else {
    this.r.navigate(['/homeDirecteur']);
  }
   
   },
  )
  }
  
  
 
}
