export interface IFork {
    id: number;
    full_name: string;
    owner: {
        login: string;
    };
    html_url: string;
    stargazers_count: string;
}
