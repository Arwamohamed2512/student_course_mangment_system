import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.html',
  styleUrls: ['./courses.css'],
  standalone: false
})
export class Courses implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  searchTerm: string = '';
  isLoading: boolean = true;
  
  // متغير لمتابعة الكورس الجاري التسجيل فيه للتحكم بالـ Loading في الزر
  enrollingCourseId: string | null = null;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.isLoading = false;
      }
    });
  }

  // دالة لتصفية الكورسات حسب كلمة البحث في المربع
  get filteredCourses(): Course[] {
    if (!this.searchTerm.trim()) {
      return this.courses;
    }
    return this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // دالة طلب الانضمام للدورة (POST /enrollments)
  enroll(courseId: string | undefined, event?: Event): void {
    if (!courseId) return; // حماية في حال عدم وجود id

    if (event) {
      event.stopPropagation(); // منع فتح المودال عند الضغط على زر التسجيل داخل الكرت
    }
    
    this.enrollingCourseId = courseId;

    this.coursesService.enrollInCourse(courseId).subscribe({
      next: (response) => {
        alert('تم طلب الانضمام للدورة بنجاح!');
        this.enrollingCourseId = null;
      },
      error: (err) => {
        console.error('Error enrolling in course:', err);
        alert('حدث خطأ أثناء التسجيل، يرجى المحاولة لاحقاً.');
        this.enrollingCourseId = null;
      }
    });
  }

  openCourseDetails(course: Course): void {
    this.selectedCourse = course;
  }

  closeModal(): void {
    this.selectedCourse = null;
  }
}