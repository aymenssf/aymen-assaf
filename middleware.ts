import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Tout sauf les fichiers statiques, l'API et les internals Next
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
