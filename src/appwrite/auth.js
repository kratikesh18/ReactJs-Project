import conf  from "../Confo/conf";
// some appwrtie methods we need 
import { Client, Account, ID } from "appwrite";
// a class containing all the authorisation services 

export class AuthServices{

    // this is containing all the methods like login logout create user ,etc 
    // creating the client 
    client = new Client()
    account;

    //calling the constructor for initializing the object
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }


    // signup login and logout method 
    async createAccount({email, password , name}){
        // wrapping this in to the try catch block for more optimisation 
        try {
            // creating the account 
             const userAccount = await this.account.create( ID.unique(),email, password, name);
            // if the userAccount is created then we are login in else returning whatever the account is containing 
            if(userAccount){
                // other function for login
                return this.login({email,password})
            }

            else{
                return userAccount;
            }

        } catch (error) {
            throw error
        }
    }

    async login({email, password}){
        try {
            await this.account.createEmailSession(email, password)

        } catch (error) {
            throw error
        }
    }

    // getting the current user using account.get();
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error while getting current user", error)
        }
        // if find or not found whatever happpend returning the null value
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
            
        } catch (error) {
            console.log("Error Occured while Loggin out ", error)
        }
    }
}


// creating the object of the above class 
const authServices = new AuthServices();

export default authServices;
