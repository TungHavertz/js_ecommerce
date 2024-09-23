function rules() {
    return {
        email: {
            required: true,
            minlength: 3,
            regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        password: {
            required: true,
            minlength: 8
        }
    };
}


function messages() {
    return {
        name_required: 'Tên không được để trống',
        email_required: 'Email không được để trống',
        email_regex: 'Email không đúng định dạng'
    };
}

function validateSuccess() {
    // 1. Lấy thông tin email và password khi submit form
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    // 2. so sánh email và pass với tất cả users trong hệ thống
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.length) {

        const usersUpdate = users.map(
            function(element) {
                if(element.email === email && element.password === password) {
                    return {...element, status: 'active'};
                } else {
                    return {...element, status: ''};
                }
            }
        );
        // 3. cập nhật vào local storage
        localStorage.setItem('users', JSON.stringify(usersUpdate));
        // 4. chuyển đến màn hình admin hoặc home
        window.location.href = '/my-account.html';
    }

}

let loginInstanceValidate = new Validate(
    {
        container: ".login_form",
        btnClassSubmit: 'btn-login',
        rules: rules(),
        messages: messages(),
        success: validateSuccess
    }
);