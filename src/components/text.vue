<template>
    <component :is="slim ? 'span' : 'div'" class="form-group">
        <label v-if="label" :for="id" v-html="label"></label>

        <textarea v-if="type === 'textarea'"
            ref="input"
            :id="id"
            :name="name"
            v-model="currentValue"
            :placeholder="placeholder"
            :required="required"
            @input="handleInput"
            @keydown="handleKeyDown"
            @blur="handleBlur"
            @focus="handleFocus"
            :class="['form-control', customClass]"></textarea>

        <input v-if="type !== 'textarea'"
            ref="input"
            :id="id"
            :name="name"
            :type="type"
            :value="currentValue"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            @input="handleInput"
            @keydown="handleKeyDown"
            @blur="handleBlur"
            @focus="handleFocus"
            :class="['form-control', customClass]">
        <ul class="form-errors" v-if="fieldErrors">
            <li v-for="(error, index) in fieldErrors" :key="index">{{ error }}</li>
        </ul>
    </component>
</template>

<script>
import merge from 'merge';
import VuexField from './vuex-field';
import Masker from '../helpers/Masker';

export default {
    name: 'VuexText',
    ...merge.recursive(true, VuexField, {
        props: {
            type: {
                type: String,
                default: 'text',
                validator: value => {
                    return ['text', 'textarea', 'tel', 'number', 'email', 'password', 'url', 'date'].indexOf(value) !== -1
                }
            },
            slim: {type: Boolean, default: false},
            mask: {type: [Boolean, String], default: false},
            saveMask: {type: [Boolean, String], default: false},
        },
        beforeMount() {
            this.masker = new Masker()
        },
        mounted() {
            if (this.$vnode.data.attrs.value) {
                this.currentValue = this.$vnode.data.attrs.value;
            }
        },
        methods: {
            hasMask() {
                return this.mask !== false && ['number', 'password'].indexOf(this.type.toLowerCase()) === -1
            },

            applyMask(value) {
                // if not deleting, apply the mask
                if (this.activeKeyCode !== 8 && this.activeKeyCode !== 46) {
                    value = this.masker.applyMask(value, this.mask)
                }

                // set the input value to override tempValue
                this.$refs.input.currentValue = value

                // set the caret position to prevent it from being pushed to the end of the input
                this.masker.updateCaretPosition(this.$refs.input, this.activeKeyCode)

                return value
            },

            applySaveMask(value) {
                if (this.saveMask === false) {
                    value = this.masker.removeMask(value, this.mask)
                } else if (this.saveMask !== true) {
                    value = this.masker.applyMask(value, this.saveMask)
                }
                return value;
            },

            handleKeyDown(e) {
                if (this.hasMask()) {
                    this.activeKeyCode = e.keyCode || e.charCode
                    // track the caret position in order to manually control it when applying a mask
                    this.masker.readCaretPosition(this.$refs.input)
                }
            },

            inputEvent(event) {
                let value = event.target.value;
                if (this.hasMask()) {
                    // apply the mask to the field
                    value = this.applyMask(value)

                    // apply the save mask for the final value
                    event.target.value = this.applySaveMask(value)
                }

                this.currentValue = value
                this.emitEvent('input', event)
            },

            blurEvent(event) {
                if (this.hasMask()) event.target.value = this.applySaveMask(event.target.value)
                this.emitEvent('blur', event)
            },

            focusEvent(event) {
                if (this.hasMask()) event.target.value = this.applySaveMask(event.target.value)
                this.emitEvent('focus', event)
            },
        }
    })
}
</script>
