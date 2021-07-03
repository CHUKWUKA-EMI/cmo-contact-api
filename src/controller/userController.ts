import { Request, Response, Router } from "express";
import { User } from "../entity/User";

const router = Router();

export interface JsonRes {
  status: number;
  message: string;
  contact: object;
  meta: object;
}

router.post("/contacts", async (req: Request, res: Response) => {
  const { firstName, lastName, email, telephone, location, birthday, gender } =
    req.body;
  const user = new User();
  try {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.location = location;
    user.telephone = telephone;
    user.birthday = birthday;
    user.gender = gender;

    await user.save();

    const response: JsonRes = {
      status: 201,
      message: "Contact added successfuly",
      contact: user,
      meta: {},
    };
    return res
      .status(response.status)
      .json({ message: response.message, contact: response.contact });
  } catch (error) {
    const response: JsonRes = {
      status: 500,
      message: "Sorry an error occurred",
      contact: {},
      meta: error,
    };
    return res
      .status(response.status)
      .json({ message: response.message, meta: response.meta });
  }
});

router.get("/contacts", async (req: Request, res: Response) => {
  try {
    const users = await User.findAndCount();
    return res.status(200).json({ contacts: users[0], count: users[1] });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Couldnt retrieve data", meta: error });
  }
});

export default router;
