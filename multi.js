let stepNo = document.querySelectorAll("#stepNo");
let forms = document.querySelectorAll("#form");
let nextStep = document.querySelectorAll("#nextStep");
let goBack = document.querySelectorAll("#goBack");
let formInput = document.querySelectorAll(".form-1 input");
let errMSgfield = document.querySelectorAll(".form-1 span");
let planBtn = document.querySelectorAll(".planBtn");
let switchBtn = document.querySelector("#switch");
let addOnsBtn = document.querySelectorAll("#addOnsBtn")

let currentStep = 1;
let currentStepNo = 1;
document.querySelector(`.stepNo-${currentStepNo}`).classList.add("stepActive");

//nextbutton function
nextStep.forEach((btn) => {
  btn.addEventListener("click", nxtBtn);
});

function nxtBtn() {
  if (currentStep < 5 && validInput()) {
    document.querySelector(`.form-${currentStep}`).style.display = "none";
    document
      .querySelector(`.stepNo-${currentStepNo}`)
      .classList.remove("stepActive");
    currentStep++;
    currentStepNo++;
    document.querySelector(`.form-${currentStep}`).style.display = "flex";
    document
      .querySelector(`.stepNo-${currentStepNo}`)
      .classList.add("stepActive");
  }
}

function validInput() {
  let valid = true;
  for (let i = 0; i < formInput.length; i++) {
    if (!formInput[i].value) {
      valid = false;
      formInput[i].parentElement.classList.add("error");
      errMSgfield[i].innerHTML = "This field is required";
    } else {
      valid = true;
      formInput[i].parentElement.classList.remove("error");
      errMSgfield[i].innerHTML = "";
    }
  }

  return valid;
}

//backbutton function
goBack.forEach((bkBtn) => {
  bkBtn.addEventListener("click", backBtn);
});
function backBtn() {
  document.querySelector(`.form-${currentStep}`).style.display = "none";
  document
    .querySelector(`.stepNo-${currentStepNo}`)
    .classList.remove("stepActive");
  currentStep--;
  currentStepNo--;
  document.querySelector(`.form-${currentStep}`).style.display = "flex";
  document
    .querySelector(`.stepNo-${currentStepNo}`)
    .classList.add("stepActive");
}

let allPlanName = [];
planBtn.forEach((pBtn) => {
  pBtn.addEventListener("click", selectPlan);
});
function selectPlan() {
  let plan = this;
  let selectPlanName = plan.querySelector("#planName").innerHTML;
  let alreadySelected = document.querySelector(".planSelected");
  let noOfSelection = document.querySelectorAll(".planSelected").length;

  let newPlanselected = [selectPlanName];

  if (allPlanName.find((already) => already === selectPlanName)) {
    plan.classList.remove("planSelected");
    allPlanName = [];
  } else if (noOfSelection == 1) {
    allPlanName = [];
    alreadySelected.classList.remove("planSelected");
    plan.classList.add("planSelected");
    allPlanName.push(...newPlanselected);
  } else {
    plan.classList.add("planSelected");
    allPlanName.push(...newPlanselected);
  }
}

// switch button functions
let planType ="monthly"
switchBtn.addEventListener("click", changeDuration);
function changeDuration() {
  let SBball = switchBtn.querySelector("span");
  let offerMsg = document.querySelectorAll("#offerMsg");
  let offerMsgfield = document.querySelector("#offerMsg").innerHTML
  let planPrice = document.querySelectorAll('#planPrice')
  if (offerMsgfield.length === 0){
    SBball.style.left = "10px"
    offerMsg.forEach((msg)=>{
      msg.innerHTML="2 months free"
    })
    planPrice.forEach((price)=>{
      if(price.innerHTML ==="$9/mo"){
        price.innerHTML="$90/yr"
      }else if(price.innerHTML ==="$12/mo"){
        price.innerHTML="$120/yr"
      }else{
        price.innerHTML="$150/yr"
      }
    })
    planType="yearly"
  }else{
    SBball.style.left = "-10px"
    offerMsg.forEach((msg)=>{
      msg.innerHTML=""
    })
    planPrice.forEach((price)=>{
      if(price.innerHTML ==="$90/yr"){
        price.innerHTML="$9/mo"
      }else if(price.innerHTML ==="$120/yr"){
        price.innerHTML="$12/mo"
      }else{
        price.innerHTML="$15/mo"
      }
    })
    planType="monthly"
  } 
  return planType
}



addOnsBtn.forEach((ANbtn)=>{
  ANbtn.addEventListener("click",selectAddOn)
})
function selectAddOn(){
  let addOn = this
  if(addOn.querySelector('#check').checked===false){
  addOn.querySelector('#check').checked=true
  addOn.classList.add('addOnSelected')
  }else{
    addOn.querySelector('#check').checked=false
    addOn.classList.remove('addOnSelected')
  }
}



function updateSummary(){
  let selectedPlan = document.querySelector('.planSelected')
  let selectedPlanName = selectedPlan.querySelector('#planName').innerHTML
  let selectedPlanPrice = selectedPlan.querySelector('#planPrice').innerHTML
  let selectedAddOn = document.querySelectorAll('.addOnSelected')
  let finishingSummary = document.querySelector('#finishingSummary')

  let finalSummary = document.createElement('div')
  finalSummary.innerHTML=` 
  <div id="finalSelectedPlan">
    <div>
     <label id="planSelected">${selectedPlanName}(${planType})</label>
      <a href="" id="changeURL">change</a>
    </div>
    <span id="selectedPlanPrice">${selectedPlanPrice}</span>
  </div>
  <div id="line"></div>`
  finalSummary.classList.add('finalSummary')
  finishingSummary.append(finalSummary)


  selectedAddOn.forEach((addOn)=>{
    let addOnType=addOn.querySelector('#addOnType').innerHTML
    let addOnPrice=addOn.querySelector('#addOnPrice').innerHTML
    let finalSummary = document.querySelector('#finishingSummary')
  
    let addOns = document.createElement('div')
    addOns.innerHTML=
    `<p id="addOnType">${addOnType}</p>
    <span id="selectedAddOnPrice">${addOnPrice}</span>`
    addOns.classList.add('addOns')
    finalSummary.append(addOns)
  })
  updateTotal(selectedPlanPrice)
}

function updateTotal(selectedPlanPrice){
  let addOnPrice = document.querySelectorAll(".addOnSelected #addOnPrice")
  let totalfield = document.getElementById("FBTotal")
  let extracter= /\d+/g;
  let addOns =[]
  planPrice = parseFloat(selectedPlanPrice.match(extracter));

  addOnPrice.forEach((val)=>{
    let text = val.innerHTML
    let result = parseFloat(text.match(extracter))
    addOns.push(result)
  })
  
  let totalAddOnPrice = addOns.reduce((pre,cur)=>{
    console.log(pre,cur)
    return pre+cur
  } )
  let totalPrice =planPrice+totalAddOnPrice;
  let total =[]
  let totalType =[]
  if(planType==="monthly"){
    totalType = `Total (per month)`
    total = `$${totalPrice}/mo`
  }else{
    totalType = `Total (per year)`
    total = `$${totalPrice}/yr`
  }

  let totalPriceField =document.createElement('div')
  totalPriceField.innerHTML=`
  <p>${totalType}</p>
  <span>${total}</span>`
  totalPriceField.classList.add('FBTotal')
  totalfield.append(totalPriceField)

}









// summary delete
function refreshSummary(){
  let finishingSummary = document.getElementById('finishingSummary')
  let FBTotal = document.getElementById("FBTotal")
  finishingSummary.innerHTML=''
  FBTotal.innerHTML=''
}

function updateAddOn(){
  let addOnPrice = document.querySelectorAll("#addOnPrice")

  
  if(planType === "monthly"){
    addOnPrice.forEach((addOn)=> {
      if(addOn.innerHTML==="+$10/yr"){
        addOn.innerHTML="+$1/mo"
      }else if(addOn.innerHTML==="+$20/yr"){
        addOn.innerHTML="+$2/mo"
      }
    })
  }
  if(planType === "yearly"){
    addOnPrice.forEach((addOn)=> {
      if(addOn.innerHTML==="+$1/mo"){
        addOn.innerHTML="+$10/yr"
      }else if(addOn.innerHTML==="+$2/mo"){
        addOn.innerHTML="+$20/yr"
      }
    })
  }
}