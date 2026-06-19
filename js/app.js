import { getUser, getRepos } from "./api.js";

import {
  showProfile,
  showRepos,
  clearResults,
  setLoading,
  showError,
  showMessage,
} from "./ui.js";
import { renderLanguageChart } from "./chart.js";

const button = document.getElementById("searchBtn");
const input = document.getElementById("userInput");

async function searchUser() {
  const username = input.value.trim();

  clearResults();

  if (!username) {
    showError("Please enter a GitHub username");
    return;
  }

  try {
    setLoading(true);
    const user = await getUser(username);
    showProfile(user);

    const repos = await getRepos(username);
    showRepos(repos);
    renderLanguageChart(repos);
  } catch (error) {
    showError(error.message || "Failed to fetch user");
  } finally {
    setLoading(false);
  }
}

button.addEventListener("click", searchUser);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchUser();
});
