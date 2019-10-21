import React from 'react';
import Box from '@material-ui/core/Box';

import { AddButton, EditButton } from './components';

export default function ButtonComponent() {
    return(
        <div style={{ width: '100%'}}>
            <Box display="flex" flexDirection="row">
                <AddButton />
                <EditButton />
            </Box>
        </div>
    )
}