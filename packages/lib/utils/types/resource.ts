export default interface Resource {
  _id: string; // monkey patch for queries on list endpoints
  id: string;
  object: string;
  created: number;
  test: boolean;
}
