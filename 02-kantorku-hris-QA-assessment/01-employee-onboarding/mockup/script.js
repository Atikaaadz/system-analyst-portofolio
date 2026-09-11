const API = "/api/employee-onboardings";
let id = null;
const fields = ["full_name", "email", "phone", "date_of_birth", "department", "position", "employment_type", "join_date"];

function data() {
  let x = {};
  fields.forEach(f => x[f] = document.getElementById(f).value.trim());
  return x;
}

function msg(t, c = "info") {
  let e = document.getElementById("message");
  e.textContent = t;
  e.className = c;
}

function errs(x = {}) {
  fields.forEach(f => document.getElementById(f + "_e").textContent = "");
  Object.entries(x).forEach(([k, v]) => {
    let e = document.getElementById(k + "_e");
    if (e) e.textContent = v;
  });
}

async function api(u, o = {}) {
  let r = await fetch(u, o), d = await r.json();
  if (!r.ok) throw d;
  return d;
}

function show(d) {
  id = d.id;
  document.getElementById("draft").classList.remove("hidden");
  document.getElementById("details").innerHTML = fields.map(f =>
    `<div class="detail"><label>${f.replaceAll("_", " ")}</label>${d[f] || "-"}</div>`
  ).join("");
}

async function load() {
  try {
    let r = await api(API + "/draft");
    if (r.data) show(r.data);
  } catch (e) {}
}

document.getElementById("save").onclick = async () => {
  try {
    let r = await api(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data())
    });
    show(r.data);
    msg("Draft saved successfully.", "success");
  } catch (e) {
    errs(e.errors);
    msg(e.message || "Save failed");
  }
};

document.getElementById("continue").onclick = async () => {
  let r = await api(API + "/" + id);
  fields.forEach(f => document.getElementById(f).value = r.data[f] || "");
  msg("Draft loaded. Continue editing.", "info");
};

document.getElementById("delete").onclick = async () => {
  if (confirm("Delete draft?")) {
    await api(API + "/" + id, { method: "DELETE" });
    id = null;
    document.getElementById("draft").classList.add("hidden");
    msg("Draft deleted.", "info");
  }
};

document.getElementById("form").onsubmit = async e => {
  e.preventDefault();
  try {
    if (!id) {
      let r = await api(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data())
      });
      id = r.data.id;
    }
    let fd = new FormData(),
        a = document.getElementById("identity_document").files[0],
        b = document.getElementById("employment_contract").files[0];
    if (a) fd.append("identity_document", a);
    if (b) fd.append("employment_contract", b);
    await api(API + "/" + id + "/documents", { method: "POST", body: fd });
    let r = await api(API + "/" + id + "/submit", { method: "POST" });
    msg("Onboarding submitted successfully. Status: " + r.data.status, "success");
    e.target.reset();
    id = null;
    document.getElementById("draft").classList.add("hidden");
  } catch (e) {
    errs(e.errors);
    msg(e.message || "Submit failed");
  }
};

load();