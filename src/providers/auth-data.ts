import { Injectable } from '@angular/core';

import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthData {
  fireAuth: any;
  constructor(public af: AngularFire) {
    af.auth.subscribe(user => {
      if (user) { this.fireAuth = user.auth; }
    });
  }

  // Logs the user in
  loginUser(newEmail: string, newPassword: string): any {
    return this.af.auth.login({ email: newEmail, password: newPassword });
  }

  // Sends a reset password email to the given email
  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  // Logs the current user out
  logoutUser(): any {
    return this.af.auth.logout();
  }

  // Creates a new AngularFire user
  signupUser(newEmail: string, newPassword: string): any {
    return this.af.auth.createUser({ email: newEmail, password: newPassword });
  }

  // Deletes the current user from the AngularFire database
  deleteUser() {
    this.af.auth
      .subscribe(authState => {
        authState.auth.delete()
          .then(_ => console.log('deleted user!'))
          // Is spitting errors but it's ok, account still gets deleted
          .catch(e => console.error(e))
      });
  }
}