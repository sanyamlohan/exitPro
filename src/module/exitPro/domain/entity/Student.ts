import { IStudent } from './IStudent';

export class Student {
  private readonly roll_number!: number;
  private readonly name!: string;
  private readonly contact!: string;
  private readonly hostel!: string;
  private readonly room_number!: number;

  private constructor(props: IStudent) {
    this.roll_number = props.roll_number;
    this.name = props.name;
    this.contact = props.contact;
    this.hostel = props.hostel;
    this.room_number = props.room_number;
  }

  get getRollNumber(): number {
    return this.roll_number;
  }

  get getName(): string {
    return this.name;
  }

  get getContact(): string {
    return this.contact;
  }

  get getHostel(): string {
    return this.hostel;
  }

  get getRoomNumber(): number {
    return this.room_number;
  }

  public static create(props: IStudent) {
    const student = new Student(props);
    return student;
  }
}
