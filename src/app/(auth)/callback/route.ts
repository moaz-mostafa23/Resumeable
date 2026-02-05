import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const next = searchParams.get("next") ?? "/dashboard";

  // Handle OAuth errors
  if (error) {
    console.error("OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(errorDescription || error)}`
    );
  }

  if (code) {
    const cookiesToSet: { name: string; value: string; options: CookieOptions }[] = [];

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            const requestCookies = request.headers.get("cookie") ?? "";
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

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Code exchange error:", exchangeError.message);
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(exchangeError.message)}`
      );
    }

    const response = NextResponse.redirect(`${origin}${next}`);
    // Apply session cookies to the redirect response
    cookiesToSet.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
    });
    return response;
  }

  // No code received
  return NextResponse.redirect(`${origin}/login?error=No authorization code received`);
}
