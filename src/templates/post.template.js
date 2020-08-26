export function renderPost(post, options = {}) {
    const tag = post.type === 'news'
        ? '<li class="tag tag-blue tag-rounded">Новость</li>'
        : '<li class="tag tag-rounded">Заметка</li>'

    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const candidate = favorites.find(p => p.id === post.id)//проверит id с тем id который передается


    const button = candidate//если есть переменная candidate то в localStorage лежит нужный нам обьект
        ? `<button class="button-round button-small button-danger"
data-id="${post.id}" data-title="${post.title}">Удалить</button>`//кнопка удаления поста, вешаем data-id чтобы знать по какому конкретно посту был клик. data-title="${post.title}"-будет показывать название данного поста
        : `<button class="button-round button-small button-primary"
data-id="${post.id}" data-title="${post.title}">Сохранить</button>`//кнопка сохранения поста, вешаем data-id чтобы знать по какому конкретно посту был клик

    // const button = (JSON.parse(localStorage.getItem('favorites')) || []).includes(post.id)
    //     ? `<button class="button-round button-small button-danger" data-id="${post.id}">Удалить</button>`
    //     : `<button class="button-round button-small button-primary" data-id="${post.id}">Сохранить</button>`

    return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
          ${tag}
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        ${options.withButton ? button : ''}
      </div>
    </div>
  `
}