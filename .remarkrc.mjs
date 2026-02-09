import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkWikiLink from "remark-wiki-link";
import remarkValidateLinks from "remark-validate-links";
import remarkDisableTextEscape from "remark-disable-text-escape";

export default {
  settings: {
    bullet: "-",
    listItemIndent: "one",
  },
  plugins: [
    [remarkFrontmatter, ["yaml", "toml"]],
    [remarkGfm, { tableCellPadding: false, tablePipeAlign: false }],
    [remarkWikiLink, { aliasDivider: "|" }],
    [remarkValidateLinks],
    [remarkDisableTextEscape],
  ],
};
