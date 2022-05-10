import * as R from "ramda";

export const userExists = (userID, users) =>
  R.pipe(R.pluck("id"), R.includes(userID))(users);
