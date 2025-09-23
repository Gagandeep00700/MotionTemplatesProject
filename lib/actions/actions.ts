import { supabase } from "@/app/supabaseClient";
export async function uploadProfilePic(user_ID:string,pfp:File)
{
    const fileName=pfp.name
    const path=`/Profile_Pics/${user_ID}_${fileName}`
    const {data,error}=await supabase.storage.from('Profile_Pics').upload(path,pfp)
    if(error) throw error;
    
    const { data: urlData } = supabase
  .storage
  .from('Profile_Pics')
  .getPublicUrl(path);

console.log(urlData.publicUrl);
return urlData.publicUrl
}