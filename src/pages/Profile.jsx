import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

function Profile() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setEmail(user.email);

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (data) {
      setFullName(data.full_name);
    }
  }

  async function updateProfile(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
      })
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile Updated Successfully");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Profile</h1>

      <form onSubmit={updateProfile}>
        <label>Full Name</label>
        <br />
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <br />
        <br />

        <label>Email</label>
        <br />
        <input type="email" value={email} disabled />

        <br />
        <br />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;