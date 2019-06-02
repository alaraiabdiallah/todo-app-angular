import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser:any;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.setCurrentUser(null)
    this.afAuth.authState.subscribe(user => {
      this.setCurrentUser(user)
    })
  }

  async login(credential): Promise<any> {
    const { email, password } = credential
    const afAuth = this.afAuth.auth 
    try {
      this._validateForm(email,password)
      const res = await afAuth.signInWithEmailAndPassword(email, password)
      this.setCurrentUser(afAuth.currentUser)
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  isGuest(): boolean {
    return (this.getCurrentUser() == null) ? true : false
  }

  redirectWhenUnauthenticated(){
    this.afAuth.authState.subscribe(user => {
      if(!user) this.router.navigate(['/'])
    })
  }

  async register(credential): Promise<any> {
    const { email, password } = credential
    const afAuth = this.afAuth.auth
    try {
      this._validateForm(email,password)
      const res = await afAuth.createUserWithEmailAndPassword(email, password)
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  }


  async logout(): Promise<any> {
    try {
      const res = await this.afAuth.auth.signOut()
      sessionStorage.removeItem('currentUser')
      return Promise.resolve(res)
    } catch (err) {
      return Promise.reject(err)
    }
  }


  setCurrentUser(user): void{
    if (user)
      sessionStorage.setItem('currentUser', JSON.stringify(user))
    this.currentUser = this._getUserFromCache();
  }

  getCurrentUser(): any{
    return this.currentUser;
  }

  private _getUserFromCache(): any {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }

  private _validateForm(email,password): void{
    if (email == '') {
      throw { code: 'auth/email-empty', message: 'Please type your email!' }
    } else if (password == '') {
      throw { code: 'auth/password-empty', message: 'Please type your password!' }
    }
  }
}
