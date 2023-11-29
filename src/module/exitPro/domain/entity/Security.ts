import { ISecurity } from './ISecurity';

export class Security {
  private readonly guardId!: string;
  private readonly guardName!: string;
  private readonly guardContact!: string;

  private constructor(props: ISecurity) {
    this.guardId = props.guardId;
    this.guardName = props.guardName;
    this.guardContact = props.guardContact;
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

  public static create(props: ISecurity) {
    const security = new Security(props);
    return security;
  }
}