import * as Validators from './validators';
import { VuexText, VuexCheckbox, VuexRadio, VuexSelect } from './components';
import InputSyncDirective from './input-sync-directive';

let installed = false;

export const VuexForms = {
    install(Vue) {
        if (installed) {
            return;
        }

        Vue.component('vuex-text', VuexText);
        Vue.component('vuex-checkbox', VuexCheckbox);
        Vue.component('vuex-radio', VuexRadio);
        Vue.component('vuex-select', VuexSelect);
        Vue.directive('input-sync', InputSyncDirective);

        installed = true;
    }
};

export {
    Validators
};
export default VuexForms;
export { default as Form } from './form';
export { default as Errors } from './errors';