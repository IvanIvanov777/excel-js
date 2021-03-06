import { storage } from '../core/utils'

function toHTML(data) {
  const id = data.split(':')[1]
  const { title, openedDate } = storage(data)
  return `
  <li class="db__record">
    <a href="#excel/${id}">${title}</a>
    <strong>
    ${new Date(openedDate).toLocaleDateString()}
    ${new Date(openedDate).toLocaleTimeString()}
    </strong>
  </li>
  `
}

// excel:1234567890
function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  console.log(keys);
  if (!keys.length) {
    return `<p>Table list is empty</p>`
  }
  return ` 
    <div class="db__list-header">
    <span>Название</span>
    <span>Дата открытия</span>
  </div>
  <ul class="db__list">
    ${keys.map(toHTML).join('')}
  </ul>
  `
}
