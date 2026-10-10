




const dropdown = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button")

const msg = document.querySelector(".msg")


window.addEventListener("load", ()=>{

    updateExchange();

})





for(let select of dropdown){
    for(currCode in countryList){
        let newlist = document.createElement("option")
        newlist.innerText = currCode;
        newlist.value = currCode;

        if(select.name === "from" && currCode == "USD"){
            newlist.selected = "selected"
        }else if(select.name === "to"  &&  currCode == "INR"){
            newlist.selected = "selected"
        }

        select.append(newlist)
    }

    select.addEventListener("change", (event)=>{
        updateFlag(event.target)
    })
}


//when select changes then...
const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let newflag = `https://flagsapi.com/${countryCode}/flat/64.png`;


    //image is at the parent of the select element so firstly we go to parent then change image of the flag.
    let img = element.parentElement.querySelector("img")
    img.src = newflag;

}




btn.addEventListener("click", (e) => {
    e.preventDefault();

    updateExchange();

});




const updateExchange = async () =>{


    let amount = document.querySelector(".amount input");

    if (amount.value === "" || amount.value < 1) {
        amount.value = "1";
    }

    const fromCurrency = document.querySelector(".from select").value;
    const toCurrency = document.querySelector(".to select").value;

    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency.toLowerCase()}.json`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to fetch currency rates");
        }

        const data = await res.json();

        const rate = data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
        const convertedAmount = amount.value * rate;

        

        msg.innerText = `${amount.value}  ${fromCurrency} = ${convertedAmount}  ${toCurrency} `

        console.log("Exchange rate:", rate);
        console.log("Converted amount:", convertedAmount);

    } catch (error) {
        console.error("Error:", error);
    }

}

