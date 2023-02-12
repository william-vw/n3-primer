function run(id, cb) {
    let editor = codeEditors[id];
    // console.log("value?", editor.getValue());

    eyereasoner.n3reasoner(
        editor.getValue(),
        undefined,
        { output: 'derivations' }
    ).then((out) => {
        // out = out.replaceAll('\n', '<br>');
        cb(out);
    });
}