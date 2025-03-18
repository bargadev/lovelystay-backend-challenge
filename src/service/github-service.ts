import axios from 'axios';
import * as R from 'ramda';
import { UserData } from '../model/user-data';

const GITHUB_API = 'https://api.github.com/users/';

const fetchGitHubUser = async (username: string): Promise<UserData> => {
  const response = await axios.get(`${GITHUB_API}${username}`);
  const data = response.data;

  return {
    username: data.login,
    fullname: data.name || '',
    location: data.location || '',
    public_repositories: data.public_repos || 0,
    followers: data.followers || 0,
    following: data.following || 0,
    profile_url: data.html_url || '',
    avatar_url: data.avatar_url || '',
    created_at: data.created_at,
    updated_at: data.updated_at,
    repos_url: data.repos_url,
  };
};

const fetchUserLanguages = async (reposUrl: string) => {
  const reposResponse = await axios.get(reposUrl);
  const languageList = reposResponse.data.map((repo: any) => repo.language);

  return R.pipe(R.filter(R.identity), R.uniq)(languageList);
};

export const githubService = {
  fetchGitHubUser,
  fetchUserLanguages,
};
