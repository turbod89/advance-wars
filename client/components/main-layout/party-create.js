const blessed = require('blessed');
const { style, border} = require('../../styles/main');

const CreatePartyForm = function ($scope) {

    const createPartyForm = this;
    let _list = [];

    const form = blessed.form({
        label: 'Create party',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        // height: items.length + 2,
        align: 'center',
        keys: true,
        border,
        style: {
            ...style,
            selected: {
                fg: 'red',
            }
        },
    });

    $scope.focus.createPartyForm = () => {
        form.focus();
        form.show();
        $scope.refresh();
    };

    form.hide();

    form.key(['escape', 'q','back'], (ch,key) => {
        form.hide();
        $scope.focus.partyList();
    });

    const nameInput = blessed.text({
        keys: true,
        label: 'Party\'s name',
    });

    form.append(nameInput);

    return form;
};

module.exports = CreatePartyForm;