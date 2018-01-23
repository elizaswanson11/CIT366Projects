export class Contact {
  public id: number;
  public name: string;
  public email: string;
  public phone: string;
  public group: any;
  public imageUrl: string;

  constructor(id: number, name: string, email: string, phone: string, group: any, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.group = group;
    this.imageUrl = imageUrl;
  }
}
