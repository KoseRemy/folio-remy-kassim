export async function loadProjects(divId, filePath) {
    const response = await fetch(filePath);
    const projects = await response.json();

    let html = `<p class="text-3xl my-5">Projects</p>`;

    for (const p of projects) {
        html = html + `
      <a class="block mb-3 cursor-pointer border-2 border-zinc-600 hover:border-white p-3 min-h-[130px] max-h-[200px]" href="${p.link}" target="_blank">
        <p class="text-xl font-bold">${p.name}</p>
        <p class="text-white">${p.tag} · ${p.type}${p.stack ? " · " + p.stack : ""}</p>
        <p>${p.desc}</p>
      </a>`;
    }

    document.getElementById(divId).innerHTML = html;
}