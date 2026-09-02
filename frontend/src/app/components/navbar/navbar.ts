import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  user = {
    firstName: '',
    lastName: ''
  };

  ngOnInit(): void {
    const name = localStorage.getItem('userName');

    if (name) {
      const parts = name.trim().split(' ');

      this.user.firstName = parts[0] || '';
      this.user.lastName = parts.slice(1).join(' ');
    }
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName} ${lastName}`
      .trim()
      .split(' ')
      .filter(name => name.length > 0)
      .map(name => name[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  }
}