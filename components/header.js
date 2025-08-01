class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <input type="text" id="myInput" placeholder="Search for names.." title="Type in a name">

      <ul id="myUL" style="display: none;">
            // figure out to put items here
      </ul>

      <style>
        #myInput {
            width: 100%;
            font-size: 16px;
            padding: 12px 20px;
            border: 1px solid #ddd;
            margin-bottom: 12px;
        }

        #myUL {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        #myUL li a {
            border: 1px solid #ddd;
            margin-top: -1px;
            background-color: #f6f6f6;
            padding: 12px;
            text-decoration: none;
            font-size: 18px;
            color: black;
            display: block;
        }

        #myUL li a:hover:not(.header) {
          background-color: #eee;
        }
      </style>
    `;

    const input = this.querySelector("#myInput");
    const ul = this.querySelector("#myUL");
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
