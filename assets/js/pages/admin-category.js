const tbodyCate = document.querySelector('.category_table')
const categoryInputName = document.querySelector('.category_name')
const buttonSave = document.querySelector('.btn_category_save')
function showDataCateFromLocal() {
    //Lấy ra danh mục trong local
    const categories = JSON.parse(localStorage.getItem('categories')) || []
    let htmlResult = ''
    //Xây dựng cấu trúc html cho danh mục
    categories.forEach(function (element) {
        htmlResult = htmlResult + `<tr>
                                        <td>${element.name}</td>
                                        <td>
                                            <button data-id="${element.id}" class="btn_common btn_edit">Edit</button>
                                            <button data-id="${element.id}" class="btn_common btn_delete">Delete</button>

                                        </td>
                                    </tr>`
        
    })

    //Đưa kết quả toàn bộ danh mục vào tbody của table
    tbodyCate.innerHTML = htmlResult
}

function validateSuccess() {
    if(buttonSave.classList.contains('update')) {
        updateCategory()
        
    }else {
        addCategory()
    }

    
}

function updateCategory() {
   // Lấy ra thông tin danh mục trong local
   const nameCategory = document. querySelector('.category_name').value;
   //Tạo ra dữ liệu update
   //Lấy ra id update
   const categories = JSON.parse(localStorage.getItem('categories')) || []
   const idUpdate = buttonSave.getAttribute('data-id')
   const categoriesUpdate = categories.map(function(element){
        if(element.id === idUpdate) {
            return {
                id: element.id,
                name: nameCategory
            }
        }
        else {
            return element
        }
   })
   //Lưu vào trong local
   localStorage.setItem('categories', JSON.stringify(categoriesUpdate));
   //Hiển thị dữ liệu ngay lập tức khi thêm thành công
   showDataCateFromLocal()
   //Reset form 
   resetToAddCategory()
}

function resetToAddCategory() {
    //Reset form 
    categoryInputName.value = ''
    buttonSave.textContent = 'Save'
    buttonSave.removeAttribute('data-id')
    buttonSave.classList.remove('update')
}

function addCategory() {
    // Lấy ra thông tin danh mục trong local
    const nameCategory = document. querySelector('.category_name').value;
    // Tạo ra object chứa thông tin danh mục
    const newCate = {
        id: crypto.randomUUID(),
        name: nameCategory
    }
    // Lấy dữ liệu categories từ localStorage
    const categories = JSON.parse(localStorage.getItem('categories')) || []
    //Tạo mảng mới và thêm obj mới vào
    const categoriesUpdate = [newCate, ...categories]
    //Lưu vào trong local
    localStorage.setItem('categories', JSON.stringify(categoriesUpdate));
    //Hiển thị dữ liệu ngay lập tức khi thêm thành công
    showDataCateFromLocal()
    //Reset form 
    categoryInputName.value = ''
}

//Hiển thị dữ liệu categories từ local
showDataCateFromLocal()

function handleProcessData(event) {
    const clicked = event.target
    //Lấy ra tất cả danh mục trong local
    const categories = JSON.parse(localStorage.getItem('categories')) || []
    //Khi người dùng click vào button delete
    if (clicked.classList.contains('btn_delete') && confirm('Are you sure you want to delete')) {
        const idDelete = clicked.getAttribute('data-id')
        //Mảng lọc ra phần tử cần delete
        const categoriesFilter = categories.filter(function(element) {
            return element.id !== idDelete
            
        })
        //Lưu vào trong local
        localStorage.setItem('categories', JSON.stringify(categoriesFilter));
        //Re-render
        showDataCateFromLocal()
        //Kiểm tra nếu id xóa trùng với update thì reset form đến status add
        if(idDelete === buttonSave.getAttribute('data-id')) {
            resetToAddCategory()
        }
    }
    //Khi người dùng click vào button edit
    else if (clicked.classList.contains('btn_edit')) {
        //Lấy ra id của element cần edit
        const idEdit = clicked.getAttribute('data-id')
        
        //Lấy ra obj element theo id edit
        const elementEditting = categories.find(function(element) {
            return element.id === idEdit
        })
        //Đưa name lên ô input đang chỉnh sửa
        categoryInputName.value = elementEditting.name
        //Chỉnh sửa để người dùng nhận biết hiện tại đang edit form
        //Thay đổi save thành update
        buttonSave.textContent = 'Update'
        //Thêm class để biết là update
        buttonSave.classList.add('update')
        //Thêm id để biết update cho obj nào
        buttonSave.setAttribute('data-id', idEdit)
    }
}

let validateCategory = new Validate(
    {   
        container: "#category_form_add",
        btnClassSubmit: 'btn_category_save',
        rules: {
            category_name: {
                required: true
            }
        },
        messages: {
            category_name_required: 'category cannot be empty'
        },
        success: validateSuccess
    }
)

tbodyCate.addEventListener('click', handleProcessData)