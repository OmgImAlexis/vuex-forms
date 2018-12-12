<template>
    <div class="form-group">
        <label v-html="label"></label>
        <label v-for="(option, $index) in options" :key="$index" :for="(id || name) + option[option_name]">
            <input type="radio"
                :name="name"
                :id="(id || name) + option[option_name]"
                :value="option[option_value]"
                :checked="value === option[option_value]"
                @change="handleRadio"
                class="form-control">
            {{ option[option_name] }}
        </label>
        <ul class="form-errors" v-if="fieldErrors">
            <li v-for="(error, $index) in fieldErrors" :key="$index">{{ error }}</li>
        </ul>
    </div>
</template>
<script>
import merge from 'merge';
import VuexField from './vuex-field';

export default {
    name: 'VuexRadio',
    ...merge.recursive(true, VuexField, {
        props: {
            options: {
                type: [String, Object, Array],
                default: () => []
            },
            option_name: {
                type: [String],
                default: 'id'
            },
            option_value: {
                type: [String],
                default: 'id'
            }
        },
        methods: {
            handleRadio(event) {
                this.emitEvent('input', this.createEvent(event, 'input'));
            }
        }
    })
}
</script>