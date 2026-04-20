# MERN Interview Assignment – Mini CRM

**GitHub Repository:** https://github.com/ahanas2004/internship.git
**Live Frontend Application (Netlify):** `[Insert your Netlify Link Here]`
**Live Backend API (Render/Railway):** `[Insert your Backend Link Here]`

## Authorization & Security Logic Explanation
The application is fortified using a highly secure, stateless **JWT (JSON Web Token)** architecture alongside `bcrypt` for password hashing. The authorization flow operates as follows:

1. **Authentication (Backend):** When a user logs in, the Node/Express server uses `bcrypt` to verify the hashed database credentials against the provided string. If valid, the backend securely generates and signs a JWT containing the user's explicit `_id`, which is returned to the client as an access token.
2. **Session Storage (Frontend):** The React frontend captures this access token and caches it persistently inside local storage alongside the user metadata. A global React Context variable broadcasts the user's authentication state to all private routes so the UI instantly reacts to their login status.
3. **Protected Boundaries:** 
   - **Frontend:** Any attempt to access the Dashboard, Leads, or Tasks pages by an unauthenticated user immediately hits a React Router `<ProtectedRoute>` guard, instantly redirecting them back to `/login`.
   - **Backend:** I developed a custom Express `protect` middleware function. It actively intercepts all private endpoints, extracting the `Bearer` token from the request headers and validating it securely against the backend's hidden `JWT_SECRET`.
4. **Axios Interceptor Integration:** To guarantee the UI dynamically adheres to this strict synchronization without rewriting manual headers, the entire frontend utilizes a custom **Axios Request Interceptor**. This globally ensures that every single network call automatically dynamically attaches the JWT, providing seamless, tamper-proof state resolution natively and preventing unauthorized database tampering.

## Features Profile
- **Strict Compliance:** The application strictly uses React, React Router, Axios, and Material UI on the client, interfacing flawlessly with Node.js, Express, and MongoDB Mongoose.
- **Advanced State Management:** Custom search debouncing and automatic state-reset architecture scales down database load on Search filters.
- **Premium UX Design:** Built with a modern "Premium Light Glassmorphism" design system using `Framer Motion` and clean `Material UI` overrides for a highly responsive, polished aesthetic. 
