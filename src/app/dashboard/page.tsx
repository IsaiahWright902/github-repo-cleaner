import AuthButton from "@/components/AuthButton/AuthButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { fetchUserRepos } from "@/lib/github";
import DashboardNav from "@/components/DasboardNav/DashboardNav";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  let repos: any = [];
  let error = null;

  try {
    repos = await fetchUserRepos(session.accessToken!);
  } catch (e) {
    error = "Failed to laod repositories. Please try again.";
    console.log(error);
  }

  return (
    <>
      <DashboardNav />

      {repos.map((repo: any) => (
        <div key={repo.id}>
          <p>{repo?.full_name}</p>
          <p>Language: {repo?.language}</p>
        </div>
      ))}
    </>
  );
}
