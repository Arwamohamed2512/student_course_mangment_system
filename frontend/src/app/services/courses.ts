import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/api/courses';
  private enrollUrl = 'http://localhost:3000/api/enrollments';

  constructor(private http: HttpClient) { }

  // 1. جلب جميع الكورسات
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // 2. جلب تفاصيل كورس معين عن طريق الـ ID
  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  // 3. البحث في الكورسات من السيرفر (GET /courses/search)
  searchCourses(query: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/search?q=${query}`);
  }

  // 4. طلب الانضمام للدورة (POST /enrollments)
  enrollInCourse(courseId: string): Observable<any> {
    return this.http.post<any>(this.enrollUrl, { courseId });
  }
}
