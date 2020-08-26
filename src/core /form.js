export class Form {
    constructor(form, controls) {   //в конструктор передаем форму в которой содержится сам элемент формы
        this.form = form
        this.controls = controls //сохраням элементы
    }

    value() {  //отдает объект содержащий все необходимые значения
        const value = {}
        Object.keys(this.controls).forEach(control => { //возвращат массив ключей (форм
            value[control] = this.form[control].value      //Задаем объекту value ключ control(в нашем случае или текст или фултекст
//получаем значения с помощью value
        })
        return value
    }

    clear() {
        Object.keys(this.controls).forEach(control => { //возвращат массив ключей (очищаем форму
            this.form[control].value = ''
        })
    }

    isValid() {
        let isFormValid = true  //создаем и вазращаем переменную
        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control]//получаем список валидаторов

            let isValid = true
            validators.forEach(validator => {//определяем валидны ли текуущий контрол
                isValid = validator(this.form[control].value) && isValid//переопределяем переменную.передаем значение текущего контрола
            })
            if (!isValid) {
                setError(this.form[control])//проверяем на валидность  control 
            } else {
                clearError(this.form[control])
            }
            isFormValid = isFormValid && isValid // учитываем текущее и предыдущее значение
        })
        return isFormValid
    }
}

function setError($control) {
    clearError($control)
    const error = '<p class= "validation-error">Введите корректное значение</p>'
    $control.classList.add('invalid') //подсвечиваем крассным
    $control.insertAdjacentHTML('afterend', error) //подпись под формой
}

function clearError($control) {
    $control.classList.remove('invalid')
    if ($control.nextSibling) { // если в переменной, что-то есть и не равно null, то вполням
        $control.closest('.form-control').removeChild($control.nextSibling)//удаляем параграф p,(добравшись сначала до родительского класса)
    }
}
