<template>
    <div>
        <textarea ref="textarea"></textarea>
        test
    </div>
</template>
  
<script>
import CodeMirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/theme/material.css'

export default {
    mounted() {
        this.cm = CodeMirror.fromTextArea(this.$refs.textarea, {
            mode: 'markdown',
            theme: 'material',
            lineNumbers: true,
            lineWrapping: true,
            autofocus: true,
            extraKeys: {
                'Enter': 'newlineAndIndentContinueMarkdownList',
                'Cmd-/': 'toggleComment',
                'Ctrl-/': 'toggleComment'
            },
            placeholder: 'Type your Markdown here...',
            matchBrackets: true,
            autoCloseBrackets: true,
            showTrailingSpace: true,
            styleActiveLine: true
        })
        this.cm.on('change', () => {
            this.$emit('input', this.cm.getValue())
        })
    },
    props: {
        value: String
    },
    watch: {
        value(newValue) {
            if (newValue !== this.cm.getValue()) {
                this.cm.setValue(newValue)
            }
        }
    },
    beforeDestroy() {
        this.cm.toTextArea()
    }
}
</script>
  