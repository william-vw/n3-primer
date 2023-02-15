function runSample(id) {
    run(id, (out) => {
        // console.log(out, `out-${id}`);
        
        out = out.trim();
        $(`#out-${id}`).css("display", "block");
        $(`#out-${id} > div.ruleout`).text(out);
    })
}

function closeSample(id) {
    $(`#out-${id}`).css("display", "none");
}

codeEditors = {};
function setupSamples() {
    exampleCnt = 1;

    $('.n3code').each((idx, txtarea) => {
        // put appropriate height for textarea
        txtarea.style.height = txtarea.scrollHeight + "px";

        // create new codemirror editor
        editor = CodeMirror.fromTextArea(txtarea, {
            lineNumbers: true,
            gutters: ["CodeMirror-lint-markers"],
            mode: 'n3',
            theme: "default rdf",
            lint: n3Lint(() => { }, n3),
            matchBrackets: true
        });

        let id = txtarea.getAttribute('id');
        let formula = encodeURIComponent(txtarea.value);

        // move  textarea's id to wrapper element
        if (id) {
            editor.getWrapperElement().setAttribute('id', "txt-" + txtarea.getAttribute('id'));
            txtarea.removeAttribute('id');

        } else
            id = `n3-example-${exampleCnt}`;

        codeEditors[id] = editor;

        let wrapper = $(editor.getWrapperElement());
        let link = $(`<a name='${id}' id='${id}' class='self-link' href='#${id}'>N3 example ${exampleCnt}</a>`);
        link.insertBefore(wrapper);

        let editorUrl = `http://editor.notation3.org/?formula=${formula}`;
        let openEditorLnk = `<a href="${editorUrl}" class='open_editor' target='_blank'>open in editor 🚀</a>`;

        let container = null;
        if ($(txtarea).hasClass("runnable")) {
            let runBtn = `<button onclick="runSample('${id}')">run <span style='font-size: 18px'>🚂</span></button>`;

            container = $(
            `<table class="button_container">
                <tr>
                    <td>${runBtn}</td>
                    <td>${openEditorLnk}</td>
                </tr>
            <table>
            <div class="outcontainer" id="out-${id}">
                <h5>Derivations</h5>
                <div class="ruleout"></div>
                <div class="close" onclick="closeSample('${id}')"></div>
            </div>`);

        } else {
            container = $(`<div class="button_container">${openEditorLnk}</div>`);
        }

        container.insertAfter(wrapper);

        exampleCnt++;
    });
}