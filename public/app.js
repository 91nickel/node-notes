document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', event => {
        const {id, type} = event.target.dataset
        if (!id || !type) return;
        const note = event.target.closest('li')
        const title = note.querySelector('.title')
        if (type === 'remove' && id) {
            remove(id).then(() => note.remove())
        } else if (type === 'edit') {
            console.log('edit', id, type)
            const newText = prompt('Введите новое название', title.innerText)
            if (note.innerText !== newText)
                put(id, {title: newText}).then(() => title.innerText = newText)
        }
    })
})

function remove (id) {
    return fetch(`/${id}`, {
        method: 'DELETE',
    })
}
function put (id, body) {
    return fetch(`/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
}