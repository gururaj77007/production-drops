import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from "../../../firebase/firebaseapp";
import { decode } from 'next-auth/jwt';

export const authOptions = {
    // Configure one or more authentication providers
    
    pages: {
      signIn: '/Sign-in'
    },
    providers:[
      CredentialsProvider({
        name: 'Credentials',
        credentials: {},
        async authorize(credentials) {
          
          try {
            const userCredential = await signInWithEmailAndPassword(auth, credentials.email || '', credentials.password || '');
            if (userCredential.user) {
             
              return userCredential.user;
            }
            return null;
          } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            // Handle error
            console.error(error);
            return null;
          }
        },
      //  async profile(profile) {
      //     await auth.currentUser.getIdTokenResult()
      //   .then((tokenResult) => {
      //     if (tokenResult.claims) {
      //       console.log("user in profile")
            
            
          
      //      return { role:  tokenResult.claims.role , ...profile }
      //     }
      //   })
          
        
      //   }
        
      })
    ],
   
    
    callbacks: {
     async jwt({ token, user }) {
      console.log(user)
      await auth.currentUser.getIdTokenResult()
        .then((tokenResult) => {
          if (tokenResult.claims) {
            console.log(tokenResult.claims.role)
            if(user) token.role = tokenResult.claims.role
           
            // session.user.role = tokenResult.claims.role
          }
        })
      
        
        return token
      },
  //  async session({ session, user }) {
      
  //    await auth.currentUser.getIdTokenResult()
  //       .then((tokenResult) => {
  //         if (tokenResult.claims) {
            
           
  //           session.user.role = tokenResult.claims.role
  //         }
  //       })
      
      
  //     return session
  //   }
  },
  secret: process.env.NEXTAUTH_SECRET

  
  };
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }