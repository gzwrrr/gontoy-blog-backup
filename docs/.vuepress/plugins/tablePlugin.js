import MarkdownIt from 'markdown-it';

export default function wrapTable(md) {
    const defaultRender = md.renderer.rules.table_open || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.table_open = function (tokens, idx, options, env, self) {
        return `<div class="table-wrapper ">${defaultRender(tokens, idx, options, env, self)}`;
    };

    md.renderer.rules.table_close = function (tokens, idx, options, env, self) {
        return `${defaultRender(tokens, idx, options, env, self)}</div>`;
    };
};
