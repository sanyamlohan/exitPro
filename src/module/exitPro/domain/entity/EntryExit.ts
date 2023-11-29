import { IEntryExit } from './IEntryExit';

export class EntryExit {
  private readonly roll_number!: number;
  private readonly name!: string;
  private readonly contact!: string;
  private readonly hostel!: string;
  private readonly room_number!: number;
  private readonly goingTo!: string;
  private readonly outTime?: string;
  private readonly inTime?: string;

  private constructor(props: IEntryExit) {
    this.roll_number = props.roll_number;
    this.name = props.name;
    this.contact = props.contact;
    this.hostel = props.hostel;
    this.room_number = props.room_number;
    this.goingTo = props.goingTo;
    this.outTime = props.outTime;
    this.inTime = props.inTime;
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

  get getLocation(): string {
    return this.goingTo;
  }

  get getOutTime(): string | undefined {
    return this.outTime;
  }

  get getInTime(): string | undefined {
    return this.inTime;
  }

  public static create(props: IEntryExit) {
    const record = new EntryExit(props);
    return record;
  }
}
