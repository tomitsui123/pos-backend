function createTableHeader(table, data) {
  const header = [
    'lastUpdated',
    'itemCode',
    'displayName',
    'price',
    'category',
    'imgSrcUrl',
    'options',
    'actions',
  ]
  let thead = table.createTHead()
  let row = thead.insertRow()
  for (let key of header) {
    let th = document.createElement('th')
    th.setAttribute('scope', 'col')
    let text =
      document.createTextNode(key)
    th.appendChild(text)
    row.appendChild(th)
  }
}
function generateTableContent(
  table,
  data
) {
  for (let element of data) {
    const {
      lastUpdated,
      _id,
      itemCode,
      displayName,
      price,
      category,
      imgSrcUrl,
      options,
    } = element
    let row = table.insertRow()
    let cell = row.insertCell()
    const data = dayjs(
      lastUpdated
    ).format('hh:mm:ss DD/MM/YYYY')
    let text =
      document.createTextNode(data)
    cell.appendChild(text)
    text =
      document.createTextNode(itemCode)
    cell = row.insertCell()
    cell.appendChild(text)
    text =
      document.createTextNode(displayName)
    cell = row.insertCell()
    cell.appendChild(text)
    text = document.createTextNode(price)
    cell = row.insertCell()
    cell.appendChild(text)
    text =
      document.createTextNode(category)
    cell = row.insertCell()
    cell.appendChild(text)
    const img =
      document.createElement('img')
    img.setAttribute('src', imgSrcUrl)
    img.setAttribute('width', '100')

    cell = row.insertCell()
    cell.appendChild(img)

    text = document.createTextNode(
      options
        .map((e) => e.title)
        .join(',')
    )
    cell = row.insertCell()
    cell.appendChild(text)
    // add edit and delete buttons to the last cell
    cell = row.insertCell()
    const editBtn =
      document.createElement('button')
    editBtn.setAttribute(
      'class',
      'btn btn-primary btn-edit'
    )
    editBtn.setAttribute('id', _id)
    editBtn.setAttribute('type', 'button')
    editBtn.setAttribute(
      'data-bs-toggle',
      'modal'
    )
    editBtn.setAttribute(
      'data-bs-id',
      _id
    )
    editBtn.innerHTML =
      '<i class="fas fa-edit"></i>'
    const deleteBtn =
      document.createElement('button')
    deleteBtn.setAttribute(
      'class',
      'btn btn-danger btn-delete'
    )
    deleteBtn.setAttribute(
      'disabled',
      'disabled'
    )
    deleteBtn.setAttribute(
      'type',
      'button'
    )
    deleteBtn.setAttribute(
      'data-bs-target',
      '#deleteModal'
    )
    deleteBtn.setAttribute(
      'data-bs-id',
      _id
    )
    deleteBtn.innerHTML =
      '<i class="fas fa-trash"></i>'
    cell.appendChild(editBtn)
    cell.appendChild(deleteBtn)
  }
}