const selectCate = document.querySelector('.category_wrapper_form')
const formProduct = document.querySelector('#form_save_product')
const tbodyProduct = document.querySelector('.product_table')
const btnSaveProduct = document.querySelector('.btn_save')

function showCategoryInproduct() {
    //Lấy toàn bộ danh mục trong local
    const cateAll = JSON.parse(localStorage.getItem('categories')) || []
    let htmlOption = ''
    cateAll.forEach(
        function (element) {
            htmlOption = htmlOption + `<option value="${element.id}">${element.name}</option>`
        }
    )
    //Đưa option vào trong select
    selectCate.innerHTML = htmlOption;
}

function handleUpdateProduct() {
    const idUpdate = btnSaveProduct.getAttribute('data-id')
    //Tạo ra obj cho idEdit
    let objValue = {}
    const inputAll = formProduct.querySelectorAll('.form-control-item')

    inputAll.forEach(function (element) {
        if (element.name === 'category_wrapper_form') {
            objValue['category_id'] = element.value
        }
        else {
            objValue[element.name] = element.value

        }
    })
    objValue.id = crypto.randomUUID();
    const productType = document.querySelector('.type_product:checked').value
    objValue.product_type = productType
    //Tạo ra mảng chứa obj cần edit và các obj khác
    const products = JSON.parse(localStorage.getItem('products'))
    const productsUpdate = products.map(
        function(element) {
            if(element.id === idUpdate) {
                return objValue

            }
            else {
                return element
            }
        }
    )
    //Lưu dữ liệu vào local
    localStorage.setItem('products', JSON.stringify(productsUpdate));
    //Hiển thị dữ liệu từ trong local
    showProductsInlocal();
    //Reset đến trạng thái thêm mới sản phẩm
    btnSaveProduct.textContent = 'Save'
    btnSaveProduct.classList.remove('update')
    btnSaveProduct.removeAttribute('data-id')
    
    
    
}

function validateProductSuccess() {
    if(btnSaveProduct.classList.contains('update')) {
        handleUpdateProduct()
        return
        const productType = document.querySelector('.type_product:checked').value

    }

    //Tạo ra obj lưu thông tin sản phẩm
    let objValue = {}
    const inputAll = formProduct.querySelectorAll('.form-control-item')
    //Lấy ra value của input

    inputAll.forEach(function (element) {
        if (element.name === 'category_wrapper_form') {
            objValue['category_id'] = element.value
        }
        else {
            objValue[element.name] = element.value

        }
    })
    objValue.id = crypto.randomUUID();
    const productType = document.querySelector('.type_product:checked').value
    objValue.product_type = productType
    //Đưa object vào trong mảng
    let products = JSON.parse(localStorage.getItem('products')) || []
    const productsNew = [objValue, ...products]
    //Lưu dữ liệu vào local
    localStorage.setItem('products', JSON.stringify(productsNew));
    //Hiển thị dữ liệu từ trong local
    showProductsInlocal();

}

function showProductsInlocal() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let htmlResult = ''
    products.forEach(function (element) {
        htmlResult = htmlResult +   `<tr>
                                        <td>${element.name}</td>
                                        <td>${element.price_product}</td>
                                        <td>
                                            <img src="${element.image}" alt="">
                                        </td>
                                        <td>
                                            <button class="btn_common btn_edit" data-id="${element.id}">Edit</button>
                                            <button class="btn_common btn_delete" data-id="${element.id}">Delete</button>
                                        </td>
                                    </tr>`
    })
    document.querySelector('.product_table').innerHTML = htmlResult
}

function handleProcessProduct(event) {
    const clicked = event.target
    //Kiểm tra nếu click và button delete mới xử lí xóa
    if(clicked.classList.contains('btn_delete') && confirm('Bạn chắc chắn muốn xóa chứ'))  {
        //Lấy ra id của obj cần xóa
        const idDelete = clicked.getAttribute('data-id')
        //Xóa obj có chứa id delete
        const products = JSON.parse(localStorage.getItem('products')) || []
        const productsFilter = products.filter(function(element) {
            return element.id !== idDelete
        })
        //Lưu dữ liệu vào local
        localStorage.setItem('products', JSON.stringify(productsFilter));
        //Hiển thị lại dữ liệu
        showProductsInlocal();
        
    }
    else if(clicked.classList.contains('btn_edit')) {
        //Lấy ra idEdit
        const idEdit = clicked.getAttribute('data-id')   
        //Lấy ra obj có chứa id edit
        const products = JSON.parse(localStorage.getItem('products')) || []
        const elementEditting = products.find(
            function(element) {
                return element.id == idEdit
            }
        )
        //Đưa dữ liệu obj edit lấy được vào trong form
        const inputAll = formProduct.querySelectorAll('.form-control-item')
        inputAll.forEach(function(element) {
            const keyName = element.name === 'category_wrapper_form' ? 'category_id' : element.name
            element.value = elementEditting[keyName]
            
        })
        //Đưa value vào radio box
        document.querySelector(`.type_product[value="${elementEditting.product_type}"]`).checked = true
        //Phân biệt trạng thái create hoặc update
        btnSaveProduct.textContent = 'Update'
        btnSaveProduct.classList.add('update')
        btnSaveProduct.setAttribute('data-id', idEdit)
    }
}

//Hiển thị danh mục khi load trang lần đầu
showCategoryInproduct();
//Hiển thị sản phẩm khi load lại trang
showProductsInlocal();

let validateProduct = new Validate(
    {
        container: "#form_save_product",
        btnClassSubmit: 'btn_save',
        rules: {
            name: {
                required: true
            },
            category_wrapper_form: {
                required: true
            },
            price_product: {
                required: true
            },
            image: {
                required: true

            },
            description: {
                required: true

            }

        },
        messages: {
            name_required: 'Name cannot be empty'
        },
        success: validateProductSuccess
    }
)

//Thêm sự kiện xóa và edit cho sản phẩm
tbodyProduct.addEventListener('click', handleProcessProduct)
