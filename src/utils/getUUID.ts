import { v4 as uuid } from "uuid";

export const uuidFromUuidV4: any = () => {
  const newUuid = uuid();
  return newUuid;
};
