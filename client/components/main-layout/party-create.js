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
        style,
        selectedBg: 'red',
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

    const nameInput = blessed.textbox({
        keys: true,
        label: 'Party\'s name',
        height: 3,
        left: 0,
        right: 0,
        border,
        style,
    });

    form.append(nameInput);

    const submitBtn = blessed.button({
        keys: true,
        content: 'Create!',
        height: 3,
        bottom: 3,
        left: 2,
        width: 8,
        border,
        //style,
    });

    submitBtn.on('press', () => {
       form.hide();
       $scope.focus.partyList();
    });

    form.append(submitBtn);

    const cancelBtn = blessed.button({
        keys: true,
        content: 'Cancel',
        height: 3,
        bottom: 3,
        right: 2,
        width: 8,
        border,
        //style,
    });

    cancelBtn.on('press', () => {
        form.hide();
        $scope.focus.partyList();
    });

    form.append(cancelBtn);

    return form;
};

module.exports = CreatePartyForm;