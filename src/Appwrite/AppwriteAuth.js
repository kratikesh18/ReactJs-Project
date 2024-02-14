import { Client, Account, ID } from "appwrite";
import conf from "../Confs/conf";

const client = new Client()
  .setEndpoint(conf.appwriteUrl) // Your API Endpoint
  .setProject(conf.appwriteProjectId); // Your project ID

const account = new Account(client);

const authCreateUser = async ({ email, name, password }) => {
  try {
    const userAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    if (userAccount) {
      authLoginUser({ email, password });
    } else {
      return userAccount;
    }
  } catch (error) {
    throw error;
  }
};

const authLoginUser = async ({ email, password }) => {
  try {
    return await account.createEmailSession(email, password);
  } catch (error) {
    throw error;
  }
};

const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    throw error;
  }
  return null;
};

const authLogoutUser = async () => {
  try {
    return await account.deleteSessions();
  } catch (error) {
    throw error;
  }
};

export { authCreateUser, authLoginUser, getCurrentUser, authLogoutUser };
