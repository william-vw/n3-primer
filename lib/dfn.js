function toId(id) {
    return id.replace(/\n|\t/, " ").replace(/\s+/, " ").replace(" ", "-").toLowerCase();
}

function isSingular(id) {
    return !id.endsWith("s");
}

function singular(id) {
    return id.substring(0, id.length - 1);
}

function plural(id) {
    return id + "s";
}

let dfnMap = {};

function mapForms(id, val) {
    dfnMap[id] = val;
    if (isSingular(id))
        dfnMap[plural(id)] = val;
    else
        dfnMap[singular(id)] = val;
}

function mapDfn() {
    $('dfn').each((idx, dfn) => {
        let id = toId(dfn.innerHTML);
        let alts = [];
        if (dfn.hasAttribute("data-lt")) {
            alts = dfn.getAttribute("data-lt").split("|").map(val => toId(val));
        }

        mapForms(id, id);
        alts.forEach((alt) => mapForms(alt, id));

        dfn.setAttribute("id", id);
    });

    // console.log(dfnMap);

    $('a').each((idx, a) => {
        if (a.hasAttribute("href"))
            return;

        let id = toId(a.innerHTML);
        if (!dfnMap[id])
            console.error(`cannot find dfn for ${id}`);

        let val = dfnMap[id];
        a.setAttribute("href", `#${val}`);
        a.setAttribute("class", "dfn_link");
    });
}