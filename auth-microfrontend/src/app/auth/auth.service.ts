import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'users';

  constructor() {}

  // Save user data
  saveUser(username: string, password: string): void {
    const users = this.getUsers();
    users[username] = password;
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Retrieve user data
  getUser(username: string): string | null {
    const users = this.getUsers();
    return users[username] || null;
  }

  // Validate user login
  validateUser(username: string, password: string): boolean {
    const storedPassword = this.getUser(username);
    return storedPassword === password;
  }

  // Retrieve all users
  private getUsers(): { [key: string]: string } {
    const usersJson = localStorage.getItem(this.storageKey);
    return usersJson ? JSON.parse(usersJson) : {};
  }
}
