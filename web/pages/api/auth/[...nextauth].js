import NextAuth from 'next-auth';
import KeycloakProvider from "next-auth/providers/keycloak";

export default NextAuth({
  providers: [
    // OAuth authentication providers...
    KeycloakProvider({
        clientId: "account",
        clientSecret: "afc4b677-8040-42cb-b4b1-8d5837d78af3",
        issuer: "http://0.0.0.0:8080/auth/realms/nftmarketplace/protocol/openid-connect/",
    }),
  ]
})