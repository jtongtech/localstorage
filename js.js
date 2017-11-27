        const addItems = document.querySelector('.add-items');
        const itemsList = document.querySelector('.plates');
        const items = JSON.parse(localStorage.getItem('items')) || [];
        var deleteAllButton = document.querySelector('.deleteAll');
        var uncheckAllButton = document.querySelector('.uncheckAll');
        var checkAllButton = document.querySelector('.checkAll');

        function addItem(e) {
            e.preventDefault();
            var text = (this.querySelector('[name=item]')).value;
            var item = {
                text: text,
                done: false
            }
            items.push(item);
            populateList(items, itemsList);
            localStorage.setItem('items', JSON.stringify(items));
            this.reset();
        }

        function populateList(plates = [], platesList) {
            platesList.innerHTML = plates.map((plate, i) => {
                return `
              <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
              </li>
            `;
            }).join('');

        }

        function toggleDone(e) {
            if (!e.target.matches('input')) return; // skip unless it is an input
            var el = e.target;
            var index = el.dataset.index;
            items[index].done = !items[index].done;
            localStorage.setItem('items', JSON.stringify(items));
            populateList(items, itemsList);
        }

        function deleteAll() {
            localStorage.clear();
            // localStorage.setItem('items', JSON.stringify(items));
            // populateList(items, itemsList);
        }

        function uncheckAll(e) {
            var length = JSON.parse(localStorage.items).length;
            var i = 0;
            while (i + 1 <= length) {
                items[i].done = false;
                i = i + 1;
                localStorage.setItem('items', JSON.stringify(items));
                populateList(items, itemsList);
            }
        }

        function checkAll(e) {
            var length = JSON.parse(localStorage.items).length;
            var i = 0;
            while (i + 1 <= length) {
                items[i].done = !false;
                i = i + 1;
                localStorage.setItem('items', JSON.stringify(items));
                populateList(items, itemsList);
            }
        }

        addItems.addEventListener('submit', addItem);
        itemsList.addEventListener('click', toggleDone);
        deleteAllButton.addEventListener('click', deleteAll);
        uncheckAllButton.addEventListener('click', uncheckAll);
        checkAllButton.addEventListener('click', checkAll);

        populateList(items, itemsList);

        // button delete all, check all, uncheck all