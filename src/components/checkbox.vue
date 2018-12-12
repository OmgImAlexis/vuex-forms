<template>
    <div class="form-group">
        <label :for="id">
            <input ref="input"
                :id="id"
                :name="name"
                type="checkbox"
                :value="currentValue"
                :checked="currentValue === trueValue"
                :required="required"
                @change="handleCheckbox"
                class="form-control">
            {{ label }}
        </label>
        <ul class="form-errors" v-if="fieldErrors">
            <li v-for="error in fieldErrors">{{ error }}</li>
        </ul>
    </div>
</template>
<script>
import merge from 'merge';
import VuexField from './vuex-field';

export default {
    name: 'VuexCheckbox',
    ...merge.recursive(true, VuexField, {
        props: {
            trueValue: {
                type: [Number, Boolean, String],
                default: true
            },
            falseValue: {
                type: [Number, Boolean, String],
                default: false
            },
        },
        methods: {
            handleCheckbox(event) {
                let newEvent = this.createEvent(event, 'input');
                newEvent.target.value = event.target.checked ? this.trueValue : this.falseValue
                this.inputEvent(newEvent);
            }
        }
    })
};
</script>