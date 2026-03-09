
// loadingSpinner id ke dorbo

const loadingSpinner = document.getElementById("loadingSpinner");

//for loadingSpinner function

function showLoading() {
  loadingSpinner.classList.remove("hidden");
  // dataDiv.innerHTML = "";
}

function hiddenLoading() {
  loadingSpinner.classList.add("hidden");
};

//Issues count 

const countIssues = document.getElementById("count");

// function updateCount (count) {
//   countIssues.innerText = count;
// }

const dataLod = () => {

  showLoading();

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data
      dataDisplay(allIssues);
      hiddenLoading();
    })
   
};


//------------------------------------------------------------
//For All , Open , Closed batus selection showing

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

function toggleFun(id) {
  allBtn.classList.remove("btn-primary");
  openBtn.classList.remove("btn-primary");
  closedBtn.classList.remove("btn-primary");

  allBtn.classList.add("btn-outline","btn-primary");
  openBtn.classList.add("btn-outline","btn-primary");
  closedBtn.classList.add("btn-outline","btn-primary");

  const selectedBtn = document.getElementById(id);
  
  currentStatus = id;
  selectedBtn.classList.remove("btn-outline");
  selectedBtn.classList.add("btn-primary")
}
//----------------------------------------
//--------------------------------------------------------------------------------
//This is Filter section ,all,open & closed bnt a click korle tarder vitore tader property gula dukbe *****

// document.getElementById("all-btn") === allBtn  So we can wright

allBtn.addEventListener("click",() => {
  dataDisplay(allIssues);
  //  updateCount(allIssues.length); 

  // ^^^^^^^^
   //updateCount Function er proyojon portase na because -- ami ***** dataDisplay Function er moddde ,datas.length dukai disi,,jothi na dukaitam thahole protita all , open, closed er updateCountFunction use kora jaitw
})

// let allIssues = [];

openBtn.addEventListener("click",() => {
  // document.getElementById("all-btn") === openBtn  So we can wright
  const openIssues = allIssues.filter(da =>da.status.toLowerCase()=== "open");
  dataDisplay(openIssues);
  //  updateCount(openIssues.length);
})

closedBtn.addEventListener("click",()=>{
  const closedIssues = allIssues.filter(da => da.status === "closed");
  dataDisplay(closedIssues);
  // updateCount(closedIssues.length);

})
//-----------------------------------------------------------------------------

const dataDisplay = (datas) => {
  // 1st id ke dorbo

  const dataContainer = document.getElementById("data-container");
  dataContainer.innerHTML = "";

//------------------------------------------------------------------------------
  //count er present value update rakhar jonno last a aita add korlam +--[important] for learning **********^^^-->>
  
  countIssues.innerText = datas.length;
  // updateCount(datas.length);
//-------------------------------------------------


  // 2nd data ke loop kete hobe

  datas.forEach((da) => {
    console.log(da);

    // create new div for daynamicaly update from Api

    const dataDiv = document.createElement("div");

    //status img randomly korar jonno
    const statusImg = da.status.toLowerCase() === "open" ? "assets/Open-Status.png" : "assets/image.png"

    let priorityClass = " ";

    if(da.priority.toLocaleLowerCase() ==="high"){
      priorityClass = " text-[#EF4444] bg-[#FECACA] font-semibold"
    }
    
    if(da.priority.toLocaleLowerCase() ==="medium"){
      priorityClass = "text-[#D97706] bg-[#FDE68A] font-semibold"
    }

    let borderColor = " ";
    if(da.status.toLocaleLowerCase() === "open") {
      borderColor  = "border-green-500"
    }else{
      borderColor = "border-[#A855F7]"
    }


//------------------------------------------------------------------------------
    //ENHANCEMENT BUTTON CREATE if habe or other button habe then show

    let labelButtons = "";

// check enhancement ache kina
const hasEnhancement = da.labels && da.labels.some(
  label => label.toLowerCase() === "enhancement"
);

if (hasEnhancement) {

  // only enhancement button
  labelButtons = `
    <button class="btn px-2 rounded-2xl py-1 uppercase text-[#00A96E] bg-[#BBF7D0] font-semibold">
      <span><i class="fa-solid fa-wand-magic-sparkles"></i></span>
      ENHANCEMENT
    </button>
  `;

} else {

  // enhancement na thakle bug / help wanted
  da.labels.forEach((lbl) => {

    let lblClass = "";
    let icon = "";

    if (lbl.toLowerCase() === "bug") {
      lblClass = "text-[#EF4444] bg-[#FECACA]";
      icon = "fa-bug";
    }

    if (lbl.toLowerCase() === "help wanted") {
      lblClass = "text-[#D97706] bg-[#FDE68A]";
      icon = "fa-life-ring";
    }

    if (lbl.toLowerCase() === "documentation") {
      lblClass = "bg-sky-300 text-sky-800 text-[10px] text-semibold ";
      icon = "fa-file-lines";
    }

    if (lbl.toLowerCase() === "good first issue") {
      lblClass = "bg-purple-300 text-purple-800 text-[10px] text-semibold";
      icon = "fa-seedling";
    }

    labelButtons += `
      <button class="btn px-2 rounded-2xl py-1 uppercase ${lblClass}">
        <span><i class="fa-solid ${icon}"></i></span>
        ${lbl}
      </button>
    `;
  });

}
      

    //-------------------------------------------------

    dataDiv.innerHTML = `
        <div class="p-6  space-y-2 rounded-2xl border-t-4  ${borderColor}   shadow-2xl ">

          <div class="flex justify-between items-center">
            <img src="${statusImg}"  alt="${da.status} ">
            <button class="btn-high text-[#9CA3AF] bg-[#EEEFF2] px-8 rounded-2xl py-1 uppercase ${priorityClass} ">${da.priority} </button>
          </div>

          <h1 class ="text-[19px] font-semibold " >${da.title} </h1>
          <p class = "line-clamp-2 " >${da.description} </p>

          <div class="flex justify-start items-center gap-2 pb-3">

           ${labelButtons}
          
          </div>

          <hr class="text-[#4e4e4e62] border-1">

          <p> #1 by ${da.author}</p>
          <span>${da.createdAt.split("T")[0]}</span>
          
        </div>`;

    // append korbo

    dataContainer.append(dataDiv);
  });
};

dataLod();

//search filter secation 

document.getElementById("search-btn").addEventListener("click",() =>{
  const searchValue = document.getElementById("search-input");
  const searchValueInput = searchValue.value.trim().toLocaleLowerCase();

  const yourInput = allIssues.filter(word => word.title.toLocaleLowerCase().includes(searchValueInput));
  dataDisplay(yourInput)
})

