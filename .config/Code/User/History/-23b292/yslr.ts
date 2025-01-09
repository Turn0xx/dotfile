export class CompanyClient implements Client {
  constructor(
    id,
    email,
    password,
    phoneNumber,
    createdAt,
    organizationName,
    organizationAddress,
    username,
  ) {
    super(id, email, password, phoneNumber, createdAt);
    this.organizationName = organizationName;
    this.organizationAddress = organizationAddress;
    this.username = username;
  }
  static fromJson(json) {
    return new CompanyClient(
      json.id,
      Email.fromValue(json.email),
      Password.fromValue(json.password),
      PhoneNumber.fromValue(json.phoneNumber),
      json.createdAt,
      json.organizationName,
      json.organizationAddress,
      json.username,
    );
  }
}
