

const appHeader = {
    handleAutoLogin() {
        const userId = JSON.parse(localStorage.getItem('user_id'));
        const acstkn = JSON.parse(localStorage.getItem('acstkn'));

        fetch(`${API_URL}/api/user/${userId}`, {
            headers: {
                authorization: `Beaer ${acstkn}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.is_expired || !userId || !acstkn) {
                    const html = `<a href="/assets/pages/login/login.html" class="header__login-btn">
                                    <i class="fa-solid fa-arrow-right-to-bracket header__login-icon"></i>
                                    Login
                                </a>`
                    $('.header__auth').html(html);
                    return;
                };
                const html = `<h4 class="logout-btn">Log out</h4>
                              <h4>${data.name}</h4>
                              <img class="avatar" src="${API_URL}${data.avatar}" alt="avatar" />`;
                $('.header__auth').html(html);
                $('.logout-btn').click(() => {
                    localStorage.removeItem("user_id");
                    localStorage.removeItem("rfstkn");
                    localStorage.removeItem("acstkn");
                    window.location.reload();
                })
            });
    },
    handleEvents: () => {
        
    },
    start() {
        this.handleAutoLogin()
        this.handleEvents()
    }
}

$('#header').load('assets/partials/header.html', () => {
    appHeader.start()
})