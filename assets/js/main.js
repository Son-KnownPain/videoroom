const acstkn = JSON.parse(localStorage.getItem('acstkn'));

// Get elements
const s$ = document.querySelector.bind(document);
const s$$ = document.querySelectorAll.bind(document);

const sectionList = s$('.section__list')
const modal = s$('.modal')
const modalContainer = s$('.modal__container')
const closeBtn = s$('.modal__close-btn')


const app = {
    handleCallApi() {
        const _this = this;
        fetch(`${API_URL_BACK_UP}/api/all-videos`, {
            headers: {
                authorization: `Beaer ${acstkn}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.is_expired) {
                    sectionList.innerHTML = `<h4 class="section-message">Bạn cần phải đăng nhập để xem video</h4>`;
                    return;
                };
                _this.renderUIListYoutube(data)
                _this.handleEventClickSessionItem(data)
            });
    },

    handleClickSectionItem(idClicked, datas) {
        datas.forEach(item => {
            if (item._id == idClicked) {
                modalContainer.innerHTML = `<iframe width="900" height="500" src="https://www.youtube.com/embed/${item.video_code}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                modal.classList.add('active')
            }
        })
    },

    handleEventClickSessionItem(datas) {
        const sectionItems = s$$('.section__item')
        // Handle click section item video youtube
        sectionItems.forEach((item) => {
            item.onclick = () => {
                this.handleClickSectionItem(item.dataset.id, datas);
            }
        })
    },

    handleEvents() {

        // Handle click close modal
        closeBtn.onclick = () => {
            modal.classList.remove('active')
            modalContainer.innerHTML = ""
        }
    },
    
    renderUIListYoutube(datas) {
        if (!datas) {
            return;
        }
        var htmls = datas.reverse().map((item, index) => {
            var newVideoText = ""
            if (item.is_new) {
                newVideoText = "Mới"
            }
            return `<li class="section__item" data-id="${item._id}">
                        <h4 class="item__title">
                            ${item.title}
                            <span class="item__title-special">${item.part}</span>
                            ${newVideoText ? `<span class="item__title-new">${newVideoText}</span>` : ""}
                        </h4>
                        <p class="item__description">${item.description}</p>
                    </li>`
        })
        sectionList.innerHTML = htmls.join('')
    },

    start() {
        this.handleEvents()

        this.handleCallApi()
    }
}

app.start()