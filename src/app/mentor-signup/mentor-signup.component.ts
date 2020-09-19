import { AuthService } from './../auth.service';
import { MentorService } from './../mentor.service';
import { TechnologyService } from './../technology.service';
import { Component } from '@angular/core';




@Component({
  selector: 'app-mentor-signup',
  templateUrl: './mentor-signup.component.html',
  styleUrls: ['./mentor-signup.component.css']
})
export class MentorSignupComponent  {
  technology$;

   tech=[];
  
  constructor(technologyService:TechnologyService,private mentorService:MentorService, private auth:AuthService) { 
  this.technology$=technologyService.getTechnologies();
  }

  addTechnology(val:boolean,key:string){
   
    if(val==true){ 
      this.tech.push(key);
    }
    else{
      this.tech.filter( te=>(te==key) ? this.tech.splice( this.tech.indexOf(te) , 1 ) : '' );
    }

  }
  submit(mentor) {
    
    let men=this.auth.createUserEmailPassword(mentor.email,mentor.password).then(men=>men.user);
    men.then(men=>this.mentorService.saveMentor(men,mentor.name));
    

    mentor.tech=this.tech;
    this.tech=[];
    delete mentor.password;
    men.then(men=>this.mentorService.createProfile(mentor,men.uid));
    
    
  }

}
