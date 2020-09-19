import { AppUser } from './models/app-user';

import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class MentorService {

  constructor(private db:AngularFireDatabase) { }

  saveMentor(mentor, mentorName){
    this.db.object('/users/'+ mentor.uid).update({
      name:mentorName,
      email:mentor.email,
      role:"M"
    });
  }

  createProfile(mentor,uid){
     this.db.object('/mentors/'+ uid).update(mentor);
  }
  getAll(){
    return this.db.list('/mentors').snapshotChanges();
  }

  
  
}
