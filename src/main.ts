import "./style.css";
import axios from "axios";

const app = document.querySelector<HTMLDivElement>("#app")!;
const apiUrlFromEnv = "https://server-production-13d0.up.railway.app";
console.log(apiUrlFromEnv);
app.innerHTML = `
  <label>Title</label>
  <input id="titleInput" type="text" />
  <label>Description</label>
  <input id="descriptionInput" type="text" />
  <button id="addIssueButton">Add Issue</button>
  <div id="issues"></div>
`;

const titleInput = document.querySelector<HTMLInputElement>("#titleInput")!;
const descriptionInput =
  document.querySelector<HTMLInputElement>("#descriptionInput")!;
const addIssueButton =
  document.querySelector<HTMLButtonElement>("#addIssueButton")!;
const issuesDiv = document.querySelector<HTMLDivElement>("#issues")!;
const issuesTable = document.createElement("table");

addIssueButton.addEventListener("click", () => {
  console.log("Title: ", titleInput.value);
  console.log("Description: ", descriptionInput.value);
  axios
    .post(apiUrlFromEnv + "/issues", {
      title: titleInput.value,
      description: descriptionInput.value,
    })
    .then(() => {
      loadTable();
      titleInput.value = "";
      descriptionInput.value = "";
    });
});

const loadTable = () => {
  axios.get(apiUrlFromEnv + "/issues").then((response) => {
    console.log(response);
    issuesTable.innerHTML = `
  <thead>
    <tr>
      <th>Title</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  `;
    for (let issue of response.data.issues) {
      issuesTable.innerHTML += `
    <tr>
      <td>${issue.title}</td>
      <td>${issue.description}</td>
    </tr>
    `;
    }
    issuesTable.innerHTML += `
  </tbody>
  `;
    issuesDiv.innerHTML = issuesTable.outerHTML;
  });
};
loadTable();
