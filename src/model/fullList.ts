import listItem from "./listItem";

interface List {
  list: listItem[],
  load(): void,
  save(): void,
  clearList(): void,
  addItem(itemObj: listItem): void,
  removeItem(id: string): void,
}

export default class fullList implements List {
  static instance: fullList = new fullList()

  private constructor(private _list: listItem[] = []){}

  get list(): listItem[] {
    return this._list
  }

  save(): void{
    localStorage.setItem('myList', JSON.stringify(this._list))
  }

  load(): void {
    const storedList: string | null = localStorage.getItem('myList')

    if(typeof storedList !== 'string') return

    const parsedList: { _id: string, _item: string, _checked: boolean}[] = JSON.parse(storedList)

    parsedList.forEach(itemObj => {
      const newListItem = new listItem(itemObj._id, itemObj._item, itemObj._checked)

      fullList.instance.addItem(newListItem)
    })
  }

  clearList(): void {
    this._list = []
    this.save()
  }

  addItem(itemObj: listItem): void {
    this._list.push(itemObj)
    this.save()
  }

  removeItem(id: string): void {
    this._list = this._list.filter(item => item.id !== id)
    this.save()
  }
}