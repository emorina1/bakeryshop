export interface Event {
  _id?: string;
  title: string;
  description: string;
  imageUrls: string[]; // mund të jetë edhe vetëm një URL, por për fleksibilitet e lëmë array
  createdAt?: Date;
}
