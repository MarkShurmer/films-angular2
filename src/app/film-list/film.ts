// holds our film data
export class Film {
  name: string;
  company: string;
  image: string;
  url: string;

  constructor(name: string, company: string, image: string, url: string) {
    this.name = name;
    this.company = company;
    this.image = image;
    this.url = url;
  }
}
