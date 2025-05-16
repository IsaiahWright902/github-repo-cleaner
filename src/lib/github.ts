import { GithubRepo } from "@/types/types"

export async function fetchUserRepos(accessToken: string): Promise<GithubRepo[]> {
    const response = await fetch("https://api.github.com/user/repos?per_page=200", {
        headers: {
            Authorization: `token ${accessToken}`,
            Accept: "application/vnd.github.v3+json"
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch repositories");
    }

    return response.json()
}


export async function deleteRepository(accessToken: string, repoFullName: string): Promise<boolean> {
    const response = await fetch(`https://api.github.com/repos/${repoFullName}`, {
        method: "DELETE",
        headers: {
            Authorization: `token ${accessToken}`,
            Accept: "application/vnd.github.v3+json"
        }
    })

    return response.status === 204;
}