import {
  Button,
  Icon,
  Layout,
  Menu,
} from 'antd';

import React from 'react';
import styles from './TopBar.scss';

const { Item, SubMenu, } = Menu;

const { Header, } = Layout;
const TopBar = ( {
  isSidebarCollapsed, toggleSideBar, actionMenuItems, selectedActionKeys,
} ) => {
  const menuItemMap = item =>
    item.subMenu ? (
      <SubMenu
        key={ item.key }
        title={
          <span>
            <Icon type={ item.icon } />
            <span>{item.label}</span>
          </span>
        }>
        {item.subMenu.map( menuItemMap )}
      </SubMenu>
    ) : (
      <Item
        action={ item.action }
        key={ item.key }>
        {item.component
          ? <item.component { ...item } />
          : (
            <span>
              <Icon type={ item.icon } />
              {item.label}
            </span>
          )}
      </Item>
    );

  return (
    <Header
      style={ { background : '#fff',
                padding    : 0, } }>
      <Button
        className={ styles.trigger }
        icon={ isSidebarCollapsed ? 'menu-unfold' : 'menu-fold' }
        onClick={ toggleSideBar }
      />
      {actionMenuItems && (
        <Menu
          className={ styles.topBarMenu }
          mode='horizontal'
          onClick={ ( { item, } ) => item.props.action && item.props.action() }
          selectedKeys={ typeof selectedActionKeys === 'object' ? selectedActionKeys : [ selectedActionKeys, ] }>
          {actionMenuItems.map( menuItemMap )}
        </Menu>
      )}
    </Header>
  );
};

export default TopBar;
