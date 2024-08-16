


const clearBtn = document.getElementById("clear")
const amountInput = document.getElementById("mortgageAmount")
const termInput = document.getElementById("term")
const interestInput = document.getElementById("interest")
const repaymentCheck = document.getElementById("repayment")
const interestCheck = document.getElementById("interestOnly")
const calculateBtn = document.getElementById("btnSubmit")
const form = document.querySelector("form")
const monthlyRepaymentAmount = document.getElementById("monthlyRepaymentAmount")
const totalRepaymentAmount = document.getElementById("totalRepaymentAmount")
const headingEmpty = document.getElementById("headingEmpty")
const headingFilled = document.getElementById("headingDerecha")
const array = [amountInput,termInput,interestInput]
let monthlyPayment = 0
let monthlyInterestRate = 0
let numberOfPayments = 0



const obj = {
    mortgageAmount:amountInput,
    term: termInput,
    interest:interestInput
}


const enviar = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form).entries());
    const {mortgageAmount,term,interest} = data

    if(mortgageAmount == "" || term == "" || interest == ""){

        for (const key in obj) {
            if (data[key] === "") {
                obj[key].parentNode.classList.add("invalido");
            }}

            headingEmpty.classList.remove("notVisible")
        headingFilled.classList.add("notVisible")

    }else{
        numberOfPayments = term * 12
        monthlyInterestRate = (interest / 100) /12

        monthlyPayment = mortgageAmount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        monthlyRepaymentAmount.innerText = monthlyPayment
        monthlyRepaymentAmount.innerText = new Intl.NumberFormat("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(monthlyPayment)

        const totalRepayment = numberOfPayments * monthlyPayment
        totalRepaymentAmount.innerText = new Intl.NumberFormat("en-US", {maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(totalRepayment)
        headingEmpty.classList.add("notVisible")
        headingFilled.classList.remove("notVisible")
        for (const key in obj) {
            obj[key].parentNode.classList.remove("invalido");
        }
    }
}


const limpiar = () => {
   for (let index = 0; index < array.length; index++) {
    array[index].value = "";
    array[index].parentNode.classList.remove("invalido")
   }
   headingEmpty.classList.remove("notVisible")
   headingFilled.classList.add("notVisible")
}


form.addEventListener("submit",enviar)
clearBtn.addEventListener("click",limpiar)