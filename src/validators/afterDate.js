import { withParams, req } from 'vuelidate/lib/validators/common';

export default date => withParams(
    {
        type: 'date',
        date
    },
    value => {
        if (!req(value)) {
            return true;
        }

        const targetDate = new Date(date);
        const userDate = new Date(value);
        return userDate > targetDate;
    }
);