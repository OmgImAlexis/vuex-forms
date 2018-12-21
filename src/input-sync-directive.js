import dotProp from 'dot-prop';

export default {
    bind: function (_, binding, value) {
        let form      = binding.value
        let field     = binding.arg
        let component = value.child

        // Get the nested field path
        if (binding.modifiers) {
            for (let modifier in binding.modifiers) {
                field += '.' + modifier
            }
        }

        const isDotProp = field.indexOf('.') !== -1;
        const defaultValue = isDotProp ? dotProp.get(form, field) : form[field];
        const currentValue = isDotProp ? dotProp.get(form, field) : form[field];
        
        component.value = defaultValue;
        component.currentValue = currentValue
        component.localErrors = form.errors.get(field)

        component.$on('input', (inputValue) => {
            // Handle nested data
            if (field.indexOf('.') !== -1) {
                dotProp.set(form, field, inputValue);
            }

            component.$set(form, field, inputValue)
        })
        component.$on('event', (event) => {
            form.listen(event)
            // input event validation has a debounce timer, use setTimeout to wait for validation to happen
            setTimeout(() => {
                component.localErrors = form.errors.get(field)
            }, event.type === 'input' ? (form._config.inputDebounce + 50) : 0)
        })
        form.$bus.$on('validate', () => {
            component.localErrors = form.errors.get(field)
        })
        form.$bus.$on('reset', () => {
            component.currentValue = form._data._original[field];
            component.localErrors = null
            if (component.$refs.input) {
                component.$refs.input.value = form._data._original[field]
            }
        })
    },
    unbind(_, binding, value) {
        value.child.$off('event')
        value.child.$off('input')
        binding.value.$bus.$off('reset')
        binding.value.$bus.$off('validate')
    }
}