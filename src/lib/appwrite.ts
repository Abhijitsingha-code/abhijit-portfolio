import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client();

const VITE_APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const VITE_APPWRITE_PROJECT = import.meta.env.VITE_APPWRITE_PROJECT_ID || 'YOUR_PROJECT_ID';

client
    .setEndpoint(VITE_APPWRITE_ENDPOINT)
    .setProject(VITE_APPWRITE_PROJECT);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const appwriteConfig = {
    endpoint: VITE_APPWRITE_ENDPOINT,
    projectId: VITE_APPWRITE_PROJECT,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || '',
    projectsCollectionId: import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID || '',
    profileCollectionId: import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID || '',
    contactsCollectionId: import.meta.env.VITE_APPWRITE_CONTACTS_COLLECTION_ID || '',
    skillsCollectionId: import.meta.env.VITE_APPWRITE_SKILLS_COLLECTION_ID || '',
};

export default client;
