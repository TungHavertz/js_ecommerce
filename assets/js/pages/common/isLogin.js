function isLoginAlready() {
    const users = JSON.parse(localStorage.getItem('users'));
    const isLogged = users.some(
        function(element) {
            return element.status === 'active'
        }
    )
    //Nếu user đang loggin trong hệ thống thì chuyển sang my-account.html
    if(isLogged) {
        window.location.href = '/js_ecommerce/my-account.html';
        

    }
    
    
}
isLoginAlready()