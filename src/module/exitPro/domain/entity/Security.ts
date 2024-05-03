import { ISecurity } from './ISecurity';

export class Security {
  private readonly guardId!: string;
  private readonly guardName!: string;
  private readonly guardContact!: string;
  private readonly otp?: string;

  private constructor(props: ISecurity) {
    this.guardId = props.guardId;
    this.guardName = props.guardName;
    this.guardContact = props.guardContact;
    this.otp = props.otp;
  }

  get getGuardId(): string {
    return this.guardId;
  }

  get getGuardName(): string {
    return this.guardName;
  }

  get getGuardContact(): string {
    return this.guardContact;
  }

  get getOtp(): string | undefined {
    return this.otp;
  }

  public static create(props: ISecurity) {
    const security = new Security(props);
    return security;
  }
}
