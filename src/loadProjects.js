export async function loadProjects(divId, filePath) {
    const response = await fetch(filePath);
    const projects = await response.json();

    let html = `<p class="text-3xl my-5">Projects</p>`;

    for (const p of projects) {
      html = html + `
      <a class="block mb-3 cursor-pointer border-2 border-zinc-600 hover:border-white p-3 min-h-[130px] max-h-[200px]" href="${p.link}" target="_blank">
        <div class="flex flex-row">
          <div class="w-full">
            <p class="text-xl font-bold">${p.name}</p>
          </div>
          <div class="w-[30%]">
            <p class="text-right "> ${p.type} </p>
          </div>
        </div>
        <div>
          <p class="text-white">${p.stack ? "" + p.stack : ""}</p>
          <p>${p.desc}</p>
        </div>
      </a>`;
    }

    document.getElementById(divId).innerHTML = html;
}