export class User {
  constructor(
    private name: string,
    private firstName: string,
    private lastName: string,
    private email: string,
    private token: string,
    private localId: string,
    private expirationDate?: Date
  ) {}

  get getName() {
    return this.name;
  }

  get getfirstName() {
    return this.firstName;
  }

  get getLastName() {
    return this.lastName;
  }

  get getEmail() {
    return this.email;
  }

  get getId() {
    return this.localId;
  }

  get getExpireDate() {
    return this.expirationDate;
  }

  get getUserToken() {
    return this.token;
  }
}
