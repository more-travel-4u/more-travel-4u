// import prisma from "./index";

// const registerUser = async (
//   email,
//   password,
//   username,
//   confirm_password
// ) => {
//   try {
//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         password,
//         username,
//         confirm_password,
//       },
//     });
//     return newUser;
//   } catch (error) {
//     console.error("error registering new user", error);
//   }
// };

// const loginUser = async (username, password) => {
//   try {
//     const loggedUser = await prisma.user.findFirst({
//       where: {
//         username,
//         password,
//       },
//     });
//     return loggedUser;
//   } catch (error) {
//     console.error("error finding user", error);
//   }
// };

import prisma from "./index";

const registerUser = async (email, password, username) => {
  try {
    if (!email || !password || !username) {
      throw new Error("Email, password, and username are required");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error registering new user:", error.message);
    throw new Error("Failed to register new user");
  }
};

const loginUser = async (username, password) => {
  try {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    console.error("Error logging in user:", error.message);
    throw new Error("Failed to login");
  }
};


async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

async function comparePassword(password, hashedPassword) {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
};