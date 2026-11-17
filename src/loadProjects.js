let query = [];
let divId = null;
let displayProjects = [];
let projects = [];

export async function loadProjects(id, filePath) {
    divId = id;
    const response = await fetch(filePath);
    projects = await response.json();
    renderProject();
}

  const term1 = "web";
  const term2 = "cloud";
  const term3 = "devops";
  const term4 = "embedded";

function select(term){
  const wasActive = query.includes(term.toLowerCase());
  
  query.splice(0); // Clears existing selections - So only at a time is active
  if(wasActive){ renderProject(); return; } // if same selection, dont run the below

  if(term.toLowerCase() === term1){addTerm(term1)};
  if(term.toLowerCase() === term2){addTerm(term2)};
  if(term.toLowerCase() === term3){addTerm(term3)};
  if(term.toLowerCase() === term4){addTerm(term4)};
}

window.select = select;

function renderProject(){
  // Apply Filters in keyword to Projects, and Renders.
  
  (function filterList() {
    if (query.length === 0) { 
      displayProjects = projects; 
      return
    }else{
      displayProjects = projects.filter(q => query.includes(q.area.toLowerCase()));
    }
  })();

  let html = `
    <div class = "flex flex-row">
      <p class="text-3xl my-5 ">Projects</p>
      <div class = "ml-auto flex flex-row items-end mb-6">
          <p class="mx-2 px-2 border hover:font-bold hover:cursor-pointer ${query.includes(term1) ? 'font-bold border-2' : ''}" 
            onClick = "select('${term1}')"   > Web </p>
          <p class="mx-2 px-2 border hover:font-bold hover:cursor-pointer ${query.includes(term2) ? 'font-bold border-2' : ''}" 
            onClick = "select('${term2}')" > Cloud </p>
          <p class="mx-2 px-2 border hover:font-bold hover:cursor-pointer ${query.includes(term3) ? 'font-bold border-2' : ''}" 
            onClick = "select('${term3}')"> DevOps </p>
          <p class="mx-2 px-2 border hover:font-bold hover:cursor-pointer ${query.includes(term4) ? 'font-bold border-2' : ''}" 
            onClick = "select('${term4}')"> Embedded </p>
      </div>
    </div>
  `;
  for (const p of displayProjects) {
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
   document.getElementById(divId).innerHTML = html; // Updates HTML.
}

export function addTerm(key){
  query.push(key); 
  renderProject();
}
export function removeTerm(key){
  query = query.filter(q => q !== key); 
  renderProject();
}