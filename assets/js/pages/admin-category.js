function validateSuccess() {
    // Lấy ra thông tin danh mục
    const nameCategory = document. querySelector('.category_name').value;
    // Tạo ra object chứa thông tin danh mục
    const newCate = {
        id: crypto.randomUUID(),
        name: nameCategory
    }
    // Lấy dữ liệu categories từ localStorage
    let categories = JSON.parse(localStorage.getItem('categories'``)) || []
    // Đưa obj vào trong mảng category
    categories.push(newCate)
    console.log(categories);
    //Lưu vào trong local
    localStorage.setItem('categories', JSON.stringify(categories));
    
    
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
            category_name_required: 'Danh mục không được để trống'
        },
        success: validateSuccess
    }
)