<template>
    <div class="form-group">
        <label v-if="label" :for="id" v-html="label"></label>

        <select 
            :id="id"
            :name="name"
            :multiple="multiple"
            :required="required"
            @change="handleInput"
            @blur="handleBlur"
            @focus="handleFocus"
            :class="['form-control', customClass]">
            <option v-for="option in options" :key="option.value" :value="option[option_value]" v-text="option[option_name]" :selected="checkSelected(String(option[option_value]))"></option>
        </select>
        <ul class="form-errors" v-if="fieldErrors">
            <li v-for="(error, $index) in fieldErrors" :key="$index">{{ error }}</li>
        </ul>
    </div>
</template>

<script>
import merge from 'merge';
import VuexField from './vuex-field';

export default {
    name: 'VuexSelect',
    ...merge.recursive(true, VuexField, {
        props: {
            options: {type: [String, Object, Array], default: () => []},
            option_name: {type: String, default: 'name'},
            option_value: {type: String, default: 'value'},
            multiple: {type: Boolean, default: false},
        },
        methods: {
            checkSelected(value) {
                if (!this.multiple && this.currentValue === value) {
                    return true;
                }
                if (this.multiple && this.currentValue !== null && value.length) {
                    return this.currentValue.indexOf(value) !== -1;
                }
            },
            handleInput(event) {
                let values = null;
                if (this.multiple && event.target.selectedOptions) {
                    values = [];
                    for (let x = 0; x < event.target.selectedOptions.length; x++) {
                        values.push(event.target.selectedOptions[x].value)
                    }
                }
                return this.inputEvent(this.createEvent(event, 'input', values));
            },
            inputEvent(event) {
                this.currentValue = event.target.value;
                this.emitEvent('input', event);
            }
        }
    })
}
</script>