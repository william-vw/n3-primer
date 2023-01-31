function stylizeSamples() {
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
        })

        let id = txtarea.getAttribute('id');
        let formula = encodeURIComponent(txtarea.value);

        // move  textarea's id to wrapper element
        if (id) {
            editor.getWrapperElement().setAttribute('id', txtarea.getAttribute('id'));
            txtarea.removeAttribute('id');

        } else
            id = `n3-example-${exampleCnt}`;

        let wrapper = $(editor.getWrapperElement());
        let link = $(`<a id='${id}' class='self-link' href='#${id}'>N3 example ${exampleCnt}</a>`);
        link.insertBefore(wrapper);

        let btnDiv = $("<div class='button_container'></div>");
        btnDiv.insertAfter(wrapper);

        let editorUrl = `http://editor.notation3.org/?formula=${formula}`;
        let openEditorLnk = $(`<a href="${editorUrl}" class='open_editor' target='_blank'>open in editor 🚀</a>`);
        btnDiv.append(openEditorLnk);

        exampleCnt++;
    });
}