import { createServerClient } from "@supabase/ssr";
import { type EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;
    const next = searchParams.get("next") ?? "/";

    const redirectTo = request.nextUrl.clone();
    redirectTo.pathname = next;

    if (token_hash && type) {
        const cookieStore = cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { cookies: cookieStore }, // {{ edit_1 }}: Added options parameter with cookies
        );

        try {
            const { error } = await supabase.auth.verifyOtp({
                type,
                token_hash,
            });

            if (error) {
                console.error("Error verifying OTP:", error);
                redirectTo.pathname = "/auth/auth-code-error"; // Redirect to an error page
                return NextResponse.redirect(redirectTo);
            }

            return NextResponse.redirect(redirectTo);
        } catch (err) {
            console.error("Unexpected error during verification:", err);
            redirectTo.pathname = "/auth/auth-code-error"; // Redirect to an error page
            return NextResponse.redirect(redirectTo);
        }
    }

    // Redirect to an error page if token_hash or type is missing
    redirectTo.pathname = "/auth/auth-code-error";
    return NextResponse.redirect(redirectTo);
}
