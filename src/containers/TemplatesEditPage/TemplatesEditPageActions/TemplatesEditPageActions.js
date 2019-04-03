import * as React from 'react';

import Button from '../../../components/Button';

function SettingsTemplatesEditPageActions({
    isSavingTemplate,
    canSave,
    onCancelButtonClick
}) {
    return (
        <div className="edit-action">
            <Button
                type="button"
                typeStyle="outlined"
                variationStyle="normal"
                onClick={onCancelButtonClick}
            >
                Cancel
            </Button>
            <Button
                loading={isSavingTemplate}
                disabled={canSave}
                type="submit"
                typeStyle="raised"
                variationStyle="brand"
            >
                Save
            </Button>
        </div>
    );
}

export default SettingsTemplatesEditPageActions;