import {Component} from "../core /component";
import {apiService} from "../services/api.service";
import {TransformService} from "../services/transform.service";
import {renderPost} from "../templates/post.template";

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this)) //добавляем прослушку события, для сохранения постов
    }

    async onShow() {
        this.loader.show()
        const fbData = await apiService.fetchPosts() //ждем метод
        const posts = TransformService.fbObjectToArray(fbData)
        const html = posts.map(post => renderPost(post,{withButton:true}))
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
    }

    onHide() {
        this.$el.innerHTML = ''

    }
}


function buttonHandler(event) {            //  сохранение поста
    const $el = event.target
    const id = $el.dataset.id
    const title = $el.dataset.title


    if (id) {          //проверяем чтоб клик был совершен имеено по кнопке сохранить/удалить
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []     // кладем id в локалст.  если его там нет,либо удалить
        const candidate = favorites.find(p => p.id === id) //сравниваем id с текущим id
        if (candidate) {
            //удалить элемнт
            $el.textContent = 'Сохранить'
            $el.classList.add('button-primary')
            $el.classList.remove('button-danger')
            favorites = favorites.filter( p=> p.id !== id)
        } else {
            //добавить элемент

            $el.classList.remove('button-primary')
            $el.classList.add('button-danger')
            $el.textContent = 'Удалить'
            favorites.push({id,title})

        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}