(function () {
    // Map entry IDs to arrays of image URLs (replace with your own paths)
    const images = {
        "003": [
            "/assets/devlog/img/bases-posees/image0.jpeg",
            "/assets/devlog/img/bases-posees/image2.jpeg",
        ],
        "002": [
            "/assets/devlog/img/commencement-dev/image0.png",
            "/assets/devlog/img/commencement-dev/image1.jpeg"
        ],
        "001": [
            "/assets/devlog/img/premieres-idees-et-recherches/image1.jpeg",
            "/assets/devlog/img/premieres-idees-et-recherches/image3.jpeg"
        ]
    };

    function createThumbnail(src) {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'devlog-thumb';
        return img;
    }

    function openModal(list, startIndex) {
        let modal = document.querySelector('.devlog-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'devlog-modal';
            modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close">✕</button>
          <button class="modal-nav modal-prev">‹</button>
          <button class="modal-nav modal-next">›</button>
          <img src="" alt="devlog image">
        </div>`;
            document.body.appendChild(modal);
        }

        const imgEl = modal.querySelector('img');
        const closeBtn = modal.querySelector('.modal-close');
        const prevBtn = modal.querySelector('.modal-prev');
        const nextBtn = modal.querySelector('.modal-next');
        let idx = startIndex || 0;

        function show(i) {
            i = (i + list.length) % list.length;
            idx = i;
            imgEl.src = list[i];
        }

        closeBtn.onclick = () => modal.classList.remove('open');
        prevBtn.onclick = () => show(idx - 1);
        nextBtn.onclick = () => show(idx + 1);
        modal.onclick = (e) => { if (e.target === modal) modal.classList.remove('open'); };

        show(idx);
        modal.classList.add('open');
    }

    function render() {
        document.querySelectorAll('.devlog-images').forEach(container => {
            const id = container.dataset.entry;
            const list = images[id] || [];
            container.innerHTML = '';
            if (list.length === 0) return;

            if (list.length === 1) {
                const img = createThumbnail(list[0]);
                img.onclick = () => openModal(list, 0);
                container.appendChild(img);
                return;
            }

            if (list.length === 2) {
                list.slice(0, 2).forEach((src, i) => {
                    const img = createThumbnail(src);
                    img.onclick = () => openModal(list, i);
                    container.appendChild(img);
                });
                return;
            }

            // 3 or more: show first thumbnail + +N button
            const first = createThumbnail(list[0]);
            first.onclick = () => openModal(list, 0);
            container.appendChild(first);

            const more = document.createElement('div');
            more.className = 'more-count';
            more.textContent = `+${list.length - 1}`;
            more.onclick = () => openModal(list, 1);
            container.appendChild(more);
        });
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
    else render();
})();
