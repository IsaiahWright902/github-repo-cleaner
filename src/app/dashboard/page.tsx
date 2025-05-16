import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/DasboardNav/DashboardNav";
import RepoList from "@/components/RepoList/RepoList";
import { Stack } from "@mui/material";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <DashboardNav />
      <Stack padding={4}>
        <RepoList />
      </Stack>
    </>
  );
}
