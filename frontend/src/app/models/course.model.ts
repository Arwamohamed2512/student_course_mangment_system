export interface Course {
  _id?: string;
  title: string;
  code: string;
  description: string;
  instructor?: string;
  category?: string;
  price?: number;
  duration?: string;
  capacity?: number;
  enrolled?: number;
}