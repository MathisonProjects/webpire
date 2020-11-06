<template>
    <div>
        <tiptap-vuetify v-model="tipTapContent" :toolbar-attributes="{ color: 'black' }" :extensions="extensions" />
    </div>
</template>

<script>
// import the component and the necessary extensions
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

export default {
    name: 'tip-tap-vuetify-text-editor-component',
    components: { TiptapVuetify },
    props: ['content'],
    model: {
		event: 'updateWysiwyg'
	},
    data() {
        return {
            extensions: [
                History,
                Blockquote,
                Link,
                Underline,
                Strike,
                Italic,
                ListItem,
                BulletList,
                OrderedList,
                [
                    Heading, {
                        options: {
                        levels: [1, 2, 3]
                    }
                }],
                Bold,
                Code,
                HorizontalRule,
                Paragraph,
                HardBreak
            ],
            tipTapContent: this.content
        }
    },
    watch: {
        tipTapContent(newValue) {
            this.$emit('updateWysiwyg', newValue)
        }
    }
}
</script>