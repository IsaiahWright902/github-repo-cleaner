import "next-auth"
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        accessToken?: string;
    }
}

export interface GithubRepo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    description: string | null;
    fork: boolean;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    default_branch: string;
}