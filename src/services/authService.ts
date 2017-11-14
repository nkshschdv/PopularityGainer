
import { User } from './../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import {ToastController }  from 'ionic-angular';


@Injectable()

export class AuthService {
    user = { } as User;
    public token :boolean;



    constructor(
        private afAuth: AngularFireAuth,
        private Toast: ToastController,
    ) {}


    async setAuthentication(user: User){
        try{
            const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
            return {uid: result.uid , email: result.email};
        }
        catch(e)
        {
            const toast = this.Toast.create({
                message: e.message,
                position:'bottom',
                duration: 1000
              });
              toast.present();
            return e;
        }
    }


    async checkAuthentication(user: User){
        try{
            const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
              return {uid: result.uid , email: result.email};

        }
        catch(e)
        {
            console.log(e.message);
            return e.message;
        }
    }


    async removetheloginSignup()
    {
        if(this.token == true)
        {
            this.token = false;

        }
        else
        {
          this.token = true;
        }
    }

    async setTheToken()
    {
      this.token = true;
    }


    async checkTheToken()
    {
      return this.token;
    }

    async logout(){
      this.afAuth.auth.signOut();
    }


}
