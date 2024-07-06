import fullList from "../model/fullList";

interface DOMList {
  ul: HTMLUListElement,
  clear(): void,
  render(fullList: fullList): void,
}

export default class listTemplate implements DOMList {
  ul: HTMLUListElement

  static instance: listTemplate = new listTemplate()

  private constructor() {
    this.ul = document.getElementById('listItems') as HTMLUListElement
  }

  clear(): void {
    this.ul.innerHTML = ''
  }

  render(completeList: fullList): void {
    this.clear()

    completeList.list.forEach(item => {
      const li = document.createElement('li') as HTMLLIElement
      li.className='item'

      const check = document.createElement('input') as HTMLInputElement
      check.type = 'checkbox'
      check.id = item.id
      check.tabIndex = 0
      check.checked = item.checked
      li.append(check)

      check.addEventListener('change', () => {
        item.checked = !item.checked
        completeList.save()
      })

      const label = document.createElement('label') as HTMLLabelElement
      label.htmlFor = item.id
      label.textContent = item.item
      li.append(label)

      const button = document.createElement('button') as HTMLButtonElement
      button.className = 'button'
      button.textContent = 'X'
      li.append(button)

      button.addEventListener('click', () => {
        completeList.removeItem(item.id)
        // We don't need to save here as it get's saved during removing process.
        this.render(completeList)
      })

      this.ul.append(li)
    })
  }
}