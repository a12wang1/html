const {
    override,
    addDecoratorsLegacy,
    disableEsLint,
    addBundleVisualizer,
    addWebpackAlias,
    adjustWorkbox
} = require("customize-cra");
const path = require("path");

module.exports = override(
    addDecoratorsLegacy(),
    disableEsLint(),
    process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),
    addWebpackAlias({
        ["ag-grid-react$"]: path.resolve(__dirname, "src/shared/agGridWrapper.js")
    }),
    adjustWorkbox(wb =>
        Object.assign(wb, {
            skipWaiting: true,
            exclude: (wb.exclude || []).concat("index.html")
        })
    )
);