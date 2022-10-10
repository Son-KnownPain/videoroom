

const app = {
    handleSubmit() {
        $('.button').click(() => {
            const usernameValue = $('.username-input').val();
            const passwordValue = $('.password-input').val();

            fetch(`${API_URL_BACK_UP}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: usernameValue,
                    password: passwordValue
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.is_login_fail) {
                        alert('Sai tài khoản hoặc mật khẩu')
                    } else {
                        localStorage.setItem('acstkn', JSON.stringify(data.access_token));
                        localStorage.setItem('rfstkn', JSON.stringify(data.refresh_token));
                        localStorage.setItem('user_id', JSON.stringify(data.user_id));

                        history.back();
                    }
                })
        })
    },
    start() {
        this.handleSubmit();
    }
}

app.start();