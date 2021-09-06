import React, { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#DCDCDC',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nested2: {
    paddingLeft: theme.spacing(8),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    "border-style": 'ridge',
  },
}));



const SideMenu = ({ categories }) => {
  const classes = useStyles();

  const [searchText, setSearchText] = useState('');

  const addList = (categoriesList, conditionFn = (() => true), level = 0) => {
    let className;
    switch (level) {
      case 1:
        className = classes.nested;
        break;
      case 2:
        className = classes.nested2;
        break;
      default:
        className = undefined;
    }
    let filteredCat = categoriesList.filter(cat => cat.product_count !== 0).filter(conditionFn);
    if (level === 0) {
      filteredCat = filteredCat.filter(cat => cat.name.toUpperCase().includes(searchText.toUpperCase()));
    } else {
      filteredCat = filteredCat.sort((a, b) => a.product_count - b.product_count);
    }
    return (
      <List component="div" disablePadding>
        {filteredCat.map(category => (
          <>
            <ListItem button className={className}>
              <ListItemText primary={category.name} />
            </ListItem>
            {category.children ? addList(category.children, conditionFn, level + 1) : null}
          </>
        ))}
      </List>
    );
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main">
        <ListItem button >
          <ListItemText primary="Offers" />
        </ListItem>
        {addList(categories, cat => cat.has_offer, 1)}
        <ListItem button >
          <ListItemText primary="New Arrivals" />
        </ListItem>
        {addList(categories, cat => cat.is_new_arrival, 1)}
      </List>
      <Divider />
      <ListItem >
        <div className={classes.search}>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={event => setSearchText(event.target.value)}
          />
        </div>
      </ListItem>
      {addList(categories)}
    </div>
  )

}

export default SideMenu;