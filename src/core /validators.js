export class Validators {
    static required(value = '') {    //опишем  статический валидатор required,пустой или нет сontrol
        return value && value.trim()  //возращает булевое значение( если страка пустая)
    }

    static minLength(length) {           //Задаем минимальную длинну текста
        return value => {
            return value.length >= length
        }                  // Используем замыкание
    }
}