import { catchAsync } from "../utils/catchAsync";

const auth = () => {
  return catchAsync(async (req, res, next) => {
    // validation
    console.log(req.headers.authorization);
    next()
  })
};

export default auth;