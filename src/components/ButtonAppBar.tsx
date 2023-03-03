import * as React from 'react';
import AppBar from '@material-ui/core/AppBar'; // прописал "через колено" - штатным способом не работало
import Box from '@material-ui/core/Box'; // прописал "через колено" - штатным способом не работало
import Toolbar from '@material-ui/core/Toolbar'; // прописал "через колено" - штатным способом не работало
import Typography from '@material-ui/core/Typography'; // прописал "через колено" - штатным способом не работало
import Button from '@material-ui/core/Button'; // прописал "через колено" - штатным способом не работало
import IconButton from '@material-ui/core/IconButton'; // прописал "через колено" - штатным способом не работало

export default function ButtonAppBar() { // урок 7 єто добавили “условный header” (шаг 14). удалил много строк с\но методичке Димыча, т.к. не работало
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}