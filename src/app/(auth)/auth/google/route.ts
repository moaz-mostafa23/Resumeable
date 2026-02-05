import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  const requestCookies = request.headers.get("cookie") ?? "";

  // Collect cookies that Supabase wants to set so we can apply them to the redirect response
  const cookiesToSet: { name: string; value: string; options: CookieOptions }[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Parse cookies from the incoming request
          return requestCookies.split(";").reduce((acc, cookie) => {
            const [name, ...rest] = cookie.trim().split("=");
            if (name) {
              acc.push({ name, value: rest.join("=") });
            }
            return acc;
          }, [] as { name: string; value: string }[]);
        },
        setAll(cookies: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.push(...cookies);
        },
      },
    }
  );

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/callback`,
    },
  });

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.url) {
    const response = NextResponse.redirect(data.url);
    // Apply the PKCE code verifier cookie to the redirect response
    cookiesToSet.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
    });
    return response;
  }

  return NextResponse.redirect(`${origin}/login?error=Could not initiate OAuth`);
}
