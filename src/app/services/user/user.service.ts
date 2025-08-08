import { Injectable } from '@angular/core';
import { UserForm } from '../../interfaces/user/userForm.model';
import { User } from '../../interfaces/user/user.model';
const api_user = 'https://localhost:7228/api/Auth/Register';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  async createUser(user: UserForm): Promise<User> {
    const response = await fetch(api_user, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const body = await response.json();
    if (response.ok){
      return body as User;
    }else {
      throw new Error(body)
    }
  }
}
