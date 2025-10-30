import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { follower_id, following_id } = await req.json();

    if (!follower_id || !following_id) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY!);

    // check if already followed
    const { data: existing } = await supabase
      .from("follows")
      .select("*")
      .eq("follower_id", follower_id)
      .eq("following_id", following_id)
      .single();

    if (existing) {
      // Unfollow
      const { error: unfollowError } = await supabase
        .from("follows")
        .delete()
        .eq("follower_id", follower_id)
        .eq("following_id", following_id);

      if (unfollowError) throw unfollowError;
      return NextResponse.json({ message: "Unfollowed", followed: false });
    }

    // Follow
    const { error: followError } = await supabase
      .from("follows")
      .insert([{ follower_id, following_id }]);

    if (followError) throw followError;

    return NextResponse.json({ message: "Followed", followed: true });
  } catch (error: any) {
    console.error("Error in /api/follow:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
