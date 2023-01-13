const calculate = {
    operand1: "",
    sign: "",
    operand2 : "",
    rez : "",
    mem: ""
}

let { operand1, sign, operand2, rez, mem } = calculate

let mWord = document.getElementsByClassName('m-word')[0]
let equal = document.getElementsByClassName('orange')[0]

let desk;
let click = 0;
let isDot = true

document.querySelector(".keys").addEventListener("click", (e) => {
    
    let eValue = e.target.value
    
    if (operand1.length != 0 && sign != 0 && validate(/\d/, eValue)) {
        operand2 += eValue;
        desk = operand2
        equal.disabled = false
        show(desk)
    }
    else if (validate(/\./, eValue)) {   
        if (sign == "" && isDot == true) {
            operand1 += eValue
            desk = operand1;
        }  
        else if (sign != "" && isDot == true) {
            operand2 += eValue
            desk = operand2;
        }
        show(desk)
        isDot = false
    }
    else if (validate(/\d/, eValue)) {
        operand1 += eValue;
        desk = operand1;
        show(desk)
    }
    else if (operand1.length != 0 && sign != 0 && operand2.length != 0 &&
        validate(/^[*+-=/]$/, eValue)) {
        operand1 = rez = desk = calc(+operand1, sign, +operand2) 
        sign = operand2 = ""
        equal.disabled = true
        show(desk)
        isDot = true
    }
    else if (validate(/^[+-/*]$/, eValue)) {
        sign = eValue
        isDot = true
    }
    else if (validate(/m-|m\+/, eValue)) {
        mWord.classList.add('block')
        mem = rez 
    }
    else if (validate(/mrc/, eValue)) {
        show(mem)
        operand1 = mem
        click++
        if (click == 2) {
            mem = ""
            mWord.classList.remove('block')
            click = 0
        }
    }
    else if (validate(/^C$/, eValue)) {
        sign = operand1 = operand2 = mem = rez = ""
        equal.disabled = true
        click = 0       
        mWord.classList.remove('block')
        show(desk = '')
    }   
    console.log({ operand1, sign, operand2, rez, mem })
})

function show (v) {
    const d = document.querySelector(".display input");
    d.value = v;
}

const validate = (r, v) => r.test(v);

function calc(op1, sign, op2) {
    switch (sign) {
        case '+':
            result = op1 + op2
            break;
        case '-':
            result = op1 - op2
            break;
        case '*':
            result = op1 * op2
            break;
        default: result = op1 / op2
            break;
    }
    return result
}
