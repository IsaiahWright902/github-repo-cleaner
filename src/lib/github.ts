import { GithubRepo } from "@/types/types"

export async function fetchUserRepos(accessToken: string): Promise<GithubRepo[]> {
    if (!accessToken) return [];

    const response = await fetch("https://api.github.com/user/repos?per_page=200", {
        headers: {
            Authorization: `token ${accessToken}`,
            Accept: "application/vnd.github.v3+json"
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch repositories");
    }

    const data = await response.json();

    return data.map((repo: any) => mapToGithubRepoType(repo))


}

function mapToGithubRepoType(data: any): GithubRepo {
    return {
        id: data.id,
        name: data.name,
        full_name: data.full_name,
        private: data.private,
        html_url: data.html_url,
        description: data.description,
        fork: data.fork,
        created_at: data.created_at,
        updated_at: data.updated_at,
        pushed_at: data.pushed_at,
        size: data.size,
        stargazers_count: data.stargazers_count,
        watchers_count: data.watchers_count,
        language: data.language,
        default_branch: data.default_branch
    }
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