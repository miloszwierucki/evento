import { Button, rem } from "@mantine/core";
import googleBrand from "../../assets/googleBrand.png";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useTranslation } from "react-i18next";

export const GoogleButton = ({ toLogin }: { toLogin: boolean }) => {
  const supabase = useSupabaseClient();
  const { t } = useTranslation();

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });

    if (error) {
      alert("Error logining in to Google account");
      console.log(error);
    }
  }

  async function googleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <Button
      variant="default"
      h={rem(34)}
      onClick={() => (toLogin === true ? googleSignIn() : googleSignOut())}
      leftIcon={<img src={googleBrand} style={{ width: "1rem" }} />}
    >
      {toLogin === true ? t("google.signIn") : t("google.signOut")}
    </Button>
  );
};
