class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl
    }

    async createPost(post) {// Создадим новый пост
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'post',
                body: JSON.stringify(post) //превращаем post(объект js) в строку
            })
            return  useRequest(request)
        } catch (error) {
            console.error(error)
        }
    }

    async fetchPosts() {
        try {
            const request = new Request(`${this.url}/posts.json`, {
                method: 'get'
            })
            return  useRequest(request) // возвращаем функцию
        } catch (error) {
            console.error(error)
        }
    }
    async fetchPostById(id){     //загружаем определленый пост по id
        try {
            const request = new Request(`${this.url}/posts/${id}.json`, {
                method: 'get'
            })
            return  useRequest(request) // возвращаем функцию
        } catch (error) {
            console.error(error)
        }
    }
}
    async function useRequest (request){
        const response = await fetch(request) //ждем когда выполнится метод
        return await response.json() //вернет promise (распарсим)
    }

    export const apiService = new ApiService('https://wfm-js-7269e.firebaseio.com')//вставляем ссылку из firebase
