function run(id, success, error) {
    let editor = codeEditors[id];
    // console.log("value?", editor.getValue());

    eyereasoner.n3reasoner(
        editor.getValue(),
        undefined,
        { output: 'derivations' }
    ).then(success).catch(error);
}