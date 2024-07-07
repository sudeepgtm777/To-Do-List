import './../src/css/style.css'
import fullList from './model/fullList'
import listItem from './model/listItem'
import listTemplate from './templates/listTemplate'

const initApp = (): void => {
  const completeList = fullList.instance
  const template = listTemplate.instance

  const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement
  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault()

    const input = document.getElementById('newItem') as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if(!newEntryText.length) return

    const itemId: number = completeList.list.length ? parseInt(completeList.list[completeList.list.length - 1 ].id) + 1 : 1

    const newItem = new listItem(itemId.toString(), newEntryText)

    completeList.addItem(newItem)

    template.render(completeList)
  })

  const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement

  clearItems.addEventListener('click', (): void => {
    completeList.clearList()
    template.clear()
  })

  completeList.load()
  template.render(completeList)
}

document.addEventListener('DOMContentLoaded', initApp)