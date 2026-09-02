import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {

  isEditing = false;

  student = {
    fullName: localStorage.getItem('userName') || 'Ahmed',
    studentId: 'STU-2026-001',
    email: 'ahmed@example.com',
    role: 'Student',
    status: 'Active Student',
    department: 'Computer Science',
    level: 'Level 3',
    phone: '+20 100 000 0000',
    age: 20,
    gpa: 3.5
  };

  editStudent = { ...this.student };

  editProfile(): void {
    this.editStudent = { ...this.student };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.editStudent = { ...this.student };
    this.isEditing = false;
  }

  saveProfile(): void {

    if (!this.editStudent.email.includes('@')) {
      return;
    }

    this.student = { ...this.editStudent };

    localStorage.setItem(
      'userName',
      this.student.fullName
    );

    this.isEditing = false;
    alert('✅ Profile updated successfully!');
  }
}