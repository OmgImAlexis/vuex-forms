import Form from './form';
import Errors from './errors';
import { VuexText, VuexCheckbox, VuexRadio, VuexSelect } from './components';
import InputSyncDirective from './input-sync-directive';

let installed = false;

const VuexForms = {
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
    VuexForms,
    Form,
    Errors
}

export default VuexForms;