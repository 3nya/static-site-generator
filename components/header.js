class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <input type="text" id="myInput" placeholder="">

      <ul id="myUL" style="display: none;">

      </ul>

      <style>
        #myInput {
            border-radius: 15px;
            width: 100%;
            font-size: 16px;
            padding: 12px 20px;
            border: 1px solid #ddd;
            margin-bottom: 5px;
        }

        #myUL {
            width: 100%;
            border-radius: 15px;
            list-style-type: none;
            padding: 0;
            margin: 0;
            z-index: 1;
            position: absolute;
        }

        #myUL li a {
            width: 100%;
            padding: 12px 20px;
            background-color: #f6f6f6da;
            text-decoration: none;
            font-size: 18px;
            color: black;
            display: block;
            z-index: 1;
            position: relative;
        }

        #myUL li a:hover:not(.header) {
          background-color: #eee;
        }
      </style>
    `;

    const input = this.querySelector("#myInput");
    const ul = this.querySelector("#myUL");

    if (typeof FILE_LIST !== 'undefined') {
        FILE_LIST.forEach(item => {
            ul.innerHTML += item;
        });
    }

    const li = ul.getElementsByTagName("li");

    input.addEventListener("keyup", function () {
        const filter = input.value.toUpperCase();
        let anyVisible = false;
        if (filter === "") {
            ul.style.display = "none";
            for (let i = 0; i < li.length; i++) {
                li[i].style.display = "none";
            }
        return;
        }
        for (let i = 0; i < li.length; i++) {
            const a = li[i].getElementsByTagName("a")[0];
            const txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
                anyVisible = true;
            } else {
            li[i].style.display = "none";
            }
        }
        ul.style.display = anyVisible ? "block" : "none";
    });
  }
}

customElements.define('header-component', Header);
