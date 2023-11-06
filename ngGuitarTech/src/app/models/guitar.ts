import { Tuning } from "./tuning";
import { User } from "./user";

export class Guitar {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  deleted: boolean;
  owner: User;
  tuning: Tuning;
  scaleLength: number;
  numberOfFrets: number;
  numberOfStrings: number;
  bridge: string;
  purchasePrice: number;
  currency: string;
  bridgePickup: string;
  middlePickup: string;
  neckPickup: string;
  serialNumber: string;
  picture: string;

  constructor(
    id: number = 0,
    make: string = "",
    model: string = "",
    year: number = 0,
    color: string = "",
    deleted: boolean = false,
    owner: User = new User(),
    tuning: Tuning = new Tuning(),
    scaleLength: number = 0.0,
    numberOfFrets: number = 0,
    numberOfStrings: number = 0,
    bridge: string = "",
    purchasePrice: number = 0.0,
    currency: string = "",
    bridgePickup: string = "",
    middlePickup: string = "",
    neckPickup: string = "",
    serialNumber: string = "",
    picture: string = ""
  ) {
    this.id = id;
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    this.deleted = deleted;
    this.owner = owner;
    this.tuning = tuning;
    this.scaleLength = scaleLength;
    this.numberOfFrets = numberOfFrets;
    this.numberOfStrings = numberOfStrings;
    this.bridge = bridge;
    this.purchasePrice = purchasePrice;
    this.currency = currency;
    this.bridgePickup = bridgePickup;
    this.middlePickup = middlePickup;
    this.neckPickup = neckPickup;
    this.serialNumber = serialNumber;
    this.picture = picture;
  }
}
