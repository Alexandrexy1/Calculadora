function Calculadora() {
    this.display = document.querySelector('.display');
}

Calculadora.prototype.inicia = function () {
    this.clickButtons();
    this.pressEnter();
};

Calculadora.prototype.clickButtons = function () {
    document.addEventListener('click', event => {
        const el = event.target;
        if (this.display.classList.contains('invalid-input')) this.display.value = '';
        if (el.classList.contains('btn-num')) this.btnParaDisplay(el.innerText);
        if (el.classList.contains('btn-clear')) this.clearDisplay();
        if (el.classList.contains('btn-del')) this.deleteOne();
        if (el.classList.contains('btn-eq')) this.realizaConta();  
    })
};

Calculadora.prototype.pressEnter = function () {
    this.display.addEventListener('keyup', event => {
        if (event.keyCode === 13) this.realizaConta();
        if (this.display.classList.contains('invalid-input')) {
            this.pressAnyKey();
        }
    })
};

Calculadora.prototype.pressAnyKey = function () {
    this.display.addEventListener('keyup', e => {
        if (this.display.classList.contains('invalid-input')) this.display.value = '';
        this.display.classList.remove('invalid-input'); 
    })
}

Calculadora.prototype.realizaConta = function () {
    let conta = this.display.value;
    try {
        conta = math.evaluate(conta);
        if (!conta || isNaN(conta)) {
            this.showInvalidMessage();
            return;
        }
        this.display.value = conta;
    }
    catch(e) {
        this.showInvalidMessage();
        return;
    }
};

Calculadora.prototype.showInvalidMessage = function () {
    this.display.classList.add('invalid-input');
    this.display.value = 'Conta inválida';
};

Calculadora.prototype.deleteOne = function () {
    this.display.value = this.display.value.slice(0, -1);
};

Calculadora.prototype.clearDisplay = function () {
    this.display.classList.remove('invalid-input');
    this.display.value = '';
};

Calculadora.prototype.btnParaDisplay = function (value) {
    this.display.value += value;
    this.display.focus();
    this.display.classList.remove('invalid-input');
};
const calculadora = new Calculadora();
calculadora.inicia();
