import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            // Validate inputs
            if (!email || !password || !name) {
                throw new Error("Email, password, and name are required");
            }
            
            if (password.length < 8) {
                throw new Error("Password must be at least 8 characters long");
            }

            // Validate email format
            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Please enter a valid email address");
            }

            const userAccount = await this.account.create(ID.unique(), email, password, name);
            
            if (userAccount) {
                // Auto login after account creation
                return await this.login({email, password});
            }
            
            return null;
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            // Validate inputs
            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            const response = await this.account.createEmailPasswordSession(email, password);
            return response;
        } catch (error) {
            // Handle common login errors based on error message and type
            console.error("Login error details:", error);
            
            if (error.message?.includes('Invalid') || error.message?.includes('invalid')) {
                throw new Error("Invalid email or password. Please check your credentials.");
            } else if (error.message?.includes('not found') || error.message?.includes('user')) {
                throw new Error("User account not found. Please sign up first.");
            } else if (error.type === 'invalid_credentials' || error.code === 401) {
                throw new Error("Invalid email or password. Please check your credentials.");
            }
            
            // Re-throw with original message if no specific match
            throw new Error(error.message || "Login failed. Please try again.");
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // Only log non-401 errors (401 is expected when not logged in)
            if (error.code !== 401 && error.type !== 'user_unauthorized') {
                console.log("Appwrite service :: getCurrentUser :: error", error);
            }
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
            return false;
        }
    }
}

const authService = new AuthService();

export default authService