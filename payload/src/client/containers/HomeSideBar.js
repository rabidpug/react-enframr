// @flow

import { getIsSidebarCollapsed, getOpenKeys, } from 'Store/ui/selectors';
import { toggleKey, toggleSidebar, } from 'Store/ui/actions';

import SideBar from 'Components/SideBar';
import { connect, } from 'react-redux';
import { push, } from 'react-router-redux';

const mapStateToProps = (
  state, ownProps
) => ( {
  currentPath        : ownProps.location.pathname,
  isSidebarCollapsed : getIsSidebarCollapsed( state ),
  menuItems          : ownProps.route.menuItems,
  openKeys           : getOpenKeys( state ),
} );

const mapDispatchToProps = dispatch => ( {
  goToPath ( path ) {
    dispatch( push( path ) );
  },
  toggleKey ( key ) {
    dispatch( toggleKey( key ) );
  },
  toggleSideBar () {
    dispatch( toggleSidebar() );
  },
} );

const HomeSideBar = connect(
  mapStateToProps, mapDispatchToProps
)( SideBar );

export default HomeSideBar;
