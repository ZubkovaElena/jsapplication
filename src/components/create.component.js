import {Component} from "../core /component";
import {Form} from "../core /form";
import {Validators} from "../core /validators";
import {apiService} from "../services/api.service";

export class CreateComponent extends Component {
    constructor(id) {
        super(id);

    }

    init() {    //Инициалицируем компонент, выполняем дальнейшие действия после этого
         this.$el.addEventListener('submit', submitHandler.bind(this)) //

        this.form = new Form(this.$el, {    //  форма будет являться новым экземпляром класса форм,%el- и есть сама форма, дальше передаем объекты которые содержатся в форме
            title: [Validators.required],   //имена совпадают с шаблонами html.
            fulltext: [Validators.required, Validators.minLength(10)]//передает ссылку на метод required
        })

    }
}

async function submitHandler(event) {
    event.preventDefault()            //отменяем дефолтное поведение,чтоб форма неперезагружалась

    if (this.form.isValid()) {
        const formData = {      //получаем все значения нашей формы
            type: this.$el.type.value, //получаем из селекта
            data: new Date().toLocaleTimeString(),
            ...this.form.value() //конвектируем в один объект
        }
        await apiService.createPost(formData)
        this.form.clear()
        alert('Запись создана в базе данных')

    }
       }
